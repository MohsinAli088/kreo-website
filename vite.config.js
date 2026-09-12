import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function liveDiscordStatsPlugin() {
  const envPath = path.resolve(__dirname, '../.env');

  let botToken = '';
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    const match = content.match(/TOKEN=([^\r\n]+)/);
    if (match) botToken = match[1].trim();
  }

  let cachedDiscordStats = {
    users: 0,
    servers: 0,
    commands: 54,
    ping: 18,
    uptime: 0,
    shards: 1,
    clusters: 1,
    voice: 0,
    status: 'operational',
    botName: 'Kreo',
    timestamp: Date.now()
  };

  let lastDiscordFetch = 0;

  // Helper to proxy requests to Bot API server (http://127.0.0.1:4000)
  const tryProxyToBot = (req, res, targetPath) => {
    return new Promise((resolve) => {
      const proxyReq = http.request(
        {
          hostname: '127.0.0.1',
          port: 4000,
          path: targetPath,
          method: req.method,
          headers: req.headers
        },
        (proxyRes) => {
          res.writeHead(proxyRes.statusCode, proxyRes.headers);
          proxyRes.pipe(res);
          resolve(true);
        }
      );

      proxyReq.on('error', () => {
        resolve(false);
      });

      proxyReq.setTimeout(1500, () => {
        proxyReq.destroy();
        resolve(false);
      });

      req.pipe(proxyReq);
    });
  };

  const fetchDiscordDirect = async () => {
    if (botToken && Date.now() - lastDiscordFetch > 20000) {
      lastDiscordFetch = Date.now();
      try {
        const discordRes = await fetch('https://discord.com/api/v10/users/@me/guilds?with_counts=true', {
          headers: { Authorization: `Bot ${botToken}` }
        });
        if (discordRes.ok) {
          const guilds = await discordRes.json();
          if (Array.isArray(guilds)) {
            const totalUsers = guilds.reduce((acc, g) => acc + (g.approximate_member_count || 0), 0);
            cachedDiscordStats.servers = guilds.length;
            cachedDiscordStats.users = totalUsers;
            cachedDiscordStats.status = 'operational';
            cachedDiscordStats.timestamp = Date.now();
          }
        }
      } catch (err) {
        console.warn('[Vite Dev] Discord REST fetch error:', err.message);
      }
    }
    return cachedDiscordStats;
  };

  // Initial fetch
  fetchDiscordDirect().catch(() => {});

  return {
    name: 'live-discord-stats-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url.split('?')[0];

        // 1. Live Stats Stream (SSE): /api/stats/stream
        if (url === '/api/stats/stream') {
          const proxied = await tryProxyToBot(req, res, '/api/stats/stream');
          if (proxied) return;

          // Fallback SSE if bot is offline locally
          res.setHeader('Content-Type', 'text/event-stream');
          res.setHeader('Cache-Control', 'no-cache, no-transform');
          res.setHeader('Connection', 'keep-alive');
          res.setHeader('Access-Control-Allow-Origin', '*');
          if (typeof res.flushHeaders === 'function') res.flushHeaders();

          const send = async () => {
            const data = await fetchDiscordDirect();
            res.write(`data: ${JSON.stringify(data)}\n\n`);
          };

          send();
          const timer = setInterval(send, 5000);
          req.on('close', () => clearInterval(timer));
          return;
        }

        // 2. Live Stats REST: /api/stats or /api/stats.json
        if (url === '/api/stats' || url === '/api/stats.json') {
          const proxied = await tryProxyToBot(req, res, '/api/stats');
          if (proxied) return;

          // Fallback if bot is offline locally
          const data = await fetchDiscordDirect();
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify(data));
          return;
        }

        // 3. Live Team Profile endpoint: /api/team
        if (url === '/api/team') {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          const teamFilePath = path.resolve(__dirname, 'public/api/team.json');
          try {
            if (fs.existsSync(teamFilePath)) {
              res.end(fs.readFileSync(teamFilePath, 'utf8'));
              return;
            }
          } catch {}
          res.end(JSON.stringify([]));
          return;
        }

        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), liveDiscordStatsPlugin()],
  server: {
    port: 3000,
    host: true
  }
});
