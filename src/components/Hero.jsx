import React, { useState } from 'react';
import { Play, Pause, SkipForward, Square, Repeat, Heart, Music, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  const inviteUrl = "https://discord.com/oauth2/authorize?client_id=1533705359938682941&permissions=8&integration_type=0&scope=bot+applications.commands";
  const supportUrl = "https://discord.gg/9wRBcsfK9Z";

  return (
    <section id="home" className="hero-section flex-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="hero-content text-center container">
        
        {/* Glowing Pill Badge */}
        <div className="pill-badge glass-panel flex-center hover-glow">
          <span className="pulse-dot"></span>
          Kreo v2.0 is Live • Studio Lossless Audio
        </div>

        {/* Hero Title */}
        <h1 className="hero-title">
          Elevate your community with<br />
          <span className="text-gradient">Extreme Precision</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Experience the next generation of Discord music streaming. Kreo delivers studio-grade lossless audio,
          instant anti-bot auto-recovery, 24/7 non-stop presence, and 14+ real-time DSP filters.
        </p>

        {/* Hero Action Buttons */}
        <div className="hero-actions flex-center">
          <a
            href={inviteUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary cta-btn glow-red"
          >
            <Music size={18} /> Add to Discord <ArrowRight size={18} />
          </a>
          <a
            href={supportUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-support cta-btn-secondary"
          >
            Support Server <ExternalLink size={18} />
          </a>
        </div>


        {/* Interactive Now Playing Player Card Mockup */}
        <div style={{
          maxWidth: '680px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {/* Ambient Glow */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            background: 'radial-gradient(circle, rgba(139, 104, 230, 0.25) 0%, transparent 70%)',
            filter: 'blur(50px)',
            zIndex: 0,
            pointerEvents: 'none'
          }} />

          <div className="glass-panel group-hover" style={{
            position: 'relative',
            zIndex: 1,
            borderRadius: '24px',
            padding: '28px',
            border: '1px solid rgba(139, 104, 230, 0.3)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)'
          }}>
            {/* Player Card Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>💿</span>
                <span style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 700,
                  fontSize: '15px',
                  color: '#ffffff'
                }}>
                  Now Playing • Lossless Stream
                </span>
              </div>
              <span className="live-badge flex-center">
                <span className="pulse-dot"></span>
                LIVE 24/7
              </span>
            </div>

            {/* Song Meta & Thumbnail */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              textAlign: 'left',
              marginBottom: '20px'
            }}>
              <img
                src="/avatar.webp"
                alt="Track Cover"
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '18px',
                  objectFit: 'cover',
                  border: '2px solid rgba(139, 104, 230, 0.4)',
                  boxShadow: '0 8px 25px rgba(139, 104, 230, 0.3)'
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 700,
                  fontSize: '19px',
                  color: '#ffffff',
                  marginBottom: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  Mann Mera - Lofi Chill Session
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  marginBottom: '10px'
                }}>
                  Gajendra Verma • <span style={{ color: '#8B68E6', fontWeight: 600 }}>YouTube Music • 320kbps</span>
                </p>

                {/* Simulated Waveform Progress */}
                <div style={{
                  width: '100%',
                  height: '6px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '3px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '62%',
                    background: 'linear-gradient(90deg, #8B68E6, #06b6d4)',
                    borderRadius: '3px',
                    boxShadow: '0 0 12px rgba(139, 104, 230, 0.8)'
                  }} />
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  marginTop: '6px'
                }}>
                  <span>02:14</span>
                  <span>03:41</span>
                </div>
              </div>
            </div>

            {/* Interactive Controller Buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="icon-wrapper"
                style={{
                  background: isPlaying ? 'rgba(139, 104, 230, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                  borderColor: isPlaying ? '#8B68E6' : 'rgba(255, 255, 255, 0.15)',
                  color: isPlaying ? '#8B68E6' : '#fff',
                  width: '46px',
                  height: '46px',
                  marginBottom: 0
                }}
                title={isPlaying ? 'Pause' : 'Resume'}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>

              <button
                className="icon-wrapper"
                style={{ width: '46px', height: '46px', marginBottom: 0, color: '#fff' }}
                title="Skip Track"
              >
                <SkipForward size={18} />
              </button>

              <button
                className="icon-wrapper bg-red"
                style={{ width: '46px', height: '46px', marginBottom: 0 }}
                title="Stop & Disconnect"
              >
                <Square size={16} />
              </button>

              <button
                onClick={() => setIsLooping(!isLooping)}
                className="icon-wrapper"
                style={{
                  width: '46px',
                  height: '46px',
                  marginBottom: 0,
                  borderColor: isLooping ? '#8b5cf6' : 'rgba(255, 255, 255, 0.15)',
                  color: isLooping ? '#8b5cf6' : '#fff'
                }}
                title="Toggle Loop"
              >
                <Repeat size={17} />
              </button>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className="icon-wrapper bg-green"
                style={{
                  width: '46px',
                  height: '46px',
                  marginBottom: 0
                }}
                title="Like Song"
              >
                <Heart size={18} fill={isLiked ? '#10b981' : 'transparent'} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
