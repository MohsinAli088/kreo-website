export const categories = [
  { id: 'all', name: 'All Commands' },
  { id: 'music', name: 'Music (33)' },
  { id: 'config', name: 'Config (4)' },
  { id: 'favourite', name: 'Favourite (6)' },
  { id: 'utility', name: 'Utility (5)' },
  { id: 'information', name: 'Information (5)' },
  { id: 'owner', name: 'Owner (1)' }
];

export const commandsList = [
  // Music
  { name: 'play', category: 'music', desc: 'Stream songs or playlists from YouTube Music, Spotify, SoundCloud, or direct URLs.', usage: '+play <song/url>' },
  { name: 'pause', category: 'music', desc: 'Temporarily pause current audio playback.', usage: '+pause' },
  { name: 'resume', category: 'music', desc: 'Resume paused audio track.', usage: '+resume' },
  { name: 'skip', category: 'music', desc: 'Vote or skip to next enqueued song.', usage: '+skip' },
  { name: 'forceskip', category: 'music', desc: 'Instantly skip the current track without vote threshold.', usage: '+forceskip' },
  { name: 'stop', category: 'music', desc: 'Stop playback, clear queue, and leave voice channel.', usage: '+stop' },
  { name: 'queue', category: 'music', desc: 'Display paginated list of upcoming tracks.', usage: '+queue [page]' },
  { name: 'nowplaying', category: 'music', desc: 'Show rich now-playing card with progress bar & controllers.', usage: '+nowplaying' },
  { name: 'volume', category: 'music', desc: 'Adjust playback volume (0 to 150%).', usage: '+volume <1-150>' },
  { name: 'loop', category: 'music', desc: 'Toggle repeat mode: Track, Queue, or Off.', usage: '+loop [track/queue/off]' },
  { name: 'filter', category: 'music', desc: 'Apply 14+ audio DSP filters: 8D, Bassboost, Nightcore, Vaporwave, Pop, Soft, etc.', usage: '+filter <mode>' },
  { name: 'autoplay', category: 'music', desc: 'Automatically load similar recommendations when queue ends.', usage: '+autoplay' },
  { name: 'forcefix', category: 'music', desc: 'Instantly reconnect and repair audio pipeline if voice connection freezes.', usage: '+forcefix' },
  { name: 'search', category: 'music', desc: 'Search top 10 songs with an interactive selection dropdown.', usage: '+search <query>' },
  { name: 'seek', category: 'music', desc: 'Fast-forward or jump to a timestamp in current track.', usage: '+seek <seconds/time>' },
  { name: 'speed', category: 'music', desc: 'Change audio playback speed (0.5x to 2.0x).', usage: '+speed <value>' },
  { name: 'shuffle', category: 'music', desc: 'Randomize order of songs in current queue.', usage: '+shuffle' },
  { name: 'replay', category: 'music', desc: 'Restart the current track from beginning.', usage: '+replay' },
  { name: 'previous', category: 'music', desc: 'Replay the previously played track from history.', usage: '+previous' },
  { name: 'rewind', category: 'music', desc: 'Rewind playback by a specified number of seconds.', usage: '+rewind <seconds>' },
  { name: 'forward', category: 'music', desc: 'Fast-forward playback by specified seconds.', usage: '+forward <seconds>' },
  { name: 'grab', category: 'music', desc: 'Save current playing song directly to your Discord DMs.', usage: '+grab' },
  { name: 'lyrics', category: 'music', desc: 'Fetch synced or plain lyrics for currently playing song.', usage: '+lyrics [song]' },
  { name: 'clear', category: 'music', desc: 'Clear all upcoming tracks from queue.', usage: '+clear' },
  { name: 'remove', category: 'music', desc: 'Remove a specific track index from the queue.', usage: '+remove <position>' },
  { name: 'skipto', category: 'music', desc: 'Jump forward to a specific track index in queue.', usage: '+skipto <position>' },
  { name: 'move', category: 'music', desc: 'Move a track from one position in queue to another.', usage: '+move <from> <to>' },
  { name: 'history', category: 'music', desc: 'View past 25 songs played in this voice session.', usage: '+history' },
  { name: 'join', category: 'music', desc: 'Summon bot into your current voice channel.', usage: '+join' },
  { name: 'leave', category: 'music', desc: 'Disconnect bot from voice channel.', usage: '+leave' },
  { name: 'sleep', category: 'music', desc: 'Set a sleep timer to stop playback automatically after X minutes.', usage: '+sleep <minutes>' },
  { name: 'similar', category: 'music', desc: 'Find and queue similar songs based on current track.', usage: '+similar' },
  { name: 'leavecleanup', category: 'music', desc: 'Auto-delete bot messages when bot leaves voice channel.', usage: '+leavecleanup' },

  // Config
  { name: '247', category: 'config', desc: 'Toggle 24/7 Voice Channel Stay mode (Server Premium).', usage: '+247' },
  { name: 'setprefix', category: 'config', desc: 'Change the bot command prefix for this server.', usage: '+setprefix <prefix>' },
  { name: 'source', category: 'config', desc: 'Change server default music engine (YouTube Music, Spotify, SoundCloud).', usage: '+source' },
  { name: 'ignore', category: 'config', desc: 'Ignore or unignore bot commands in specific text channels.', usage: '+ignore <channel>' },

  // Favourite
  { name: 'like', category: 'favourite', desc: 'Add current song to your personal liked songs library.', usage: '+like' },
  { name: 'playliked', category: 'favourite', desc: 'Queue all your personal liked songs in current voice channel.', usage: '+playliked' },
  { name: 'playlist', category: 'favourite', desc: 'Manage your custom playlists (create, list, add, remove).', usage: '+playlist <subcommand>' },

  // Utility & Information
  { name: 'help', category: 'information', desc: 'Show interactive aesthetic help menu with categories.', usage: '+help [command]' },
  { name: 'ping', category: 'utility', desc: 'Check bot gateway latency and Lavalink audio ping.', usage: '+ping' },
  { name: 'stats', category: 'information', desc: 'View bot system hardware, uptime, memory, and cluster stats.', usage: '+stats' },
  { name: 'invite', category: 'utility', desc: 'Get official OAuth2 invite link to add Kreo to your server.', usage: '+invite' },
  { name: 'support', category: 'utility', desc: 'Join Kreo Official 24/7 Discord Support Server.', usage: '+support' },
  { name: 'premium', category: 'utility', desc: 'View premium perks or redeem a premium license code.', usage: '+premium [code]' },
  { name: 'noprefix', category: 'utility', desc: 'Check or activate No-Prefix privilege mode.', usage: '+noprefix' }
];
