import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Zap,
  Volume2,
  Sliders,
  Music,
  Headphones,
  Radio,
  Heart,
  Server,
  Terminal,
  Shield,
  Clock,
  Key,
  Flame,
  CheckCircle2
} from 'lucide-react';

// Animated digit column for smooth rolling slot-machine price animation
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
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="digit">
            {n}
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

export default function PremiumPage() {
  const supportUrl = 'https://discord.gg/9wRBcsfK9Z';

  // State for selected duration
  const [userDuration, setUserDuration] = useState('1');
  const [serverDuration, setServerDuration] = useState('1');

  const [toast, setToast] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Discount calculation
  const calcPrice = (baseMonthly, duration) => {
    const months = parseInt(duration, 10);
    let discount = 0;
    if (months === 3) discount = 0.1;
    else if (months === 6) discount = 0.2;
    else if (months === 12) discount = 0.3;
    const total = baseMonthly * months;
    return Math.round(total - total * discount);
  };

  const getDurationLabel = (duration) => {
    if (duration === '1') return '1 Month';
    if (duration === '12') return '1 Year';
    return `${duration} Months`;
  };

  const handleBuy = (planName, price, duration) => {
    window.open(supportUrl, '_blank');
    setToast({
      type: 'success',
      message: `Opening support for ${planName} (${getDurationLabel(duration)}) at ₹${price}. Staff will assist you!`
    });
    setTimeout(() => setToast(null), 5000);
  };

  const userPrice = calcPrice(29, userDuration);
  const serverPrice = calcPrice(69, serverDuration);

  return (
    <div className="home-page" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background Gradient Mesh */}
      <div className="bg-gradient-mesh" />

      {/* Floating Navbar with Premium active */}
      <Navbar activeSection="premium" />

      {/* Toast notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 9999,
            padding: '16px 24px',
            borderRadius: '14px',
            maxWidth: '380px',
            background: toast.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            border: `1px solid ${toast.type === 'success' ? 'rgba(16,185,129,0.5)' : 'rgba(239,68,68,0.5)'}`,
            color: toast.type === 'success' ? '#6ee7b7' : '#fca5a5',
            fontSize: '14px',
            fontWeight: '600',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            animation: 'fadeInDown 0.3s ease'
          }}
        >
          {toast.message}
        </div>
      )}

      {/* Main Premium Page Content */}
      <main className="premium-page animate-fade-in" style={{ animationDelay: '0.2s', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="premium-header container" style={{ marginBottom: '64px' }}>
          <div className="pill-badge glass-panel flex-center" style={{ margin: '0 auto 16px', borderColor: 'rgba(139, 104, 230, 0.4)' }}>
            <span className="pulse-dot" /> Special Launch Discount
          </div>
          <h1 className="premium-header-title">Kreo Premium</h1>
          <p className="premium-header-subtitle">
            Experience studio lossless audio, 24/7 permanent stay, global no-prefix, and audio DSP customization with pocket-friendly plans.
          </p>
        </div>

        {/* 2 Focused Plans Grid (User Premium & Server Premium) */}
        <div className="pricing-grid" style={{ maxWidth: '900px', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginTop: '20px' }}>
          {/* Card 1: User Premium */}
          <div
            className="pricing-card"
            style={{
              '--hover-color': '#06b6d4',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.12)'
            }}
          >
            <div className="pricing-card-glow" style={{ background: 'var(--hover-color)' }} />
            
            <div className="pricing-card-header">
              <div>
                <h2 className="pricing-title" style={{ fontSize: '26px' }}>User Premium</h2>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Personal Account VIP</span>
              </div>
              <span className="pricing-badge cyan">Personal</span>
            </div>

            <div className="pricing-price cyan">
              <span>₹</span>
              <AnimatedNumber value={userPrice} duration={2000} />
            </div>

            <div className="pricing-duration">
              {getDurationLabel(userDuration)}
            </div>

            <div className="pricing-features-card">
              <div className="pricing-features">
                <div className="pricing-feature">
                  <Terminal size={18} style={{ color: '#06b6d4' }} /> Global No-Prefix on All Servers
                </div>
                <div className="pricing-feature">
                  <Zap size={18} style={{ color: '#06b6d4' }} /> 24/7 Voice Channel Stay
                </div>
                <div className="pricing-feature">
                  <Sliders size={18} style={{ color: '#06b6d4' }} /> 14+ Audio DSP Filters (8D, Bassboost)
                </div>
                <div className="pricing-feature">
                  <Volume2 size={18} style={{ color: '#06b6d4' }} /> 150% Extended Volume
                </div>
                <div className="pricing-feature">
                  <Flame size={18} style={{ color: '#06b6d4' }} /> Speed & Pitch Control (0.5x - 2.0x)
                </div>
                <div className="pricing-feature">
                  <Heart size={18} style={{ color: '#06b6d4' }} /> Unlimited Liked Songs & Playlists
                </div>
                <div className="pricing-feature">
                  <Clock size={18} style={{ color: '#06b6d4' }} /> Smart Autoplay & Sleep Timer
                </div>
                <div className="pricing-feature">
                  <Headphones size={18} style={{ color: '#06b6d4' }} /> 24/7 Priority Support
                </div>
              </div>
            </div>

            <select
              className="pricing-select"
              value={userDuration}
              onChange={(e) => setUserDuration(e.target.value)}
            >
              <option value="1">1 Month - ₹29</option>
              <option value="3">3 Months (10% Off) - ₹78</option>
              <option value="6">6 Months (20% Off) - ₹139</option>
              <option value="12">1 Year (30% Off) - ₹244</option>
            </select>

            <button
              className="pricing-btn cyan"
              onClick={() => handleBuy('User Premium', userPrice, userDuration)}
            >
              Buy via Support at ₹
              <AnimatedNumber value={userPrice} duration={2000} />
            </button>
          </div>

          {/* Card 2: Server Premium */}
          <div
            className="pricing-card"
            style={{
              '--hover-color': '#8B68E6',
              border: '1px solid rgba(139, 104, 230, 0.4)',
              boxShadow: '0 0 35px rgba(139, 104, 230, 0.15)'
            }}
          >
            <div className="pricing-card-glow" style={{ background: 'var(--hover-color)' }} />
            
            <div className="pricing-card-header">
              <div>
                <h2 className="pricing-title" style={{ fontSize: '26px' }}>Server Premium</h2>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Entire Discord Community</span>
              </div>
              <span className="pricing-badge best-value">Most Popular</span>
            </div>

            <div className="pricing-price purple">
              <span>₹</span>
              <AnimatedNumber value={serverPrice} duration={2000} />
            </div>

            <div className="pricing-duration">
              {getDurationLabel(serverDuration)}
            </div>

            <div className="pricing-features-card">
              <div className="pricing-features">
                <div className="pricing-feature">
                  <Terminal size={18} style={{ color: '#8B68E6' }} /> Server-Wide No-Prefix for All Members
                </div>
                <div className="pricing-feature">
                  <Radio size={18} style={{ color: '#8B68E6' }} /> 24/7 Permanent Voice / Stage Stay
                </div>
                <div className="pricing-feature">
                  <Sliders size={18} style={{ color: '#8B68E6' }} /> All Members Get 14+ Audio Filters
                </div>
                <div className="pricing-feature">
                  <Volume2 size={18} style={{ color: '#8B68E6' }} /> 150% Boosted Loudness for Channel
                </div>
                <div className="pricing-feature">
                  <Music size={18} style={{ color: '#8B68E6' }} /> Server Smart Autoplay & Infinite Queue
                </div>
                <div className="pricing-feature">
                  <Server size={18} style={{ color: '#8B68E6' }} /> Dedicated High-Speed Lavalink Node
                </div>
                <div className="pricing-feature">
                  <Shield size={18} style={{ color: '#8B68E6' }} /> DJ Role & Controller Overrides
                </div>
                <div className="pricing-feature">
                  <Headphones size={18} style={{ color: '#8B68E6' }} /> 24/7 VIP Staff & Developer Support
                </div>
              </div>
            </div>

            <select
              className="pricing-select"
              value={serverDuration}
              onChange={(e) => setServerDuration(e.target.value)}
            >
              <option value="1">1 Month - ₹69</option>
              <option value="3">3 Months (10% Off) - ₹186</option>
              <option value="6">6 Months (20% Off) - ₹331</option>
              <option value="12">1 Year (30% Off) - ₹579</option>
            </select>

            <button
              className="pricing-btn purple"
              onClick={() => handleBuy('Server Premium', serverPrice, serverDuration)}
            >
              Buy via Support at ₹
              <AnimatedNumber value={serverPrice} duration={2000} />
            </button>
          </div>
        </div>

        {/* How to Redeem Step-by-Step Guide */}
        <div
          className="container glass-panel"
          style={{
            maxWidth: '900px',
            marginTop: '60px',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div className="feature-icon-wrapper bg-violet" style={{ width: '40px', height: '40px', margin: 0 }}>
              <Key size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '20px', color: '#fff', margin: 0, fontFamily: 'Outfit, sans-serif' }}>
                How to Redeem Your Premium Code
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                Instant activation directly in Discord after purchase
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              marginTop: '24px'
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '18px',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <CheckCircle2 size={18} color="#06b6d4" />
                <span style={{ fontWeight: 700, color: '#fff', fontSize: '14px' }}>Step 1: Purchase</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Click "Buy via Support" to open a ticket in our official Discord server. Pay via UPI, QR, or Card.
              </p>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '18px',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <CheckCircle2 size={18} color="#8B68E6" />
                <span style={{ fontWeight: 700, color: '#fff', fontSize: '14px' }}>Step 2: Get Code</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Staff generates your voucher code: <br />
                <code style={{ color: '#c084fc', fontSize: '12px' }}>KREO-USER-XXXX</code> or <code style={{ color: '#c084fc', fontSize: '12px' }}>KREO-GUILD-XXXX</code>.
              </p>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '18px',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span style={{ fontWeight: 700, color: '#fff', fontSize: '14px' }}>Step 3: Activate</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Type in Discord chat: <br />
                <code style={{ color: '#10b981', fontSize: '12px' }}>+premium redeem &lt;code&gt;</code> <br />
                Your perks go live immediately!
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
