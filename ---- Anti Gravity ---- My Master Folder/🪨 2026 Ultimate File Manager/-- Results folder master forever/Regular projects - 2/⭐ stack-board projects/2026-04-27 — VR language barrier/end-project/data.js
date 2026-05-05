// data.js — barrier-types data model (agent A4)

export const BARRIERS = [
  {
    id: 'voice',
    label: 'Voice',
    icon: '🎙️',
    description: 'Spoken-word gaps between players speaking different native languages in VR voice chat.',
    tools: [
      { name: 'Real-time translator', status: 'live', note: 'Mic-to-mic translation pipeline with <300ms latency.' },
      { name: 'Lipread cue', status: 'wip',  note: 'Avatar mouth-shape overlay to support hearing-impaired users.' },
      { name: 'Language packs',     status: 'todo', note: 'Downloadable per-language voice models for offline use.' }
    ]
  },
  {
    id: 'chat',
    label: 'Chat',
    icon: '💬',
    description: 'Typed text exchanges in world chat, DMs, and overlays that need translation + clarification.',
    tools: [
      { name: 'Subtitle overlay', status: 'live', note: 'Floating translated captions anchored to speaker avatar.' },
      { name: 'Glossary',         status: 'wip',  note: 'Hover-defined terms for slang, gaming jargon, regional idioms.' }
    ]
  },
  {
    id: 'gesture',
    label: 'Gesture',
    icon: '🤲',
    description: 'Body language, emotes, and hand-tracked motion that mean different things across cultures.',
    tools: [
      { name: 'Visual cue library', status: 'wip',  note: 'Searchable bank of culturally-tagged gestures + meanings.' },
      { name: 'Emote translator',   status: 'todo', note: 'Auto-flag gestures with conflicting cross-cultural meaning.' }
    ]
  },
  {
    id: 'sign',
    label: 'Sign',
    icon: '🤟',
    description: 'Sign-language users communicating with hearing or non-signing players in VR.',
    tools: [
      { name: 'Glyph board',     status: 'live', note: 'Tap-to-sign panel with the 200 most-used phrases.' },
      { name: 'ASL recognition', status: 'wip',  note: 'Hand-tracking ML model converting ASL to text in real time.' },
      { name: 'Sign packs',      status: 'todo', note: 'Add-on packs for BSL, JSL, and regional sign systems.' }
    ]
  }
];
