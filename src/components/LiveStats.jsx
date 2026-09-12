import React, { useState, useEffect } from 'react';
import { Users, Server, Terminal, Activity, Clock, Cpu, Radio, Headphones, Zap } from 'lucide-react';

// Animated individual digit column for rolling slot-machine effect
function AnimatedDigit({ val, duration }) {
  const isNum = !isNaN(val) && val.trim() !== '';
  const [digit, setDigit] = useState(0);

  useEffect(() => {
    if (isNum) {
      const timer = setTimeout(() => {
        setDigit(parseInt(val, 10));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [val, isNum]);

  if (!isNum) {
    return <span className="non-digit">{val}</span>;
  }

  return (
    <span className="animated-counter-wrapper" style={{ height: '1em' }}>
      <span
        className="digit-column"
        style={{
          transform: `translateY(-${digit * 1}em)`,
          ...(duration ? { transitionDuration: `${duration}ms` } : {})
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <span key={i} className="digit">
            {i}
          </span>
        ))}
      </span>
    </span>
  );
}

// Composite animated number component
function AnimatedNumber({ value, duration }) {
  const chars = String(value ?? '0').split('');
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {chars.map((ch, idx) => {
        const key = `pos-${chars.length - idx}-${ch}`;
        return <AnimatedDigit key={key} val={ch} duration={duration} />;
      })}
    </span>
  );
}

export default function LiveStats() {
  const [stats, setStats] = useState({
    users: 0,
    servers: 0,
    commands: 54,
    ping: 0,
    uptime: 0,
    shards: 1,
    clusters: 1,
    voice: 0
  });
  const [isLive, setIsLive] = useState(false);

  // Format milliseconds into readable duration like 2d 4h or 5h 22m
  const formatUptime = (ms) => {
    if (!ms || ms <= 0) return '0h 0m';
    const totalMinutes = Math.floor(ms / 60000);
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const mins = totalMinutes % 60;
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h ${mins}m`;
  };

  useEffect(() => {
    let eventSource = null;
    let pollInterval = null;

    const apiBase = (import.meta.env.VITE_BOT_API_URL || '').replace(/\/$/, '');
    const statsUrl = apiBase ? `${apiBase}/api/stats` : '/api/stats';
    const streamUrl = apiBase ? `${apiBase}/api/stats/stream` : '/api/stats/stream';

    const fetchLiveStats = async () => {
      try {
        let res = await fetch(statsUrl).catch(() => null);
        if (!res || !res.ok || res.headers.get('content-type')?.includes('text/html')) {
          // If relative fetch fails and running on localhost, attempt direct connection to bot API
          if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            res = await fetch('http://127.0.0.1:4000/api/stats').catch(() => null);
          }
        }
        if (res && res.ok) {
          const data = await res.json();
          if (data && typeof data.servers !== 'undefined') {
            setStats((prev) => ({
              ...prev,
              ...data,
              ping: data.ping || prev.ping || 18,
              uptime: data.uptime || prev.uptime
            }));
            setIsLive(true);
            return;
          }
        }
      } catch (err) {
        console.warn('[LiveStats] Telemetry fetch warning:', err);
      }
    };

    // 1. Initial immediate fetch
    fetchLiveStats();

    // 2. Connect to Server-Sent Events (SSE) stream for real-time live telemetry
    try {
      eventSource = new EventSource(streamUrl);
      eventSource.onopen = () => setIsLive(true);
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data && typeof data.servers !== 'undefined') {
            setStats((prev) => ({ ...prev, ...data }));
            setIsLive(true);
          }
        } catch (e) {
          console.error('[LiveStats] Failed to parse SSE event data:', e);
        }
      };
      eventSource.onerror = () => {
        if (eventSource) eventSource.close();
        // Fall back to polling every 5 seconds if SSE disconnects
        if (!pollInterval) {
          pollInterval = setInterval(fetchLiveStats, 5000);
        }
      };
    } catch (e) {
      pollInterval = setInterval(fetchLiveStats, 5000);
    }

    return () => {
      if (eventSource) eventSource.close();
      if (pollInterval) clearInterval(pollInterval);
    };
  }, []);

  const statCards = [
    {
      label: 'GLOBAL USERS',
      val: stats.users.toLocaleString(),
      icon: Users,
      bgClass: 'bg-red'
    },
    {
      label: 'GLOBAL SERVERS',
      val: stats.servers.toLocaleString(),
      icon: Server,
      bgClass: 'bg-purple'
    },
    {
      label: 'TOTAL COMMANDS',
      val: `${stats.commands.toLocaleString()}+`,
      icon: Terminal,
      bgClass: 'bg-blue'
    },
    {
      label: 'API LATENCY',
      val: `${stats.ping}ms`,
      icon: Activity,
      bgClass: 'bg-orange'
    },
    {
      label: 'SYSTEM UPTIME',
      val: formatUptime(stats.uptime),
      icon: Clock,
      bgClass: 'bg-green'
    },
    {
      label: 'TOTAL SHARDS',
      val: stats.shards.toLocaleString(),
      icon: Cpu,
      bgClass: 'bg-cyan'
    },
    {
      label: 'AUDIO CLUSTERS',
      val: stats.clusters.toLocaleString(),
      icon: Radio,
      bgClass: 'bg-teal'
    },
    {
      label: 'ACTIVE PLAYERS',
      val: String(stats.voice || 0),
      icon: Headphones,
      bgClass: 'bg-pink'
    }
  ];

  return (
    <section id="stats" className="live-stats-section container" style={{ scrollMarginTop: '100px' }}>
      {/* Section Header */}
      <div className="section-header flex-between" style={{ flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 className="section-title">Live Statistics</h2>
          <p className="section-subtitle">Real-time bot performance and audio cluster metrics</p>
        </div>
        <div className="live-badge flex-center">
          <Zap size={14} className="live-icon" />
          {isLive ? 'Realtime Cluster Sync • Active' : 'Cluster Synchronizing...'}
        </div>
      </div>

      {/* 8 Stats Cards Grid (Kreo Grid & Glowing Borders) */}
      <div className="stats-grid">
        {statCards.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="stat-card glass-panel group-hover">
              <div className={`icon-wrapper ${item.bgClass}`}>
                <Icon size={24} />
              </div>
              <h3>
                <AnimatedNumber value={item.val} duration={2000} />
              </h3>
              <p>{item.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
