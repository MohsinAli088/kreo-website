import React, { useState, useEffect } from 'react';

function DiscordIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );
}

const defaultTeam = [
  {
    id: '1340627332116910140',
    name: 'Mohsin.Exe',
    tag: 'mohsin._exe',
    role: 'FOUNDER & LEAD DEVELOPER',
    description:
      'Architect behind Kreo high-fidelity music engine, multi-node Lavalink cluster orchestration, stream auto-recovery, and Discord infrastructure.',
    color: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.35)',
    avatar:
      'https://cdn.discordapp.com/avatars/1340627332116910140/273036edeaafe2f968c5448bd7eb8e6b.webp?size=2048',
    banner: null,
    avatarDecoration:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_a0ff7f9be49be57356dd3cf0d9c02605.png?size=2048',
    status: 'dnd',
    socials: {
      discord: 'https://discord.com/users/1340627332116910140'
    }
  }
];

export default function Team() {
  const [team, setTeam] = useState(defaultTeam);

  useEffect(() => {
    fetch('/api/team')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTeam(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="team" className="team-section container">
      <div className="section-header text-center">
        <h2 className="team-title text-gradient">Kreo Team</h2>
        <p className="team-subtitle">
          Meet the creator and lead engineer behind Kreo's audio infrastructure and community.
        </p>
      </div>

      <div className="team-grid">
        {team.map((m, idx) => (
          <div
            key={m.id || idx}
            className="team-card"
            style={{
              '--card-color': m.color || '#f43f5e',
              '--card-glow-color': m.glowColor || 'rgba(244, 63, 94, 0.35)',
              '--avatar-color': m.color || '#f43f5e'
            }}
          >
            {/* Discord Header Banner - Crimson Red Aesthetic Gradient */}
            <div
              className="team-card-header"
              style={{
                background: m.banner
                  ? `url(${m.banner}) center/cover no-repeat`
                  : 'linear-gradient(135deg, rgba(244, 63, 94, 0.5) 0%, rgba(35, 10, 18, 0.95) 50%, #0a0a0c 100%)',
                position: 'relative',
                overflow: 'visible'
              }}
            >
              {/* Subtle crimson radiant sheen */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(circle at 50% 30%, rgba(244, 63, 94, 0.35), transparent 70%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Discord Avatar with Animated Decoration & Status */}
              <div className="team-avatar-wrapper">
                {m.avatarDecoration && (
                  <img
                    src={m.avatarDecoration}
                    alt="Discord Avatar Decoration"
                    className="team-avatar-decor"
                    loading="lazy"
                  />
                )}
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="team-avatar"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/avatar.webp';
                  }}
                />
                <div className={`team-status-dot status-${m.status || 'dnd'}`} />
              </div>
            </div>

            {/* Discord Profile Body */}
            <div className="team-card-body">
              <h3 className="team-name">{m.name}</h3>
              <div className="team-role" style={{ color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.3)' }}>
                {m.role}
              </div>
              <p className="team-desc">{m.description}</p>

              <div className="team-socials">
                <a
                  href={m.socials?.discord || `https://discord.com/users/${m.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="team-social-btn hover-glow"
                  style={{ '--hover-color': '#f43f5e' }}
                  title="Discord Profile"
                >
                  <DiscordIcon size={20} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
