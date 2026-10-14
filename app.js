/* ==========================================================================
   NIMANTRA — LUXURY DIGITAL INVITATION PLATFORM
   Client-side Logic, Theme Customizer, Web Audio & Live Sync
   ========================================================================== */

// Occasion Pricing Configuration
const OCCASION_PRICING = {
  wedding: { name: 'Nimantra Signature Wedding', price: 1499 },
  birthday: { name: 'Nimantra Birthday Celebration', price: 499 },
  housewarming: { name: 'Nimantra Griha Pravesh', price: 499 },
  engagement: { name: 'Nimantra Sagai Ceremony', price: 999 },
  babyshower: { name: 'Nimantra Godh Bharai', price: 499 },
  anniversary: { name: 'Nimantra Milestone Anniversary', price: 999 }
};

function getOccasionPricing(occasion) {
  return OCCASION_PRICING[occasion] || { name: 'Nimantra Signature Invitation', price: 1499 };
}

function saveAppStateToStorage() {
  try {
    localStorage.setItem('nimantra_app_state', JSON.stringify(appState));
  } catch(e) {
    console.warn('Could not save appState to localStorage', e);
  }
}

// Global State
const appState = {
  theme: localStorage.getItem('nimantra_theme') || 'gold',
  occasion: 'wedding',
  host1: 'Shanaya',
  host2: 'Aarav',
  tagline: 'Together with their families',
  monogram: 'S & A',
  hashtag: '#AaravWedsShanaya',
  date: '2026-11-14',
  venue: 'The Leela Palace, Udaipur',
  venueAddress: 'Lake Pichola, Udaipur, Rajasthan 313001, India',
  mapQuery: 'The Leela Palace, Udaipur, Rajasthan',
  slug: 'aarav-and-shanaya',
  coverPhoto: 'assets/images/couple.jpg',
  revealStyle: 'wax',
  musicTrack: 'raag-darbari',
  audioPlaying: false,
  phoneScrollUnrolled: false,
  phoneDoorsOpen: false,
  phoneBoxOpen: false,
  phoneWaxCracked: false,
  
  // Dynamic Ceremonies Itinerary List
  events: [
    {
      id: 'ev-1',
      title: 'Mehendi & Haldi Rasam',
      icon: '🌸',
      date: '2026-11-13',
      time: '11:00 AM',
      venue: 'Guava Orchard & Poolside Deck',
      dressCode: 'Bright Yellow & Floral Pastels',
      mapQuery: 'The Leela Palace, Udaipur'
    },
    {
      id: 'ev-2',
      title: 'Sangeet & Cocktail Soiree',
      icon: '🥁',
      date: '2026-11-13',
      time: '6:30 PM',
      venue: 'Grand Mewar Ballroom',
      dressCode: 'Glitz, Glamour & Indo-Western Velvet',
      mapQuery: 'The Leela Palace, Udaipur'
    },
    {
      id: 'ev-3',
      title: 'The Royal Pheras (Wedding Ceremony)',
      icon: '💍',
      date: '2026-11-14',
      time: '5:00 PM',
      venue: 'Lake Palace Sunset Mandap',
      dressCode: 'Regal Indian Traditional & Pastels',
      mapQuery: 'The Leela Palace, Udaipur'
    },
    {
      id: 'ev-4',
      title: 'The Grand Royal Reception Dinner',
      icon: '🥂',
      date: '2026-11-14',
      time: '8:30 PM',
      venue: 'Courtyard of Courtesies',
      dressCode: 'Black Tie / Royal Silk Sherwanis',
      mapQuery: 'The Leela Palace, Udaipur'
    }
  ],

  // Love Story & Welcome Note
  story: {
    enabled: true,
    title: 'Our Journey to Forever',
    text: 'From college library study breaks to countless sunsets across the globe, ten years of love and laughter lead us to this magical chapter. We cannot wait to celebrate our union surrounded by the blessings of our dearest family and friends.',
    quote: '“Where there is love, there is life.”'
  },

  // Travel & Stay Concierge
  travel: {
    enabled: true,
    airport: 'Maharana Pratap Airport (UDR) - 25km (45 min drive)',
    hotel: 'The Leela Palace Udaipur (Special Room Block Code: AARAVWEDSSHANAYA)',
    contact: 'Rajesh Sharma (Hospitality Concierge) • +91 98765 43210'
  },

  // RSVP Customization
  rsvpConfig: {
    enabled: true,
    deadline: '2026-11-01',
    askHeadcount: true,
    maxGuests: 5,
    askDiet: true,
    askSong: true,
    songPrompt: 'DJ Song Request (What gets you on the dance floor?)',
    askWishes: true,
    wishesPrompt: 'Warm Wishes & Blessings for the Couple',
    askCeremonies: true
  },

  // Dietary options choices list
  dietaryOptions: [
    'Jain (Satvik)',
    'Pure Vegetarian',
    'Vegan',
    'Royal Non-Veg Feast',
    'Halal',
    'Gluten-Free'
  ],

  // Custom RSVP Questions list
  customQuestions: [
    {
      id: 'cq-1',
      prompt: 'Do you require airport pickup from Udaipur (UDR)?',
      type: 'yesno',
      options: '',
      required: false
    },
    {
      id: 'cq-2',
      prompt: 'Will you need hotel room accommodation at The Leela Palace?',
      type: 'yesno',
      options: '',
      required: false
    },
    {
      id: 'cq-3',
      prompt: 'Any specific food allergies or accessibility needs?',
      type: 'text',
      options: '',
      required: false
    }
  ],

  rsvps: [
    { name: 'Sharma Family', count: 4, events: ['Mehndi', 'Sangeet', 'Wedding'], diet: 'Jain', song: '🎵 “Gallan Goodiyan”', status: 'coming', time: '2m ago' },
    { name: 'Priya Nair', count: 2, events: ['All Events'], diet: 'Vegan', song: 'None', status: 'coming', time: '18m ago' },
    { name: 'Kapoor Family', count: 5, events: ['Wedding', 'Reception'], diet: 'Regular', song: '🎵 “London Thumakda”', status: 'coming', time: '1h ago' },
    { name: 'Rohan Mehta', count: 1, events: ['None'], diet: 'Regular', song: 'None', status: 'declined', time: '3h ago' },
    { name: 'Ananya Iyer', count: 3, events: ['Sangeet', 'Wedding'], diet: 'Regular', song: 'None', status: 'coming', time: '5h ago' }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  initThemeSystem();
  initStickyHeader();
  initMobileMenu();
  initCounters();
  initStudioCustomizer();
  initDashboardTabs();
  initDashboardFilters();
  initDashboardExport();
  initAddGuestRSVP();
  initFaqAccordion();

  // Initialize all dynamic customizer features
  renderItineraryEditor();
  renderPhoneItinerary();
  renderDietaryChipsEditor();
  renderCustomQuestionsEditor();
  updateVenueLocationMap();
  updateStoryCard();
  updateTravelCard();
  renderPhoneRSVP();
  renderRevealQuickBar();
  renderStudioRevealGrid();
  renderPreviewShowcase();
  renderThemePaletteGrid();
  renderPhoneHeroReveal(appState.revealStyle);
  updatePhoneRevealStyle(appState.revealStyle);
});

/* ==========================================================================
   1. THEME SYSTEM (User Choice Customization)
   ========================================================================== */
function initThemeSystem() {
  applyTheme(appState.theme);

  const themeBtns = document.querySelectorAll('.theme-swatch-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedTheme = btn.getAttribute('data-theme');
      applyTheme(selectedTheme);
      showToast(`Applied ${getThemeName(selectedTheme)} theme!`);
    });
  });
}

function applyTheme(themeName) {
  appState.theme = themeName;
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('nimantra_theme', themeName);

  // Directly sync color theme onto Phone Mockup Screen
  const phoneScreen = document.getElementById('phonePreviewScreen');
  if (phoneScreen) {
    phoneScreen.setAttribute('data-theme', themeName);
  }

  // Update active state across all swatch pickers
  document.querySelectorAll('.theme-swatch-btn').forEach(btn => {
    if (btn.getAttribute('data-theme') === themeName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update active state across Tab 5 theme palette cards
  document.querySelectorAll('.theme-palette-card').forEach(card => {
    if (card.getAttribute('data-theme-card') === themeName) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

function getThemeName(theme) {
  switch (theme) {
    case 'rose': return 'Rose Quartz & Romance';
    case 'emerald': return 'Imperial Emerald & Brass';
    case 'midnight': return 'Midnight Obsidian (Dark)';
    case 'kesar': return 'Kesar Terracotta';
    case 'pichwai': return 'Banarasi Pichwai Lotus & Indigo';
    case 'chateau': return 'French Château & Lavender';
    default: return 'Royal Ivory & Gold';
  }
}

/* ==========================================================================
   2. WEB AUDIO API SYNTHESIZER (100% Reliable Native Audio)
   ========================================================================== */
let audioCtx = null;
let ambientOscillators = [];

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Celebration Chime Sound Effect
function playChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Harmonic arpeggio (C5, E5, G5, C6)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + (idx * 0.08));

      gain.gain.setValueAtTime(0, ctx.currentTime + (idx * 0.08));
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + (idx * 0.08) + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (idx * 0.08) + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + (idx * 0.08));
      osc.stop(ctx.currentTime + (idx * 0.08) + 0.9);
    });
  } catch (err) {
    console.warn('Audio note could not be played:', err);
  }
}

// Wax Seal Crack Tactile Sound
function playSealCrack() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  } catch (err) {
    console.warn('Seal sound:', err);
  }
}

// Palace Doors Deep Gong & Chime
function playPalaceDoorsSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    [196, 293.66, 392, 587.33].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.25 / (idx + 1), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.25);
    });
  } catch (err) {
    console.warn('Palace door sound:', err);
  }
}

// Royal Scroll Paper Unfurl & Harp Flourish
function playScrollSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + (idx * 0.06);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.65);
    });
  } catch (err) {
    console.warn('Scroll sound:', err);
  }
}

// Jewel Box Metallic Latch Click & Celestial Chime
function playJewelBoxSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Metallic click
    const oscClick = ctx.createOscillator();
    const gainClick = ctx.createGain();
    oscClick.type = 'sawtooth';
    oscClick.frequency.setValueAtTime(900, ctx.currentTime);
    oscClick.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
    gainClick.gain.setValueAtTime(0.3, ctx.currentTime);
    gainClick.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);
    oscClick.connect(gainClick);
    gainClick.connect(ctx.destination);
    oscClick.start();
    oscClick.stop(ctx.currentTime + 0.07);

    // Crystal chime chord
    [1046.50, 1318.51, 1567.98].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + 0.05 + (idx * 0.05);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.85);
    });
  } catch (err) {
    console.warn('Jewel box sound:', err);
  }
}

// Playful Balloon / Champagne Pop Sound Effect
function playPopSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.14);
  } catch (err) {
    console.warn('Pop sound:', err);
  }
}
window.playPopSound = playPopSound;

// Ambient Sitar / Drone Harmonics Loop Toggle
function toggleAudioPreview() {
  const ctx = getAudioContext();
  const label = document.getElementById('phoneAudioLabel');
  const btnTest = document.getElementById('btnSoundTest');

  if (appState.audioPlaying) {
    // Stop Audio
    ambientOscillators.forEach(o => {
      try { o.stop(); } catch(e){}
    });
    ambientOscillators = [];
    appState.audioPlaying = false;

    if (label) label.textContent = 'Audio Off';
    if (btnTest) btnTest.innerHTML = '<span>▶ Play Sound</span>';
    showToast('Background music muted');
  } else {
    // Start Audio
    appState.audioPlaying = true;
    if (label) label.textContent = 'Playing';
    if (btnTest) btnTest.innerHTML = '<span>⏸ Pause Sound</span>';

    playChime();

    // Create soothing soft Indian classical sitar drone (Sa - Pa - Sa octave)
    if (ctx) {
      const droneNotes = [146.83, 220.00, 293.66]; // D3, A3, D4
      droneNotes.forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        ambientOscillators.push(osc);
      });
    }

    showToast('🎵 Playing: "Raag Darbari" Ambient Harmonics');
  }
}

/* ==========================================================================
   3. STUDIO CUSTOMIZER LOGIC & LIVE SYNC
   ========================================================================== */
function switchEditorSubTab(tabName) {
  const tabBtns = document.querySelectorAll('.studio-tab-item');
  tabBtns.forEach(btn => {
    if (btn.getAttribute('data-editor-tab') === tabName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const tabContents = {
    basics: document.getElementById('tabContentBasics'),
    location: document.getElementById('tabContentLocation'),
    itinerary: document.getElementById('tabContentItinerary'),
    rsvp: document.getElementById('tabContentRsvp'),
    reveal: document.getElementById('tabContentReveal'),
    story: document.getElementById('tabContentStory')
  };

  Object.entries(tabContents).forEach(([key, el]) => {
    if (el) {
      el.style.display = key === tabName ? 'block' : 'none';
    }
  });

  // Re-sync components for the selected tab
  if (tabName === 'itinerary') {
    renderItineraryEditor();
    renderPhoneItinerary();
  } else if (tabName === 'rsvp') {
    renderDietaryChipsEditor();
    renderCustomQuestionsEditor();
    renderPhoneRSVP();
  } else if (tabName === 'location') {
    updateVenueLocationMap();
  } else if (tabName === 'reveal') {
    renderThemePaletteGrid();
  }

  // Ensure editor panel starts at the top for the newly selected tab
  const editorPanel = document.querySelector('.studio-editor-panel');
  if (editorPanel) {
    editorPanel.scrollTop = 0;
  }
}
window.switchEditorSubTab = switchEditorSubTab;

function initStudioCustomizer() {
  // Inputs
  const inputHost1 = document.getElementById('inputHost1');
  const inputHost2 = document.getElementById('inputHost2');
  const inputTagline = document.getElementById('inputTagline');
  const inputMonogram = document.getElementById('inputMonogram');
  const inputHashtag = document.getElementById('inputHashtag');
  const inputDate = document.getElementById('inputDate');
  const inputVenue = document.getElementById('inputVenue');
  const inputVenueAddress = document.getElementById('inputVenueAddress');
  const inputMapQuery = document.getElementById('inputMapQuery');
  const inputSlug = document.getElementById('inputSlug');
  const occasionSelect = document.getElementById('studioOccasionSelect');

  // Live input sync listeners
  [inputHost1, inputHost2, inputTagline, inputMonogram, inputHashtag, inputDate, inputVenue, inputVenueAddress, inputMapQuery, inputSlug].forEach(input => {
    if (input) {
      input.addEventListener('input', updatePhonePreviewFromInputs);
    }
  });

  if (occasionSelect) {
    occasionSelect.addEventListener('change', (e) => {
      setOccasion(e.target.value);
    });
  }

  // 6 Sub-tabs in studio editor
  const tabBtns = document.querySelectorAll('.studio-tab-item');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-editor-tab');
      if (targetTab) {
        switchEditorSubTab(targetTab);
      }
    });
  });

  // Reveal style cards
  const revealCards = document.querySelectorAll('.reveal-card-option');
  revealCards.forEach(card => {
    card.addEventListener('click', () => {
      const style = card.getAttribute('data-reveal');
      if (style) selectRevealStyle(style);
    });
  });
}

function updatePhonePreviewFromInputs() {
  const host1 = document.getElementById('inputHost1')?.value.trim() || 'Shanaya';
  const host2 = document.getElementById('inputHost2')?.value.trim() || 'Aarav';
  const tagline = document.getElementById('inputTagline')?.value.trim() || 'Together with their families';
  const monogram = document.getElementById('inputMonogram')?.value.trim() || 'S & A';
  const hashtag = document.getElementById('inputHashtag')?.value.trim() || '#AaravWedsShanaya';
  const dateVal = document.getElementById('inputDate')?.value || '2026-11-14';
  const venue = document.getElementById('inputVenue')?.value.trim() || 'The Leela Palace, Udaipur';
  const venueAddress = document.getElementById('inputVenueAddress')?.value.trim() || 'Lake Pichola, Udaipur, Rajasthan 313001, India';
  const mapQuery = document.getElementById('inputMapQuery')?.value.trim() || 'The Leela Palace, Udaipur, Rajasthan';
  const slug = document.getElementById('inputSlug')?.value.trim() || 'aarav-and-shanaya';

  appState.host1 = host1;
  appState.host2 = host2;
  appState.tagline = tagline;
  appState.monogram = monogram;
  appState.hashtag = hashtag;
  appState.date = dateVal;
  appState.venue = venue;
  appState.venueAddress = venueAddress;
  appState.mapQuery = mapQuery;
  appState.slug = slug;

  // Format date display
  const dateObj = new Date(dateVal);
  const formattedDate = !isNaN(dateObj) ? dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '14 Nov 2026';

  // Update phone screen couple names & badges
  const phoneNames = document.getElementById('phoneNames');
  const phoneTagline = document.getElementById('phoneTagline');
  const phoneEventMeta = document.getElementById('phoneEventMeta');
  const phoneMonogram = document.getElementById('phoneMonogramPill');
  const phoneHashtag = document.getElementById('phoneHashtagPill');

  if (phoneNames) {
    if (appState.occasion === 'birthday' || appState.occasion === 'babyshower') {
      phoneNames.textContent = host1;
    } else {
      phoneNames.textContent = `${host2} & ${host1}`;
    }
  }
  if (phoneTagline) phoneTagline.textContent = tagline;
  if (phoneEventMeta) phoneEventMeta.textContent = `${formattedDate} • ${venue.split(',')[0]}`;
  if (phoneMonogram) phoneMonogram.textContent = monogram;
  if (phoneHashtag) phoneHashtag.textContent = hashtag;

  // Update Hero Preview card on main landing page
  const heroNames = document.getElementById('heroPreviewNames');
  const heroDate = document.getElementById('heroPreviewDate');
  const heroUrl = document.getElementById('heroPreviewUrl');
  if (heroNames) heroNames.textContent = `${host2} & ${host1}`;
  if (heroDate) heroDate.textContent = `${formattedDate} • ${venue}`;
  if (heroUrl) heroUrl.textContent = `nimantra.in/${slug}`;

  // Update Host Dashboard on main landing page
  const mockHostNames = document.getElementById('mockHostNames');
  const mockHostMeta = document.getElementById('mockHostMeta');
  const mockUrl = document.getElementById('mockDashboardUrl');
  if (mockHostNames) mockHostNames.textContent = `${host2} & ${host1}`;
  if (mockHostMeta) mockHostMeta.textContent = `${formattedDate} • Invitation Live`;
  if (mockUrl) mockUrl.textContent = `🔒 nimantra.in/edit/${slug}-priv-892`;

  // Update Guest Modal header
  const guestModalUrl = document.getElementById('guestModalUrl');
  const guestModalNames = document.getElementById('guestModalNames');
  const guestModalMeta = document.getElementById('guestModalMeta');
  if (guestModalUrl) guestModalUrl.textContent = `🔒 https://nimantra.in/${slug}`;
  if (guestModalNames) guestModalNames.textContent = `${host2} & ${host1}`;
  if (guestModalMeta) guestModalMeta.textContent = `${formattedDate} • ${venue}`;

  // Sync Google Map Location
  updateVenueLocationMap();

  // Re-render phone hero reveal with updated names, dates and venue
  renderPhoneHeroReveal();

  // Sync Checkout Pricing and Slug previews
  const pricingInfo = getOccasionPricing(appState.occasion);
  const checkoutBottomSlug = document.getElementById('checkoutSummarySlug');
  const checkoutBottomPrice = document.getElementById('checkoutBottomPrice');
  const headerPayBtn = document.getElementById('studioHeaderPayBtnText');
  if (checkoutBottomSlug) checkoutBottomSlug.textContent = `nimantra.in/${slug}`;
  if (checkoutBottomPrice) checkoutBottomPrice.textContent = `₹${pricingInfo.price}`;
  if (headerPayBtn) headerPayBtn.textContent = `Proceed to Payment (₹${pricingInfo.price}) →`;

  // Auto-save state to storage for invite.html live synchronization
  saveAppStateToStorage();
}

/* ==========================================================================
   4. GOOGLE MAPS INTEGRATION & NAVIGATION
   ========================================================================== */
function updateVenueLocationMap() {
  const query = appState.mapQuery || appState.venue || 'The Leela Palace, Udaipur';
  const encodedQuery = encodeURIComponent(query);
  const embedUrl = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;

  // 1. Editor Tab 2 map preview elements
  const editorMapIframe = document.getElementById('editorMapIframe');
  const editorBtnGoogleMaps = document.getElementById('editorBtnGoogleMaps');
  if (editorMapIframe && editorMapIframe.src !== embedUrl) {
    editorMapIframe.src = embedUrl;
  }
  if (editorBtnGoogleMaps) {
    editorBtnGoogleMaps.href = directionsUrl;
  }

  // 2. Phone preview elements
  const phoneVenueName = document.getElementById('phoneVenueName');
  const phoneVenueAddress = document.getElementById('phoneVenueAddress');
  const phoneMapIframe = document.getElementById('phoneMapIframe');
  const phoneBtnGoogleMaps = document.getElementById('phoneBtnGoogleMaps');

  if (phoneVenueName) phoneVenueName.textContent = appState.venue;
  if (phoneVenueAddress) phoneVenueAddress.textContent = appState.venueAddress;
  if (phoneMapIframe && phoneMapIframe.src !== embedUrl) {
    phoneMapIframe.src = embedUrl;
  }
  if (phoneBtnGoogleMaps) phoneBtnGoogleMaps.href = directionsUrl;

  // 3. Guest view modal elements
  const guestModalVenueAddress = document.getElementById('guestModalVenueAddress');
  const guestModalMapIframe = document.getElementById('guestModalMapIframe');
  const guestModalBtnMap = document.getElementById('guestModalBtnMap');

  if (guestModalVenueAddress) guestModalVenueAddress.textContent = appState.venueAddress;
  if (guestModalMapIframe && guestModalMapIframe.src !== embedUrl) {
    guestModalMapIframe.src = embedUrl;
  }
  if (guestModalBtnMap) guestModalBtnMap.href = directionsUrl;
}
window.updateVenueLocationMap = updateVenueLocationMap;

function applyVenuePreset(key) {
  const presets = {
    leela: {
      name: 'The Leela Palace, Udaipur',
      address: 'Lake Pichola, Udaipur, Rajasthan 313001, India',
      query: 'The Leela Palace, Udaipur, Rajasthan'
    },
    taj: {
      name: 'Taj Lake Palace, Udaipur',
      address: 'Pichola, Udaipur, Rajasthan 313001, India',
      query: 'Taj Lake Palace, Udaipur, Rajasthan'
    },
    umaid: {
      name: 'Umaid Bhawan Palace, Jodhpur',
      address: 'Circuit House Rd, Cantt Area, Jodhpur, Rajasthan 342006',
      query: 'Umaid Bhawan Palace, Jodhpur, Rajasthan'
    },
    itc: {
      name: 'ITC Grand Bharat, NCR',
      address: 'Hasanpur Tauru, Mewat District, Gurugram, Haryana 122105',
      query: 'ITC Grand Bharat, Gurugram'
    },
    rambagh: {
      name: 'Rambagh Palace, Jaipur',
      address: 'Bhawani Singh Rd, Rambagh, Jaipur, Rajasthan 302005',
      query: 'Rambagh Palace, Jaipur, Rajasthan'
    }
  };

  const p = presets[key];
  if (!p) return;

  const inputVenue = document.getElementById('inputVenue');
  const inputAddress = document.getElementById('inputVenueAddress');
  const inputQuery = document.getElementById('inputMapQuery');

  if (inputVenue) inputVenue.value = p.name;
  if (inputAddress) inputAddress.value = p.address;
  if (inputQuery) inputQuery.value = p.query;

  appState.venue = p.name;
  appState.venueAddress = p.address;
  appState.mapQuery = p.query;

  updateVenueLocationMap();
  updatePhonePreviewFromInputs();
  playChime();
  showToast(`📍 Venue updated to ${p.name}!`);
}
window.applyVenuePreset = applyVenuePreset;

function togglePhoneMapVisibility() {
  const chk = document.getElementById('toggleShowMap');
  const isVisible = chk ? chk.checked : true;
  const phoneCard = document.getElementById('phoneLocationCard');
  if (phoneCard) {
    phoneCard.style.display = isVisible ? 'block' : 'none';
  }
}
window.togglePhoneMapVisibility = togglePhoneMapVisibility;

function testCurrentMapQuery() {
  const query = appState.mapQuery || appState.venue || 'The Leela Palace, Udaipur';
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  window.open(directionsUrl, '_blank');
}
window.testCurrentMapQuery = testCurrentMapQuery;

function copyVenueAddress() {
  const text = `${appState.venue} — ${appState.venueAddress}`;
  navigator.clipboard?.writeText(text).then(() => {
    showToast('📍 Copied venue address to clipboard!');
  }).catch(() => {
    showToast('📍 Venue: ' + appState.venue);
  });
}
window.copyVenueAddress = copyVenueAddress;

function copyHashtag() {
  const tag = appState.hashtag || '#AaravWedsShanaya';
  navigator.clipboard?.writeText(tag).then(() => {
    showToast(`✨ Copied ${tag} to clipboard!`);
  }).catch(() => {
    showToast(`✨ Wedding Hashtag: ${tag}`);
  });
}
window.copyHashtag = copyHashtag;

/* ==========================================================================
   5. COVER PHOTO CUSTOMIZATION & PRESETS
   ========================================================================== */
function handlePhotoUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    appState.coverPhoto = dataUrl;

    const phonePhoto = document.getElementById('phonePhotoImg');
    const guestModalImg = document.getElementById('guestModalImg');
    const heroPreviewImg = document.querySelector('.preview-photo-wrap img');

    if (phonePhoto) phonePhoto.src = dataUrl;
    if (guestModalImg) guestModalImg.src = dataUrl;
    if (heroPreviewImg) heroPreviewImg.src = dataUrl;

    // Reset preset chips active state
    document.querySelectorAll('.photo-preset-chip').forEach(c => c.classList.remove('active'));

    // Re-render phone hero with new portrait
    renderPhoneHeroReveal();

    playChime();
    showToast('📸 Custom couple photo uploaded & updated live!');
  };
  reader.readAsDataURL(file);
}

function selectPhotoPreset(presetKey) {
  document.querySelectorAll('.photo-preset-chip').forEach(c => {
    if (c.getAttribute('data-preset') === presetKey) {
      c.classList.add('active');
    } else {
      c.classList.remove('active');
    }
  });

  let photoSrc = 'assets/images/couple.jpg';
  if (presetKey === 'card' || presetKey === 'mandap') {
    photoSrc = 'assets/images/card.jpg';
  }

  appState.coverPhoto = photoSrc;

  const phonePhoto = document.getElementById('phonePhotoImg');
  const guestModalImg = document.getElementById('guestModalImg');
  const heroPreviewImg = document.querySelector('.preview-photo-wrap img');

  if (phonePhoto) phonePhoto.src = photoSrc;
  if (guestModalImg) guestModalImg.src = photoSrc;
  if (heroPreviewImg) heroPreviewImg.src = photoSrc;

  // Re-render phone hero with new preset portrait
  renderPhoneHeroReveal();

  showToast(`✨ Applied "${presetKey}" luxury cover portrait!`);
}

function selectMusicPreset(trackKey) {
  appState.musicTrack = trackKey;
  const trackLabel = document.getElementById('currentTrackTitle');

  if (trackKey === 'shehnai') {
    if (trackLabel) trackLabel.textContent = '🎺 Royal Shehnai & Nagada Celebration';
    showToast('🎺 Selected: Royal Shehnai Symphony');
  } else if (trackKey === 'romantic') {
    if (trackLabel) trackLabel.textContent = '🎻 Romantic Piano & Acoustic Strings';
    showToast('🎻 Selected: Romantic Strings');
  } else {
    if (trackLabel) trackLabel.textContent = '🎵 Raag Darbari (Sitar & Acoustic Harmonics)';
    showToast('🎵 Selected: Raag Darbari Classical Sitar');
  }

  if (appState.audioPlaying) {
    toggleAudioPreview();
    toggleAudioPreview();
  }
}

/* ==========================================================================
   6. DYNAMIC MULTI-EVENT ITINERARY BUILDER
   ========================================================================== */
function renderItineraryEditor() {
  const container = document.getElementById('itineraryEventsContainer');
  const countBadge = document.getElementById('itineraryCountBadge');

  if (!container) return;

  if (countBadge) {
    countBadge.textContent = `${appState.events.length} Ceremonies`;
  }

  container.innerHTML = '';

  appState.events.forEach((ev, index) => {
    const card = document.createElement('div');
    card.className = 'itinerary-card';
    card.innerHTML = `
      <div class="itinerary-card-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="itinerary-index-badge">Event ${index + 1}</span>
          <span style="font-size: 1.25rem;">${ev.icon || '🌸'}</span>
        </div>
        <input type="text" class="itinerary-card-title-input" value="${escapeHtml(ev.title)}" placeholder="Ceremony Name (e.g. Sangeet)" oninput="updateEventField('${ev.id}', 'title', this.value)" />
        <button type="button" class="btn-del-event" onclick="removeCeremonyEvent('${ev.id}')" title="Remove Ceremony">✕</button>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
        <div>
          <label style="font-size: 0.72rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 3px;">Date</label>
          <input type="date" class="form-input" style="padding: 8px 10px; font-size: 0.85rem;" value="${ev.date}" onchange="updateEventField('${ev.id}', 'date', this.value)" />
        </div>
        <div>
          <label style="font-size: 0.72rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 3px;">Timing</label>
          <input type="text" class="form-input" style="padding: 8px 10px; font-size: 0.85rem;" value="${escapeHtml(ev.time)}" placeholder="e.g. 6:30 PM" oninput="updateEventField('${ev.id}', 'time', this.value)" />
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
        <div>
          <label style="font-size: 0.72rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 3px;">Venue / Specific Hall</label>
          <input type="text" class="form-input" style="padding: 8px 10px; font-size: 0.85rem;" value="${escapeHtml(ev.venue)}" placeholder="e.g. Grand Ballroom" oninput="updateEventField('${ev.id}', 'venue', this.value)" />
        </div>
        <div>
          <label style="font-size: 0.72rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 3px;">Dress Code / Theme</label>
          <input type="text" class="form-input" style="padding: 8px 10px; font-size: 0.85rem;" value="${escapeHtml(ev.dressCode)}" placeholder="e.g. Pastel Traditional" oninput="updateEventField('${ev.id}', 'dressCode', this.value)" />
        </div>
      </div>

      <!-- Ceremony Icon Fast Selector -->
      <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 8px; border-top: 1px dashed var(--border-subtle);">
        <span style="font-size: 0.7rem; color: var(--text-muted);">Change Icon:</span>
        <div style="display: flex; gap: 4px;">
          ${['🌸', '🥁', '💍', '🥂', '🪔', '💃', '🍸', '☕', '✨'].map(icon => `
            <button type="button" style="border: 1px solid var(--border-subtle); background: var(--bg-card); border-radius: 4px; padding: 2px 5px; cursor: pointer; font-size: 0.85rem;" onclick="setEventIcon('${ev.id}', '${icon}')">${icon}</button>
          `).join('')}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function updateEventField(id, field, value) {
  const ev = appState.events.find(e => e.id === id);
  if (ev) {
    ev[field] = value;
    renderPhoneItinerary();
    if (field === 'title' || field === 'icon') {
      renderPhoneRSVP();
    }
  }
}
window.updateEventField = updateEventField;

function setEventIcon(id, icon) {
  const ev = appState.events.find(e => e.id === id);
  if (ev) {
    ev.icon = icon;
    renderItineraryEditor();
    renderPhoneItinerary();
    renderPhoneRSVP();
  }
}
window.setEventIcon = setEventIcon;

function addEmptyCeremonyEvent() {
  const newId = 'ev-' + Date.now();
  const nextDate = appState.date || '2026-11-14';

  appState.events.push({
    id: newId,
    title: 'New Ceremony Event',
    icon: '✨',
    date: nextDate,
    time: '7:00 PM',
    venue: appState.venue || 'Main Banquet Hall',
    dressCode: 'Indian Traditional Formal',
    mapQuery: appState.venue || 'The Leela Palace, Udaipur'
  });

  renderItineraryEditor();
  renderPhoneItinerary();
  renderPhoneRSVP();
  playChime();
  showToast('✨ Added new ceremony event to schedule!');

  // Scroll to bottom of editor container with highlight pulse
  setTimeout(() => {
    const container = document.getElementById('itineraryEventsContainer');
    if (container && container.lastElementChild) {
      container.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      container.lastElementChild.classList.add('highlight-pulse');
      setTimeout(() => container.lastElementChild.classList.remove('highlight-pulse'), 1200);
    }
  }, 40);
}
window.addEmptyCeremonyEvent = addEmptyCeremonyEvent;

function addQuickTemplate(type) {
  const newId = 'ev-' + Date.now();
  const dateBase = appState.date || '2026-11-14';

  let templateData = {};

  switch(type) {
    case 'haldi':
      templateData = { title: 'Haldi & Chuda Rasam', icon: '🌸', time: '10:30 AM', venue: 'Sunny Courtyard', dressCode: 'Yellow & Floral Pastels' };
      break;
    case 'sangeet':
      templateData = { title: 'Sangeet & Dance Extravaganza', icon: '🥁', time: '7:00 PM', venue: 'Grand Mewar Hall', dressCode: 'Glitz, Glamour & Indo-Western' };
      break;
    case 'pheras':
      templateData = { title: 'The Sacred Pheras & Varmala', icon: '💍', time: '5:30 PM', venue: 'Lake Mandap', dressCode: 'Pastel Royal Formal' };
      break;
    case 'reception':
      templateData = { title: 'The Royal Wedding Reception', icon: '🥂', time: '8:30 PM', venue: 'Royal Lawns', dressCode: 'Black Tie / Silk Sherwanis' };
      break;
    case 'brunch':
      templateData = { title: 'Farewell Brunch & Blessings', icon: '☕', time: '10:00 AM', venue: 'Terrace Garden', dressCode: 'Casual Summer Pastels' };
      break;
    case 'cocktail':
      templateData = { title: 'Midnight Cocktail & After-Party', icon: '🍸', time: '11:00 PM', venue: 'Club Lounge', dressCode: 'Chic Evening Glamour' };
      break;
    default:
      templateData = { title: 'Celebration Gathering', icon: '✨', time: '6:00 PM', venue: 'Celebration Hall', dressCode: 'Festive Traditional' };
  }

  appState.events.push({
    id: newId,
    title: templateData.title,
    icon: templateData.icon,
    date: dateBase,
    time: templateData.time,
    venue: templateData.venue,
    dressCode: templateData.dressCode,
    mapQuery: appState.venue
  });

  renderItineraryEditor();
  renderPhoneItinerary();
  renderPhoneRSVP();
  playChime();
  showToast(`🎉 Added "${templateData.title}" template!`);

  setTimeout(() => {
    const container = document.getElementById('itineraryEventsContainer');
    if (container && container.lastElementChild) {
      container.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      container.lastElementChild.classList.add('highlight-pulse');
      setTimeout(() => container.lastElementChild.classList.remove('highlight-pulse'), 1200);
    }
  }, 40);
}
window.addQuickTemplate = addQuickTemplate;

function removeCeremonyEvent(id) {
  if (appState.events.length <= 1) {
    showToast('⚠️ You need at least 1 ceremony event in your schedule.');
    return;
  }

  appState.events = appState.events.filter(e => e.id !== id);
  renderItineraryEditor();
  renderPhoneItinerary();
  renderPhoneRSVP();
  showToast('Ceremony event removed.');
}
window.removeCeremonyEvent = removeCeremonyEvent;

function renderPhoneItinerary() {
  const container = document.getElementById('phoneItineraryContainer');
  const guestSchedule = document.getElementById('guestModalSchedule');
  const countPill = document.getElementById('phoneCeremonyCountPill');

  if (countPill) {
    countPill.textContent = `${appState.events.length} Events`;
  }

  if (container) {
    container.innerHTML = '';
    appState.events.forEach(ev => {
      const item = document.createElement('div');
      item.className = 'phone-itinerary-item';

      // Format date for pill
      let dateBadge = ev.time;
      if (ev.date) {
        const dObj = new Date(ev.date);
        if (!isNaN(dObj)) {
          const shortDate = dObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
          dateBadge = `${shortDate}, ${ev.time}`;
        }
      }

      const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.mapQuery || ev.venue || appState.venue)}`;

      item.innerHTML = `
        <div class="phone-itinerary-item-top">
          <span class="phone-itinerary-name">
            <span>${ev.icon || '🌸'}</span>
            <span>${escapeHtml(ev.title)}</span>
          </span>
          <span class="phone-itinerary-time">${escapeHtml(dateBadge)}</span>
        </div>
        <div class="phone-itinerary-venue">
          <span>🏛️ ${escapeHtml(ev.venue || 'Venue Hall')}</span>
          <a class="phone-itinerary-dir-link" href="${mapLink}" target="_blank" rel="noopener">📍 Map</a>
        </div>
        ${ev.dressCode ? `
          <div class="phone-itinerary-dress">
            <span>👗 Dress Code: ${escapeHtml(ev.dressCode)}</span>
          </div>
        ` : ''}
      `;
      container.appendChild(item);
    });
  }

  // Update WhatsApp Guest Modal Schedule
  if (guestSchedule) {
    guestSchedule.innerHTML = appState.events.map(ev => {
      let dateBadge = ev.time;
      if (ev.date) {
        const dObj = new Date(ev.date);
        if (!isNaN(dObj)) {
          const shortDate = dObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
          dateBadge = `${shortDate}, ${ev.time}`;
        }
      }
      return `
        <div style="padding: 8px 0; border-bottom: 1px dashed var(--border-subtle); display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <strong>${ev.icon || '✦'} ${escapeHtml(ev.title)}</strong>
            <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 2px;">
              🏛️ ${escapeHtml(ev.venue)} ${ev.dressCode ? `• 👗 ${escapeHtml(ev.dressCode)}` : ''}
            </div>
          </div>
          <span style="font-weight: 600; color: var(--gold-dark); font-size: 0.8rem; background: var(--bg-champagne); padding: 3px 8px; border-radius: var(--radius-full); white-space: nowrap; margin-left: 10px;">
            ${escapeHtml(dateBadge)}
          </span>
        </div>
      `;
    }).join('');
  }

  // Re-sync multi-ceremony attendance checkboxes inside phone RSVP
  renderPhoneRSVP();
}

/* ==========================================================================
   7. LOVE STORY & TRAVEL CONCIERGE UPDATES
   ========================================================================== */
function updateStoryCard() {
  const toggle = document.getElementById('toggleStoryCard');
  const titleInput = document.getElementById('inputStoryTitle');
  const textInput = document.getElementById('inputStoryText');
  const quoteInput = document.getElementById('inputStoryQuote');

  const isEnabled = toggle ? toggle.checked : true;
  appState.story.enabled = isEnabled;
  appState.story.title = titleInput ? titleInput.value : appState.story.title;
  appState.story.text = textInput ? textInput.value : appState.story.text;
  appState.story.quote = quoteInput ? quoteInput.value : appState.story.quote;

  const phoneCard = document.getElementById('phoneStoryCard');
  const phoneTitle = document.getElementById('phoneStoryTitle');
  const phoneText = document.getElementById('phoneStoryText');
  const phoneQuote = document.getElementById('phoneStoryQuote');

  if (phoneCard) phoneCard.style.display = isEnabled ? 'block' : 'none';
  if (phoneTitle) phoneTitle.textContent = appState.story.title;
  if (phoneText) phoneText.textContent = appState.story.text;
  if (phoneQuote) phoneQuote.textContent = appState.story.quote;
}

function updateTravelCard() {
  const toggle = document.getElementById('toggleTravelCard');
  const airportInput = document.getElementById('inputTravelAirport');
  const hotelInput = document.getElementById('inputTravelHotel');
  const contactInput = document.getElementById('inputTravelContact');

  const isEnabled = toggle ? toggle.checked : true;
  appState.travel.enabled = isEnabled;
  appState.travel.airport = airportInput ? airportInput.value : appState.travel.airport;
  appState.travel.hotel = hotelInput ? hotelInput.value : appState.travel.hotel;
  appState.travel.contact = contactInput ? contactInput.value : appState.travel.contact;

  const phoneCard = document.getElementById('phoneTravelCard');
  const phoneAirport = document.getElementById('phoneTravelAirport');
  const phoneHotel = document.getElementById('phoneTravelHotel');
  const phoneContact = document.getElementById('phoneTravelContact');

  if (phoneCard) phoneCard.style.display = isEnabled ? 'block' : 'none';
  if (phoneAirport) phoneAirport.textContent = appState.travel.airport;
  if (phoneHotel) phoneHotel.textContent = appState.travel.hotel;
  if (phoneContact) phoneContact.textContent = appState.travel.contact;
}

/* ==========================================================================
   8. DYNAMIC RSVP FORM BUILDER & CUSTOM QUESTION BUILDER
   ========================================================================== */

// 8.1 Dietary Options Editor
function renderDietaryChipsEditor() {
  const row = document.getElementById('dietaryChipsRow');
  if (!row) return;

  row.innerHTML = appState.dietaryOptions.map(opt => `
    <span class="rsvp-dietary-chip">
      <span>${escapeHtml(opt)}</span>
      <span class="rsvp-dietary-chip-del" onclick="removeDietaryOption('${escapeHtml(opt)}')" title="Remove choice">✕</span>
    </span>
  `).join('');
}
window.renderDietaryChipsEditor = renderDietaryChipsEditor;

function addDietaryOption() {
  const input = document.getElementById('inputNewDietOption');
  if (!input) return;
  const val = input.value.trim();
  if (!val) {
    showToast('⚠️ Please enter a dietary choice name.');
    return;
  }
  if (!appState.dietaryOptions.includes(val)) {
    appState.dietaryOptions.push(val);
    renderDietaryChipsEditor();
    renderPhoneRSVP();
    showToast(`🍽️ Added "${val}" dietary option!`);
  }
  input.value = '';
}
window.addDietaryOption = addDietaryOption;

function removeDietaryOption(opt) {
  if (appState.dietaryOptions.length <= 1) {
    showToast('⚠️ Keep at least 1 dietary option.');
    return;
  }
  appState.dietaryOptions = appState.dietaryOptions.filter(d => d !== opt);
  renderDietaryChipsEditor();
  renderPhoneRSVP();
  showToast(`Removed "${opt}" dietary option.`);
}
window.removeDietaryOption = removeDietaryOption;

// 8.2 Custom Questions Builder
function addCustomRsvpQuestion(presetPrompt = '', presetType = 'text', presetOptions = '') {
  const newId = 'cq-' + Date.now();
  const question = {
    id: newId,
    prompt: presetPrompt || 'New Custom Question (e.g. Travel details)',
    type: presetType || 'text',
    options: presetOptions || (presetType === 'select' ? 'Option 1, Option 2, Option 3' : ''),
    required: false
  };

  appState.customQuestions.push(question);
  renderCustomQuestionsEditor();
  renderPhoneRSVP();
  playChime();
  showToast('➕ Added custom RSVP question!');

  setTimeout(() => {
    const container = document.getElementById('customQuestionsContainer');
    if (container && container.lastElementChild) {
      container.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      container.lastElementChild.classList.add('highlight-pulse');
      setTimeout(() => container.lastElementChild.classList.remove('highlight-pulse'), 1200);
    }
  }, 40);
}
window.addCustomRsvpQuestion = addCustomRsvpQuestion;

function removeCustomRsvpQuestion(id) {
  appState.customQuestions = appState.customQuestions.filter(q => q.id !== id);
  renderCustomQuestionsEditor();
  renderPhoneRSVP();
  showToast('Custom question removed.');
}
window.removeCustomRsvpQuestion = removeCustomRsvpQuestion;

function updateCustomQuestionField(id, field, value) {
  const q = appState.customQuestions.find(item => item.id === id);
  if (q) {
    q[field] = value;
    renderPhoneRSVP();
    if (field === 'type') {
      renderCustomQuestionsEditor();
    }
  }
}
window.updateCustomQuestionField = updateCustomQuestionField;

function renderCustomQuestionsEditor() {
  const container = document.getElementById('customQuestionsContainer');
  if (!container) return;

  if (appState.customQuestions.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 16px; background: var(--bg-card-alt); border-radius: var(--radius-sm); border: 1px dashed var(--border-light); font-size: 0.82rem; color: var(--text-muted);">
        No custom questions added yet. Click "+ Add Blank Question" or any preset chip above!
      </div>
    `;
    return;
  }

  container.innerHTML = appState.customQuestions.map((q, idx) => `
    <div class="rsvp-custom-question-card" id="card-${q.id}">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="itinerary-index-badge">Question ${idx + 1}</span>
          <span style="font-size: 0.76rem; font-weight: 600; color: var(--gold-dark); text-transform: uppercase;">
            ${q.type === 'yesno' ? 'Yes / No' : (q.type === 'select' ? 'Multiple Choice' : 'Text Box')}
          </span>
        </div>
        <button type="button" class="btn-del-question" onclick="removeCustomRsvpQuestion('${q.id}')" title="Delete Question">✕</button>
      </div>

      <div style="margin-bottom: 8px;">
        <label style="font-size: 0.72rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 3px;">Question Prompt / Title</label>
        <input type="text" class="form-input" style="padding: 8px 10px; font-size: 0.85rem;" value="${escapeHtml(q.prompt)}" placeholder="e.g. Do you need airport pickup?" oninput="updateCustomQuestionField('${q.id}', 'prompt', this.value)" />
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div>
          <label style="font-size: 0.72rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 3px;">Input Type</label>
          <select class="form-select" style="padding: 7px 10px; font-size: 0.82rem;" onchange="updateCustomQuestionField('${q.id}', 'type', this.value)">
            <option value="text" ${q.type === 'text' ? 'selected' : ''}>Text Box Input</option>
            <option value="yesno" ${q.type === 'yesno' ? 'selected' : ''}>Yes / No Toggle</option>
            <option value="select" ${q.type === 'select' ? 'selected' : ''}>Dropdown Choices</option>
          </select>
        </div>
        <div style="display: flex; align-items: flex-end; padding-bottom: 4px;">
          <label style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem; cursor: pointer;">
            <input type="checkbox" ${q.required ? 'checked' : ''} onchange="updateCustomQuestionField('${q.id}', 'required', this.checked)" style="width: 16px; height: 16px;" />
            <span>Required field</span>
          </label>
        </div>
      </div>

      ${q.type === 'select' ? `
        <div style="margin-top: 8px;">
          <label style="font-size: 0.72rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 3px;">Comma-Separated Dropdown Choices</label>
          <input type="text" class="form-input" style="padding: 7px 10px; font-size: 0.82rem;" value="${escapeHtml(q.options || '')}" placeholder="e.g. Arriving 13th, Arriving 14th, Arriving 15th" oninput="updateCustomQuestionField('${q.id}', 'options', this.value)" />
        </div>
      ` : ''}
    </div>
  `).join('');
}
window.renderCustomQuestionsEditor = renderCustomQuestionsEditor;

// 8.3 Live Phone RSVP Screen Renderer
function renderPhoneRSVP() {
  const isEnabled = document.getElementById('toggleRsvpEnabled')?.checked ?? true;
  const askHeadcount = document.getElementById('toggleRsvpHeadcount')?.checked ?? true;
  const maxGuests = parseInt(document.getElementById('selectMaxGuests')?.value || '5', 10);
  const askCeremonies = document.getElementById('toggleRsvpCeremonies')?.checked ?? true;
  const askDiet = document.getElementById('toggleRsvpDiet')?.checked ?? true;
  const askSong = document.getElementById('toggleRsvpSong')?.checked ?? true;
  const songPrompt = document.getElementById('inputSongPromptText')?.value.trim() || 'DJ Song Request (What gets you on the dance floor?)';
  const askWishes = document.getElementById('toggleRsvpWishes')?.checked ?? true;
  const wishesPrompt = document.getElementById('inputWishesPromptText')?.value.trim() || 'Warm Wishes & Blessings for the Couple';
  const deadlineVal = document.getElementById('inputRsvpDeadline')?.value || '';

  appState.rsvpConfig.enabled = isEnabled;
  appState.rsvpConfig.askHeadcount = askHeadcount;
  appState.rsvpConfig.maxGuests = maxGuests;
  appState.rsvpConfig.askCeremonies = askCeremonies;
  appState.rsvpConfig.askDiet = askDiet;
  appState.rsvpConfig.askSong = askSong;
  appState.rsvpConfig.songPrompt = songPrompt;
  appState.rsvpConfig.askWishes = askWishes;
  appState.rsvpConfig.wishesPrompt = wishesPrompt;
  appState.rsvpConfig.deadline = deadlineVal;

  // Master Enable / Disable Toggle
  const disabledNotice = document.getElementById('phoneRsvpDisabledNotice');
  const activeFields = document.getElementById('phoneRsvpActiveFields');
  if (disabledNotice) disabledNotice.style.display = isEnabled ? 'none' : 'block';
  if (activeFields) activeFields.style.display = isEnabled ? 'flex' : 'none';

  // Deadline notice
  const deadlinePill = document.getElementById('phoneRsvpDeadlinePill');
  if (deadlinePill) {
    if (deadlineVal) {
      const dObj = new Date(deadlineVal);
      const formatted = !isNaN(dObj) ? dObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : deadlineVal;
      deadlinePill.textContent = `⏳ RSVP Deadline: ${formatted}`;
      deadlinePill.style.display = 'block';
    } else {
      deadlinePill.style.display = 'none';
    }
  }

  // Headcount select options & wrap
  const headcountWrap = document.getElementById('phoneRsvpHeadcountWrap');
  const guestCountSelect = document.getElementById('phoneGuestCount');
  if (headcountWrap) headcountWrap.style.display = askHeadcount ? 'block' : 'none';
  if (guestCountSelect && askHeadcount) {
    const curVal = guestCountSelect.value || '2';
    let opts = '';
    for (let i = 1; i <= maxGuests; i++) {
      const isSel = (String(i) === curVal || (curVal === '2' && i === 2)) ? 'selected' : '';
      opts += `<option value="${i}" ${isSel}>Attending: ${i} ${i === 1 ? 'Guest' : 'Guests'}</option>`;
    }
    opts += `<option value="declined" ${curVal === 'declined' ? 'selected' : ''}>Regretfully Cannot Attend</option>`;
    guestCountSelect.innerHTML = opts;
  }

  // Ceremony attendance checkboxes
  const ceremoniesWrap = document.getElementById('phoneRsvpCeremoniesWrap');
  const ceremoniesGroup = document.getElementById('phoneCeremoniesGroup');
  if (ceremoniesWrap) ceremoniesWrap.style.display = askCeremonies ? 'block' : 'none';
  if (ceremoniesGroup && askCeremonies) {
    ceremoniesGroup.innerHTML = appState.events.map(ev => `
      <label class="phone-ceremony-chk">
        <span>${ev.icon || '🌸'} ${escapeHtml(ev.title)}</span>
        <input type="checkbox" checked value="${escapeHtml(ev.title)}" class="phone-chk-ceremony" style="width: 14px; height: 14px;" />
      </label>
    `).join('');
  }

  // Dietary options select & wrap
  const dietWrap = document.getElementById('phoneRsvpDietWrap');
  const dietSelect = document.getElementById('phoneGuestDiet');
  if (dietWrap) dietWrap.style.display = askDiet ? 'block' : 'none';
  if (dietSelect && askDiet) {
    const curDiet = dietSelect.value || appState.dietaryOptions[0];
    dietSelect.innerHTML = appState.dietaryOptions.map(opt => `
      <option value="${escapeHtml(opt)}" ${opt === curDiet ? 'selected' : ''}>
        Dietary: ${escapeHtml(opt)}
      </option>
    `).join('');
  }

  // DJ Song Request
  const songWrap = document.getElementById('phoneRsvpSongWrap');
  const songInput = document.getElementById('phoneGuestSong');
  if (songWrap) songWrap.style.display = askSong ? 'block' : 'none';
  if (songInput) songInput.placeholder = songPrompt;

  // Personal Wishes / Message
  const wishesWrap = document.getElementById('phoneRsvpWishesWrap');
  const wishesInput = document.getElementById('phoneGuestWishes');
  if (wishesWrap) wishesWrap.style.display = askWishes ? 'block' : 'none';
  if (wishesInput) wishesInput.placeholder = wishesPrompt;

  // Custom Questions Container
  const customContainer = document.getElementById('phoneRsvpCustomQuestionsContainer');
  if (customContainer) {
    if (appState.customQuestions.length === 0) {
      customContainer.innerHTML = '';
    } else {
      customContainer.innerHTML = appState.customQuestions.map(q => {
        if (q.type === 'yesno') {
          return `
            <div style="background: var(--bg-card-alt); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 7px 10px; margin-bottom: 3px;">
              <div style="font-size: 0.72rem; font-weight: 600; color: var(--gold-dark); margin-bottom: 4px;">
                ${escapeHtml(q.prompt)} ${q.required ? '<span style="color:#DC2626">*</span>' : ''}
              </div>
              <div style="display: flex; gap: 16px; font-size: 0.78rem;">
                <label style="cursor: pointer; display: flex; align-items: center; gap: 4px;">
                  <input type="radio" name="phone-cq-${q.id}" value="Yes" checked class="phone-cq-input" data-cq-id="${q.id}" data-cq-prompt="${escapeHtml(q.prompt)}" /> Yes
                </label>
                <label style="cursor: pointer; display: flex; align-items: center; gap: 4px;">
                  <input type="radio" name="phone-cq-${q.id}" value="No" class="phone-cq-input" data-cq-id="${q.id}" data-cq-prompt="${escapeHtml(q.prompt)}" /> No
                </label>
              </div>
            </div>
          `;
        } else if (q.type === 'select') {
          const opts = (q.options || 'Yes, No').split(',').map(s => s.trim()).filter(Boolean);
          return `
            <div style="margin-bottom: 3px;">
              <div style="font-size: 0.71rem; font-weight: 600; color: var(--gold-dark); margin-bottom: 2px;">
                ${escapeHtml(q.prompt)} ${q.required ? '<span style="color:#DC2626">*</span>' : ''}
              </div>
              <select class="phone-input phone-cq-input" data-cq-id="${q.id}" data-cq-prompt="${escapeHtml(q.prompt)}">
                ${opts.map(opt => `<option value="${escapeHtml(opt)}">${escapeHtml(opt)}</option>`).join('')}
              </select>
            </div>
          `;
        } else {
          return `
            <div style="margin-bottom: 3px;">
              <input type="text" class="phone-input phone-cq-input" data-cq-id="${q.id}" data-cq-prompt="${escapeHtml(q.prompt)}" placeholder="${escapeHtml(q.prompt)}${q.required ? ' *' : ''}" />
            </div>
          `;
        }
      }).join('');
    }
  }
}
window.renderPhoneRSVP = renderPhoneRSVP;

// Utility for safe HTML rendering
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


// ==========================================================================
// LUXURY REVEAL THEMES & OCCASION ARCHITECTURE (DYNAMIC MULTI-EVENT)
// ==========================================================================
const OCCASION_REVEALS = {
  birthday: [
    {
      id: 'balloon',
      name: 'Helium Balloon Pop & Confetti',
      subtitle: 'Playful Helium Pop',
      desc: 'Floating 3D helium balloon pops with vibrant confetti burst',
      icon: '🎈',
      badge: 'Balloon Pop',
      actionBtn: '✦ Tap Balloon to Pop ✦',
      phonePrompt: '✦ Tap to Pop & Celebrate ✦'
    },
    {
      id: 'cake',
      name: 'Birthday Cake & Candle Glow',
      subtitle: 'Make a Wish & Blow',
      desc: 'Tiered cake with glowing candle flames to blow out with a wish',
      icon: '🎂',
      badge: 'Blow Candle',
      actionBtn: '✦ Blow Out the Candles ✦',
      phonePrompt: '✦ Tap to Blow Candles ✦'
    },
    {
      id: 'gift',
      name: 'Surprise Gift Box Unboxing',
      subtitle: 'Satin Bow Hamper',
      desc: 'Untie the satin ribbon bow and lift open the surprise gift box',
      icon: '🎁',
      badge: 'Unbox Gift',
      actionBtn: '✦ Unwrap Surprise Gift Box ✦',
      phonePrompt: '✦ Tap to Unbox Gift ✦'
    },
    {
      id: 'partycard',
      name: 'Festive Party Popper Card',
      subtitle: 'Streamers & Horns',
      desc: 'Party popper fires streamer ribbons across celebratory invitation',
      icon: '🎉',
      badge: 'Party Pop',
      actionBtn: '✦ Pop Party Confetti ✦',
      phonePrompt: '✦ Pop Confetti to Reveal ✦'
    }
  ],
  housewarming: [
    {
      id: 'doorbell',
      name: 'Smart Doorbell Ring',
      subtitle: 'Welcome to Our New Home',
      desc: 'Chiming doorbell rings as front door swings open into new abode',
      icon: '🔔',
      badge: 'Ring Bell',
      actionBtn: '✦ Ring Doorbell to Enter ✦',
      phonePrompt: '✦ Ring Doorbell to Enter ✦'
    },
    {
      id: 'ribbon',
      name: 'Auspicious Ribbon Cutting',
      subtitle: 'Griha Pravesh Inauguration',
      desc: 'Golden scissors snip the red ceremonial ribbon with blessings',
      icon: '🎀',
      badge: 'Cut Ribbon',
      actionBtn: '✦ Snip Ceremonial Ribbon ✦',
      phonePrompt: '✦ Snip Ribbon to Enter ✦'
    },
    {
      id: 'kalash',
      name: 'Sacred Mangal Kalash & Diya',
      subtitle: 'Vedic Puja Blessings',
      desc: 'Sacred brass kalash with coconut and glowing ceremonial diya',
      icon: '🪔',
      badge: 'Puja Diya',
      actionBtn: '✦ Light Mangal Diya ✦',
      phonePrompt: '✦ Light Diya for Blessings ✦'
    },
    {
      id: 'key',
      name: 'Golden House Key Unlock',
      subtitle: 'New Residence Keys',
      desc: 'Golden engraved key unlocks the entrance to the new residence',
      icon: '🔑',
      badge: 'Key Unlock',
      actionBtn: '✦ Turn Golden Key to Unlock ✦',
      phonePrompt: '✦ Turn Key to Unlock Abode ✦'
    }
  ],
  babyshower: [
    {
      id: 'stork',
      name: 'Flying Stork & Cradle Reveal',
      subtitle: 'Bundle of Joy Delivery',
      desc: 'Gentle stork carries the golden cradle delivery basket',
      icon: '🕊️',
      badge: 'Baby Bundle',
      actionBtn: '✦ Receive Baby Bundle ✦',
      phonePrompt: '✦ Tap Stork Delivery ✦'
    },
    {
      id: 'bangles',
      name: 'Godh Bharai Bangles Chime',
      subtitle: 'Traditional Bangle Ceremony',
      desc: 'Glass and gold bangles chime with sweet musical melodies',
      icon: '🪆',
      badge: 'Bangles Chime',
      actionBtn: '✦ Chime Blessing Bangles ✦',
      phonePrompt: '✦ Chime Bangles for Mom-to-be ✦'
    },
    {
      id: 'babyballoon',
      name: 'Pastel Dream Cloud Balloons',
      subtitle: 'Soft Pink & Powder Blue',
      desc: 'Pastel cloud balloons float upwards revealing invitation',
      icon: '🎈',
      badge: 'Pastel Dream',
      actionBtn: '✦ Release Pastel Balloons ✦',
      phonePrompt: '✦ Float Balloons to Reveal ✦'
    },
    {
      id: 'cradle',
      name: 'Decorated Floral Swing Cradle',
      subtitle: 'Palna Ceremony',
      desc: 'Flower-laden swing rocks gently with celebratory lullaby blessings',
      icon: '🍼',
      badge: 'Floral Cradle',
      actionBtn: '✦ Rock Sacred Cradle ✦',
      phonePrompt: '✦ Tap to Rock Cradle ✦'
    }
  ],
  engagement: [
    {
      id: 'ringbox',
      name: 'Velvet Solitaire Ring Box',
      subtitle: 'She Said Yes!',
      desc: 'Plush velvet ring case pops open with sparkling diamond solitaire',
      icon: '💍',
      badge: 'Ring Pop',
      actionBtn: '✦ Open Velvet Ring Box ✦',
      phonePrompt: '✦ Open Ring Box ✦'
    },
    {
      id: 'interlocking',
      name: 'Interlocking Gold Eternity Rings',
      subtitle: 'Eternity Bands',
      desc: 'Two shimmering gold wedding bands slide together with radiant sparkle',
      icon: '♾️',
      badge: 'Eternity',
      actionBtn: '✦ Unite Eternity Rings ✦',
      phonePrompt: '✦ Connect Rings ✦'
    },
    {
      id: 'thaal',
      name: 'Royal Sagai Roka Thaal',
      subtitle: 'Traditional Sagai Thaal',
      desc: 'Silver thaal with glowing diya, auspicious kumkum and sweets',
      icon: '🪔',
      badge: 'Sagai Thaal',
      actionBtn: '✦ Unveil Sagai Thaal ✦',
      phonePrompt: '✦ Unveil Sagai Thaal ✦'
    },
    {
      id: 'envelope',
      name: 'Rose Gold Shimmer Envelope',
      subtitle: 'Love Story Invitation',
      desc: 'Blush metallic shimmer envelope with rose gold seal',
      icon: '✉️',
      badge: 'Rose Foil',
      actionBtn: '✦ Open Engagement Envelope ✦',
      phonePrompt: '✦ Open Envelope ✦'
    }
  ],
  wedding: [
    {
      id: 'doors',
      name: 'Heritage Palace Double Doors',
      subtitle: 'Shahi Darwaza Entrance',
      desc: 'Ornate Mughal palace gates swing open in 3D with golden illumination',
      icon: '🏰',
      badge: '3D Regal',
      actionBtn: '✦ Open Palace Gates ✦',
      phonePrompt: '✦ Open Palace Gates to Enter ✦'
    },
    {
      id: 'wax',
      name: 'Royal Wax-Seal Envelope',
      subtitle: 'Classic Gold Foil Envelope',
      desc: '3D wax seal cracks open and letter unfurls with gold dust',
      icon: '✉️',
      badge: 'Classic',
      actionBtn: '✦ Tap Wax Seal to Open ✦',
      phonePrompt: '✦ Tap Wax Seal to Unfurl ✦'
    },
    {
      id: 'scroll',
      name: 'Royal Decree Parchment Scroll',
      subtitle: 'Shahi Farman Announcement',
      desc: 'Silk ribbon unties as royal decree unrolls with gold tassels',
      icon: '📜',
      badge: 'Farman',
      actionBtn: '✦ Unroll Royal Scroll ✦',
      phonePrompt: '✦ Unroll Royal Decree ✦'
    },
    {
      id: 'box',
      name: 'Regal Velvet Jewel Box',
      subtitle: 'Luxury Trunk Hamper',
      desc: 'Jeweled gold clasp unlatches and velvet box lid lifts open in 3D',
      icon: '🎁',
      badge: 'VIP Hamper',
      actionBtn: '✦ Unbox Royal Invitation ✦',
      phonePrompt: '✦ Tap Clasp to Unbox ✦'
    }
  ],
  anniversary: [
    {
      id: 'champagne',
      name: 'Champagne Toast & Bubble Pop',
      subtitle: 'Golden Milestone Celebration',
      desc: 'Champagne cork pops with effervescent bubbles and sparkling flute toast',
      icon: '🥂',
      badge: 'Toast Pop',
      actionBtn: '✦ Pop Champagne Toast ✦',
      phonePrompt: '✦ Pop Champagne to Celebrate ✦'
    },
    {
      id: 'doors',
      name: 'Grand Gala Ballroom Doors',
      subtitle: 'Silver / Golden Jubilee',
      desc: 'Chandelier ballroom double doors glide open to celebration',
      icon: '🏰',
      badge: 'Grand Gala',
      actionBtn: '✦ Enter Jubilee Ballroom ✦',
      phonePrompt: '✦ Open Ballroom Doors ✦'
    },
    {
      id: 'scroll',
      name: 'Milestone Jubilee Decree Scroll',
      subtitle: 'Decades of Love Farman',
      desc: 'Golden anniversary parchment unrolls with milestone love story',
      icon: '📜',
      badge: 'Jubilee Decree',
      actionBtn: '✦ Unroll Milestone Scroll ✦',
      phonePrompt: '✦ Unroll Milestone Farman ✦'
    },
    {
      id: 'box',
      name: 'Keepsake Memory Trunk',
      subtitle: 'Treasured Moments Hamper',
      desc: 'Lacquered keepsake trunk opens to reveal timeless photographs',
      icon: '🎁',
      badge: 'Memory Trunk',
      actionBtn: '✦ Open Memory Trunk ✦',
      phonePrompt: '✦ Tap to Open Keepsake Trunk ✦'
    }
  ]
};

// Flattened list of all reveals for universal lookups
const REVEAL_CATALOG = Object.values(OCCASION_REVEALS).flat();

const THEME_CATALOG = [
  { id: 'gold', name: 'Royal Ivory & Warm Gold', subtitle: 'Timeless Heritage & Warmth', dots: ['#FAF8F5', '#B8976C', '#1C1917'] },
  { id: 'rose', name: 'Rose Quartz & Champagne', subtitle: 'Romantic Pastel & Blush', dots: ['#FCF8F9', '#C0707B', '#23161A'] },
  { id: 'emerald', name: 'Imperial Emerald & Brass', subtitle: 'Regal Forest & Grandeur', dots: ['#F6F9F7', '#2B6949', '#122119'] },
  { id: 'midnight', name: 'Midnight Obsidian Starlight', subtitle: 'Sleek Dark Mode Gala', dots: ['#141210', '#D4AF37', '#FAF7F2'] },
  { id: 'kesar', name: 'Kesar Saffron & Terracotta', subtitle: 'Haldi & Marigold Radiance', dots: ['#FDF9F4', '#C55E24', '#26160D'] },
  { id: 'pichwai', name: 'Banarasi Pichwai Lotus', subtitle: 'Royal Indigo & Pink Lotus', dots: ['#F4F7FB', '#0D1B2A', '#E06D88'] },
  { id: 'chateau', name: 'French Château & Lavender', subtitle: 'Soft Mist & Romantic Herb', dots: ['#F9F8FB', '#8E6FB8', '#1C1526'] },
  { id: 'candy', name: 'Pastel Confetti & Candy Pop', subtitle: 'Playful Birthday & Festive', dots: ['#FFF5F7', '#EC4899', '#831843'] },
  { id: 'sunshine', name: 'Sunshine Yellow & Coral', subtitle: 'Joyful Sunlit Carnival', dots: ['#FFFDF0', '#F59E0B', '#78350F'] }
];

// Dynamically render Quick-Bar Pills on Preview Stage (Stage 1)
function renderRevealQuickBar() {
  const container = document.getElementById('revealStageQuickBar');
  if (!container) return;
  const occasion = appState.occasion || 'wedding';
  const list = OCCASION_REVEALS[occasion] || OCCASION_REVEALS.wedding;

  container.innerHTML = list.map(item => {
    const isActive = (item.id === appState.revealStyle);
    return `
      <button class="reveal-stage-pill ${isActive ? 'active' : ''}" data-reveal="${item.id}" onclick="switchPreviewRevealStyle('${item.id}')">
        <span>${item.icon}</span> ${item.name} <span class="pill-badge">${item.badge}</span>
      </button>
    `;
  }).join('');
}
window.renderRevealQuickBar = renderRevealQuickBar;

// Dynamically render Tab 5 Reveal Options Grid in Customizer (Stage 2)
function renderStudioRevealGrid() {
  const container = document.getElementById('studioRevealGrid');
  if (!container) return;
  const occasion = appState.occasion || 'wedding';
  const list = OCCASION_REVEALS[occasion] || OCCASION_REVEALS.wedding;

  container.innerHTML = list.map(item => {
    const isActive = (item.id === appState.revealStyle);
    return `
      <div class="reveal-card-option ${isActive ? 'active' : ''}" data-reveal="${item.id}" onclick="selectRevealStyle('${item.id}')">
        <div class="reveal-icon-circle">${item.icon}</div>
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span style="font-weight: 600; font-size: 0.9rem;">${item.name}</span>
            <span class="pill-badge" style="font-size: 0.65rem; padding: 2px 6px; border-radius: 10px; background: rgba(184, 151, 108, 0.15); color: var(--gold-dark); font-weight: 700;">${item.badge}</span>
          </div>
          <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 2px;">${item.desc}</div>
        </div>
      </div>
    `;
  }).join('');
}
window.renderStudioRevealGrid = renderStudioRevealGrid;

function renderPreviewShowcase() {
  const container = document.getElementById('revealDemoStage');
  if (!container) return;

  const style = appState.revealStyle || 'wax';
  const h1 = escapeHtml(appState.host1 || 'Shanaya');
  const h2 = escapeHtml(appState.host2 || 'Aarav');
  const dateStr = escapeHtml(appState.date || '2026-11-14');
  const venueStr = escapeHtml(appState.venue || 'The Leela Palace, Udaipur');
  const tagline = escapeHtml(appState.tagline || 'Together with their families');

  let html = '';

  if (style === 'balloon') {
    html = `
      <div class="birthday-balloon-showcase" id="birthdayBalloonShowcase" onclick="triggerRevealAnimation('balloon')">
        <div class="balloon-floating-wrap">
          <div class="balloon-sphere">
            <div class="balloon-highlight"></div>
            <div class="balloon-emoji-face">🥳</div>
            <div class="balloon-knot"></div>
            <div class="balloon-ribbon-tail"></div>
          </div>
          <div class="balloon-tap-prompt">
            🎈 Tap Helium Balloon to Pop &amp; Celebrate!
          </div>
        </div>
        <div class="birthday-card-reveal" id="birthdayCardReveal">
          <div class="birthday-confetti-header">🎉 Happy Milestone Birthday! 🎉</div>
          <div style="font-size: 2.2rem; margin: 4px 0;">🎂🎈✨</div>
          <div class="birthday-card-title">${h1} • ${h2}</div>
          <div class="birthday-card-tagline">"${tagline}"</div>
          <div class="birthday-card-meta">${dateStr} • ${venueStr}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 8px;">
            🎈 Balloon Popped • Party Mode Activated!
          </div>
        </div>
        <button class="reveal-action-pill-btn" id="activeRevealActionBtn" onclick="event.stopPropagation(); triggerRevealAnimation('balloon');">
          <span>✦ Tap Balloon to Pop ✦</span>
        </button>
      </div>
    `;
  } else if (style === 'cake') {
    html = `
      <div class="birthday-cake-showcase" id="birthdayCakeShowcase" onclick="triggerRevealAnimation('cake')">
        <div class="cake-display-wrap">
          <div class="cake-candles-row">
            <div class="cake-candle-item">
              <span class="flame">🔥</span>
              <div class="candle-stick"></div>
            </div>
            <div class="cake-candle-item">
              <span class="flame">🔥</span>
              <div class="candle-stick"></div>
            </div>
            <div class="cake-candle-item">
              <span class="flame">🔥</span>
              <div class="candle-stick"></div>
            </div>
          </div>
          <div class="cake-tier top-tier">🎂</div>
          <div class="cake-tap-prompt">
            🕯️ Make a Wish &amp; Blow Out the Candles!
          </div>
        </div>
        <div class="birthday-card-reveal" id="birthdayCakeCardReveal">
          <div class="birthday-confetti-header">🌟 Birthday Wish Granted! 🌟</div>
          <div style="font-size: 2.2rem; margin: 4px 0;">🥳🍰🎉</div>
          <div class="birthday-card-title">${h1}'s Celebration</div>
          <div class="birthday-card-tagline">"${tagline}"</div>
          <div class="birthday-card-meta">${dateStr} • ${venueStr}</div>
          <div style="font-size: 0.8rem; color: var(--gold-dark); margin-top: 8px; font-weight: 600;">
            ✨ Candles Blown • Let the Party Begin!
          </div>
        </div>
        <button class="reveal-action-pill-btn" id="activeRevealActionBtn" onclick="event.stopPropagation(); triggerRevealAnimation('cake');">
          <span>✦ Blow Out the Candles ✦</span>
        </button>
      </div>
    `;
  } else if (style === 'gift') {
    html = `
      <div class="birthday-gift-showcase" id="birthdayGiftShowcase" onclick="triggerRevealAnimation('gift')">
        <div class="gift-box-3d">
          <div class="gift-ribbon-vertical"></div>
          <div class="gift-ribbon-horizontal"></div>
          <div class="gift-lid">
            <div class="gift-bow">🎀</div>
          </div>
          <div class="gift-tap-prompt">
            🎁 Tap Satin Ribbon to Unbox
          </div>
        </div>
        <div class="birthday-card-reveal" id="birthdayGiftCardReveal">
          <div class="birthday-confetti-header">🎁 Surprise Unboxed! 🎁</div>
          <div style="font-size: 2.2rem; margin: 4px 0;">🎈🎊🥳</div>
          <div class="birthday-card-title">${h1}'s Birthday Invitation</div>
          <div class="birthday-card-tagline">"${tagline}"</div>
          <div class="birthday-card-meta">${dateStr} • ${venueStr}</div>
          <div style="font-size: 0.8rem; color: #7C3AED; margin-top: 8px; font-weight: 600;">
            ✨ Gift Opened • You're Cordially Invited!
          </div>
        </div>
        <button class="reveal-action-pill-btn" id="activeRevealActionBtn" onclick="event.stopPropagation(); triggerRevealAnimation('gift');">
          <span>✦ Unwrap Surprise Gift Box ✦</span>
        </button>
      </div>
    `;
  } else if (style === 'partycard') {
    html = `
      <div class="party-card-showcase" id="partyCardShowcase" onclick="triggerRevealAnimation('partycard')">
        <div class="party-popper-icon">🎉</div>
        <div style="font-family: var(--font-serif); font-size: 1.4rem; font-weight: 700; color: #B45309; margin: 12px 0 6px 0;">
          Party Popper &amp; Confetti
        </div>
        <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 16px;">
          Tap to trigger festive celebratory party popper
        </div>
        <div class="revealed-universal-card">
          <div class="birthday-confetti-header">🎊 It's Time to Celebrate! 🎊</div>
          <div class="birthday-card-title">${h1} • ${h2}</div>
          <div class="birthday-card-tagline">"${tagline}"</div>
          <div class="birthday-card-meta">${dateStr} • ${venueStr}</div>
        </div>
        <button class="reveal-action-pill-btn" id="activeRevealActionBtn" onclick="event.stopPropagation(); triggerRevealAnimation('partycard');">
          <span>✦ Pop Party Confetti ✦</span>
        </button>
      </div>
    `;
  } else if (style === 'doors') {
    html = `
      <div class="palace-doors-showcase" id="palaceDoorsShowcase" onclick="triggerRevealAnimation('doors')">
        <div class="palace-arch-frame"></div>
        <div class="palace-arch-crown">
          <span>✦</span> The Royal Gates <span>✦</span>
        </div>
        <div class="palace-inner-glow"></div>
        <div class="palace-invitation-card-reveal">
          <div class="palace-card-arch-top">The Royal Gates of Celebration</div>
          <div style="font-size: 1.8rem; color: var(--gold-dark); margin-bottom: 4px;">🏰</div>
          <div style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700; color: var(--gold-dark); margin-bottom: 6px;">
            ${h2} &amp; ${h1}
          </div>
          <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px; font-style: italic;">
            ${tagline}
          </div>
          <div style="font-size: 0.82rem; color: var(--text-primary); font-weight: 600;">
            ${dateStr} • ${venueStr}
          </div>
          <div class="scroll-wax-stamp-bottom" style="margin-top: 14px;">
            ✦ Imperial Darwaza Unlocked ✦
          </div>
        </div>
        <div class="palace-doors-stage">
          <div class="palace-door-half left-door">
            <div class="door-jaali-panel">
              <div class="door-lion-knocker">🦁</div>
            </div>
          </div>
          <div class="palace-door-half right-door">
            <div class="door-jaali-panel">
              <div class="door-lion-knocker">🦁</div>
            </div>
          </div>
        </div>
        <button class="reveal-action-pill-btn" id="activeRevealActionBtn" onclick="event.stopPropagation(); triggerRevealAnimation('doors');">
          <span>✦ Open Palace Gates ✦</span>
        </button>
      </div>
    `;
  } else if (style === 'scroll') {
    html = `
      <div class="royal-scroll-showcase" id="royalScrollShowcase" onclick="triggerRevealAnimation('scroll')">
        <div class="scroll-rod scroll-rod-top">
          <div class="scroll-finial"></div>
          <span class="scroll-rod-plaque">॥ श्री गणेशाय नमः ॥  SHAHI FARMAN</span>
          <div class="scroll-finial"></div>
        </div>
        <div class="scroll-parchment-sheet">
          <div class="scroll-sash-ribbon">
            <div class="scroll-royal-medallion">👑
              <div class="scroll-silk-tassels">
                <div class="scroll-tassel"></div>
                <div class="scroll-tassel"></div>
              </div>
            </div>
          </div>
          <div class="scroll-gold-crest">⚜️</div>
          <div class="scroll-shloka-text">॥ मांगलिक वैवाहिक आमंत्रणम् ॥</div>
          <div class="scroll-royal-header">Royal Decree of Sacred Union</div>
          <p class="scroll-blessing-text">
            "By the divine grace of the Almighty and the loving blessings of our ancestors &amp; families, we joyfully invite you to celebrate the sacred union of"
          </p>
          <div class="scroll-couple-title">
            ${h2} &amp; ${h1}
          </div>
          <div class="scroll-meta-line">
            ${dateStr} • ${venueStr}
          </div>
          <div class="scroll-wax-stamp-bottom">
            ✦ Certified Royal Farman ✦
          </div>
        </div>
        <div class="scroll-rod scroll-rod-bottom">
          <div class="scroll-finial"></div>
          <div class="scroll-finial"></div>
        </div>
        <button class="reveal-action-pill-btn" id="activeRevealActionBtn" onclick="event.stopPropagation(); triggerRevealAnimation('scroll');">
          <span>✦ Unroll Royal Scroll ✦</span>
        </button>
      </div>
    `;
  } else if (style === 'box') {
    html = `
      <div class="jewel-box-showcase" id="jewelBoxShowcase" onclick="triggerRevealAnimation('box')">
        <div class="jewel-box-3d">
          <div class="jewel-box-corner top-left"></div>
          <div class="jewel-box-corner top-right"></div>
          <div class="jewel-box-corner bottom-left"></div>
          <div class="jewel-box-corner bottom-right"></div>
          <div class="jewel-box-card-content">
            <div style="font-size: 2rem; margin-bottom: 4px;">💍</div>
            <div style="font-family: var(--font-serif); font-size: 1.3rem; font-weight: 700; color: var(--gold-dark);">
              ${h2} &amp; ${h1}
            </div>
            <div style="font-size: 0.82rem; color: var(--text-secondary); margin: 6px 0;">
              VIP Haute Invitation Trunk
            </div>
            <div style="font-size: 0.76rem; color: var(--text-muted);">
              ${dateStr} • ${venueStr}
            </div>
          </div>
          <div class="jewel-box-lid" id="jewelBoxLid">
            <div style="font-family: var(--font-serif); font-size: 0.85rem; letter-spacing: 0.18em; color: var(--gold-light); text-transform: uppercase;">
              ✦ Nimantra Haute Trunk ✦
            </div>
            <div class="jewel-box-clasp">🔒</div>
            <div style="font-size: 0.74rem; color: rgba(255,255,255,0.75); margin-top: 8px;">
              Tap Gold Clasp to Unbox
            </div>
          </div>
          <button class="reveal-action-pill-btn" id="activeRevealActionBtn" onclick="event.stopPropagation(); triggerRevealAnimation('box');">
            <span>✦ Unbox Royal Invitation ✦</span>
          </button>
        </div>
      </div>
    `;
  } else if (style === 'doorbell') {
    html = `
      <div class="doorbell-showcase" id="doorbellShowcase" onclick="triggerRevealAnimation('doorbell')">
        <div class="doorbell-button-unit">
          <div class="doorbell-ring-circle">🔔</div>
          <div style="font-size: 0.8rem; margin-top: 14px; font-weight: 600; letter-spacing: 0.05em;">RING BELL</div>
        </div>
        <div class="revealed-universal-card">
          <div class="birthday-confetti-header">🏡 Welcome to Our New Home 🏡</div>
          <div style="font-size: 2.2rem; margin: 4px 0;">🪔🌸✨</div>
          <div class="birthday-card-title">${h1} • ${h2}</div>
          <div class="birthday-card-tagline">"${tagline}"</div>
          <div class="birthday-card-meta">${dateStr} • ${venueStr}</div>
        </div>
        <button class="reveal-action-pill-btn" id="activeRevealActionBtn" onclick="event.stopPropagation(); triggerRevealAnimation('doorbell');">
          <span>✦ Ring Doorbell to Enter ✦</span>
        </button>
      </div>
    `;
  } else if (style === 'ribbon') {
    html = `
      <div class="ribbon-showcase" id="ribbonShowcase" onclick="triggerRevealAnimation('ribbon')">
        <div class="ceremonial-scissors">✂️</div>
        <div class="ceremonial-ribbon-bar">
          ✦ GRIHA PRAVESH INAUGURATION ✦
        </div>
        <div class="revealed-universal-card">
          <div class="birthday-confetti-header">🏡 Auspicious Housewarming 🏡</div>
          <div style="font-size: 2.2rem; margin: 4px 0;">🌸🪔✨</div>
          <div class="birthday-card-title">${h1} • ${h2}</div>
          <div class="birthday-card-tagline">"${tagline}"</div>
          <div class="birthday-card-meta">${dateStr} • ${venueStr}</div>
        </div>
        <button class="reveal-action-pill-btn" id="activeRevealActionBtn" onclick="event.stopPropagation(); triggerRevealAnimation('ribbon');">
          <span>✦ Snip Ceremonial Ribbon ✦</span>
        </button>
      </div>
    `;
  } else if (style === 'ringbox') {
    html = `
      <div class="ringbox-showcase" id="ringboxShowcase" onclick="triggerRevealAnimation('ringbox')">
        <div class="ringbox-velvet-casket">
          <div class="ringbox-solitaire">💍</div>
          <div style="font-size: 0.78rem; color: #FDE047; margin-top: 10px; font-weight: 700; letter-spacing: 0.1em;">SHE SAID YES!</div>
        </div>
        <div class="revealed-universal-card">
          <div class="birthday-confetti-header">💍 Sagai &amp; Engagement Ceremony 💍</div>
          <div class="birthday-card-title">${h2} &amp; ${h1}</div>
          <div class="birthday-card-tagline">"${tagline}"</div>
          <div class="birthday-card-meta">${dateStr} • ${venueStr}</div>
        </div>
        <button class="reveal-action-pill-btn" id="activeRevealActionBtn" onclick="event.stopPropagation(); triggerRevealAnimation('ringbox');">
          <span>✦ Open Velvet Ring Box ✦</span>
        </button>
      </div>
    `;
  } else if (style === 'champagne') {
    html = `
      <div class="champagne-showcase" id="champagneShowcase" onclick="triggerRevealAnimation('champagne')">
        <div class="champagne-bottles-row">🥂🍾</div>
        <div style="font-family: var(--font-serif); font-size: 1.4rem; font-weight: 700; color: #FBBF24; margin-top: 12px;">
          Milestone Jubilee Celebration
        </div>
        <div class="revealed-universal-card">
          <div class="birthday-confetti-header">🥂 Cheers to 25 Years! 🥂</div>
          <div class="birthday-card-title">${h1} &amp; ${h2}</div>
          <div class="birthday-card-tagline">"${tagline}"</div>
          <div class="birthday-card-meta">${dateStr} • ${venueStr}</div>
        </div>
        <button class="reveal-action-pill-btn" id="activeRevealActionBtn" onclick="event.stopPropagation(); triggerRevealAnimation('champagne');">
          <span>✦ Pop Champagne Toast ✦</span>
        </button>
      </div>
    `;
  } else {
    // Default Wax-Seal Envelope
    html = `
      <div class="envelope-demo-container" onclick="triggerRevealAnimation('wax')">
        <div class="envelope-card-art">
          <img src="${appState.coverPhoto || 'assets/images/card.jpg'}" alt="Luxury gold foil wedding invitation" style="width: 100%; display: block;" />
          <button class="wax-seal-btn" id="waxSealBtn" onclick="event.stopPropagation(); triggerRevealAnimation('wax');">
            <span>✦ Tap Wax Seal to Open</span>
          </button>
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}
window.renderPreviewShowcase = renderPreviewShowcase;

function switchPreviewRevealStyle(revealId) {
  appState.revealStyle = revealId;

  // Update Preview Stage quick-bar pills
  document.querySelectorAll('.reveal-stage-pill').forEach(pill => {
    if (pill.getAttribute('data-reveal') === revealId) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  // Update Studio Tab 5 cards
  document.querySelectorAll('#studioRevealGrid .reveal-card-option').forEach(card => {
    if (card.getAttribute('data-reveal') === revealId) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  renderPreviewShowcase();

  const revealMsg = document.getElementById('revealMessage');
  if (revealMsg) revealMsg.style.display = 'none';

  // Synchronize Phone Preview Screen in Customizer immediately
  renderPhoneHeroReveal(revealId);
  updatePhoneRevealStyle(revealId);
  playChime();
}
window.switchPreviewRevealStyle = switchPreviewRevealStyle;

function selectRevealStyle(revealId) {
  switchPreviewRevealStyle(revealId);
  const found = REVEAL_CATALOG.find(r => r.id === revealId);
  const title = found ? found.name : revealId;
  showToast(`✨ Selected reveal style: ${title}`);
}
window.selectRevealStyle = selectRevealStyle;

/* ==========================================================================
   DYNAMIC PHONE HERO REVEAL RENDERER & INTERACTIVE TOGGLES
   ========================================================================== */
function renderPhoneHeroReveal(style = appState.revealStyle) {
  const container = document.getElementById('phoneHeroRevealContainer');
  if (!container) return;

  const h1 = escapeHtml(appState.host1 || 'Shanaya');
  const h2 = escapeHtml(appState.host2 || 'Aarav');
  const coupleDisplay = (appState.occasion === 'birthday' || appState.occasion === 'babyshower') ? h1 : `${h2} & ${h1}`;
  const tagline = escapeHtml(appState.tagline || 'Together with their families');
  const monogram = escapeHtml(appState.monogram || 'S & A');
  const hashtag = escapeHtml(appState.hashtag || '#AaravWedsShanaya');
  const dateVal = appState.date || '2026-11-14';
  const dateObj = new Date(dateVal);
  const formattedDate = !isNaN(dateObj) ? dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '14 Nov 2026';
  const venueShort = escapeHtml((appState.venue || 'The Leela Palace, Udaipur').split(',')[0]);
  const coverPhoto = appState.coverPhoto || 'assets/images/couple.jpg';

  let html = '';

  if (style === 'balloon') {
    html = `
      <div class="phone-mini-balloon-wrap" onclick="togglePhoneBalloonPop()">
        <div style="font-size: 2.2rem; margin-bottom: 4px;">🎈</div>
        <div style="font-weight: 700; font-size: 0.95rem; color: #BE123C;">${h1}'s Birthday</div>
        <div style="font-size: 0.72rem; color: var(--text-secondary); margin: 3px 0;">${tagline}</div>
        <div style="font-size: 0.75rem; font-weight: 600; color: var(--gold-dark);">${formattedDate} • ${venueShort}</div>
        <div style="margin-top: 8px; font-size: 0.7rem; color: #E11D48; font-weight: 700;">✦ Tap to Pop &amp; Celebrate ✦</div>
      </div>
    `;
  } else if (style === 'cake') {
    html = `
      <div class="phone-mini-cake-wrap" onclick="togglePhoneCakeBlow()">
        <div style="font-size: 2.2rem; margin-bottom: 4px;">🎂</div>
        <div style="font-weight: 700; font-size: 0.95rem; color: #B45309;">${h1}'s Birthday</div>
        <div style="font-size: 0.72rem; color: var(--text-secondary); margin: 3px 0;">${tagline}</div>
        <div style="font-size: 0.75rem; font-weight: 600; color: var(--gold-dark);">${formattedDate} • ${venueShort}</div>
        <div style="margin-top: 8px; font-size: 0.7rem; color: #D97706; font-weight: 700;">✦ Tap to Blow Candles ✦</div>
      </div>
    `;
  } else if (style === 'gift') {
    html = `
      <div class="phone-mini-gift-wrap" onclick="togglePhoneGiftUnbox()">
        <div style="font-size: 2.2rem; margin-bottom: 4px;">🎁</div>
        <div style="font-weight: 700; font-size: 0.95rem; color: #6D28D9;">${h1}'s Birthday</div>
        <div style="font-size: 0.72rem; color: var(--text-secondary); margin: 3px 0;">${tagline}</div>
        <div style="font-size: 0.75rem; font-weight: 600; color: var(--gold-dark);">${formattedDate} • ${venueShort}</div>
        <div style="margin-top: 8px; font-size: 0.7rem; color: #7C3AED; font-weight: 700;">✦ Tap to Unbox Gift ✦</div>
      </div>
    `;
  } else if (style === 'doorbell') {
    html = `
      <div class="phone-mini-doorbell-wrap" onclick="togglePhoneDoorbell()">
        <div style="font-size: 2.2rem; margin-bottom: 4px;">🔔</div>
        <div style="font-weight: 700; font-size: 0.95rem; color: #0284C7;">${coupleDisplay}</div>
        <div style="font-size: 0.72rem; color: var(--text-secondary); margin: 3px 0;">${tagline}</div>
        <div style="font-size: 0.75rem; font-weight: 600; color: var(--gold-dark);">${formattedDate} • ${venueShort}</div>
        <div style="margin-top: 8px; font-size: 0.7rem; color: #0284C7; font-weight: 700;">✦ Ring Doorbell to Enter ✦</div>
      </div>
    `;
  } else if (style === 'ringbox') {
    html = `
      <div class="phone-mini-ring-wrap" onclick="togglePhoneRingPop()">
        <div style="font-size: 2.2rem; margin-bottom: 4px;">💍</div>
        <div style="font-weight: 700; font-size: 0.95rem; color: #831843;">${coupleDisplay}</div>
        <div style="font-size: 0.72rem; color: var(--text-secondary); margin: 3px 0;">${tagline}</div>
        <div style="font-size: 0.75rem; font-weight: 600; color: var(--gold-dark);">${formattedDate} • ${venueShort}</div>
        <div style="margin-top: 8px; font-size: 0.7rem; color: #BE185D; font-weight: 700;">✦ Tap Ring Box to Open ✦</div>
      </div>
    `;
  } else if (style === 'champagne') {
    html = `
      <div class="phone-mini-toast-wrap" onclick="togglePhoneChampagne()">
        <div style="font-size: 2.2rem; margin-bottom: 4px;">🥂</div>
        <div style="font-weight: 700; font-size: 0.95rem; color: #B45309;">${coupleDisplay}</div>
        <div style="font-size: 0.72rem; color: var(--text-secondary); margin: 3px 0;">${tagline}</div>
        <div style="font-size: 0.75rem; font-weight: 600; color: var(--gold-dark);">${formattedDate} • ${venueShort}</div>
        <div style="margin-top: 8px; font-size: 0.7rem; color: #D97706; font-weight: 700;">✦ Pop Champagne to Toast ✦</div>
      </div>
    `;
  } else if (style === 'scroll') {
    html = `
      <div class="phone-mini-scroll-wrap ${appState.phoneScrollUnrolled ? 'unrolled' : ''}" id="phoneMiniScroll" onclick="togglePhoneScrollUnroll()">
        <div class="phone-scroll-rod top">
          <div class="phone-scroll-finial"></div>
          <span class="phone-scroll-rod-title">॥ श्री गणेशाय नमः ॥  SHAHI FARMAN</span>
          <div class="phone-scroll-finial"></div>
        </div>
        <div class="phone-scroll-parchment">
          <div class="phone-scroll-sash">
            <div class="phone-scroll-wax-seal">👑</div>
            <div class="phone-scroll-sash-text">Tap to Unroll Farman</div>
          </div>
          <div class="phone-scroll-crest">⚜️</div>
          <div class="phone-scroll-shloka">॥ मांगलिक वैवाहिक आमंत्रणम् ॥</div>
          <div class="phone-scroll-tagline">${tagline}</div>
          <div class="phone-scroll-couple-title">${coupleDisplay}</div>
          <div class="phone-scroll-meta">${formattedDate} • ${venueShort}</div>
          <div class="phone-scroll-photo-frame">
            <img src="${coverPhoto}" alt="Couple Portrait" />
          </div>
          <div class="phone-scroll-seal-mark">✦ Certified Royal Farman ✦</div>
        </div>
        <div class="phone-scroll-rod bottom">
          <div class="phone-scroll-finial"></div>
          <div class="phone-scroll-finial"></div>
        </div>
      </div>
    `;
  } else if (style === 'doors') {
    html = `
      <div class="phone-mini-doors-wrap ${appState.phoneDoorsOpen ? 'doors-open' : ''}" id="phoneMiniDoors" onclick="togglePhoneDoorsOpen()">
        <div class="phone-mini-arch-top">
          <span>🏰 HERITAGE PALACE GATES</span>
        </div>
        <div class="phone-mini-doors-frame">
          <div class="phone-mini-door left">
            <div class="phone-mini-door-knocker">🦁</div>
          </div>
          <div class="phone-mini-door right">
            <div class="phone-mini-door-knocker">🦁</div>
          </div>
          <div class="phone-mini-doors-interior">
            <div class="phone-mini-interior-crest">✦ Royal Ballroom ✦</div>
            <div class="phone-mini-interior-names">${coupleDisplay}</div>
            <div class="phone-mini-interior-meta">${formattedDate} • ${venueShort}</div>
            <div style="font-size: 0.65rem; color: var(--gold-dark); margin-top: 6px; font-weight: 600;">✦ Gates Open • Welcome Guests ✦</div>
          </div>
        </div>
      </div>
    `;
  } else if (style === 'box') {
    html = `
      <div class="phone-mini-box-wrap ${appState.phoneBoxOpen ? 'box-open' : ''}" id="phoneMiniBox" onclick="togglePhoneBoxOpen()">
        <div class="phone-mini-box-lid">
          <div style="font-size: 0.68rem; letter-spacing: 0.15em; color: var(--gold-light); font-weight: 700; text-transform: uppercase;">✦ VIP Royal Trunk ✦</div>
          <div style="font-size: 1.25rem;">🔒</div>
          <div style="font-size: 0.62rem; color: rgba(255,255,255,0.7);">Tap Gold Clasp to Open</div>
        </div>
        <div class="phone-mini-box-content">
          <div style="font-size: 1.4rem; margin-bottom: 2px;">💍</div>
          <div style="font-family: var(--font-serif); font-size: 1.25rem; font-weight: 700; color: var(--gold-dark);">${coupleDisplay}</div>
          <div style="font-size: 0.68rem; color: var(--text-secondary); margin: 3px 0;">${tagline}</div>
          <div style="font-size: 0.7rem; color: var(--text-muted);">${formattedDate} • ${venueShort}</div>
        </div>
      </div>
    `;
  } else {
    html = `
      <div class="phone-mini-envelope-wrap">
        <div class="phone-photo-box">
          <div class="phone-monogram-pill" id="phoneMonogramPill">${monogram}</div>
          <img src="${coverPhoto}" alt="Couple Preview" id="phonePhotoImg" />
          <div class="phone-hashtag-pill" id="phoneHashtagPill" onclick="copyHashtag()" title="Click to copy hashtag">${hashtag}</div>
        </div>
        <div style="text-align: center; margin: 8px 0;">
          <div style="font-size: 0.72rem; color: var(--gold-dark); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">${tagline}</div>
          <div class="phone-couple-title">${coupleDisplay}</div>
          <div class="phone-event-meta">${formattedDate} • ${venueShort}</div>
        </div>
        <div class="phone-wax-interactive-box ${appState.phoneWaxCracked ? 'cracked' : ''}" onclick="togglePhoneWaxCrack()">
          <div style="font-size: 1.4rem; margin-bottom: 4px;">✉️</div>
          <div style="font-weight: 600; font-size: 0.85rem;">✦ Tap Wax Seal to Unfurl ✦</div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">See ceremony itinerary & RSVP</div>
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}
window.renderPhoneHeroReveal = renderPhoneHeroReveal;

function togglePhoneBalloonPop() {
  playPopSound();
  playChime();
  showToast('🎈 Balloon popped! Confetti showered!');
}
window.togglePhoneBalloonPop = togglePhoneBalloonPop;

function togglePhoneCakeBlow() {
  playChime();
  showToast('🎂 Birthday candles blown! Wish made!');
}
window.togglePhoneCakeBlow = togglePhoneCakeBlow;

function togglePhoneGiftUnbox() {
  playJewelBoxSound();
  playChime();
  showToast('🎁 Gift box unboxed!');
}
window.togglePhoneGiftUnbox = togglePhoneGiftUnbox;

function togglePhoneDoorbell() {
  playChime();
  showToast('🔔 Doorbell rung! Welcome home!');
}
window.togglePhoneDoorbell = togglePhoneDoorbell;

function togglePhoneRingPop() {
  playJewelBoxSound();
  playChime();
  showToast('💍 Ring box opened! She said yes!');
}
window.togglePhoneRingPop = togglePhoneRingPop;

function togglePhoneChampagne() {
  playPopSound();
  playChime();
  showToast('🥂 Champagne popped! Cheers to the milestone!');
}
window.togglePhoneChampagne = togglePhoneChampagne;

function togglePhoneScrollUnroll() {
  appState.phoneScrollUnrolled = !appState.phoneScrollUnrolled;
  const el = document.getElementById('phoneMiniScroll');
  if (el) {
    if (appState.phoneScrollUnrolled) {
      el.classList.add('unrolled');
      playScrollSound();
      playChime();
      showToast('📜 Shahi Farman Unrolled!');
    } else {
      el.classList.remove('unrolled');
    }
  }
}
window.togglePhoneScrollUnroll = togglePhoneScrollUnroll;

function togglePhoneDoorsOpen() {
  appState.phoneDoorsOpen = !appState.phoneDoorsOpen;
  const el = document.getElementById('phoneMiniDoors');
  if (el) {
    if (appState.phoneDoorsOpen) {
      el.classList.add('doors-open');
      playPalaceDoorsSound();
      playChime();
      showToast('🏰 Palace Gates Opened!');
    } else {
      el.classList.remove('doors-open');
    }
  }
}
window.togglePhoneDoorsOpen = togglePhoneDoorsOpen;

function togglePhoneBoxOpen() {
  appState.phoneBoxOpen = !appState.phoneBoxOpen;
  const el = document.getElementById('phoneMiniBox');
  if (el) {
    if (appState.phoneBoxOpen) {
      el.classList.add('box-open');
      playJewelBoxSound();
      playChime();
      showToast('🎁 Regal Trunk Opened!');
    } else {
      el.classList.remove('box-open');
    }
  }
}
window.togglePhoneBoxOpen = togglePhoneBoxOpen;

function togglePhoneWaxCrack() {
  appState.phoneWaxCracked = !appState.phoneWaxCracked;
  playSealCrack();
  playChime();
  showToast('✉️ Wax seal cracked open!');
}
window.togglePhoneWaxCrack = togglePhoneWaxCrack;

function updatePhoneRevealStyle(style = appState.revealStyle) {
  renderPhoneHeroReveal(style);
}
window.updatePhoneRevealStyle = updatePhoneRevealStyle;

function renderThemePaletteGrid() {
  const grid = document.getElementById('themePaletteGrid');
  if (!grid) return;

  grid.innerHTML = THEME_CATALOG.map(t => {
    const isActive = (appState.theme === t.id);
    const dotElements = t.dots.map(d => `<span class="theme-dot" style="background: ${d};"></span>`).join('');
    return `
      <div class="theme-palette-card ${isActive ? 'active' : ''}" data-theme-card="${t.id}" onclick="applyTheme('${t.id}')">
        <div>
          <div style="font-weight: 600; font-size: 0.86rem; color: var(--text-primary);">${t.name}</div>
          <div style="font-size: 0.74rem; color: var(--text-muted);">${t.subtitle}</div>
        </div>
        <div class="theme-palette-dots">
          ${dotElements}
        </div>
      </div>
    `;
  }).join('');
}
window.renderThemePaletteGrid = renderThemePaletteGrid;

function promptCustomThemeRequest() {
  const choice = prompt("Enter a custom theme or reveal animation idea you would like to add (e.g. 'Velvet Theatre Curtains', '3D Storybook Flip', 'Phoolon Ki Barsaat Petal Shower', or custom wedding aesthetic):", "Velvet Theatre Curtains");
  if (choice && choice.trim()) {
    showToast(`✨ Custom theme idea recorded: "${choice.trim()}"! Added to your bespoke customization options.`);
  }
}
window.promptCustomThemeRequest = promptCustomThemeRequest;

function setOccasion(occasionType) {
  appState.occasion = occasionType;

  // Determine active reveals for this occasion
  const occasionReveals = OCCASION_REVEALS[occasionType] || OCCASION_REVEALS.wedding;
  // Automatically activate the first reveal for this occasion
  appState.revealStyle = occasionReveals[0].id;

  const headerTitle = document.getElementById('studioHeaderTitle');
  const modalOccasionTitle = document.getElementById('modalOccasionTitle');
  const label1 = document.getElementById('labelHost1');
  const label2 = document.getElementById('labelHost2');
  const select = document.getElementById('studioOccasionSelect');
  const photo = document.getElementById('phonePhotoImg');
  const chosenIcon = document.getElementById('chosenOccasionIcon');
  const chosenTitle = document.getElementById('chosenOccasionTitle');
  const chosenDesc = document.getElementById('chosenOccasionDesc');

  if (select) select.value = occasionType;

  if (occasionType === 'wedding') {
    if (headerTitle) headerTitle.textContent = 'Royal Wedding Invitation Studio';
    if (modalOccasionTitle) modalOccasionTitle.textContent = 'The Royal Wedding Invitation';
    if (chosenIcon) chosenIcon.textContent = '💍';
    if (chosenTitle) chosenTitle.textContent = 'Royal Wedding Celebration';
    if (chosenDesc) chosenDesc.textContent = 'Curated bespoke template for Pheras, Sangeet & Reception';
    if (label1) label1.textContent = 'Bride Name';
    if (label2) label2.textContent = 'Groom Name';
    if (photo) photo.src = 'assets/images/couple.jpg';
    appState.host1 = 'Shanaya';
    appState.host2 = 'Aarav';
    appState.tagline = 'Together with their families';
    appState.monogram = 'S & A';
    appState.hashtag = '#AaravWedsShanaya';
    appState.date = '2026-11-14';
    appState.venue = 'The Leela Palace, Udaipur';
    appState.venueAddress = 'Lake Pichola, Udaipur, Rajasthan 313001, India';
    appState.slug = 'aarav-and-shanaya';
    appState.coverPhoto = 'assets/images/couple.jpg';
    appState.events = [
      { id: 'ev-1', title: 'Mehendi & Haldi Rasam', icon: '🌸', date: '2026-11-13', time: '11:00 AM', venue: 'Guava Orchard & Poolside Deck', dressCode: 'Bright Yellow & Floral Pastels', mapQuery: 'The Leela Palace, Udaipur' },
      { id: 'ev-2', title: 'Sangeet & Cocktail Soiree', icon: '🥁', date: '2026-11-13', time: '6:30 PM', venue: 'Grand Mewar Ballroom', dressCode: 'Glitz, Glamour & Indo-Western Velvet', mapQuery: 'The Leela Palace, Udaipur' },
      { id: 'ev-3', title: 'The Royal Pheras (Wedding Ceremony)', icon: '💍', date: '2026-11-14', time: '5:00 PM', venue: 'Lake Palace Sunset Mandap', dressCode: 'Regal Indian Traditional & Pastels', mapQuery: 'The Leela Palace, Udaipur' },
      { id: 'ev-4', title: 'The Grand Royal Reception Dinner', icon: '🥂', date: '2026-11-14', time: '8:30 PM', venue: 'Courtyard of Courtesies', dressCode: 'Black Tie / Royal Silk Sherwanis', mapQuery: 'The Leela Palace, Udaipur' }
    ];
  } else if (occasionType === 'birthday') {
    if (headerTitle) headerTitle.textContent = 'Playful Milestone Birthday Studio';
    if (modalOccasionTitle) modalOccasionTitle.textContent = 'Playful Milestone Birthday Invitation';
    if (chosenIcon) chosenIcon.textContent = '🎂';
    if (chosenTitle) chosenTitle.textContent = 'Milestone Birthday Celebration';
    if (chosenDesc) chosenDesc.textContent = 'Animated party theme with balloons, cake blowing, confetti & fun itinerary';
    if (label1) label1.textContent = 'Celebrant / Kid Name';
    if (label2) label2.textContent = 'Milestone / Turning Age';
    if (photo) photo.src = 'assets/images/card.jpg';
    appState.host1 = 'Shanaya';
    appState.host2 = 'Turning 1st Birthday';
    appState.tagline = 'Join us for fun, laughter, confetti & cake!';
    appState.monogram = 'S ★ 1';
    appState.hashtag = '#ShanayaTurnsOne';
    appState.date = '2026-11-20';
    appState.venue = 'The Grand Celebration Terrace, Mumbai';
    appState.venueAddress = 'Bandra Kurla Complex, Mumbai, Maharashtra 400051';
    appState.slug = 'shanaya-turns-one';
    appState.coverPhoto = 'assets/images/card.jpg';
    appState.events = [
      { id: 'ev-b1', title: 'Grand Welcome & Magic Show', icon: '🎩', date: '2026-11-20', time: '4:30 PM', venue: 'Celebration Terrace', dressCode: 'Party Chic / Fun Colors', mapQuery: 'Bandra Kurla Complex, Mumbai' },
      { id: 'ev-b2', title: 'Cake Cutting & Fireworks', icon: '🎂', date: '2026-11-20', time: '6:30 PM', venue: 'Main Banquet Deck', dressCode: 'Glamour / Sparkles', mapQuery: 'Bandra Kurla Complex, Mumbai' },
      { id: 'ev-b3', title: 'Dinner, DJ & Dance Party', icon: '🍕', date: '2026-11-20', time: '7:30 PM', venue: 'Poolside Lawn', dressCode: 'Dancing Shoes Required', mapQuery: 'Bandra Kurla Complex, Mumbai' }
    ];
  } else if (occasionType === 'housewarming') {
    if (headerTitle) headerTitle.textContent = 'Griha Pravesh Housewarming Studio';
    if (modalOccasionTitle) modalOccasionTitle.textContent = 'Griha Pravesh Housewarming Invitation';
    if (chosenIcon) chosenIcon.textContent = '🪔';
    if (chosenTitle) chosenTitle.textContent = 'Griha Pravesh (Housewarming)';
    if (chosenDesc) chosenDesc.textContent = 'Traditional sacred theme for Ganesh Puja, Hawan, Vastu Shanti & Mahaprasad';
    if (label1) label1.textContent = 'Family Name';
    if (label2) label2.textContent = 'New Abode Name (e.g. Ashirwad)';
    if (photo) photo.src = 'assets/images/card.jpg';
    appState.host1 = 'The Sharma Family';
    appState.host2 = 'Villa Anandam';
    appState.tagline = 'A new beginning filled with love, laughter and divine blessings';
    appState.monogram = 'ॐ शुभ';
    appState.hashtag = '#SharmaGrihaPravesh';
    appState.date = '2026-11-18';
    appState.venue = 'Flat 1402, Godrej Woods, Bengaluru';
    appState.venueAddress = 'Sarjapur Main Road, Bengaluru, Karnataka 560102';
    appState.slug = 'sharma-griha-pravesh';
    appState.coverPhoto = 'assets/images/card.jpg';
    appState.events = [
      { id: 'ev-h1', title: 'Ganesh Puja & Navagraha Hawan', icon: '🪔', date: '2026-11-18', time: '9:00 AM', venue: 'Living Courtyard', dressCode: 'Traditional Indian Ethnic', mapQuery: 'Sarjapur Main Road, Bengaluru' },
      { id: 'ev-h2', title: 'Vastu Shanti & House Blessings', icon: '🌸', date: '2026-11-18', time: '11:30 AM', venue: 'Main Hall', dressCode: 'Festive Pastel Attire', mapQuery: 'Sarjapur Main Road, Bengaluru' },
      { id: 'ev-h3', title: 'Mahaprasad & Festive Lunch', icon: '🍲', date: '2026-11-18', time: '1:00 PM', venue: 'Rooftop Garden', dressCode: 'Traditional Elegance', mapQuery: 'Sarjapur Main Road, Bengaluru' }
    ];
  } else if (occasionType === 'engagement') {
    if (headerTitle) headerTitle.textContent = 'Sagai & Engagement Invitation Studio';
    if (modalOccasionTitle) modalOccasionTitle.textContent = 'Sagai & Engagement Invitation';
    if (chosenIcon) chosenIcon.textContent = '💎';
    if (chosenTitle) chosenTitle.textContent = 'Sagai & Engagement Ceremony';
    if (chosenDesc) chosenDesc.textContent = 'Romantic theme for Ring Exchange, Cocktail Soirée & Love Story';
    if (label1) label1.textContent = 'Bride-to-be Name';
    if (label2) label2.textContent = 'Groom-to-be Name';
    if (photo) photo.src = 'assets/images/couple.jpg';
    appState.host1 = 'Shanaya';
    appState.host2 = 'Aarav';
    appState.tagline = 'Together with our families, we begin our journey forever';
    appState.monogram = 'S & A';
    appState.hashtag = '#AaravShanayaSagai';
    appState.date = '2026-10-30';
    appState.venue = 'The Oberoi Rajvilas, Jaipur';
    appState.venueAddress = 'Goner Road, Jaipur, Rajasthan 302031';
    appState.slug = 'aarav-shanaya-sagai';
    appState.coverPhoto = 'assets/images/couple.jpg';
  } else if (occasionType === 'babyshower') {
    if (headerTitle) headerTitle.textContent = 'Godh Bharai & Baby Shower Studio';
    if (modalOccasionTitle) modalOccasionTitle.textContent = 'Godh Bharai & Baby Shower Invitation';
    if (chosenIcon) chosenIcon.textContent = '🍼';
    if (chosenTitle) chosenTitle.textContent = 'Godh Bharai & Baby Shower';
    if (chosenDesc) chosenDesc.textContent = 'Joyful celebration for Mom-to-be with Blessings, Games & Family Feast';
    if (label1) label1.textContent = 'Mom-to-be Name';
    if (label2) label2.textContent = 'Dad-to-be / Family Name';
    if (photo) photo.src = 'assets/images/card.jpg';
    appState.host1 = 'Pooja';
    appState.host2 = 'Rohan';
    appState.tagline = 'A shower of love and blessings for our upcoming miracle';
    appState.monogram = '🍼 P & R';
    appState.hashtag = '#PoojaGodhBharai';
    appState.date = '2026-11-25';
    appState.venue = 'Emerald Courtyard, Pune';
    appState.venueAddress = 'Koregaon Park, Pune, Maharashtra 411001';
    appState.slug = 'pooja-baby-shower';
    appState.coverPhoto = 'assets/images/card.jpg';
  } else if (occasionType === 'anniversary') {
    if (headerTitle) headerTitle.textContent = 'Golden Milestone Anniversary Studio';
    if (modalOccasionTitle) modalOccasionTitle.textContent = 'Milestone Anniversary Celebration';
    if (chosenIcon) chosenIcon.textContent = '🥂';
    if (chosenTitle) chosenTitle.textContent = 'Milestone Anniversary Celebration';
    if (chosenDesc) chosenDesc.textContent = 'Regal Silver & Golden Jubilee tribute to 25+ Years of Togetherness';
    if (label1) label1.textContent = 'Partner 1 Name';
    if (label2) label2.textContent = 'Partner 2 Name';
    if (photo) photo.src = 'assets/images/couple.jpg';
    appState.host1 = 'Sunita';
    appState.host2 = 'Rajesh';
    appState.tagline = 'Celebrating 25 Years of Unconditional Love & Togetherness';
    appState.monogram = '25 Years';
    appState.hashtag = '#SunitaRajesh25';
    appState.date = '2026-12-10';
    appState.venue = 'The Taj Mahal Palace, Mumbai';
    appState.venueAddress = 'Apollo Bunder, Colaba, Mumbai, Maharashtra 400001';
    appState.slug = 'sunita-rajesh-jubilee';
    appState.coverPhoto = 'assets/images/couple.jpg';
  }

  // Synchronize HTML Input Fields in Customizer Tabs
  const iH1 = document.getElementById('inputHost1');
  if (iH1) iH1.value = appState.host1;
  const iH2 = document.getElementById('inputHost2');
  if (iH2) iH2.value = appState.host2;
  const iMono = document.getElementById('inputMonogram');
  if (iMono) iMono.value = appState.monogram;
  const iHash = document.getElementById('inputHashtag');
  if (iHash) iHash.value = appState.hashtag;
  const iTag = document.getElementById('inputTagline');
  if (iTag) iTag.value = appState.tagline;
  const iDate = document.getElementById('inputDate');
  if (iDate) iDate.value = appState.date;
  const iSlug = document.getElementById('inputSlug');
  if (iSlug) iSlug.value = appState.slug;
  const iVenue = document.getElementById('inputVenue');
  if (iVenue) iVenue.value = appState.venue;
  const iAddr = document.getElementById('inputVenueAddress');
  if (iAddr) iAddr.value = appState.venueAddress;

  // Dynamically re-render Quick Bar, Studio Reveal Grid, Preview Stage & Phone Mockup
  renderRevealQuickBar();
  renderStudioRevealGrid();
  renderPreviewShowcase();
  renderPhoneHeroReveal();
  renderItineraryEditor();
  renderPhoneItinerary();
  updatePhonePreviewFromInputs();
}
window.setOccasion = setOccasion;

// Stage 1: Tap to Unfurl / Reveal
function triggerRevealAnimation(style = appState.revealStyle) {
  if (style === 'doors') {
    playPalaceDoorsSound();
    playChime();
    const showcase = document.getElementById('palaceDoorsShowcase');
    if (showcase) showcase.classList.add('doors-open');
  } else if (style === 'scroll') {
    playScrollSound();
    playChime();
    const showcase = document.getElementById('royalScrollShowcase');
    if (showcase) showcase.classList.add('scroll-unrolled');
  } else if (style === 'box') {
    playJewelBoxSound();
    playChime();
    const showcase = document.getElementById('jewelBoxShowcase');
    if (showcase) showcase.classList.add('box-open');
  } else if (style === 'balloon') {
    playPopSound();
    playChime();
    const showcase = document.getElementById('birthdayBalloonShowcase');
    if (showcase) showcase.classList.add('balloon-popped');
  } else if (style === 'cake') {
    playChime();
    const showcase = document.getElementById('birthdayCakeShowcase');
    if (showcase) showcase.classList.add('cake-blown');
  } else if (style === 'gift') {
    playJewelBoxSound();
    playChime();
    const showcase = document.getElementById('birthdayGiftShowcase');
    if (showcase) showcase.classList.add('gift-unboxed');
  } else if (style === 'partycard') {
    playPopSound();
    playChime();
    const showcase = document.getElementById('partyCardShowcase');
    if (showcase) showcase.classList.add('card-popped');
  } else if (style === 'doorbell') {
    playChime();
    const showcase = document.getElementById('doorbellShowcase');
    if (showcase) showcase.classList.add('door-rung');
  } else if (style === 'ribbon') {
    playSealCrack();
    playChime();
    const showcase = document.getElementById('ribbonShowcase');
    if (showcase) showcase.classList.add('ribbon-cut');
  } else if (style === 'ringbox') {
    playJewelBoxSound();
    playChime();
    const showcase = document.getElementById('ringboxShowcase');
    if (showcase) showcase.classList.add('box-opened');
  } else if (style === 'champagne') {
    playPopSound();
    playChime();
    const showcase = document.getElementById('champagneShowcase');
    if (showcase) showcase.classList.add('toast-popped');
  } else {
    playSealCrack();
    playChime();
  }

  const btn = document.getElementById('activeRevealActionBtn') || document.getElementById('waxSealBtn');
  const revealMsg = document.getElementById('revealMessage');

  if (btn) {
    btn.innerHTML = '<span>✨ Unfurling Invitation...</span>';
    btn.style.transform = 'translateX(-50%) scale(1.05)';
  }

  setTimeout(() => {
    if (revealMsg) {
      revealMsg.style.display = 'block';
      const stagePreview = document.getElementById('studioStagePreview');
      if (stagePreview) {
        stagePreview.scrollTo({ top: stagePreview.scrollHeight, behavior: 'smooth' });
      }
    }
    if (btn) {
      btn.style.display = 'none';
    }
  }, 450);
}
window.triggerRevealAnimation = triggerRevealAnimation;

function triggerWaxReveal() {
  triggerRevealAnimation(appState.revealStyle);
}
window.triggerWaxReveal = triggerWaxReveal;

// Switch between Stage 1 (Preview) and Stage 2 (Customizer Editor)
function switchToEditorMode() {
  const stagePreview = document.getElementById('studioStagePreview');
  const stageEditor = document.getElementById('studioStageEditor');
  const btnModePreview = document.getElementById('btnModePreview');
  const btnModeEditor = document.getElementById('btnModeEditor');

  if (stagePreview) stagePreview.style.display = 'none';
  if (stageEditor) stageEditor.style.display = 'flex';

  if (btnModePreview) btnModePreview.classList.remove('active');
  if (btnModeEditor) btnModeEditor.classList.add('active');

  // Guaranteed Reset: Lock top positions so header & tabs are 100% visible at y=0
  const modalOverlay = document.getElementById('studioModal');
  if (modalOverlay) modalOverlay.scrollTop = 0;
  const modalContainer = document.querySelector('.studio-modal-container');
  if (modalContainer) modalContainer.scrollTop = 0;
  const editorPanel = document.querySelector('.studio-editor-panel');
  if (editorPanel) editorPanel.scrollTop = 0;
  if (stagePreview) stagePreview.scrollTop = 0;

  // Render phone hero with active theme & sync all live components
  renderPhoneHeroReveal();
  renderItineraryEditor();
  renderPhoneItinerary();
  renderDietaryChipsEditor();
  renderCustomQuestionsEditor();
  updateVenueLocationMap();
  renderPhoneRSVP();
  renderThemePaletteGrid();
  updatePhonePreviewFromInputs();

  playChime();
  showToast('✏️ Studio unlocked! Customizing template live.');
}
window.switchToEditorMode = switchToEditorMode;
window.switchToPreviewMode = switchToPreviewMode;

function switchToPreviewMode() {
  const stagePreview = document.getElementById('studioStagePreview');
  const stageEditor = document.getElementById('studioStageEditor');
  const btnModePreview = document.getElementById('btnModePreview');
  const btnModeEditor = document.getElementById('btnModeEditor');

  if (stagePreview) stagePreview.style.display = 'flex';
  if (stageEditor) stageEditor.style.display = 'none';

  if (btnModePreview) btnModePreview.classList.add('active');
  if (btnModeEditor) btnModeEditor.classList.remove('active');

  const modalOverlay = document.getElementById('studioModal');
  if (modalOverlay) modalOverlay.scrollTop = 0;
}

function openStudioModal(occasionType = 'wedding', directToEditor = false) {
  setOccasion(occasionType);

  const modal = document.getElementById('studioModal');
  const modalContainer = document.querySelector('.studio-modal-container');
  const editorPanel = document.querySelector('.studio-editor-panel');
  const waxBtn = document.getElementById('waxSealBtn');
  const revealMsg = document.getElementById('revealMessage');
  const occasionTitle = document.getElementById('modalOccasionTitle');

  // Reset all scroll positions so header is never scrolled off
  if (modal) modal.scrollTop = 0;
  if (modalContainer) modalContainer.scrollTop = 0;
  if (editorPanel) editorPanel.scrollTop = 0;

  if (occasionTitle) {
    if (occasionType === 'wedding') occasionTitle.textContent = 'The Royal Wedding Invitation';
    else if (occasionType === 'birthday') occasionTitle.textContent = 'Playful Milestone Birthday Invitation';
    else if (occasionType === 'housewarming') occasionTitle.textContent = 'Griha Pravesh Housewarming Invitation';
    else if (occasionType === 'engagement') occasionTitle.textContent = 'Sagai & Engagement Invitation';
    else if (occasionType === 'babyshower') occasionTitle.textContent = 'Godh Bharai & Baby Shower Invitation';
    else if (occasionType === 'anniversary') occasionTitle.textContent = 'Milestone Anniversary Celebration';
  }

  // Reset preview stage elements
  renderPreviewShowcase();
  renderThemePaletteGrid();
  updatePhoneRevealStyle(appState.revealStyle);

  if (waxBtn) {
    waxBtn.style.display = 'flex';
    waxBtn.innerHTML = '<span>✦ Tap Wax Seal to Open</span>';
    waxBtn.style.transform = 'translateX(-50%)';
  }
  if (revealMsg) {
    revealMsg.style.display = 'none';
  }

  if (directToEditor) {
    switchToEditorMode();
  } else {
    switchToPreviewMode();
  }

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeStudioModal() {
  const modal = document.getElementById('studioModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Tap Reveal inside Phone Screen (Supports Wax, Palace Doors, Scroll, Jewel Box)
function triggerPhoneReveal() {
  const style = appState.revealStyle;
  if (style === 'doors') {
    playPalaceDoorsSound();
  } else if (style === 'scroll') {
    playScrollSound();
  } else if (style === 'box') {
    playJewelBoxSound();
  } else {
    playSealCrack();
  }
  playChime();

  const waxBox = document.getElementById('phoneWaxBox');
  const details = document.getElementById('phoneRevealedDetails');

  if (waxBox) {
    waxBox.innerHTML = `
      <div style="font-size: 1.5rem; animation: pulse 0.6s infinite alternate;">✨</div>
      <div style="font-weight: 600; font-size: 0.85rem; color: var(--gold-dark);">Invitation Unfurled!</div>
      <div style="font-size: 0.72rem; color: var(--text-muted);">Itinerary & RSVP Ready Below ↓</div>
    `;
    waxBox.style.borderColor = 'var(--gold-primary)';
    waxBox.style.background = 'var(--bg-champagne-light)';
  }

  if (details) {
    details.style.display = 'flex';
    details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  showToast('✨ Invitation revealed! Scroll down to test the RSVP.');
}

// Submit RSVP inside Phone Screen and SYNC LIVE TO HOST DASHBOARD
function submitPhoneRSVP() {
  const guestName = document.getElementById('phoneGuestName')?.value.trim() || 'Guest';
  const guestCountVal = document.getElementById('phoneGuestCount')?.value || '2';
  const guestDiet = document.getElementById('phoneGuestDiet')?.value || 'Regular';
  const guestSong = document.getElementById('phoneGuestSong')?.value.trim();
  const guestWishes = document.getElementById('phoneGuestWishes')?.value.trim();

  // Collect answers from all dynamic custom questions
  const customAnswers = [];
  appState.customQuestions.forEach(q => {
    let ans = '';
    if (q.type === 'yesno') {
      const radio = document.querySelector(`input[name="phone-cq-${q.id}"]:checked`);
      ans = radio ? radio.value : 'Yes';
    } else if (q.type === 'select') {
      const sel = document.querySelector(`select.phone-cq-input[data-cq-id="${q.id}"]`);
      ans = sel ? sel.value : '';
    } else {
      const inp = document.querySelector(`input.phone-cq-input[data-cq-id="${q.id}"]`);
      ans = inp ? inp.value.trim() : '';
    }
    if (ans) {
      customAnswers.push(`${q.prompt}: ${ans}`);
    }
  });

  const isAttending = guestCountVal !== 'declined';
  const countNumber = isAttending ? parseInt(guestCountVal, 10) : 1;

  // Selected ceremonies
  let selectedEvents = [];
  if (isAttending) {
    document.querySelectorAll('.phone-chk-ceremony:checked').forEach(chk => {
      selectedEvents.push(chk.value.split('&')[0].trim());
    });
    if (selectedEvents.length === 0) {
      selectedEvents = ['All Ceremonies'];
    }
  } else {
    selectedEvents = ['Declined'];
  }

  playChime();

  // Create new guest object
  const detailsSnippet = [];
  if (guestSong) detailsSnippet.push(`🎵 “${guestSong}”`);
  if (guestWishes) detailsSnippet.push(`💌 “${guestWishes}”`);
  if (customAnswers.length > 0) detailsSnippet.push(`📋 ${customAnswers.join(' • ')}`);

  const newGuest = {
    name: guestName,
    count: countNumber,
    events: selectedEvents,
    diet: guestDiet,
    song: detailsSnippet.length > 0 ? detailsSnippet.join(' | ') : 'None',
    status: isAttending ? 'coming' : 'declined',
    time: 'Just now'
  };

  // Add to state
  appState.rsvps.unshift(newGuest);

  // Sync to Host Dashboard DOM
  insertGuestCardToDashboard(newGuest, true);

  // Update counts
  updateDashboardCounts();

  showToast(`🎉 RSVP received from ${guestName}! Synced live to Host Dashboard.`);

  // Update Phone Form with Confirmation
  const rsvpBox = document.querySelector('.phone-rsvp-container');
  if (rsvpBox) {
    rsvpBox.innerHTML = `
      <div style="text-align: center; padding: 12px 0;">
        <div style="font-size: 2rem; margin-bottom: 6px;">💌</div>
        <div style="font-family: var(--font-serif); font-size: 1.15rem; font-weight: 600; color: var(--gold-dark);">RSVP Confirmed!</div>
        <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">
          Thank you, <strong>${escapeHtml(guestName)}</strong>! Your response (${isAttending ? `${countNumber} Guests` : 'Regretfully Declined'}) has been recorded live on the host's private dashboard.
        </p>
        <button class="phone-btn-rsvp" style="margin-top: 12px;" onclick="resetPhoneRSVPForm()">
          Submit Another Reply
        </button>
      </div>
    `;
  }
}

function resetPhoneRSVPForm() {
  const rsvpBox = document.querySelector('.phone-rsvp-container');
  if (!rsvpBox) return;

  const names = appState.host1 && appState.host2 ? `${appState.host2} & ${appState.host1}` : 'Hosts';

  rsvpBox.innerHTML = `
    <div id="phoneRsvpDeadlinePill" style="display: none; font-size: 0.68rem; color: var(--gold-dark); background: var(--bg-champagne); padding: 3px 8px; border-radius: 10px; margin-bottom: 8px; text-align: center; border: 1px solid var(--border-gold-light); font-weight: 600;"></div>
    <div class="phone-rsvp-title" id="phoneRsvpFormTitle">RSVP to ${names}</div>
    <div id="phoneRsvpDisabledNotice" style="display: none; text-align: center; padding: 12px 6px; font-size: 0.8rem; color: var(--text-muted); background: var(--bg-card-alt); border-radius: var(--radius-sm); border: 1px dashed var(--border-light);">
      💌 RSVPs are closed by the host. We look forward to celebrating together!
    </div>
    <div id="phoneRsvpActiveFields" style="display: flex; flex-direction: column; gap: 8px;">
      <input type="text" class="phone-input" id="phoneGuestName" placeholder="Your Full Name" value="Pooja Sharma" />
      <div id="phoneRsvpHeadcountWrap">
        <select class="phone-input" id="phoneGuestCount"></select>
      </div>
      <div id="phoneRsvpCeremoniesWrap">
        <div style="font-size: 0.72rem; font-weight: 600; color: var(--gold-dark); margin-bottom: 4px;">Ceremonies You Will Attend:</div>
        <div class="phone-ceremonies-group" id="phoneCeremoniesGroup"></div>
      </div>
      <div id="phoneRsvpDietWrap">
        <select class="phone-input" id="phoneGuestDiet"></select>
      </div>
      <div id="phoneRsvpSongWrap">
        <input type="text" class="phone-input" id="phoneGuestSong" placeholder="DJ Song Request (Optional)" value="" />
      </div>
      <div id="phoneRsvpWishesWrap">
        <input type="text" class="phone-input" id="phoneGuestWishes" placeholder="Warm Wishes & Blessings for the Couple" value="" />
      </div>
      <div id="phoneRsvpCustomQuestionsContainer" style="display: flex; flex-direction: column; gap: 6px;"></div>
      <button class="phone-btn-rsvp" onclick="submitPhoneRSVP()">
        Send RSVP to Host →
      </button>
    </div>
  `;

  renderPhoneRSVP();
}
window.resetPhoneRSVPForm = resetPhoneRSVPForm;
window.submitPhoneRSVP = submitPhoneRSVP;

function insertGuestCardToDashboard(guest, highlight = false) {
  const guestList = document.getElementById('mockGuestList');
  if (!guestList) return;

  const card = document.createElement('div');
  card.className = 'mock-guest-card';
  card.setAttribute('data-status', guest.status);
  if (highlight) {
    card.style.border = '1.5px solid var(--gold-primary)';
    card.style.background = 'var(--bg-champagne-light)';
    card.style.animation = 'fadeIn 0.5s ease';
  }

  const isComing = guest.status === 'coming';

  card.innerHTML = `
    <div class="mock-guest-left">
      <div class="mock-guest-name">
        ${guest.name} <span style="font-size: 0.78rem; font-weight: normal; color: var(--text-muted);">(${guest.count} ${guest.count > 1 ? 'guests' : 'guest'})</span>
        ${highlight ? '<span style="font-size: 0.65rem; background: #E0E7FF; color: #3730A3; padding: 2px 8px; border-radius: 99px; font-weight: 600;">NEW LIVE RSVP</span>' : ''}
      </div>
      <div class="mock-guest-tags">
        ${guest.events.map(e => `<span class="mock-tag">${e}</span>`).join('')}
        ${guest.diet ? `<span class="mock-tag">Diet: ${guest.diet}</span>` : ''}
        ${guest.song && guest.song !== 'None' ? `<span class="mock-tag mock-tag-song">${guest.song}</span>` : ''}
      </div>
    </div>
    <div class="mock-guest-right">
      <span class="mock-status-pill ${isComing ? 'mock-status-coming' : 'mock-status-declined'}">
        ${isComing ? 'Attending' : 'Can\'t Make It'}
      </span>
      <span class="mock-time">${guest.time}</span>
    </div>
  `;

  guestList.insertBefore(card, guestList.firstChild);
}

function updateDashboardCounts() {
  const countAll = document.getElementById('countAll');
  const countComing = document.getElementById('countComing');
  const countDeclined = document.getElementById('countDeclined');

  const total = appState.rsvps.length;
  const coming = appState.rsvps.filter(r => r.status === 'coming').length;
  const declined = appState.rsvps.filter(r => r.status === 'declined').length;

  if (countAll) countAll.textContent = total;
  if (countComing) countComing.textContent = coming;
  if (countDeclined) countDeclined.textContent = declined;

  const heroBadge = document.getElementById('heroRsvpBadgeText');
  if (heroBadge) heroBadge.textContent = `${total + 137} RSVPs Collected`;
}

/* ==========================================================================
   4. NIMANTRA CHECKOUT, PRICING & PAYMENT GATEWAY SYSTEM
   ========================================================================== */

function openInvitationInNewTab() {
  updatePhonePreviewFromInputs();
  saveAppStateToStorage();
  showToast('🚀 Opening your live invitation in a new tab...');
  const url = `invite.html?slug=${encodeURIComponent(appState.slug)}`;
  window.open(url, '_blank');
}

function openCheckoutModal() {
  try {
    updatePhonePreviewFromInputs();
  } catch (err) {
    console.warn('updatePhonePreviewFromInputs notice:', err);
  }

  try {
    saveAppStateToStorage();
  } catch (err) {
    console.warn('saveAppStateToStorage notice:', err);
  }

  try {
    const pricing = getOccasionPricing(appState.occasion);
    const pkgName = document.getElementById('checkoutPackageName');
    const modalPrice = document.getElementById('checkoutModalPrice');
    const payBtnPrice = document.getElementById('checkoutPayBtnPrice');
    const slugDomain = document.getElementById('checkoutSlugDomain');

    if (pkgName) pkgName.textContent = pricing.name;
    if (modalPrice) modalPrice.textContent = `₹${pricing.price}`;
    if (payBtnPrice) payBtnPrice.textContent = `₹${pricing.price}`;
    if (slugDomain) slugDomain.textContent = appState.slug;

    // Synchronize Pre-Payment Verification Meta inside modal
    const metaNames = document.getElementById('checkoutPreviewMetaNames');
    const metaDate = document.getElementById('checkoutPreviewMetaDate');
    const metaVenue = document.getElementById('checkoutPreviewMetaVenue');

    if (metaNames) {
      if (appState.occasion === 'birthday' || appState.occasion === 'babyshower') {
        metaNames.textContent = appState.host1;
      } else {
        metaNames.textContent = `${appState.host2} & ${appState.host1}`;
      }
    }
    if (metaDate) {
      const dObj = new Date(appState.date || '2026-11-14');
      metaDate.textContent = !isNaN(dObj.getTime())
        ? dObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        : (appState.date || '14 Nov 2026');
    }
    if (metaVenue) {
      metaVenue.textContent = (appState.venue || 'The Leela Palace, Udaipur').split(',')[0];
    }
  } catch (err) {
    console.warn('Checkout modal data sync error:', err);
  }

  // Reset views
  const payView = document.getElementById('checkoutPaymentView');
  const procView = document.getElementById('checkoutProcessingView');
  const succView = document.getElementById('checkoutSuccessView');
  if (payView) payView.style.display = 'flex';
  if (procView) procView.style.display = 'none';
  if (succView) succView.style.display = 'none';

  const modal = document.getElementById('checkoutModal');
  if (modal) {
    modal.classList.add('active');
    try {
      playChime();
    } catch (e) {}
  }
}
window.openCheckoutModal = openCheckoutModal;

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.remove('active');
}
window.closeCheckoutModal = closeCheckoutModal;

function switchPaymentMethod(method) {
  const tabUpi = document.getElementById('tabPayUpi');
  const tabCard = document.getElementById('tabPayCard');
  const tabNet = document.getElementById('tabPayNet');

  const panelUpi = document.getElementById('panelPayUpi');
  const panelCard = document.getElementById('panelPayCard');
  const panelNet = document.getElementById('panelPayNet');

  if (tabUpi) tabUpi.className = method === 'upi' ? 'checkout-tab-btn active' : 'checkout-tab-btn';
  if (tabCard) tabCard.className = method === 'card' ? 'checkout-tab-btn active' : 'checkout-tab-btn';
  if (tabNet) tabNet.className = method === 'netbanking' ? 'checkout-tab-btn active' : 'checkout-tab-btn';

  if (panelUpi) panelUpi.style.display = method === 'upi' ? 'flex' : 'none';
  if (panelCard) panelCard.style.display = method === 'card' ? 'block' : 'none';
  if (panelNet) panelNet.style.display = method === 'netbanking' ? 'block' : 'none';
}

function selectUpiApp(el, appName) {
  document.querySelectorAll('.upi-app-pill').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
  const upiInput = document.getElementById('inputUpiId');
  if (upiInput) {
    upiInput.value = `${(appState.host2 || 'client').toLowerCase()}.${appName.toLowerCase().replace(/\s/g, '')}@okaxis`;
  }
  playPopSound();
}

function processPaymentAndActivate() {
  const payView = document.getElementById('checkoutPaymentView');
  const procView = document.getElementById('checkoutProcessingView');
  const succView = document.getElementById('checkoutSuccessView');
  const procTitle = document.getElementById('checkoutProcTitle');
  const procDesc = document.getElementById('checkoutProcDesc');

  if (payView) payView.style.display = 'none';
  if (procView) procView.style.display = 'block';

  playChime();

  setTimeout(() => {
    if (procTitle) procTitle.textContent = 'Processing Payment & Authorizing UPI...';
    if (procDesc) procDesc.textContent = 'Securing transaction ID #NIM-' + Math.floor(100000 + Math.random() * 900000) + ' via Razorpay...';
  }, 600);

  setTimeout(() => {
    if (procTitle) procTitle.textContent = 'Deploying Live SSL & Cloud CDN...';
    if (procDesc) procDesc.textContent = `Assigning nimantra.in/${appState.slug} and setting up real-time RSVP database...`;
  }, 1200);

  setTimeout(() => {
    if (procView) procView.style.display = 'none';
    if (succView) succView.style.display = 'block';

    // Save paid status
    appState.isLive = true;
    saveAppStateToStorage();

    // Update success slug
    const successSlug = document.getElementById('successSlugText');
    if (successSlug) successSlug.textContent = appState.slug;

    // Setup WhatsApp Link
    const waBtn = document.getElementById('successBtnWhatsApp');
    if (waBtn) {
      const liveUrl = `https://nimantra.in/${appState.slug}`;
      const msg = encodeURIComponent(`Namaste! ✨ We are delighted to share our official wedding invitation. Please open our personalized live website: ${liveUrl}`);
      waBtn.href = `https://wa.me/?text=${msg}`;
    }

    playFanfare();
    triggerScreenConfetti();
    showToast(`🎉 Payment successful! nimantra.in/${appState.slug} is now LIVE!`);
  }, 1800);
}

function copyLiveInviteLink() {
  const url = `https://nimantra.in/${appState.slug}`;
  navigator.clipboard.writeText(url).then(() => {
    showToast(`📋 Copied live invitation link: ${url}`);
  }).catch(() => {
    showToast(`Live URL: ${url}`);
  });
}

function goToDashboardAfterPay() {
  closeCheckoutModal();
  closeStudioModal();
  const dashSection = document.getElementById('dashboard');
  if (dashSection) {
    dashSection.scrollIntoView({ behavior: 'smooth' });
  }
  showToast('📊 Viewing your live RSVP & Guest Management Dashboard');
}

function publishAndGoToDashboard() {
  openCheckoutModal();
}

function triggerScreenConfetti() {
  const colors = ['#B8976C', '#DFCEB8', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#3B82F6'];
  for (let i = 0; i < 70; i++) {
    const piece = document.createElement('div');
    piece.style.position = 'fixed';
    piece.style.width = Math.random() * 10 + 6 + 'px';
    piece.style.height = Math.random() * 10 + 6 + 'px';
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.top = '-20px';
    piece.style.opacity = '1';
    piece.style.zIndex = '4000';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.pointerEvents = 'none';
    piece.style.transition = `all ${Math.random() * 2 + 2}s cubic-bezier(0.25, 1, 0.5, 1)`;
    document.body.appendChild(piece);

    setTimeout(() => {
      piece.style.top = '105vh';
      piece.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 120 - 60}px)`;
      piece.style.opacity = '0';
    }, 20);

    setTimeout(() => {
      piece.remove();
    }, 4000);
  }
}

function playFanfare() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5 major chord
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);
      gain.gain.setValueAtTime(0, now + idx * 0.1);
      gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.9);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 1.0);
    });
  } catch(e) {
    // audio context muted or unsupported
  }
}

/* ==========================================================================
   4. FULLSCREEN GUEST VIEW MODAL (WhatsApp Simulator)
   ========================================================================== */
function openGuestViewModal() {
  const modal = document.getElementById('guestViewModal');
  if (modal) {
    updatePhonePreviewFromInputs();
    modal.classList.add('active');
    playChime();
  }
}

function closeGuestViewModal() {
  const modal = document.getElementById('guestViewModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

/* ==========================================================================
   5. STICKY HEADER & MOBILE NAV
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  menuToggle?.addEventListener('click', () => {
    mobileDrawer?.classList.toggle('active');
  });
}

function closeMobileDrawer() {
  const mobileDrawer = document.getElementById('mobileDrawer');
  mobileDrawer?.classList.remove('active');
}

/* ==========================================================================
   6. ANIMATED COUNTERS
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const duration = 1500;
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.querySelector('.stats-banner');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   7. DASHBOARD TABS & FILTERS
   ========================================================================== */
function initDashboardTabs() {
  const tabItems = document.querySelectorAll('.dash-nav-item');
  const urlBar = document.getElementById('mockDashboardUrl');

  tabItems.forEach(tab => {
    tab.addEventListener('click', () => {
      tabItems.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabType = tab.getAttribute('data-tab');
      if (urlBar) {
        urlBar.textContent = `🔒 nimantra.in/edit/${appState.slug}-priv-892/${tabType}`;
      }
    });
  });
}

function initDashboardFilters() {
  const filterBtns = document.querySelectorAll('.mock-tab-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const cards = document.querySelectorAll('.mock-guest-card');

      cards.forEach(card => {
        const status = card.getAttribute('data-status');
        if (filter === 'all' || filter === status) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. REAL CSV EXPORT FUNCTIONALITY
   ========================================================================== */
function initDashboardExport() {
  const exportBtn = document.getElementById('btnExportCSV');
  if (!exportBtn) return;

  exportBtn.addEventListener('click', () => {
    const headers = ['Guest / Family Name', 'Headcount', 'Ceremony Events', 'Dietary Preference', 'Song Request', 'Status', 'Recorded Time'];
    const rows = appState.rsvps.map(r => [
      r.name,
      r.count,
      r.events.join('; '),
      r.diet || 'None',
      (r.song || 'None').replace(/“|”/g, ''),
      r.status === 'coming' ? 'Attending' : 'Declined',
      r.time
    ]);

    const csvContent = [headers, ...rows]
      .map(e => e.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', url);
    downloadLink.setAttribute('download', `nimantra-guest-rsvps-${appState.slug}.csv`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    showToast(`📥 Exported ${appState.rsvps.length} guest RSVPs to CSV file!`);
  });
}

/* ==========================================================================
   9. ADD TEST GUEST RSVP BUTTON
   ========================================================================== */
let sampleCount = 1;
function initAddGuestRSVP() {
  const addBtn = document.getElementById('btnAddTestGuest');
  if (!addBtn) return;

  const samples = [
    { name: 'Singhania Family', count: 4, events: ['Sangeet', 'Wedding', 'Reception'], diet: 'Jain', song: '🎵 “Kala Chashma”' },
    { name: 'Dr. Kabir & Neha', count: 2, events: ['All Events'], diet: 'Vegan', song: '🎵 “Kesariya”' },
    { name: 'Malhotra Associates', count: 3, events: ['Reception'], diet: 'Regular', song: 'None' }
  ];

  addBtn.addEventListener('click', () => {
    const sample = samples[(sampleCount - 1) % samples.length];
    sampleCount++;

    const newGuest = {
      name: sample.name,
      count: sample.count,
      events: sample.events,
      diet: sample.diet,
      song: sample.song,
      status: 'coming',
      time: 'Just now'
    };

    appState.rsvps.unshift(newGuest);
    insertGuestCardToDashboard(newGuest, true);
    updateDashboardCounts();

    playChime();
    showToast(`Added live RSVP for ${sample.name} (${sample.count} guests)!`);
  });
}

/* ==========================================================================
   10. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(other => other.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   11. TOAST NOTIFICATION
   ========================================================================== */
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toastNotice');
  const msgEl = document.getElementById('toastMsg');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Close modals when clicking overlay background
window.addEventListener('click', (e) => {
  const studioModal = document.getElementById('studioModal');
  const guestModal = document.getElementById('guestViewModal');
  const checkoutModal = document.getElementById('checkoutModal');

  if (e.target === studioModal) {
    closeStudioModal();
  }
  if (e.target === guestModal) {
    closeGuestViewModal();
  }
  if (e.target === checkoutModal) {
    closeCheckoutModal();
  }
});

// Explicit event bindings for payment and preview triggers
document.addEventListener('DOMContentLoaded', () => {
  const headerPayBtn = document.getElementById('btnStudioProceedPayment');
  if (headerPayBtn) {
    headerPayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCheckoutModal();
    });
  }

  const tab6PayBtn = document.getElementById('btnTab6ProceedPayment');
  if (tab6PayBtn) {
    tab6PayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCheckoutModal();
    });
  }

  const headerPreviewBtn = document.getElementById('btnHeaderPreviewOutcome');
  if (headerPreviewBtn) {
    headerPreviewBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openInvitationInNewTab();
    });
  }
});
