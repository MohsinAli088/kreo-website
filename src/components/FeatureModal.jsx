import React from 'react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';

export default function FeatureModal({ feature, onClose }) {
  if (!feature) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
      padding: '20px',
      animation: 'fadeIn 0.25s ease'
    }} onClick={onClose}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '560px',
          borderRadius: '24px',
          padding: '32px',
          position: 'relative',
          border: '1px solid rgba(139, 104, 230, 0.3)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#fff',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span style={{
            background: 'rgba(139, 104, 230, 0.15)',
            color: 'var(--color-primary)',
            padding: '4px 12px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {feature.tag}
          </span>
        </div>

        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '26px',
          fontWeight: 800,
          color: '#ffffff',
          marginBottom: '12px'
        }}>
          {feature.title}
        </h3>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '15px',
          lineHeight: 1.6,
          marginBottom: '20px'
        }}>
          {feature.desc}
        </p>

        {/* Deep Dive Box */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <h4 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '14px',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Sparkles size={16} color="var(--color-primary)" />
            How it works in Kreo:
          </h4>
          <p style={{
            fontSize: '14px',
            color: '#c5c5d2',
            lineHeight: 1.6
          }}>
            {feature.details}
          </p>
        </div>

        {/* Action button */}
        <button
          onClick={onClose}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <CheckCircle2 size={18} /> Got it
        </button>
      </div>
    </div>
  );
}
