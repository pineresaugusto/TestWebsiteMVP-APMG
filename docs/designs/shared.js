/* Nuvela App — Shared State & Helpers */

const DEMO_SEEDS = {
  newUser: {
    user: { firstName: "Sarah", lastName: "Mitchell", email: "sarah.mitchell@email.com" },
    plan: { name: "Accelerate", price: 299, tagline: "Steady, sustained progress" },
    messages: [
      {
        id: "m1",
        sender: "Dr. Sarah Chen, NP",
        role: "Care Provider",
        unread: true,
        timestamp: daysAgo(0),
        preview: "Welcome to Nuvela! I am Dr. Chen and I will be...",
        messages: [
          { from: "provider", text: "Welcome to Nuvela! I am Dr. Chen and I will be your care provider throughout your journey. I have reviewed your intake assessment and everything looks great. Your medication will ship within 2-3 business days.", time: daysAgo(0) },
          { from: "provider", text: "In the meantime, please do not hesitate to reach out if you have any questions about your treatment plan or what to expect with your first injection.", time: daysAgo(0) }
        ]
      }
    ],
    orders: [],
    weightLogs: [],
    nextInjection: { date: daysFromNow(7), dose: "0.25mg", week: 1 },
    nextRefill: daysFromNow(28)
  },
  week4: {
    user: { firstName: "Sarah", lastName: "Mitchell", email: "sarah.mitchell@email.com" },
    plan: { name: "Accelerate", price: 299, tagline: "Steady, sustained progress" },
    messages: [
      {
        id: "m1",
        sender: "Dr. Sarah Chen, NP",
        role: "Care Provider",
        unread: false,
        timestamp: daysAgo(25),
        preview: "Welcome to Nuvela! I am Dr. Chen and I will be...",
        messages: [
          { from: "provider", text: "Welcome to Nuvela! I am Dr. Chen and I will be your care provider throughout your journey. I have reviewed your intake assessment and everything looks great.", time: daysAgo(25) },
          { from: "user", text: "Thank you Dr. Chen! I am excited to get started. Quick question - should I take the injection in the morning or evening?", time: daysAgo(25) },
          { from: "provider", text: "Great question! Most patients find it easiest to take it in the morning, but either time works. The key is consistency - pick a time and stick with it each week. You will also want to rotate injection sites.", time: daysAgo(24) },
          { from: "user", text: "Perfect, mornings it is. Thanks!", time: daysAgo(24) }
        ]
      },
      {
        id: "m2",
        sender: "Nuvela Care Team",
        role: "Support",
        unread: false,
        timestamp: daysAgo(14),
        preview: "Your 2-week check-in is here!",
        messages: [
          { from: "provider", text: "Hi Sarah! It has been two weeks since you started treatment. How are you feeling? Any side effects like nausea or changes in appetite? This is completely normal as your body adjusts.", time: daysAgo(14) },
          { from: "user", text: "Hi! Some mild nausea the first few days but it is mostly gone now. I have definitely noticed I am less hungry between meals.", time: daysAgo(13) },
          { from: "provider", text: "That is very typical and a great sign that the medication is working. The appetite changes are exactly what we want to see. Keep logging your weight and reach out anytime!", time: daysAgo(13) }
        ]
      },
      {
        id: "m3",
        sender: "Dr. Sarah Chen, NP",
        role: "Care Provider",
        unread: true,
        timestamp: daysAgo(1),
        preview: "Time to discuss your dose adjustment...",
        messages: [
          { from: "provider", text: "Hi Sarah, you are coming up on week 4 which means it is time to discuss a dose adjustment. Based on your progress, I would like to increase your dose from 0.25mg to 0.5mg starting next week. This is a standard step-up in the protocol.", time: daysAgo(1) },
          { from: "provider", text: "You may experience some of the initial side effects again briefly as your body adjusts to the higher dose. Please let me know if you have any concerns!", time: daysAgo(1) }
        ]
      }
    ],
    orders: [
      { id: "NV-1001", date: daysAgo(26), medication: "Semaglutide", dose: "0.25mg", status: "Delivered", delivery: daysAgo(23), tracking: "DEMO-TRK-001" },
      { id: "NV-1002", date: daysAgo(5), medication: "Semaglutide", dose: "0.5mg", status: "Shipped", delivery: daysFromNow(2), tracking: "DEMO-TRK-002" }
    ],
    weightLogs: [
      { date: daysAgo(26), weight: 187.4 },
      { date: daysAgo(19), weight: 185.8 },
      { date: daysAgo(12), weight: 184.1 },
      { date: daysAgo(5), weight: 182.2 }
    ],
    nextInjection: { date: daysFromNow(3), dose: "0.5mg", week: 5 },
    nextRefill: daysFromNow(23),
    goalWeight: 165
  }
};

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatDateLong(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function formatRelative(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return mins <= 1 ? 'Just now' : `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return formatDate(iso);
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function daysUntil(iso) {
  const diff = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86400000));
}

// State
function getState() {
  const stored = localStorage.getItem('nuvela_demo_state');
  if (stored) return JSON.parse(stored);
  return null;
}

function setState(state) {
  localStorage.setItem('nuvela_demo_state', JSON.stringify(state));
}

function seedState(seedName) {
  const seed = DEMO_SEEDS[seedName];
  if (seed) {
    // Re-generate dates relative to now
    const fresh = JSON.parse(JSON.stringify(DEMO_SEEDS[seedName]));
    setState(fresh);
    return fresh;
  }
  return null;
}

function getOrSeedState(defaultSeed) {
  let state = getState();
  if (!state) {
    state = seedState(defaultSeed || 'week4');
  }
  return state;
}

function getCurrentSeed() {
  return localStorage.getItem('nuvela_demo_seed') || 'week4';
}

function setCurrentSeed(seedName) {
  localStorage.setItem('nuvela_demo_seed', seedName);
  seedState(seedName);
}

function getUnreadCount(state) {
  if (!state || !state.messages) return 0;
  return state.messages.filter(t => t.unread).length;
}

// SVG Icons (2px stroke, round caps)
const ICONS = {
  dashboard: '<path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/>',
  messages: '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',
  orders: '<path d="M20 7H4a1 1 0 00-1 1v12a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1z"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><path d="M12 12v4"/><path d="M3 12h18"/>',
  progress: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  resources: '<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>',
  chevronRight: '<path d="M9 18l6-6-6-6"/>',
  send: '<path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4z"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  weight: '<path d="M12 3a4 4 0 014 4c0 2-2 3-4 3s-4-1-4-3a4 4 0 014-4z"/><path d="M5 21V9h14v12"/><path d="M5 9l7-6 7 6"/>',
  injection: '<path d="M18 2l4 4"/><path d="M7.5 20.5L19 9l-4-4L3.5 16.5 2 22z"/><path d="M15 5l4 4"/><path d="M11.5 8.5l4 4"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  arrowRight: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  signout: '<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  pill: '<path d="M10.5 1.5l3 3L4.5 13.5l-3-3a4.24 4.24 0 010-6 4.24 4.24 0 016 0z"/><path d="M13.5 10.5l3 3a4.24 4.24 0 010 6 4.24 4.24 0 01-6 0l-3-3"/><line x1="12" y1="8" x2="16" y2="12"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  truck: '<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>',
  spinner: '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>'
};

function icon(name, size) {
  const s = size || 20;
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`;
}
