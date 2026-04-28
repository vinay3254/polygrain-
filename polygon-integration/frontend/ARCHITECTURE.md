# EtherXMeet Architecture & Developer Guide

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      User Interface Layer                    │
│  (React Components + Tailwind CSS + Framer Motion)           │
│  - Pages: Landing, Join, Room, Dashboard, Settings           │
│  - Components: UI, Meeting, Features, Layout                 │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   State Management Layer                     │
│  (React Context + Hooks + Local Storage)                     │
│  - MeetingContext: Room state, participants, analytics       │
│  - UserContext: Profile, settings, preferences               │
│  - UIContext: Toasts, theme, command palette                 │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   Data & Logic Layer                         │
│  (Hooks + Utilities + Mock Data)                             │
│  - useMediaDevices: Camera/mic access (getUserMedia)         │
│  - useVoiceFX: Audio processing (Tone.js)                    │
│  - useLocalStorage: Persistent data                          │
│  - Mock data: participants, meetings, recordings             │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                 Browser APIs & Libraries                     │
│  - Web Audio API (Tone.js, voice effects)                    │
│  - getUserMedia (camera/mic)                                 │
│  - MediaRecorder (async video messages)                      │
│  - Canvas 2D (whiteboard, screen annotation)                 │
│  - IndexedDB/LocalStorage (data persistence)                 │
│  - Socket.io (future real-time infrastructure)               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Directory Structure Deep Dive

### `src/pages/` — Route Components
Each page is a top-level route:

```
pages/
├── Landing.jsx      — Hero + feature showcase + create/join CTA
├── Join.jsx         — Media device selection + meeting code entry
├── Room.jsx         — Main meeting interface (all features)
├── Dashboard.jsx    — Upcoming meetings + recent + inbox
├── Recordings.jsx   — Recording library + chapters + transcripts
├── Analytics.jsx    — Post-meeting analytics dashboard
└── Settings.jsx     — User profile + preferences
```

**Pattern:** Each page wraps content in `motion.div` for entrance animation.

### `src/components/layout/` — Structural Components
Non-feature UI that frames the app:

```
layout/
├── TopBar.jsx           — Logo + meeting info + user menu + notifications
├── BottomBar.jsx        — Control deck (mute, video, reactions, etc.)
├── Sidebar.jsx          — Right sidebars (Chat, Participants)
├── CommandPalette.jsx   — Cmd+K search overlay
└── ToastSystem.jsx      — Toast notification queue
```

**Pattern:** Uses `motion.div` + `AnimatePresence` for smooth enter/exit.

### `src/components/meeting/` — Core Meeting UI
Components specific to the meeting room interface:

```
meeting/
├── VideoTile.jsx          — Individual participant video (with badges)
├── VideoGrid.jsx          — Responsive grid layout (auto 1/2/4/6/9)
├── ChatPanel.jsx          — Message input + history
├── ParticipantsPanel.jsx  — Attendee list + stats
├── ReactionPicker.jsx     — Emoji selector popup
├── FloatingReaction.jsx   — Animated emoji burst effect
└── AudioVisualizer.jsx    — Animated frequency bars from audio stream
```

**Pattern:** Controlled components receive `participant` object with full state.

### `src/components/ui/` — Reusable Design System
Atomic UI components used across the app:

```
ui/
├── Button.jsx       — Variants: primary, secondary, ghost, danger
├── Input.jsx        — Text input with label + error state
├── Modal.jsx        — Centered overlay with backdrop + close button
├── Card.jsx         — Glassmorphic container
├── Avatar.jsx       — User avatar with initials
├── Badge.jsx        — Status label (Participant role, etc.)
├── Dropdown.jsx     — Menu with trigger + items
├── Tabs.jsx         — Tabbed navigation
├── Slider.jsx       — Range input for volume, etc.
├── Switch.jsx       — Toggle switch
├── Spinner.jsx      — Loading indicator
└── Tooltip.jsx      — Hover info popup
```

**Principles:**
- Accept `className` for customization
- Tailwind-first styling (no CSS modules)
- Motion-enabled for smooth interactions
- Accessible (ARIA labels, keyboard nav)

### `src/components/features/` — 15 Advanced Features
Each feature is a self-contained module:

```
features/
├── AIAssistant/
│   ├── index.jsx              — Main panel + layout
│   ├── LiveTranscription.jsx   — Typewriter effect
│   ├── ActionItems.jsx         — Auto-extracted tasks
│   ├── MeetingSummary.jsx      — Structured summary
│   └── SentimentMeter.jsx      — Room energy gauge
├── VirtualBackground/
│   ├── index.jsx               — Settings modal
│   ├── BlurSettings.jsx         — Blur level selector
│   ├── ColorPicker.jsx          — Solid color palette
│   ├── BackgroundGallery.jsx    — Preset scenes grid
│   ├── CustomUpload.jsx         — File input
│   └── BackgroundPreview.jsx    — Live preview
├── AnalyticsOverlay/
│   ├── index.jsx               — Right sidebar toggle
│   ├── SpeakingTimeChart.jsx    — Live bar chart (Recharts)
│   ├── ParticipantInsights.jsx  — Quiet voices + nudge
│   ├── MeetingPace.jsx          — Too fast / on track / slow
│   └── EngagementScores.jsx     — Per-person metrics
├── Whiteboard/
│   └── index.jsx               — Full-screen canvas (Canvas 2D)
├── BreakoutRooms/
│   └── index.jsx               — Room creation + management
├── VoiceEffects/
│   ├── index.jsx               — Modal + tabs
│   ├── EffectCard.jsx           — Individual effect selector
│   └── Equalizer.jsx            — 5-band EQ UI
├── SmartAgenda/
│   ├── index.jsx               — Panel + item list
│   ├── AgendaItem.jsx           — Edit/delete item
│   ├── AgendaProgress.jsx       — Progress bar at top
│   ├── AddItemModal.jsx         — Create item form
│   └── MeetingHealth.jsx        — On time / behind / ahead
├── LiveTranslation/
│   ├── index.jsx               — Settings + subtitle bar
│   └── SubtitleDisplay.jsx      — Translated text display
├── EngagementGames/
│   ├── index.jsx               — Game picker
│   ├── Leaderboard.jsx          — Results + scores
│   ├── games/
│   │   ├── QuickPoll.jsx        — Voting interface
│   │   ├── WordAssociation.jsx  — One-word game
│   │   ├── TwoTruthsOneLie.jsx  — 3-statement voting
│   │   ├── TriviaQuiz.jsx       — Question + answer
│   │   ├── EmojiMoodCheck.jsx   — Emoji grid
│   │   └── SpeedNetworking.jsx  — Timer + participant pair
├── SecurityPanel/
│   ├── index.jsx               — Control deck
│   ├── ParticipantControls.jsx  — Remove/block/mute actions
│   ├── WaitingRoom.jsx          — Approve pending joins
│   └── ActivityLog.jsx          — Suspicious events
├── RecordingStudio/
│   ├── index.jsx               — Recording modal
│   ├── LayoutSelector.jsx       — Grid / speaker / side-by-side
│   ├── QualitySettings.jsx      — 720p / 1080p / 4K
│   ├── RecordingIndicator.jsx   — REC badge with pulse
│   └── RecordingPreview.jsx     — Recording list
├── Scheduler/
│   └── index.jsx               — Meeting creation form
├── ScreenSharePlus/
│   └── index.jsx               — Share + annotation tools
├── AsyncMessages/
│   └── index.jsx               — Video recorder + inbox
└── (Future) PersistentRoom/
    └── index.jsx               — Room customization
```

**Feature Pattern:**
```javascript
export default function FeatureName({ isOpen, onClose, onApply }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="feature-content">
        {/* UI here */}
      </div>
    </Modal>
  );
}
```

### `src/context/` — Global State
Three context providers manage all app state:

#### **MeetingContext**
```javascript
{
  // Meeting metadata
  meetingId, meetingTitle, meetingState, startTime,
  
  // Participants
  participants, currentUser,
  
  // Real-time features
  chatMessages, reactions, isChatOpen, isParticipantsOpen,
  
  // Recording
  isRecording, recordingOptions,
  
  // Persistent data (localStorage)
  savedRecordings, scheduledMeetings, savedAsyncMessages, notifications,
  
  // Agenda
  agendaTemplate,
  
  // Analytics snapshot
  analyticsSnapshot,
  
  // Methods
  joinMeeting(), leaveMeeting(), toggleMute(), toggleVideo(),
  toggleHand(), toggleChat(), toggleParticipants(),
  sendChatMessage(), addReaction(),
  startRecording(), stopRecording(),
  scheduleMeeting(), saveAsyncMessage(),
  updateParticipant(), increaseAgendaTime(), etc.
}
```

#### **UserContext**
```javascript
{
  // Profile
  user: {
    id, name, email, title, timezone, avatarColor,
    plan, roomSlug, roomName, roomDescription
  },
  
  // Settings (all persisted)
  settings: {
    appearance: { theme, accent, fontScale, highContrast },
    notifications: { browser, email, reminders },
    privacy: { retention, recordingConsent, autoTranslateChat },
    audio: { pushToTalk, noiseSuppression, focusAudio, equalizerPreset },
    video: { resolution, background, translationLanguage }
  },
  
  // Methods
  updateUser(updates),
  updateSettings(section, updates),
  resetSettings()
}
```

#### **UIContext**
```javascript
{
  // Toast system
  toasts: [{ id, message, type, duration }],
  addToast(message, type, duration),
  removeToast(toastId),
  
  // Command palette
  isCommandPaletteOpen,
  openCommandPalette(), closeCommandPalette(), toggleCommandPalette(),
  
  // Network status
  networkStatus, setNetworkStatus,
  isReconnecting, setIsReconnecting,
  
  // Theme
  theme, setTheme() // dark / light / amoled
}
```

### `src/hooks/` — Custom Hooks

#### **useMediaDevices**
```javascript
const {
  stream,            // MediaStream from getUserMedia
  videoRef,          // ref for <video>
  devices,           // { audioInputs: [], audioOutputs: [], videoInputs: [] }
  permissions,       // { audio: bool, video: bool }
  isVideoEnabled,    // current state
  isAudioEnabled,    // current state
  error,             // permission error message
  requestPermission(),
  toggleVideo(),
  toggleAudio(),
  switchDevice(kind, deviceId)
} = useMediaDevices();
```

#### **useVoiceFX**
```javascript
const {
  activeEffect,      // current effect name
  audioContext,      // Web Audio API context
  analyser,          // frequency data for visualizer
  applyEffect(effectName),
  removeEffect(),
  getFrequencyData() // returns Uint8Array
} = useVoiceFX();
```

#### **useLocalStorage**
```javascript
const [value, setValue] = useLocalStorage(key, defaultValue);
// Automatically syncs to localStorage on every change
// Retrieves from localStorage on mount
```

### `src/data/` — Mock Data

All simulated data for development/demo:

```
data/
├── participants.js   — Array of 8 mock users (name, role, avatar, etc.)
├── meetings.js       — Array of 10 past + 5 upcoming meetings
├── recordings.js     — Array of 6 past recordings with chapters
├── transcripts.js    — Full mock transcripts with timestamps
├── agenda.js         — Agenda templates for common meeting types
└── analytics.js      — Mock analytics per meeting
```

Data is seeded into context via `useLocalStorage`, so editing `data/` files won't affect existing localStorage. Delete localStorage or click "Reset" in settings to reload defaults.

---

## 🔄 Data Flow Diagram

### Creating a Meeting

```
User clicks "New Meeting"
  ↓
generateRoomId() creates xxx-xxxx-xxx
  ↓
navigate('/room/:id')
  ↓
Room.jsx mounts
  ↓
useParams gets :id
  ↓
setMeetingId(id) + joinMeeting(id, title)
  ↓
MeetingContext.meetingState: 'connecting'
  ↓
setTimeout 700ms
  ↓
meetingState: 'connected'
  ↓
useEffect in MeetingContext starts speaker simulation (setInterval 2.6s)
  ↓
Participants start auto-animating speaking + engagement changes
  ↓
✅ Meeting room ready
```

### Adding a Chat Message

```
User types in ChatPanel + presses Enter
  ↓
ChatPanel calls sendChatMessage(text)
  ↓
sendChatMessage() calls useMeeting().sendChatMessage()
  ↓
MeetingContext.sendChatMessage() creates message object with:
   { id: uuid, sender: user.name, text, timestamp, isSelf: true }
  ↓
setChatMessages([...previous, newMessage])
  ↓
React re-renders ChatPanel
  ↓
Message appears in chat with animation
  ↓
Message persists in localStorage if needed
```

### Recording a Meeting

```
User clicks "Start Recording"
  ↓
RecordingStudio modal opens
  ↓
User selects layout + settings
  ↓
Calls startRecording(options)
  ↓
MeetingContext.startRecording() sets:
   { isRecording: true, recordingOptions: { layout, quality, ... } }
  ↓
Room.jsx shows red REC badge with pulse animation
  ↓
Timer starts counting elapsed time
  ↓
User clicks "Stop Recording"
  ↓
stopRecording() calculates meeting duration
  ↓
Creates recording object:
   { id, meetingId, title, date, duration, participants, chapters, transcript }
  ↓
setSavedRecordings([newRecording, ...previous])
  ↓
Recording persisted to localStorage under 'nexmeet_saved_recordings'
  ↓
Notification added: "Meeting recording saved"
  ↓
User can see recording in /recordings page
```

---

## 🧩 Component Composition Example

### Building a "Quick Poll" Game

```javascript
// File: src/components/features/EngagementGames/games/QuickPoll.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Button from '../../ui/Button';
import Input from '../../ui/Input';

export default function QuickPoll({ onGameEnd }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['Yes', 'No']);
  const [votes, setVotes] = useState({ Yes: 0, No: 0 });
  const [gameStarted, setGameStarted] = useState(false);

  const handleVote = (option) => {
    setVotes(prev => ({ ...prev, [option]: prev[option] + 1 }));
  };

  const chartData = Object.entries(votes).map(([name, value]) => ({ name, value }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 space-y-4"
    >
      {!gameStarted ? (
        // Setup phase
        <>
          <Input
            label="Poll Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What's your preference?"
          />
          <Button variant="primary" onClick={() => setGameStarted(true)}>
            Start Poll
          </Button>
        </>
      ) : (
        // Voting phase
        <>
          <h3 className="text-xl font-semibold text-white">{question}</h3>
          <div className="grid grid-cols-2 gap-4">
            {options.map(option => (
              <Button
                key={option}
                variant="secondary"
                onClick={() => handleVote(option)}
              >
                {option}
              </Button>
            ))}
          </div>
          
          {/* Live Results */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
          
          <Button
            variant="ghost"
            onClick={() => onGameEnd({ type: 'poll', question, results: votes })}
          >
            End Poll
          </Button>
        </>
      )}
    </motion.div>
  );
}
```

**Usage in parent:**
```javascript
<EngagementGames>
  <QuickPoll onGameEnd={handleGameEnd} />
</EngagementGames>
```

**Flow:**
1. Import Recharts for charts
2. Use local `useState` for game state (question, votes)
3. Call `onGameEnd()` callback when game finishes
4. Parent passes results to MeetingContext for leaderboard

---

## 🚀 Extending the App

### Adding a New Feature

**Step 1:** Create feature folder
```bash
mkdir src/components/features/MyFeature
touch src/components/features/MyFeature/index.jsx
```

**Step 2:** Build component
```javascript
// src/components/features/MyFeature/index.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import { useMeeting } from '../../../context/MeetingContext';

export default function MyFeature({ isOpen, onClose }) {
  const { addToast } = useUI();

  const handleAction = () => {
    addToast('Feature activated!', TOAST_TYPES.SUCCESS);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-white">My Feature</h2>
        {/* Feature UI */}
        <Button variant="primary" onClick={handleAction}>
          Activate
        </Button>
      </motion.div>
    </Modal>
  );
}
```

**Step 3:** Add to Room.jsx
```javascript
// src/pages/Room.jsx

import MyFeature from '../components/features/MyFeature';

export default function Room() {
  const [showMyFeature, setShowMyFeature] = useState(false);

  const handleAction = (action) => {
    if (action === 'my-feature') {
      setShowMyFeature(true);
    }
  };

  return (
    <>
      {/* ... existing JSX ... */}
      <MyFeature isOpen={showMyFeature} onClose={() => setShowMyFeature(false)} />
    </>
  );
}
```

**Step 4:** Add to BottomBar menu (optional)
```javascript
// src/components/layout/BottomBar.jsx

const moreItems = [
  // ... existing items ...
  { label: 'My Feature', icon: <Icon />, onClick: () => onAction?.('my-feature') },
];
```

---

### Adding a New Page

**Step 1:** Create page file
```javascript
// src/pages/MyNewPage.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import TopBar from '../components/layout/TopBar';

export default function MyNewPage() {
  return (
    <div className="min-h-[100dvh] bg-app-background text-app-text">
      <TopBar />
      <main className="container mx-auto p-6">
        {/* Page content */}
      </main>
    </div>
  );
}
```

**Step 2:** Add route to App.jsx
```javascript
// src/App.jsx

import MyNewPage from './pages/MyNewPage';

<Route path="/my-new-page" element={<MyNewPage />} />
```

**Step 3:** Add to constants
```javascript
// src/utils/constants.js

export const ROUTES = {
  // ... existing ...
  MY_NEW_PAGE: '/my-new-page',
};
```

**Step 4:** Add navigation link
```javascript
// Any component
import { ROUTES } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate(ROUTES.MY_NEW_PAGE);
```

---

## 🎨 Styling Guide

### Tailwind-First Approach

```javascript
// ✅ Use Tailwind classes directly
<div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">

// ❌ Don't create CSS modules
// ❌ Don't use inline styles
```

### Color Palette

```javascript
// Use Tailwind color scale
'indigo-500' // #4F46E5 (primary)
'cyan-500'   // #06B6D4 (secondary)
'emerald-500' // #10B981 (AI/success)
'red-500'    // #EF4444 (danger)

// Opacity modifiers
'text-white/75' // 75% opacity white
'bg-white/5'    // 5% opacity white background
'border-white/10' // 10% opacity white border
```

### Glassmorphism Pattern

```javascript
// Every panel follows this pattern
<div className={`
  rounded-[28px] border border-white/10
  bg-gradient-to-br from-white/5 to-white/[0.02]
  shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
  backdrop-blur-2xl
`}>
```

### Motion Animations

```javascript
// Entrance
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>

// Hover
<motion.button
  whileHover={{ y: -2 }}
  whileTap={{ scale: 0.97 }}
>

// Exit
<AnimatePresence>
  {isVisible && <motion.div exit={{ opacity: 0 }} />}
</AnimatePresence>
```

---

## 📊 Performance Tips

### Code Splitting

Large libraries should be dynamically imported:
```javascript
const PDFDocument = lazy(() => import('jspdf'));
```

### Memoization

For expensive computations:
```javascript
const stageParticipants = useMemo(
  () => participants.filter(p => p.id !== currentUser.id),
  [currentUser.id, participants]
);
```

### Event Throttling

For frequent events (speaker detection):
```javascript
const speakerInterval = setInterval(() => {
  // Runs every 2.6 seconds, not on every DOM update
}, 2600);
```

### Image Optimization

- Use WebP format
- Lazy load images with `loading="lazy"`
- Optimize SVGs inline

---

## 🧪 Testing Locally

### Manual Testing Checklist

- [ ] Landing page loads with animations
- [ ] Create meeting generates valid room ID
- [ ] Join form validates code format
- [ ] Room auto-populates with 8 mock participants
- [ ] Speaker detection animates every 2.6s
- [ ] Reactions (emoji) burst correctly
- [ ] Recording starts/stops properly
- [ ] Dashboard shows upcoming meetings
- [ ] Settings persist on page reload
- [ ] Chat messages display with timestamps
- [ ] Whiteboard canvas draws smoothly
- [ ] All modals have proper close states
- [ ] Responsive design at 375px, 768px, 1440px widths

### Browser DevTools

```javascript
// Check localStorage
localStorage.getItem('nexmeet_user')
localStorage.getItem('nexmeet_saved_recordings')

// Check performance
performance.mark('feature-load')
performance.measure('feature', 'feature-load')

// Monitor Context
import { useMeeting } from './context/MeetingContext'
const context = useMeeting()
console.log(context)
```

---

## 📚 Libraries & APIs Reference

| Library | Use |
|---------|-----|
| **React 18** | UI rendering + hooks |
| **React Router v6** | Client-side routing |
| **Tailwind CSS 4** | Styling + responsive design |
| **Framer Motion 12** | Animations + gestures |
| **Recharts 3** | Charts (bar, line, pie) |
| **Tone.js 15** | Web Audio API wrapper |
| **Lucide React 1** | Icon library |
| **jsPDF 4** | PDF generation |
| **html2canvas 4** | Screenshot/canvas capture |
| **Socket.io 4** | Real-time (future) |

---

## 🔐 Security Considerations

### Data Privacy
- All data stored in localStorage (client-only)
- No data sent to backend (mock only)
- Users can export/delete data via settings

### Input Validation
- Meeting codes validated with regex
- Names length-checked (2-50 chars)
- No script injection vectors (React auto-escapes)

### Permissions
- getUserMedia requests permission upfront
- Users can revoke in browser settings
- Camera/mic state tracked locally

---

## 📖 Useful Resources

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/)
- [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

## 🤝 Contributing

### Code Style

- Use functional components + hooks (no class components)
- One component per file
- Folder structure matches component hierarchy
- Import from relative paths (`../`, not absolute)
- Prefer JSDoc comments over inline comments

### Commit Messages

```
feat: add recording export to PDF
fix: correct speaker detection timing
refactor: extract VideoTile into separate component
style: update glassmorphism border color
docs: add architecture guide
```

---

**Happy building! 🚀**

For feature-specific questions, check `EtherXMeet_GUIDE.md` and `QUICK_REFERENCE.md`.
