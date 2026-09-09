import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Search,
  BookOpen,
  Terminal,
  Music,
  Sliders,
  Radio,
  Heart,
  Settings,
  Sparkles,
  Copy,
  Check,
  ChevronRight,
  Disc,
  Flame,
  Volume2,
  ExternalLink
} from 'lucide-react';
import { commandsList, categories } from '../data/commands';

const filterEffects = [
  { name: '8d', title: '8D Audio', desc: 'Immersive 360-degree rotating spatial surround sound.', command: '+filter 8d' },
  { name: 'bassboost', title: 'Bass Boost', desc: 'Heavy low-end frequency amplification with soft-clipping.', command: '+filter bassboost' },
  { name: 'nightcore', title: 'Nightcore', desc: 'Sped-up tempo and higher pitch for upbeat high-energy tracks.', command: '+filter nightcore' },
  { name: 'vaporwave', title: 'Vaporwave', desc: 'Slowed tempo and lowered pitch for chilled aesthetic vibes.', command: '+filter vaporwave' },
  { name: 'pop', title: 'Pop EQ', desc: 'Emphasizes clear vocals and modern bright instrumentation.', command: '+filter pop' },
  { name: 'soft', title: 'Soft Acoustic', desc: 'Mellows piercing highs for comfortable background listening.', command: '+filter soft' },
  { name: 'treble', title: 'Treble Boost', desc: 'Enhances acoustic brightness and cymbal / guitar clarity.', command: '+filter treble' },
  { name: 'karaoke', title: 'Karaoke', desc: 'Reduces vocal center frequencies so you can sing along.', command: '+filter karaoke' },
  { name: 'reset', title: 'Reset Filters', desc: 'Clears all active DSP audio equalizers back to studio neutral.', command: '+filter reset' }
];

export default function DocumentationPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCmd, setCopiedCmd] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setToast(`Copied "${text}" to clipboard!`);
    setTimeout(() => setCopiedCmd(null), 2500);
    setTimeout(() => setToast(null), 3500);
  };

  const filteredCommands = commandsList.filter((cmd) => {
    const matchesCategory = selectedCategory === 'all' || cmd.category === selectedCategory;
    const matchesSearch =
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.usage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-page" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background Gradient Mesh */}
      <div className="bg-gradient-mesh" />

      {/* Floating Navbar with Documentation active */}
      <Navbar activeSection="documentation" />

      {/* Toast popup */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 9999,
            padding: '14px 22px',
            borderRadius: '12px',
            background: 'rgba(244, 63, 94, 0.2)',
            border: '1px solid rgba(244, 63, 94, 0.5)',
            color: '#fecdd3',
            fontSize: '14px',
            fontWeight: 600,
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            animation: 'fadeInDown 0.3s ease'
          }}
        >
          {toast}
        </div>
      )}

      {/* Main Documentation Page Content */}
      <main className="documentation-page animate-fade-in" style={{ padding: '40px 0 100px', position: 'relative', zIndex: 1 }}>
        <div className="container">
          {/* Header Banner */}
          <div className="section-header text-center" style={{ marginBottom: '48px' }}>
            <div
              className="pill-badge glass-panel flex-center"
              style={{
                margin: '0 auto 16px',
                borderColor: 'rgba(244, 63, 94, 0.4)',
                background: 'rgba(244, 63, 94, 0.1)',
                color: '#f43f5e'
              }}
            >
              <BookOpen size={14} style={{ marginRight: '6px' }} /> KREO DOCUMENTATION & COMMANDS
            </div>
            <h1
              style={{
                fontSize: 'clamp(36px, 6vw, 56px)',
                fontWeight: 900,
                letterSpacing: '1px',
                marginBottom: '16px',
                fontFamily: "'Orbitron', sans-serif"
              }}
            >
              Command <span className="text-gradient" style={{ filter: 'drop-shadow(0 2px 14px rgba(244, 63, 94, 0.35))' }}>Reference</span>
            </h1>
            <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0 auto', fontSize: '16px', lineHeight: 1.7 }}>
              Master every playback control, real-time audio DSP filter, 24/7 channel stay, and VIP privilege configured for Kreo.
            </p>
          </div>

          {/* Quick-Start 4 Steps Showcase */}
          <div
            className="glass-panel"
            style={{
              borderRadius: '20px',
              padding: '28px 32px',
              marginBottom: '50px',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <h3
              style={{
                fontSize: '18px',
                color: '#fff',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              <Sparkles size={18} color="#f43f5e" /> Quick Start: 4 Simple Steps
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px'
              }}
            >
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#f43f5e' }}>STEP 01</span>
                <h4 style={{ fontSize: '15px', color: '#fff', margin: '6px 0' }}>Invite the Bot</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Add Kreo with voice & command permissions using the Invite button.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#3b82f6' }}>STEP 02</span>
                <h4 style={{ fontSize: '15px', color: '#fff', margin: '6px 0' }}>Join Voice Channel</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Connect to any voice or stage channel on your Discord server.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#10b981' }}>STEP 03</span>
                <h4 style={{ fontSize: '15px', color: '#fff', margin: '6px 0' }}>Play Your Song</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Type <code style={{ color: '#6ee7b7' }}>+play &lt;song/url&gt;</code> in chat or use slash command.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#8b5cf6' }}>STEP 04</span>
                <h4 style={{ fontSize: '15px', color: '#fff', margin: '6px 0' }}>Apply Audio Filters</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Enhance acoustics with <code style={{ color: '#c084fc' }}>+filter 8d</code> or <code style={{ color: '#c084fc' }}>+filter bassboost</code>.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Search Bar */}
          <div style={{ maxWidth: '640px', margin: '0 auto 36px', position: 'relative' }}>
            <Search
              size={20}
              color="var(--text-secondary)"
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}
            />
            <input
              type="text"
              placeholder="Search 50+ commands (e.g. play, 8d, volume, 247, queue)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 20px 16px 52px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#fff',
                fontSize: '15px',
                fontFamily: 'Inter, sans-serif',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(244, 63, 94, 0.6)';
                e.target.style.boxShadow = '0 0 25px rgba(244, 63, 94, 0.25)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.target.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.4)';
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  color: '#fff',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              marginBottom: '40px'
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`nav-pill ${selectedCategory === cat.id ? 'nav-pill--active glow-red' : ''}`}
                style={{
                  border: selectedCategory === cat.id ? '1px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: selectedCategory === cat.id ? 'rgba(244, 63, 94, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedCategory === cat.id ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Commands Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '20px',
              marginBottom: '60px'
            }}
          >
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd, idx) => (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.4)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(244, 63, 94, 0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '10px'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Orbitron', sans-serif",
                          fontWeight: 800,
                          fontSize: '18px',
                          color: '#fff',
                          letterSpacing: '0.5px'
                        }}
                      >
                        +{cmd.name}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          color: '#f43f5e',
                          background: 'rgba(244, 63, 94, 0.1)',
                          border: '1px solid rgba(244, 63, 94, 0.25)',
                          padding: '3px 10px',
                          borderRadius: '8px'
                        }}
                      >
                        {cmd.category}
                      </span>
                    </div>

                    <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                      {cmd.desc}
                    </p>
                  </div>

                  {/* Command Syntax Box with 1-Click Copy */}
                  <div
                    onClick={() => handleCopy(cmd.usage)}
                    title="Click to copy syntax"
                    style={{
                      background: 'rgba(0, 0, 0, 0.4)',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.4)';
                      e.currentTarget.style.background = 'rgba(244, 63, 94, 0.08)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)';
                    }}
                  >
                    <code style={{ color: '#67e8f9', fontSize: '13px', fontWeight: 600, fontFamily: 'monospace' }}>
                      {cmd.usage}
                    </code>
                    {copiedCmd === cmd.usage ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '12px' }}>
                        <Check size={14} /> Copied
                      </span>
                    ) : (
                      <Copy size={14} color="var(--text-secondary)" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '60px 20px',
                  color: 'var(--text-secondary)'
                }}
              >
                No commands found matching "{searchQuery}".
              </div>
            )}
          </div>

          {/* 14+ Audio DSP Filters Showcase */}
          <div
            className="glass-panel"
            style={{
              borderRadius: '24px',
              padding: '36px',
              marginBottom: '60px',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div style={{ marginBottom: '28px' }}>
              <div className="pill-badge bg-cyan" style={{ marginBottom: '10px' }}>
                AUDIO ENGINE
              </div>
              <h2 style={{ fontSize: '28px', color: '#fff', fontFamily: 'Outfit, sans-serif' }}>
                14+ Digital Signal Processing (DSP) Audio Filters
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '640px', lineHeight: 1.6 }}>
                Transform your listening experience in real time. Apply any filter below using <code style={{ color: '#06b6d4' }}>+filter &lt;mode&gt;</code>.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '16px'
              }}
            >
              {filterEffects.map((f) => (
                <div
                  key={f.name}
                  onClick={() => handleCopy(f.command)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '14px',
                    padding: '18px',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
                    e.currentTarget.style.background = 'rgba(6, 182, 212, 0.05)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: '15px' }}>{f.title}</span>
                    <Copy size={13} color="#06b6d4" />
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '12.5px', lineHeight: 1.5, marginBottom: '12px' }}>
                    {f.desc}
                  </p>
                  <code style={{ background: '#00000066', padding: '4px 8px', borderRadius: '6px', color: '#67e8f9', fontSize: '12px' }}>
                    {f.command}
                  </code>
                </div>
              ))}
            </div>
          </div>

          {/* Premium & No-Prefix Special Feature Guide Callout */}
          <div
            className="glass-panel"
            style={{
              borderRadius: '24px',
              padding: '36px',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(10, 10, 13, 0.95) 100%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="pill-badge" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', border: '1px solid rgba(244, 63, 94, 0.3)', marginBottom: '8px' }}>
                  VIP PRIVILEGE
                </span>
                <h3 style={{ fontSize: '24px', color: '#fff', fontFamily: 'Outfit, sans-serif' }}>
                  How No-Prefix & Voucher Codes Work
                </h3>
              </div>
              <button
                className="btn-primary"
                onClick={() => navigate('/premium')}
                style={{
                  background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
                  border: 'none',
                  boxShadow: '0 0 20px rgba(244, 63, 94, 0.4)'
                }}
              >
                View Premium Plans <ChevronRight size={16} />
              </button>
            </div>

            <p style={{ color: '#d1d5db', fontSize: '14.5px', lineHeight: 1.7 }}>
              Kreo supports <strong>Global No-Prefix</strong> for User Premium subscribers and <strong>Server-Wide No-Prefix</strong> for Server Premium communities. Once activated, authorized users can type commands like <code>play faded</code>, <code>skip</code>, or <code>queue</code> directly without typing any <code>+</code> or <code>/</code> symbol!
            </p>

            <div
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '12px',
                padding: '16px 20px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>VOUCHER REDEMPTION SYNTAX:</span>
                <div style={{ color: '#10b981', fontWeight: 700, fontSize: '14px', fontFamily: 'monospace', marginTop: '2px' }}>
                  +premium redeem &lt;YOUR-VOUCHER-CODE&gt;
                </div>
              </div>
              <button
                onClick={() => handleCopy('+premium redeem KREO-USER-XXXX')}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Copy size={13} /> Copy Sample Code
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
