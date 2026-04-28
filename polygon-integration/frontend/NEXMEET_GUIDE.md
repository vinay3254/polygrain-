# EtherXMeet - Next-Generation Video Conferencing Platform

## 🚀 Project Overview

EtherXMeet is a cutting-edge video conferencing web application built with React 18, Tailwind CSS, and Framer Motion. It represents the future of video collaboration with 15 advanced features that go far beyond basic video calling.

**Tech Stack:**
- React 18 (functional components + hooks)
- Tailwind CSS 4 + custom CSS variables
- React Router DOM v6
- Framer Motion (all animations)
- Tone.js (audio processing)
- Lucide React (icons)
- Recharts (analytics)
- jsPDF (document generation)
- Socket.io client (real-time infrastructure)

**Design System:** Glassmorphic Dark Elite
- Background: `#060610`
- Surface: `#0d0d1a`
- Cards: `#13132b`
- Primary Accent: `#4F46E5` (Electric Indigo)
- Secondary: `#06B6D4` (Cyan)
- AI Accent: `#10B981` (Emerald)

---

## 📁 Project Structure

```
etherxmeet/
├── src/
│   ├── components/
│   │   ├── layout/          # TopBar, BottomBar, Sidebar, CommandPalette, ToastSystem
│   │   ├── meeting/         # VideoTile, VideoGrid, ChatPanel, ParticipantsPanel, ReactionPicker
│   │   ├── ui/              # Reusable UI components (Button, Modal, Slider, Badge, etc.)
│   │   ├── effects/         # ParticleBackground, FloatingVideoTile
│   │   ├── dashboard/       # Dashboard-specific components
│   │   └── features/        # 15 advanced features (see below)
│   ├── pages/               # Landing, Join, Room, Dashboard, Recordings, Analytics, Settings
│   ├── context/             # MeetingContext, UserContext, UIContext (state management)
│   ├── hooks/               # useMediaDevices, useVoiceFX, useLocalStorage
│   ├── data/                # Mock data for participants, meetings, recordings, transcripts
│   ├── utils/               # constants, helpers
│   └── styles/              # Global CSS and animations
├── index.html               # Entry point with Google Fonts
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js           # Vite bundler config
└── package.json             # Dependencies

```

---

## 🎯 Core Features

### 1. **Landing Page** (`/`)
- Hero section with animated gradient text
- Floating mock video tiles with looping animations
- Feature highlights with glassmorphic cards
- "New Meeting" button to create room with random ID
- "Join Meeting" input with auto-format (xxx-xxxx-xxx)
- Particle background effect
- 3-step "How It Works" flow visualization

### 2. **Join Page** (`/join`)
- Centered glassmorphic card design
- Meeting code input with auto-format
- Display name input + avatar color picker
- Camera/Mic preview before joining (getUserMedia)
- Media device selection (camera, microphone)
- Join confirmation with ripple animations
- Toast notifications for errors

### 3. **Meeting Room** (`/room/:id`)
- Responsive video grid (auto-layout: 1, 2, 4, 6, 9 participants)
- Active speaker detection with glowing border
- Self video tile with mirror effect (draggable)
- Real-time participant activity simulation
- Full meeting session management

### 4. **Dashboard** (`/dashboard`)
- Upcoming meetings timeline
- Recent meetings with quick rejoin
- Meeting streak counter (consecutive days)
- Total monthly meeting hours
- Top collaborators grid
- Async video message inbox
- Notification center

### 5. **Recordings** (`/recordings`)
- Grid view of past recordings with thumbnails
- Recording metadata (duration, size, participants)
- Auto-generated chapters based on agenda items
- Searchable transcripts with timeline sync
- Download/share functionality
- Highlight reel extraction

### 6. **Analytics** (`/analytics`)
- Post-meeting full analytics dashboard
- Timeline of participant speaking patterns (swimlane chart)
- Word cloud of key terms from transcription
- Participation equity score
- Meeting health indicators
- Exportable PDF reports

### 7. **Settings** (`/settings`)
- Profile management (name, email, title, timezone)
- Audio settings (device selection, noise suppression, EQ presets)
- Video settings (camera, resolution, virtual background)
- Appearance (theme: dark/light/AMOLED, accent colors)
- Notifications configuration
- Privacy & data retention settings
- Keyboard shortcuts reference

---

## ⚡ 15 Advanced Features

### 1. **🤖 AI Meeting Assistant (NEXAI)**
- **Live Transcription:** Mock typewriter effect simulating real-time speech-to-text
- **Action Items:** Auto-generated from transcription as meeting progresses
- **Meeting Summaries:** 
  - Key Discussion Points
  - Decisions Made
  - Action Items with assignees
  - Next Steps
- **PDF Export:** Generate professional meeting recaps
- **Sentiment Meter:** Real-time room energy gauge (Positive/Neutral/Tense)
- **Integration:** Floating NEXAI button on room page, opens side panel

### 2. **🎨 Virtual Background Studio**
- **Blur Options:** Light / Heavy
- **Solid Colors:** 12-color palette
- **Preset Scenes:** Office, Cafe, Space, Beach, Library, Neon City
- **Custom Upload:** User image backgrounds
- **Animated Backgrounds:** Rainy Window, Fireplace, Lo-Fi Room
- **Branded Option:** Company logo watermark
- **Live Preview:** Test before applying
- **Implementation:** Canvas overlay + CSS filters

### 3. **📊 Live Meeting Analytics Overlay**
- **Real-Time Insights:**
  - Speaking time % per participant (live bar chart)
  - Who hasn't spoken (with nudge suggestions)
  - Engagement score per person (based on reactions/chat)
  - Meeting pace indicator (Too Fast / On Track / Too Slow)
  - Interruption counter per person
- **Post-Meeting Analytics:**
  - Timeline swimlane chart (who spoke when)
  - Word cloud from transcription
  - Participation equity score
  - Exportable PDF report
- **Interactive Panel:** Toggle "Insights" right sidebar

### 4. **🗺️ Collaborative Whiteboard**
- **Drawing Tools:** Pen, Highlighter, Eraser, Shapes (rect, circle, arrow, line), Text, Sticky Notes
- **Color Picker + Stroke Size**
- **Layers Panel:** Add/hide/reorder layers
- **Simultaneous Drawing:** Mock simulated remote cursors with name labels
- **Undo/Redo:** Ctrl+Z / Ctrl+Y
- **Export:** PNG or PDF
- **Navigation:** Zoom + Pan (mouse wheel + drag)
- **Sticky Notes:** Draggable, color-coded, editable
- **Focus Pointer:** Laser pointer mode (red dot visible to all)
- **Templates:** Kanban, Mind Map, Retrospective, Flowchart

### 5. **🎯 Breakout Rooms 2.0**
- **Host-Controlled Split:** Manually assign or "Smart Split" AI-powered
- **Room Features:** Timer, participant count, topic label
- **Broadcast:** Message to all breakout rooms simultaneously
- **Wander Mode:** Participants can move between rooms freely
- **Auto-Close:** Countdown timer + 60-second warning
- **Activity Feed:** See which rooms are most active
- **Rejoin Main:** Always accessible button

### 6. **🎤 Voice Effects & Audio FX**
- **Real-Time Voice Transformations (Tone.js):**
  - Robot Voice
  - Deep Voice (pitch down)
  - Helium Voice (pitch up)
  - Echo Chamber
  - Radio Static filter
  - Whisper Mode (compress + soften)
- **Audio Processing:** 
  - Background noise suppression (simulated)
  - Focus Audio (suppress non-active-speaker sound)
  - 5-band EQ with presets (Bass Boost, Voice Clarity, Flat, Warm)
- **Push-to-Talk:** Toggle mode for hands-free control

### 7. **📋 Smart Agenda & Meeting Flow**
- **Pre/During Setup:** Set agenda items with title, duration, owner, status
- **Progress Bar:** Real-time agenda progress at top
- **Auto-Advance Timer:** Sound notification when time expires
- **Host Controls:** Skip/extend agenda items
- **Health Indicator:** On time / Behind / Ahead status
- **Agenda-Whiteboard Link:** Jump between sections
- **Post-Meeting Comparison:** Agenda vs actual time spent

### 8. **🌐 Multi-Language Live Translation**
- **20+ Language Support:** Real-time translation of spoken content
- **Subtitle Styles:** Netflix-style (bottom center) or side panel
- **Per-User Language:** Each participant sets their preference
- **Chat Translation:** Toggle to auto-translate all messages
- **Confidence Indicator:** Per-sentence translation confidence score
- **Implementation:** Mock transcription with translation simulation

### 9. **🎮 Engagement Games & Icebreakers**
Games available (host-only trigger):
  - **Quick Poll:** Host creates poll, live bar chart results
  - **Word Association:** One word, participants type fast → word cloud forms
  - **2 Truths 1 Lie:** Turn-based with voting
  - **Trivia Quiz:** Host picks category, 5 questions, live leaderboard
  - **Emoji Mood Check:** All pick emoji, displayed as grid
  - **Speed Networking:** Random 1-on-1 pairing for 2 minutes each
- **Leaderboard:** After each game
- **State Management:** React context (no backend needed)

### 10. **🔒 Security Command Center**
- **Host Controls:**
  - Lock meeting (no new joins)
  - Waiting room toggle (approve each participant)
  - Remove & block participant
  - Disable chat / screen share / reactions for all
  - Report participant
  - Watermark overlay (participant name as recording deterrent)
- **Security Info:**
  - E2E encryption indicator with certificate modal
  - Meeting password protection setup
  - Suspicious activity log (mock notifications)
- **Panel:** Full control deck interface

### 11. **🎬 Smart Recording Studio**
- **Recording Controls:** Start/stop with visual REC badge + pulse animation
- **Recording Settings:**
  - Layout: Grid / Active Speaker / Side-by-side
  - Include/exclude: Chat, Whiteboard, Reactions
  - Quality: 720p / 1080p / 4K (mock)
- **Post-Recording:**
  - Auto-generated chapters (based on agenda)
  - Transcript sidebar synced to video timeline
  - Searchable transcript (click → jump to timestamp)
  - Highlight reel extraction
  - Share/download/save options
- **Recordings Page:** Grid with thumbnails and metadata

### 12. **🌙 Async Video Messages**
- **Recording:** Up to 5-minute video message (getUserMedia + MediaRecorder)
- **Overlay:** Text overlay + emoji reactions on video
- **Notifications:** Recipient gets alert with video player
- **Threading:** Reply with video message (threaded conversation)
- **Storage:** LocalStorage blob URLs
- **UI:** Inbox/Outbox view in Dashboard

### 13. **🖥️ Advanced Screen Share+**
- **Standard Screen Share** + **Enhancements:**
  - Annotate while sharing (draw in real-time)
  - Zoom in on specific regions
  - "Follow Me" mode (lock attendee views to host's screen)
  - Multi-share (two people side-by-side)
  - Tab vs Window vs Full Screen selection
  - Presentation Mode (hide controls, audience view indicator)

### 14. **📅 Integrated Scheduler**
- **Meeting Creation:** Title, date/time, duration, recurring (daily/weekly)
- **Participants:** Email tags input
- **Calendar Preview:** Google Calendar-style
- **Auto-Links:** Generate meeting link + .ics calendar event download
- **Reminders:** 15 min / 1 hour before (browser notifications)
- **Lobby:** Opens 5 min before scheduled time
- **Dashboard:** Shows upcoming meetings timeline

### 15. **🏠 Persistent Virtual Rooms**
- **My Room:** Each user has permanent URL (`/room/username`)
- **Customization:**
  - Custom room name + description
  - Background theme
  - Waiting room message
  - Auto-admit trusted contacts
- **Room Stats:** Total meetings, hours spent, top collaborators
- **Shareable Card:** Business card-like room profile

---

## 🎨 Global UX Features

- **Command Palette:** `Cmd+K` — search rooms, features, participants, settings
- **Keyboard Shortcuts:**
  - `M` = Mute/Unmute
  - `V` = Camera on/off
  - `S` = Screen share
  - `R` = Raise hand
  - `C` = Chat
  - `Escape` = Close panels
- **Toast Notifications:** Top-right, stacked, auto-dismiss
- **Network Quality Indicator:** Green/Yellow/Red dots per participant
- **Reconnecting Overlay:** Animated spinner on network loss
- **Meeting Lobby:** Waiting room with countdown before start
- **Mute Notifications:** "You've been muted by host" alerts
- **Accessibility:**
  - Full keyboard navigation
  - ARIA labels on all interactive elements
  - High contrast mode option
- **PWA:** Installable web app, offline dashboard access
- **Dark/Light Mode:** Toggle in settings, persisted in localStorage

---

## 🗄️ State Management

### **MeetingContext** (`src/context/MeetingContext.jsx`)
Coordinates room-level collaboration state, simulated real-time activity, and persistent mock data.

**Key State:**
- `participants` — array of meeting attendees with engagement/speaking metrics
- `currentUser` — authenticated user in meeting
- `meetingState` — idle / connecting / connected / disconnected
- `chatMessages` — message history with timestamps + translations
- `reactions` — floating emoji reactions
- `isRecording` — recording state
- `savedRecordings` — localStorage-persisted recordings
- `scheduledMeetings` — upcoming meetings
- `savedAsyncMessages` — video message history
- `notifications` — system notifications

**Key Functions:**
- `joinMeeting(meetingId, title)` — Enter a meeting
- `leaveMeeting()` — Exit and cleanup
- `toggleMute()`, `toggleVideo()`, `toggleHand()` — Control user state
- `sendChatMessage(text)` — Add chat
- `addReaction(emoji)` — Floating emoji burst
- `startRecording()` / `stopRecording()` — Recording lifecycle
- `scheduleMeeting(meeting)` — Create future meeting
- `saveAsyncMessage(payload)` — Store async video

### **UserContext** (`src/context/UserContext.jsx`)
Stores user profile and cross-page preferences.

**Default User:**
```javascript
{
  id, name, email, title, timezone,
  avatarColor, plan, roomSlug, roomName
}
```

**Settings Object:**
- `appearance` — theme, accent, font scale, high contrast, custom cursor
- `notifications` — browser, email, reminders
- `privacy` — data retention, recording consent, auto-translate
- `audio` — push-to-talk, noise suppression, focus audio, EQ preset
- `video` — resolution, background settings, translation language

### **UIContext** (`src/context/UIContext.jsx`)
Global UI orchestration for toasts, command palette, network status.

**State:**
- `toasts` — notification queue
- `isCommandPaletteOpen` — search overlay
- `networkStatus` — stable / degraded / offline
- `theme` — dark / light / amoled (localStorage-persisted)

---

## 📊 Mock Data

All data is simulated via `src/data/`:

- **participants.js** — 8 mock users with roles, engagement, speaking time
- **meetings.js** — 10 past + 5 upcoming meetings with attendees
- **recordings.js** — 6 past recordings with chapters + transcripts
- **transcripts.js** — 3 full mock transcripts with timestamps
- **agenda.js** — Sample agenda templates (Sprint Review, Design Critique, etc.)
- **analytics.js** — Mock analytics per meeting (speaking %, interruptions, etc.)

All data persists via `useLocalStorage` hook in localStorage under keys like:
- `nexmeet_user`
- `nexmeet_upcoming_meetings`
- `nexmeet_saved_recordings`
- `nexmeet_async_messages`
- `nexmeet_theme`

---

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start dev server (runs on http://localhost:3001)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Key URLs

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/join` | Join meeting form |
| `/room/:id` | Main meeting room |
| `/dashboard` | User dashboard + upcoming meetings |
| `/recordings` | Recording library |
| `/analytics` | Post-meeting analytics |
| `/settings` | User settings & preferences |

### Creating a Meeting

1. Click **"New Meeting"** on landing page
2. App generates random ID (e.g., `abc-defg-hij`)
3. Navigates to `/room/abc-defg-hij`
4. 8 mock participants auto-join
5. All features available immediately

### Joining a Meeting

1. Click **"Join Meeting"** on landing page
2. Enter meeting code or paste link
3. Fill name + pick avatar color
4. Grant camera/mic permissions
5. Click **"Join Now"**

---

## 🎬 Feature Interactions

### Recording a Meeting

1. Click **"More"** → **"Recording Studio"** in bottom bar
2. Select layout (Grid / Active Speaker / Side-by-side)
3. Toggle what to include (Chat, Whiteboard, Reactions)
4. Click **"Start Recording"**
5. Red REC badge appears with pulse animation
6. Click **"Stop Recording"** to save
7. Recording appears in `/recordings` with chapters + transcript

### Playing a Game

1. Click **"Games"** in quick actions or **"More"** menu
2. Host selects game type (Quick Poll, Word Association, etc.)
3. Game UI displays in main room
4. Results visualized in real-time (bar chart, word cloud, leaderboard)
5. Automatic cleanup after game ends

### Whiteboard Collaboration

1. Click **"Whiteboard"** in quick actions
2. Full-screen canvas appears
3. Select tool (Pen, Shape, Text, Sticky Note, etc.)
4. All participants see live drawing
5. Export as PNG or PDF when done

### Screen Share with Annotation

1. Click **"Share+"** in bottom bar
2. Select browser tab / window / full screen
3. Once sharing, annotation tools appear
4. Draw on top of shared screen in real-time
5. All participants see annotations
6. Click **"Stop Share"** when done

---

## 🎨 Design Details

### Glassmorphism

All panels use consistent glassmorphic styling:
```css
background: rgba(19, 19, 43, 0.8);
backdrop-filter: blur(24px);
border: 1px solid rgba(79, 70, 229, 0.2);
box-shadow: 0 30px 80px rgba(4, 8, 24, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08);
```

### Animations

Framer Motion powers all transitions:
- **Page Load:** Fade in + slide up
- **Button Hover:** Lift up (`y: -2`)
- **Reactions:** Burst animation + fade out
- **Video Tiles:** Scale up on add, glow on active speaker
- **Panels:** Slide in from side with backdrop blur
- **Charts:** Animated bars with spring physics

### Responsive Design

- **Mobile (< 640px):** Single column, bottom sheets for panels
- **Tablet (640-1024px):** 2-column grid, side panels visible
- **Desktop (> 1024px):** 3-column with full feature visibility

---

## 🔧 Development Tips

### Adding a New Feature

1. Create folder in `src/components/features/YourFeature/`
2. Build component with props `{ isOpen, onClose }`
3. Add to `Room.jsx` as modal/panel
4. Handle in `BottomBar` or feature menu
5. Export and integrate into state via context

### Creating a New Page

1. Create file in `src/pages/NewPage.jsx`
2. Add route to `App.jsx`
3. Add route constant to `src/utils/constants.js`
4. Use `useNavigate()` from React Router

### Working with Context

```javascript
import { useMeeting } from '../context/MeetingContext';

const { participants, currentUser, toggleMute } = useMeeting();
```

### Using Toast Notifications

```javascript
import { useUI } from '../context/UIContext';
import { TOAST_TYPES } from '../utils/constants';

const { addToast } = useUI();
addToast('Meeting started!', TOAST_TYPES.SUCCESS, 4000);
```

---

## 📈 Performance Considerations

- **Code Splitting:** Large bundles (html2canvas, jsPDF) should be dynamically imported
- **Lazy Loading:** Pages loaded with React Router code splitting
- **Memoization:** useMemo for expensive computations (video grid layout)
- **Throttling:** Speaker detection interval set to 2.6s to avoid overdraw
- **LocalStorage:** Limits recorded data to 5-10 MB per domain

---

## 🐛 Known Limitations

- **No Real Video:** WebRTC integration uses mock stream data
- **No Backend:** All data is simulated/persisted in localStorage only
- **No Video Recording:** MediaRecorder API would require browser-specific handling
- **Mock Real-Time:** Speaker detection and reactions use setInterval simulation
- **No WebSocket:** Socket.io client initialized but not connected (no server)

---

## 🔮 Future Enhancements

1. **Real WebRTC:** Integrate Agora SDK or 100ms API
2. **Backend API:** Node.js + Express for recording storage, user auth
3. **Database:** PostgreSQL for meetings, recordings, user data
4. **Actual Screen Share:** Use getDisplayMedia() API fully
5. **Actual Video Recording:** Browser MediaRecorder → server upload
6. **Push Notifications:** Service Worker for offline notifications
7. **Custom Domains:** Support for `company.etherxmeet.app`
8. **Calendar Integration:** Sync with Google Calendar, Outlook
9. **Slack Integration:** Post meeting notes to Slack
10. **Analytics Dashboard:** Real usage metrics, billing integration

---

## 📄 License

ISC License (2026)

---

**Built with ❤️ using React, Tailwind CSS, and Framer Motion**

For questions or contributions, see the project repository.
