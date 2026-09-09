export const pricingPlans = [
  {
    name: 'User Premium',
    tier: 'user',
    badge: 'Personal VIP',
    price: '₹29',
    period: '/ month',
    desc: 'Take your VIP music perks and Global No-Prefix with you across every Discord server Kreo is in.',
    features: [
      'Global No-Prefix Mode on all servers',
      '24/7 Voice Channel Stay mode',
      '14+ Audio DSP filters (8D, Bassboost, Nightcore)',
      'Extended playback volume up to 150%',
      'Custom playback speed & pitch control (0.5x - 2.0x)',
      'Unlimited saved playlists & liked songs',
      'Smart Autoplay & Sleep Timer auto-disconnect',
      '24/7 Priority Discord Support'
    ],
    popular: false,
    cta: 'Buy User Premium',
    href: 'https://discord.gg/9wRBcsfK9Z'
  },
  {
    name: 'Server Premium',
    tier: 'guild',
    badge: 'Most Popular',
    price: '₹69',
    period: '/ month',
    desc: 'Unlock total 24/7 power, audio filters, server-wide no-prefix, and automated queue playback for your entire community.',
    features: [
      'Server-Wide No-Prefix for all server members',
      '24/7 Permanent Voice / Stage Channel Stay',
      'All members in voice channel get 14+ Audio Filters',
      'Channel volume boost up to 150%',
      'Server Smart Autoplay & infinite queue engine',
      'Dedicated high-speed Lavalink audio node cluster',
      'DJ Role & controller permission overrides',
      '24/7 VIP Developer & Staff Support'
    ],
    popular: true,
    cta: 'Buy Server Premium',
    href: 'https://discord.gg/9wRBcsfK9Z'
  }
];
