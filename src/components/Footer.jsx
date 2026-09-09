import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Server, Users, Activity, Code2, ExternalLink } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const inviteUrl =
    'https://discord.com/oauth2/authorize?client_id=1533705359938682941&permissions=8&integration_type=0&scope=bot+applications.commands';
  const supportUrl = 'https://discord.gg/9wRBcsfK9Z';

  const [stats, setStats] = useState({
    servers: 27,
    users: 14659
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        let res = await fetch('/api/stats').catch(() => null);
        if (!res || !res.ok || res.headers.get('content-type')?.includes('text/html')) {
          res = await fetch('/api/stats.json').catch(() => null);
        }
        if (res && res.ok) {
          const data = await res.json();
          if (data && typeof data.servers === 'number') {
            setStats({
              servers: data.servers,
              users: data.users
            });
          }
        }
      } catch {}
    };
    loadStats();
  }, []);

  const handleNav = (targetId, e) => {
    if (e) e.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
    } else {
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset - 60;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    }
  };

  const handleDashboardClick = (e) => {
    e.preventDefault();
    alert('Currently Not Available, Coming Soon');
  };

  const handleDocsClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/docs') {
      navigate('/docs');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePremiumClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/premium') {
      navigate('/premium');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-section">
      <div className="container footer-content">
        {/* Brand */}
        <div className="footer-brand">
          <div
            className="logo-container flex-center"
            style={{ justifyContent: 'flex-start', marginBottom: '16px' }}
            onClick={(e) => handleNav('home', e)}
          >
            <img
              src="/avatar.webp"
              alt="Kreo Logo"
              className="nav-logo-img"
              style={{ width: '42px', height: '42px' }}
            />
            <span className="logo-text">
              KREO
              <span className="brand-equalizer" aria-hidden="true">
                <span className="brand-eq-bar" />
                <span className="brand-eq-bar" />
                <span className="brand-eq-bar" />
                <span className="brand-eq-bar" />
              </span>
            </span>
            <span className="brand-music-badge">HQ AUDIO</span>
          </div>
          <p className="footer-desc">
            The ultimate high-fidelity Discord music bot engineered for modern communities. Studio lossless audio, 24/7 playback, zero latency, and pure performance.
          </p>
          <a
            href={inviteUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary join-btn"
            style={{ display: 'inline-flex', textDecoration: 'none' }}
          >
            <ExternalLink size={16} style={{ marginRight: '6px' }} /> Join Kreo
          </a>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>QUICK LINKS</h4>
          <ul>
            <li>
              <a href="#" onClick={handleDashboardClick}>
                Dashboard
              </a>
            </li>
            <li>
              <a href="/#home" onClick={(e) => handleNav('home', e)}>
                Home
              </a>
            </li>
            <li>
              <a href="/#features" onClick={(e) => handleNav('features', e)}>
                Features
              </a>
            </li>
            <li>
              <a href="/docs" onClick={handleDocsClick}>
                Documentation
              </a>
            </li>
            <li>
              <a href="/premium" onClick={handlePremiumClick}>
                Premium Plans
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-links">
          <h4>SUPPORT</h4>
          <ul>
            <li>
              <a href={supportUrl} target="_blank" rel="noreferrer">
                Support Server
              </a>
            </li>
            <li>
              <a href={supportUrl} target="_blank" rel="noreferrer">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/docs" onClick={handleDocsClick}>
                Documentation
              </a>
            </li>
            <li>
              <a href={inviteUrl} target="_blank" rel="noreferrer">
                Add to Discord
              </a>
            </li>
          </ul>
        </div>

        {/* Real-time Telemetry Statistics */}
        <div className="footer-stats">
          <h4>STATISTICS</h4>
          <div className="footer-stat-item">
            <Server size={14} /> SERVERS: <span className="stat-value">{stats.servers.toLocaleString()}</span>
          </div>
          <div className="footer-stat-item">
            <Users size={14} /> USERS: <span className="stat-value">{stats.users.toLocaleString()}</span>
          </div>
          <div className="footer-stat-item">
            <Activity size={14} /> UPTIME: <span className="stat-value text-green">99.9%</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Kreo. All rights reserved. Not affiliated with Discord Inc.</p>
        <p style={{ marginTop: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <span>Developed By</span>
          <Code2 size={14} style={{ color: '#f43f5e', filter: 'drop-shadow(0 0 8px rgba(244, 63, 94, 0.6))' }} />
          <span style={{ color: '#fff', fontWeight: 600 }}>Mohsin.Exe</span>
        </p>
      </div>
    </footer>
  );
}
