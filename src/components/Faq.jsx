import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'How do I add Kreo to my Discord server?',
    a: 'Simply click the "Add to Discord" button at the top of this website. Select your server, grant the necessary voice & text permissions, and Kreo will join instantly. You can then use +help or /help to get started.'
  },
  {
    q: 'Does Kreo support Spotify playlists and SoundCloud?',
    a: 'Yes! Kreo supports direct links from Spotify (tracks, albums, playlists), SoundCloud, and YouTube Music. You can also simply type any song name with +play <song name>.'
  },
  {
    q: 'How does the Stream Auto-Recovery engine work?',
    a: 'If YouTube ever restricts an audio stream or enforces a bot verification check, Kreo automatically catches the exception and queries high-quality fallback audio from alternative lossless platforms in under 400ms without interrupting your queue.'
  },
  {
    q: 'How do I activate 24/7 Mode in my voice channel?',
    a: 'Once your server has an active Server Premium plan, simply join your desired voice channel and type +247. Kreo will lock into the channel and stay connected permanently, even if everyone disconnects.'
  },
  {
    q: 'What is No-Prefix Mode?',
    a: 'No-Prefix is an exclusive VIP feature that allows users to run music commands without typing any prefix like + or /. You can simply type "play song" or "skip" or "pause" directly into the channel chat.'
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section style={{ padding: '60px 0 80px' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="pill-badge glass-panel" style={{
            background: 'rgba(244, 63, 94, 0.1)',
            borderColor: 'rgba(244, 63, 94, 0.3)',
            color: '#f43f5e'
          }}>
            <HelpCircle size={14} style={{ marginRight: '6px' }} /> Got Questions?
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '36px',
            fontWeight: 800,
            color: '#ffffff'
          }}>
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  borderRadius: '18px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: isOpen ? '1px solid rgba(139, 104, 230, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)'
                }}
                onClick={() => toggle(idx)}
              >
                <div style={{
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '17px',
                    fontWeight: 700,
                    color: isOpen ? 'var(--color-primary)' : '#ffffff'
                  }}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={20}
                    color={isOpen ? 'var(--color-primary)' : '#888'}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0
                    }}
                  />
                </div>

                {isOpen && (
                  <div style={{
                    padding: '0 24px 20px 24px',
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                    paddingTop: '14px'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
