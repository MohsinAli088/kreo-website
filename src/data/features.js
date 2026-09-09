export const featuresList = [
  {
    id: 'lossless-audio',
    title: 'Studio Lossless Audio',
    tag: 'Hi-Fi Audio',
    color: 'violet',
    desc: 'Powered by Lavalink v4 cluster delivering pristine 320kbps and 24-bit audio decoding with zero distortion.',
    details: 'Kreo connects directly to dedicated high-performance Lavalink nodes running in multi-region failover. Your voice channel gets direct uncompressed PCM stream with custom volume leveling and crystal-clear acoustic fidelity.',
    commands: [
      { name: '+play <query/url>', desc: 'Stream any track from Spotify, Soundcloud, YouTube, Apple Music' },
      { name: '+volume <1-150>', desc: 'Adjust playback output volume with soft-clipping protection' },
      { name: '+nowplaying', desc: 'Display rich track metadata, album artwork, and audio progress' },
      { name: '+lyrics', desc: 'Fetch synced realtime track lyrics directly in channel' }
    ]
  },
  {
    id: 'auto-recovery',
    title: 'Stream Auto-Recovery',
    tag: 'Zero Downtime',
    color: 'green',
    desc: 'Intelligent anti-bot recovery engine that automatically falls back to alternative sources if YouTube restricts a stream.',
    details: 'If YouTube returns rate limits or bot checks (403), Kreo instantly detects the exception, seamlessly queries SoundCloud, Spotify, or YouTube Music in under 400ms, and continues playback without interrupting your listening session.',
    commands: [
      { name: '+seek <timestamp>', desc: 'Jump forward or backward to an exact track position' },
      { name: '+replay', desc: 'Instantly restart the currently playing track from the beginning' },
      { name: '+forward <sec>', desc: 'Fast-forward track position by specified seconds' },
      { name: '+rewind <sec>', desc: 'Rewind track position by specified seconds' }
    ]
  },
  {
    id: 'mode-247',
    title: '24/7 Non-Stop Mode',
    tag: 'Server Premium',
    color: 'purple',
    desc: 'Keep the bot connected to your favorite voice channel 24 hours a day, 7 days a week, even when everyone leaves.',
    details: 'Enable persistent 24/7 presence using `+247`. The bot automatically reconnects upon voice server restarts or channel movements, making it ideal for 24/7 lofi chill rooms, gaming lounges, and radio stages.',
    commands: [
      { name: '+247', desc: 'Toggle persistent 24/7 voice channel stay on or off' },
      { name: '+radio <station>', desc: 'Tune into 24/7 live Internet radio streams and Lo-Fi stages' },
      { name: '+reconnect', desc: 'Force refresh and reconnect the voice gateway connection' }
    ]
  },
  {
    id: 'dsp-filters',
    title: '14+ Audio DSP Filters',
    tag: 'Sound Effects',
    color: 'cyan',
    desc: 'Transform your audio on the fly with 8D surround, Bassboost, Nightcore, Vaporwave, Tremolo, and Pop.',
    details: 'Real-time digital signal processing (DSP) filters allow you to experience music in 8D rotation, boosted sub-bass, slowed down vaporwave, or hyper-speed nightcore with single commands like `+filter 8d` or `+filter bassboost`.',
    commands: [
      { name: '+filter bassboost <level>', desc: 'Pump up the low-end frequencies with customized punch' },
      { name: '+filter 8d', desc: 'Experience 360-degree rotating binaural audio' },
      { name: '+filter nightcore', desc: 'Boost tempo and pitch for upbeat energetic tracks' },
      { name: '+filter vaporwave', desc: 'Slow down speed and pitch for chilled aesthetic vibes' },
      { name: '+filter reset', desc: 'Clear all active equalizers and DSP audio filters' }
    ]
  },
  {
    id: 'smart-autoplay',
    title: 'Smart Autoplay Engine',
    tag: 'Infinite Flow',
    color: 'blue',
    desc: 'Never run out of music. Automatically analyzes past queue history to fetch and stream similar recommendations.',
    details: 'When your queue finishes, Kreo uses YouTube Mix and Spotify acoustic algorithms to find matching artists, genres, and vibes, adding them to the queue automatically so the party never stops.',
    commands: [
      { name: '+autoplay', desc: 'Toggle smart queue auto-recommendation mode' },
      { name: '+queue', desc: 'View up to 100 upcoming queued tracks with pagination' },
      { name: '+shuffle', desc: 'Randomize the upcoming queue sequence without resetting' },
      { name: '+clear', desc: 'Clear the entire upcoming song queue immediately' }
    ]
  },
  {
    id: 'no-prefix',
    title: 'No-Prefix Mode',
    tag: 'Exclusive UX',
    color: 'red',
    desc: 'Premium users can execute music commands directly without having to type any prefix or symbol.',
    details: 'Type `play faded` or `skip` or `pause` directly into the chat! No-Prefix eliminates the need for `+` or `/` symbols for authorized users and premium server owners.',
    commands: [
      { name: 'play <song/link>', desc: 'Directly search and stream without typing any prefix' },
      { name: 'skip', desc: 'Vote or instantly skip to the next track in queue' },
      { name: 'pause / resume', desc: 'Toggle pause state immediately without prefix' },
      { name: 'volume <number>', desc: 'Set volume directly without prefix' }
    ]
  }
];
