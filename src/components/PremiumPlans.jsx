import React, { useState, useEffect } from 'react';
import {
  Zap,
  Volume2,
  Sliders,
  Music,
  Headphones,
  Sparkles,
  Radio,
  Palette,
  Heart,
  Shield,
  Crown,
  Bot,
  Server,
  ShieldCheck,
  Flame,
  Terminal,
  ExternalLink
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

export default function PremiumPlans() {
  const supportUrl = "https://discord.gg/9wRBcsfK9Z";

  const [basicMonths, setBasicMonths] = useState(1);
  const [proMonths, setProMonths] = useState(1);
  const [premMonths, setPremMonths] = useState(1);
  const [addonMonths, setAddonMonths] = useState(1);

  const [toast, setToast] = useState(null);

  // Discount formula for Kreo plans
  const calcDiscount = (basePrice, months) => {
    let discount = 0;
    if (months === 3) discount = 0.1;
    else if (months === 6) discount = 0.2;
    else if (months === 12) discount = 0.3;
    const total = basePrice * months;
    return Math.round(total - total * discount);
  };

  const handleBuy = (planName, price) => {
    window.open(supportUrl, '_blank');
    setToast({
      type: 'success',
      message: `Opening support for ${planName} at ₹${price}. Our staff will assist you!`
    });
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <section id="premium" className="premium-page animate-fade-in" style={{ animationDelay: '0.2s', scrollMarginTop: '80px' }}>
      {/* Toast popup */}
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

      {/* Header */}
      <div className="premium-header container">
        <h1 className="premium-header-title">Kreo Premium</h1>
        <p className="premium-header-subtitle">
          Unlock advanced lossless audio, 24/7 voice presence, audio DSP customization, and VIP performance to the next level.
        </p>
      </div>

      {/* 4 Cards Pricing Grid (Kreo CSS & Animation) */}
      <div className="pricing-grid">
        {/* Card 1: Basic Plan */}
        <div
          className="pricing-card"
          style={{
            '--hover-color': '#06b6d4',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            boxShadow: '0 0 30px rgba(6, 182, 212, 0.1)'
          }}
        >
          <div className="pricing-card-glow" style={{ background: 'var(--hover-color)' }} />
          <div className="pricing-card-header">
            <h2 className="pricing-title">Basic Plan</h2>
            <span className="pricing-badge cyan">Popular</span>
          </div>

          <div className="pricing-price cyan">
            <span>₹</span>
            <AnimatedNumber value={calcDiscount(199, basicMonths)} duration={2000} />
          </div>

          <div className="pricing-duration">
            {basicMonths === 1 ? '1 Month' : basicMonths === 12 ? '1 Year' : `${basicMonths} Months`}
          </div>

          <div className="pricing-features-card">
            <div className="pricing-features">
              <div className="pricing-feature">
                <Zap size={18} /> 24/7 Voice Channel Stay
              </div>
              <div className="pricing-feature">
                <Volume2 size={18} /> Lossless 320kbps Audio
              </div>
              <div className="pricing-feature">
                <Sliders size={18} /> BassBoost & 14+ Audio Filters
              </div>
              <div className="pricing-feature">
                <Music size={18} /> Unlimited Queue & History
              </div>
              <div className="pricing-feature">
                <Headphones size={18} /> 24/7 Support
              </div>
            </div>
          </div>

          <select
            className="pricing-select"
            value={basicMonths}
            onChange={(e) => setBasicMonths(parseInt(e.target.value, 10))}
          >
            <option value="1">1 Month</option>
            <option value="3">3 Months (10% Off)</option>
            <option value="6">6 Months (20% Off)</option>
            <option value="12">1 Year (30% Off)</option>
          </select>

          <button
            className="pricing-btn cyan"
            onClick={() => handleBuy('Basic Plan', calcDiscount(199, basicMonths))}
          >
            Buy via Support at ₹
            <AnimatedNumber value={calcDiscount(199, basicMonths)} duration={2000} />
          </button>
        </div>

        {/* Card 2: Pro Plan */}
        <div
          className="pricing-card"
          style={{
            '--hover-color': '#c084fc',
            border: '1px solid rgba(192, 132, 252, 0.4)',
            boxShadow: '0 0 30px rgba(192, 132, 252, 0.1)'
          }}
        >
          <div className="pricing-card-glow" style={{ background: 'var(--hover-color)' }} />
          <div className="pricing-card-header">
            <h2 className="pricing-title">Pro Plan</h2>
            <span className="pricing-badge best-value">Best Value</span>
          </div>

          <div className="pricing-price purple">
            <span>₹</span>
            <AnimatedNumber value={calcDiscount(399, proMonths)} duration={2000} />
          </div>

          <div className="pricing-duration">
            {proMonths === 1 ? '1 Month' : proMonths === 12 ? '1 Year' : `${proMonths} Months`}
          </div>

          <div className="pricing-features-card">
            <div className="pricing-features">
              <div className="pricing-feature">
                <Sparkles size={18} /> Everything in Basic Plan
              </div>
              <div className="pricing-feature">
                <Radio size={18} /> Smart Autoplay Recommendations
              </div>
              <div className="pricing-feature">
                <Palette size={18} /> Custom Embed Colors & Themes
              </div>
              <div className="pricing-feature">
                <Heart size={18} /> Unlimited Saved Playlists
              </div>
              <div className="pricing-feature">
                <Shield size={18} /> DJ Role Multi-Server Override
              </div>
              <div className="pricing-feature">
                <Zap size={18} /> Global No Prefix Included
              </div>
              <div className="pricing-feature">
                <Server size={18} /> Dedicated Audio Cluster Node
              </div>
              <div className="pricing-feature">
                <Headphones size={18} /> 24/7 VIP Priority Support
              </div>
            </div>
          </div>

          <select
            className="pricing-select"
            value={proMonths}
            onChange={(e) => setProMonths(parseInt(e.target.value, 10))}
          >
            <option value="1">1 Month</option>
            <option value="3">3 Months (10% Off)</option>
            <option value="6">6 Months (20% Off)</option>
            <option value="12">1 Year (30% Off)</option>
          </select>

          <button
            className="pricing-btn purple"
            onClick={() => handleBuy('Pro Plan', calcDiscount(399, proMonths))}
          >
            Buy via Support at ₹
            <AnimatedNumber value={calcDiscount(399, proMonths)} duration={2000} />
          </button>
        </div>

        {/* Card 3: Premium Plan */}
        <div
          className="pricing-card"
          style={{
            '--hover-color': '#f59e0b',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            boxShadow: '0 0 30px rgba(245, 158, 11, 0.1)'
          }}
        >
          <div className="pricing-card-glow" style={{ background: 'var(--hover-color)' }} />
          <div className="pricing-card-header">
            <h2 className="pricing-title">Premium Plan</h2>
            <span className="pricing-badge gold">Premium</span>
          </div>

          <div className="pricing-price gold">
            <span>₹</span>
            <AnimatedNumber value={calcDiscount(599, premMonths)} duration={2000} />
          </div>

          <div className="pricing-duration">
            {premMonths === 1 ? '1 Month' : premMonths === 12 ? '1 Year' : `${premMonths} Months`}
          </div>

          <div className="pricing-features-card">
            <div className="pricing-features">
              <div className="pricing-feature">
                <Crown size={18} /> Everything in Pro Plan
              </div>
              <div className="pricing-feature">
                <Bot size={18} /> Custom Bot Profile (Avatar & Bio)
              </div>
              <div className="pricing-feature">
                <Server size={18} /> Dedicated 24/7 Hosting Node
              </div>
              <div className="pricing-feature">
                <ShieldCheck size={18} /> Multi-Guild (Up to 5 Servers)
              </div>
              <div className="pricing-feature">
                <Flame size={18} /> Zero-Latency Realtime Audio DSP
              </div>
              <div className="pricing-feature">
                <Zap size={18} /> Early Access to New Features
              </div>
              <div className="pricing-feature">
                <Headphones size={18} /> 24/7 Direct Developer Support
              </div>
            </div>
          </div>

          <select
            className="pricing-select"
            value={premMonths}
            onChange={(e) => setPremMonths(parseInt(e.target.value, 10))}
          >
            <option value="1">1 Month</option>
            <option value="3">3 Months (10% Off)</option>
            <option value="6">6 Months (20% Off)</option>
            <option value="12">1 Year (30% Off)</option>
          </select>

          <button
            className="pricing-btn gold"
            onClick={() => handleBuy('Premium Plan', calcDiscount(599, premMonths))}
          >
            Buy via Support at ₹
            <AnimatedNumber value={calcDiscount(599, premMonths)} duration={2000} />
          </button>
        </div>

        {/* Card 4: No Prefix Addon */}
        <div
          className="pricing-card"
          style={{
            '--hover-color': '#ec4899',
            border: '1px solid rgba(236, 72, 153, 0.4)',
            boxShadow: '0 0 30px rgba(236, 72, 153, 0.1)',
            height: 'fit-content'
          }}
        >
          <div className="pricing-card-glow" style={{ background: 'var(--hover-color)' }} />
          <div className="pricing-card-header">
            <h2 className="pricing-title" style={{ fontSize: '22px' }}>No Prefix</h2>
            <span className="pricing-badge pink">Addon</span>
          </div>

          <div className="pricing-price pink">
            <span>₹</span>
            <AnimatedNumber value={calcDiscount(49, addonMonths)} duration={2000} />
          </div>

          <div className="pricing-duration">
            {addonMonths === 1 ? '1 Month' : addonMonths === 12 ? '1 Year' : `${addonMonths} Months`}
          </div>

          <div className="pricing-features-card" style={{ marginBottom: 'auto' }}>
            <div className="pricing-features">
              <div className="pricing-feature">
                <Terminal size={18} /> Global No Prefix Commands
              </div>
              <div className="pricing-feature">
                <Zap size={18} /> Instant Execution Without Prefix
              </div>
            </div>
          </div>

          <select
            className="pricing-select"
            value={addonMonths}
            onChange={(e) => setAddonMonths(parseInt(e.target.value, 10))}
          >
            <option value="1">1 Month</option>
            <option value="3">3 Months (10% Off)</option>
            <option value="6">6 Months (20% Off)</option>
            <option value="12">1 Year (30% Off)</option>
          </select>

          <button
            className="pricing-btn"
            style={{ background: '#ec4899', color: '#fff', border: 'none' }}
            onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(236, 72, 153, 0.4)')}
            onMouseOut={(e) => (e.currentTarget.style.boxShadow = 'none')}
            onClick={() => handleBuy('No Prefix Addon', calcDiscount(49, addonMonths))}
          >
            Buy via Support at ₹
            <AnimatedNumber value={calcDiscount(49, addonMonths)} duration={2000} />
          </button>
        </div>
      </div>
    </section>
  );
}
