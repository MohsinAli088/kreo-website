import React, { useState } from 'react';
import { Disc, Shield, Radio, Sliders, PlayCircle, Zap, ArrowRight, X, Terminal } from 'lucide-react';
import { featuresList } from '../data/features';

const iconMap = {
  'lossless-audio': Disc,
  'auto-recovery': Shield,
  'mode-247': Radio,
  'dsp-filters': Sliders,
  'smart-autoplay': PlayCircle,
  'no-prefix': Zap
};

export default function Features() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <section id="features" className="features-section container">
      {/* Section Header */}
      <div className="section-header text-center" style={{ marginBottom: '56px' }}>
        <h2
          className="section-title"
          style={{ fontWeight: '900', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '2px' }}
        >
          EVERYTHING YOU NEED
        </h2>
        <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0 auto', color: 'var(--text-secondary)' }}>
          Discover the high-fidelity features that make Kreo the preferred choice for modern Discord communities.
        </p>
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        {featuresList.map((f) => {
          const Icon = iconMap[f.id] || Disc;
          return (
            <div
              key={f.id}
              className="feature-card glass-panel group-hover"
              onClick={() => setSelectedFeature(f)}
              style={{ cursor: 'pointer' }}
            >
              <div className={`feature-icon-wrapper bg-${f.color}`}>
                <Icon size={28} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <div
                style={{
                  marginTop: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  fontWeight: 600
                }}
              >
                Learn more <ArrowRight size={14} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Details Modal (Kreo Modal Setup) */}
      {selectedFeature && (
        <div className="modal-overlay" onClick={() => setSelectedFeature(null)}>
          <div
            className="modal-content glass-panel"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '620px', width: '90%', maxHeight: '85vh', overflowY: 'auto' }}
          >
            <button className="modal-close" onClick={() => setSelectedFeature(null)} aria-label="Close">
              <X size={22} />
            </button>

            {/* Modal Header */}
            <div
              className="modal-header flex-center"
              style={{
                justifyContent: 'flex-start',
                gap: '1rem',
                marginBottom: '1.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: '1rem'
              }}
            >
              <div className={`feature-icon-wrapper bg-${selectedFeature.color}`} style={{ width: '44px', height: '44px', margin: 0 }}>
                {React.createElement(iconMap[selectedFeature.id] || Disc, { size: 24 })}
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '22px', color: '#fff', fontFamily: 'Outfit, sans-serif' }}>
                  {selectedFeature.title} Documentation
                </h2>
                <span className={`pill-badge bg-${selectedFeature.color}`} style={{ marginTop: '4px', marginBottom: 0, fontSize: '11px', padding: '2px 10px' }}>
                  {selectedFeature.tag}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              {/* How it works */}
              <div className="modal-section" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#f43f5e', marginBottom: '0.5rem', fontSize: '16px', fontWeight: '700' }}>
                  How it works
                </h3>
                <p style={{ lineHeight: '1.8', color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                  {selectedFeature.details.split(/`([^`]+)`/).map((chunk, idx) =>
                    idx % 2 === 1 ? (
                      <code
                        key={idx}
                        style={{
                          background: 'rgba(255,255,255,0.12)',
                          color: '#e2e8f0',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontFamily: 'monospace',
                          fontSize: '0.9em'
                        }}
                      >
                        {chunk}
                      </code>
                    ) : (
                      chunk
                    )
                  )}
                </p>
              </div>

              {/* Commands */}
              {selectedFeature.commands && selectedFeature.commands.length > 0 && (
                <div className="modal-section" style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ color: '#f43f5e', marginBottom: '0.75rem', fontSize: '16px', fontWeight: '700' }}>
                    Available Commands
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {selectedFeature.commands.map((cmd, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '10px',
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px'
                        }}
                      >
                        <code
                          style={{
                            color: '#06b6d4',
                            fontWeight: '700',
                            fontFamily: 'monospace',
                            fontSize: '13px'
                          }}
                        >
                          {cmd.name}
                        </code>
                        <span style={{ color: '#9ca3af', fontSize: '12px', textAlign: 'right' }}>
                          {cmd.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                onClick={() => setSelectedFeature(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
