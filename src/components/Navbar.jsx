import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Layers, Users, BookOpen, Gem, ChevronRight, Menu, X } from 'lucide-react';

export default function Navbar({ activeSection, setActiveSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const inviteUrl =
    'https://discord.com/oauth2/authorize?client_id=1533705359938682941&permissions=8&integration_type=0&scope=bot+applications.commands';

  const handleNav = (targetId, e) => {
    if (e) e.preventDefault();
    setMobileOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
      return;
    }

    if (setActiveSection) {
      setActiveSection(targetId);
    }

    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 60;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  const handleDocsClick = (e) => {
    if (e) e.preventDefault();
    setMobileOpen(false);
    if (location.pathname !== '/docs') {
      navigate('/docs');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePremiumClick = (e) => {
    if (e) e.preventDefault();
    setMobileOpen(false);
    if (location.pathname !== '/premium') {
      navigate('/premium');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e) => {
    if (e) e.preventDefault();
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    window.open(inviteUrl, '_blank');
  };

  return (
    <>
      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-sidebar-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-sidebar glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-header">
              <div
                className="logo-container flex-center"
                onClick={handleLogoClick}
              >
                <img
                  src="/avatar.webp"
                  alt="Kreo Logo"
                  className="nav-logo-img"
                  style={{ width: '36px', height: '36px' }}
                />
                <span className="logo-text" style={{ fontSize: '20px' }}>
                  KREO
                  <span className="brand-equalizer" aria-hidden="true">
                    <span className="brand-eq-bar" />
                    <span className="brand-eq-bar" />
                    <span className="brand-eq-bar" />
                  </span>
                </span>
                <span className="brand-music-badge">HQ</span>
              </div>
              <button className="close-btn" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={20} color="#fff" />
              </button>
            </div>

            <div className="sidebar-links">
              <a
                href="/#home"
                onClick={(e) => handleNav('home', e)}
                className={`sidebar-link${activeSection === 'home' ? ' nav-pill--active' : ''}`}
                style={activeSection === 'home' ? { color: '#3b82f6', borderColor: 'rgba(59,130,246,0.4)' } : {}}
              >
                <Home size={18} style={{ color: '#3b82f6' }} /> Home
              </a>
              <a
                href="/#features"
                onClick={(e) => handleNav('features', e)}
                className={`sidebar-link${activeSection === 'features' ? ' nav-pill--active' : ''}`}
                style={activeSection === 'features' ? { color: '#8b5cf6', borderColor: 'rgba(139,92,246,0.4)' } : {}}
              >
                <Layers size={18} style={{ color: '#8b5cf6' }} /> Features
              </a>
              <a
                href="/#team"
                onClick={(e) => handleNav('team', e)}
                className={`sidebar-link${activeSection === 'team' ? ' nav-pill--active' : ''}`}
                style={activeSection === 'team' ? { color: '#10b981', borderColor: 'rgba(16,185,129,0.4)' } : {}}
              >
                <Users size={18} style={{ color: '#10b981' }} /> Team
              </a>
              <a
                href="/docs"
                onClick={handleDocsClick}
                className={`sidebar-link${activeSection === 'documentation' ? ' nav-pill--active' : ''}`}
                style={activeSection === 'documentation' ? { color: '#f43f5e', borderColor: 'rgba(244,63,94,0.4)' } : {}}
              >
                <BookOpen size={18} style={{ color: '#f43f5e' }} /> Documentation
              </a>
              <a
                href="/premium"
                onClick={handlePremiumClick}
                className={`sidebar-link${activeSection === 'premium' ? ' nav-pill--active' : ''}`}
                style={activeSection === 'premium' ? { color: '#06b6d4', borderColor: 'rgba(6,182,212,0.4)' } : {}}
              >
                <Gem size={18} style={{ color: '#06b6d4' }} /> Premium
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Capsule Navbar */}
      <nav className="navbar glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {/* Mobile Toggle */}
        <div className="mobile-menu-toggle flex-center" onClick={() => setMobileOpen(true)}>
          <Menu size={24} color="#fff" />
        </div>

        {/* Left: Brand Logo & Music Visualizer */}
        <div
          onClick={handleLogoClick}
          className="logo-container flex-center"
        >
          <img
            src="/avatar.webp"
            alt="Kreo Logo"
            className="nav-logo-img"
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
          <span className="brand-music-badge">HQ</span>
        </div>

        {/* Center: Glowing Navigation Pills with Colorful Icons */}
        <div className="nav-links">
          <a
            href="/#home"
            onClick={(e) => handleNav('home', e)}
            className={`nav-pill glow-blue${activeSection === 'home' ? ' nav-pill--active' : ''}`}
          >
            <Home size={16} style={{ color: '#3b82f6' }} /> Home
          </a>
          <a
            href="/#features"
            onClick={(e) => handleNav('features', e)}
            className={`nav-pill glow-purple${activeSection === 'features' ? ' nav-pill--active' : ''}`}
          >
            <Layers size={16} style={{ color: '#8b5cf6' }} /> Features
          </a>
          <a
            href="/#team"
            onClick={(e) => handleNav('team', e)}
            className={`nav-pill glow-green${activeSection === 'team' ? ' nav-pill--active' : ''}`}
          >
            <Users size={16} style={{ color: '#10b981' }} /> Team
          </a>

          {/* Red Documentation Nav Pill */}
          <a
            href="/docs"
            onClick={handleDocsClick}
            className={`nav-pill glow-red flex-center${activeSection === 'documentation' ? ' nav-pill--active' : ''}`}
            style={
              activeSection === 'documentation'
                ? {
                    color: '#f43f5e',
                    borderColor: 'rgba(244, 63, 94, 0.6)',
                    boxShadow: '0 0 20px rgba(244, 63, 94, 0.35)'
                  }
                : {}
            }
          >
            <BookOpen size={16} style={{ color: '#f43f5e' }} /> Documentation
          </a>

          {/* Cyan Premium Nav Pill */}
          <a
            href="/premium"
            onClick={handlePremiumClick}
            className={`nav-pill premium-btn flex-center${activeSection === 'premium' ? ' nav-pill--active' : ''}`}
          >
            <Gem size={16} className="diamond-spark" style={{ marginRight: '6px', color: '#06b6d4' }} /> Premium
          </a>
        </div>

        {/* Right: Login Button */}
        <div className="nav-right flex-center">
          <button className="btn-primary login-btn" onClick={handleLogin}>
            Login <ChevronRight size={16} />
          </button>
        </div>
      </nav>
    </>
  );
}
