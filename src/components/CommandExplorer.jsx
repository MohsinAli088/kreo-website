import React, { useState } from 'react';
import { Search, Terminal, Music, Sliders, Heart, Info, Wrench } from 'lucide-react';
import { categories, commandsList } from '../data/commands';

export default function CommandExplorer() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCommands = commandsList.filter((cmd) => {
    const matchesCategory = selectedCategory === 'all' || cmd.category === selectedCategory;
    const matchesSearch = cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cmd.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="commands" style={{ padding: '80px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="pill-badge glass-panel" style={{
            background: 'rgba(16, 185, 129, 0.1)',
            borderColor: 'rgba(16, 185, 129, 0.3)',
            color: '#10b981'
          }}>
            Full Command Documentation
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.15,
            marginBottom: '16px'
          }}>
            Explore All <span className="text-gradient">54 Commands</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '16px',
            maxWidth: '600px',
            margin: '0 auto 36px'
          }}>
            Filter by category or quickly search any command to view its syntax, description, and usage.
          </p>

          {/* Search Bar */}
          <div style={{
            maxWidth: '540px',
            margin: '0 auto',
            position: 'relative'
          }}>
            <Search size={18} color="var(--text-muted)" style={{
              position: 'absolute',
              left: '18px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }} />
            <input
              type="text"
              placeholder="Search commands (e.g. play, filter, 247, loop)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 20px 14px 48px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#fff',
                fontSize: '15px',
                fontFamily: 'var(--font-body)',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(139, 104, 230, 0.6)';
                e.target.style.boxShadow = '0 0 20px rgba(139, 104, 230, 0.25)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '40px'
        }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`nav-pill ${selectedCategory === cat.id ? 'nav-pill--active glow-violet' : ''}`}
              style={{
                border: selectedCategory === cat.id ? '1px solid var(--color-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                background: selectedCategory === cat.id ? 'rgba(139, 104, 230, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                color: selectedCategory === cat.id ? '#ffffff' : 'var(--text-secondary)'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Commands Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  borderRadius: '16px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px',
                  transition: 'all 0.25s ease'
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      fontSize: '17px',
                      color: 'var(--color-primary)',
                      letterSpacing: '0.5px'
                    }}>
                      +{cmd.name}
                    </span>
                    <span style={{
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}>
                      {cmd.category}
                    </span>
                  </div>

                  <p style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5
                  }}>
                    {cmd.desc}
                  </p>
                </div>

                <div style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '12px',
                  color: '#9aa',
                  fontFamily: 'monospace'
                }}>
                  {cmd.usage}
                </div>
              </div>
            ))
          ) : (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '48px 0',
              color: 'var(--text-muted)'
            }}>
              No commands found matching "{searchQuery}".
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
