import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function liveDiscordStatsPlugin() {
  const envPath = path.resolve(__dirname, '../.env');
  const statsFilePath = path.resolve(__dirname, 'public/api/stats.json');

  let botToken = '';
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    const match = content.match(/TOKEN=([^\r\n]+)/);
    if (match) botToken = match[1].trim();
  }

  let cachedStats = {
    users: 14659,
    servers: 27,
    commands: 54,
    ping: 18,
    uptime: 172800000,
    shards: 1,
    clusters: 3,
    voice: 0,
    status: 'operational',
    botName: 'Kreo',
    timestamp: Date.now()
  };

  let lastDiscordFetch = 0;
  const startTime = Date.now() - 172800000;

  const fetchDiscordStats = async () => {
    // If bot token is available and cached for more than 30 seconds
    if (botToken && Date.now() - lastDiscordFetch > 30000) {
      lastDiscordFetch = Date.now();
      try {
        const res = await fetch('https://discord.com/api/v10/users/@me/guilds?with_counts=true', {
          headers: {
            Authorization: `Bot ${botToken}`
          }
        });
        if (res.ok) {
          const guilds = await res.json();
          if (Array.isArray(guilds)) {
            const totalUsers = guilds.reduce((acc, g) => acc + (g.approximate_member_count || 0), 0);
            cachedStats.servers = guilds.length;
            cachedStats.users = totalUsers;
            cachedStats.timestamp = Date.now();

            // Save to public stats.json asynchronously
            try {
              fs.writeFileSync(statsFilePath, JSON.stringify(cachedStats, null, 2), 'utf8');
            } catch {}
          }
        }
      } catch (err) {
        console.warn('[Vite LiveStats] Discord REST fetch error:', err.message);
      }
    }
  };

  // Initial Discord fetch on server start
  fetchDiscordStats();

  const getStats = () => {
    fetchDiscordStats().catch(() => {});

    // Check if the bot process wrote recent voice / cluster stats
    try {
      if (fs.existsSync(statsFilePath)) {
        const fileContent = fs.readFileSync(statsFilePath, 'utf8');
        const parsed = JSON.parse(fileContent);
        if (parsed && typeof parsed.servers === 'number') {
          cachedStats = {
            ...cachedStats,
            ...parsed
          };
        }
      }
    } catch {}

    const pingJitter = Math.floor(Math.random() * 4) - 2;

    return {
      ...cachedStats,
      ping: Math.max(14, (cachedStats.ping || 18) + pingJitter),
      uptime: Date.now() - startTime,
      timestamp: Date.now()
    };
  };

  return {
    name: 'live-discord-stats-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url.split('?')[0];

        // JSON REST endpoint: /api/stats and /api/stats.json
        if (url === '/api/stats' || url === '/api/stats.json') {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          const data = getStats();
          res.end(JSON.stringify(data));
          return;
        }

        // Live Team Profile endpoint: /api/team
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

        // SSE Realtime Stream endpoint: /api/stats/stream
        if (url === '/api/stats/stream') {
          res.setHeader('Content-Type', 'text/event-stream');
          res.setHeader('Cache-Control', 'no-cache, no-transform');
          res.setHeader('Connection', 'keep-alive');
          res.setHeader('Access-Control-Allow-Origin', '*');
          if (typeof res.flushHeaders === 'function') {
            res.flushHeaders();
          }

          const send = () => {
            const data = getStats();
            res.write(`data: ${JSON.stringify(data)}\n\n`);
          };

          send();
          const timer = setInterval(send, 3500);

          req.on('close', () => {
            clearInterval(timer);
          });
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
