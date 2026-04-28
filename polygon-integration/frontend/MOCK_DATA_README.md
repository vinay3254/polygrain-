# EtherXMeet Mock Data & Context Providers

## 📁 Created Files Summary

### Mock Data Files (`src/data/`)

1. **participants.js** (2.3 KB)
   - 8 mock participants with diverse roles
   - Properties: id, name, avatar, role, email, isMuted, isVideoOff, isSpeaking, joinedAt
   - Mix of Host, Co-host, and Participant roles
   - Realistic mute/video states

2. **meetings.js** (4.7 KB)
   - `pastMeetings`: 10 completed meetings
   - `upcomingMeetings`: 5 scheduled meetings
   - Properties: id, title, date, duration, participants, recordingUrl, status
   - Realistic titles: Sprint Planning, Client Demo, Design Review, etc.

3. **recordings.js** (4.6 KB)
   - 6 mock recording entries
   - Properties: id, meetingId, title, date, duration, size (MB), thumbnailUrl, participants
   - Chapter markers for navigation
   - Transcript previews

4. **transcripts.js** (6.7 KB)
   - 3 full mock transcripts
   - Each transcript has 10 dialogue entries
   - Properties: timestamp, speaker, text
   - Covers: Sprint Planning, Client Demo, Design Review

5. **agenda.js** (3.3 KB)
   - 3 agenda templates
   - Templates: Sprint Planning, 1-on-1 Sync, All Hands
   - Each item has: title, duration, description

6. **analytics.js** (2.7 KB)
   - Mock meeting analytics data
   - Speaking time distribution per participant
   - Engagement score, interruption count
   - Sentiment analysis timeline
   - Word cloud data (15 terms with counts)
   - Health indicators

### Context Providers (`src/context/`)

7. **MeetingContext.jsx** (5.8 KB)
   - **State**: participants, currentUser, isRecording, isChatOpen, isParticipantsOpen, activeFeature, meetingId, meetingTitle, startTime
   - **Methods**:
     - `toggleMute(participantId)` - Toggle mute state
     - `toggleVideo(participantId)` - Toggle video state
     - `toggleChat()` - Toggle chat panel
     - `toggleParticipants()` - Toggle participants panel
     - `setActiveFeature(feature)` - Set active feature
     - `startRecording()` / `stopRecording()` - Recording controls
     - `updateMeetingTitle(title)` - Update meeting title
     - `addParticipant(participant)` - Add participant
     - `removeParticipant(participantId)` - Remove participant
   - **Hook**: `useMeeting()`

8. **UserContext.jsx** (5.1 KB)
   - **State**: user (name, email, avatar, preferences), isAuthenticated, isLoading
   - **User Preferences**:
     - theme (dark/light)
     - language
     - notifications (email, desktop, sound)
     - video (defaultMuted, defaultVideoOff, backgroundBlur)
     - meeting (autoRecord, showCaptions, gridView)
   - **Methods**:
     - `updateUser(updates)` - Update user profile
     - `setPreferences(preferences)` - Update preferences
     - `login(userData)` - Login user
     - `logout()` - Logout user
     - `updatePreferenceCategory(category, updates)` - Update specific preference
   - **Hook**: `useUser()`
   - **Persistent**: Uses localStorage

9. **UIContext.jsx** (6.2 KB)
   - **State**: theme, toasts, commandPaletteOpen, modalStack
   - **Toast System**:
     - `addToast({ message, type, duration, dismissible })` - Add toast
     - `removeToast(id)` - Remove toast
     - `clearToasts()` - Clear all toasts
     - Auto-dismiss after 5 seconds (configurable)
   - **Theme Methods**:
     - `toggleTheme()` - Toggle dark/light
     - `setTheme(theme)` - Set theme explicitly
   - **Command Palette**:
     - `toggleCommandPalette()` - Toggle visibility
     - `openCommandPalette()` / `closeCommandPalette()` - Control visibility
   - **Modal Stack**:
     - `openModal({ id, component, props, onClose })` - Open modal
     - `closeModal()` - Close top modal
     - `closeModalById(id)` - Close specific modal
     - `closeAllModals()` - Close all modals
   - **Hook**: `useUI()`

### Custom Hooks (`src/hooks/`)

10. **useLocalStorage.js** (2.8 KB)
    - Custom hook for localStorage with JSON parsing
    - **Usage**: `const [value, setValue] = useLocalStorage('key', initialValue)`
    - Auto-parses JSON on read
    - Auto-stringifies JSON on write
    - Syncs across tabs via storage event
    - Error handling for corrupted data

11. **useMediaDevices.js** (6.5 KB)
    - Custom hook for getUserMedia
    - **Returns**: 
      - `stream` - MediaStream object
      - `error` - Error object with descriptive messages
      - `isLoading` - Loading state
      - `permissions` - Camera/microphone permission states
      - `requestPermission()` - Request media access
      - `stopStream()` - Stop and cleanup stream
      - `switchDevice(deviceId, kind)` - Switch camera/microphone
      - `getDevices()` - List available devices
    - **Features**:
      - Auto-request option
      - Cleanup on unmount
      - Detailed error messages
      - Permission state tracking

## 🚀 Usage Examples

### Using MeetingContext

```jsx
import { MeetingProvider, useMeeting } from './context/MeetingContext';

function MeetingRoom() {
  const { 
    participants, 
    currentUser, 
    toggleMute, 
    toggleVideo,
    isRecording,
    startRecording 
  } = useMeeting();

  return (
    <div>
      <h2>{participants.length} participants</h2>
      <button onClick={() => toggleMute(currentUser.id)}>
        {currentUser.isMuted ? 'Unmute' : 'Mute'}
      </button>
      <button onClick={startRecording}>
        {isRecording ? 'Recording...' : 'Start Recording'}
      </button>
    </div>
  );
}

// Wrap app with provider
<MeetingProvider>
  <MeetingRoom />
</MeetingProvider>
```

### Using UserContext

```jsx
import { UserProvider, useUser } from './context/UserContext';

function UserProfile() {
  const { user, updateUser, setPreferences } = useUser();

  const handleToggleTheme = () => {
    setPreferences({ theme: user.preferences.theme === 'dark' ? 'light' : 'dark' });
  };

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <button onClick={handleToggleTheme}>
        Theme: {user.preferences.theme}
      </button>
    </div>
  );
}
```

### Using UIContext

```jsx
import { UIProvider, useUI } from './context/UIContext';

function MyComponent() {
  const { addToast, openModal, theme } = useUI();

  const showSuccess = () => {
    addToast({ 
      message: 'Meeting started successfully!', 
      type: 'success' 
    });
  };

  const openSettings = () => {
    openModal({
      id: 'settings',
      component: 'SettingsModal',
      props: { tab: 'general' }
    });
  };

  return <button onClick={showSuccess}>Show Toast</button>;
}
```

### Using Custom Hooks

```jsx
// useLocalStorage
import useLocalStorage from './hooks/useLocalStorage';

function Component() {
  const [settings, setSettings] = useLocalStorage('app-settings', { volume: 50 });
  
  return (
    <input 
      type="range" 
      value={settings.volume}
      onChange={(e) => setSettings({ ...settings, volume: e.target.value })}
    />
  );
}

// useMediaDevices
import useMediaDevices from './hooks/useMediaDevices';

function VideoCall() {
  const { stream, error, requestPermission, stopStream } = useMediaDevices({
    video: true,
    audio: true
  });

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      <button onClick={requestPermission}>Start Camera</button>
      <button onClick={stopStream}>Stop Camera</button>
      {stream && <video ref={ref => ref && (ref.srcObject = stream)} autoPlay />}
    </div>
  );
}
```

## 📦 Provider Setup

Wrap your app with all providers:

```jsx
import { MeetingProvider } from './context/MeetingContext';
import { UserProvider } from './context/UserContext';
import { UIProvider } from './context/UIContext';

function App() {
  return (
    <UserProvider>
      <UIProvider>
        <MeetingProvider>
          <YourApp />
        </MeetingProvider>
      </UIProvider>
    </UserProvider>
  );
}
```

## 📊 Data Structure Examples

### Participant Object
```javascript
{
  id: 'p1',
  name: 'Sarah Johnson',
  avatar: 'SJ', // or emoji like '👨‍💻'
  role: 'Host', // 'Host' | 'Co-host' | 'Participant'
  email: 'sarah.johnson@etherxmeet.com',
  isMuted: false,
  isVideoOff: false,
  isSpeaking: true,
  joinedAt: '2024-01-08T10:30:00.000Z'
}
```

### Meeting Object
```javascript
{
  id: 'm1',
  title: 'Sprint Planning - Q4 2024',
  date: '2024-01-06T10:00:00.000Z',
  duration: 60, // minutes
  participants: ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez'],
  recordingUrl: '/recordings/m1.mp4',
  status: 'completed' // 'scheduled' | 'completed'
}
```

### Recording Object
```javascript
{
  id: 'rec1',
  meetingId: 'm1',
  title: 'Sprint Planning - Q4 2024',
  date: '2024-01-06T10:00:00.000Z',
  duration: 60,
  size: 450, // MB
  thumbnailUrl: '/thumbnails/rec1.jpg',
  participants: ['Sarah Johnson', 'Michael Chen'],
  chapters: [
    { time: 0, title: 'Introduction & Agenda' },
    { time: 300, title: 'Sprint Goals Review' }
  ],
  transcriptPreview: 'Sarah: Good morning everyone...'
}
```

## 🎯 Features

### ✅ Comprehensive Mock Data
- 8 diverse participants
- 15 meetings (10 past, 5 upcoming)
- 6 recordings with chapters
- 3 full transcripts
- 3 agenda templates
- Meeting analytics

### ✅ Context Providers
- **MeetingContext**: Real-time meeting state management
- **UserContext**: User profile and preferences with localStorage
- **UIContext**: Theme, toasts, modals, command palette

### ✅ Custom Hooks
- **useLocalStorage**: Persistent key-value storage
- **useMediaDevices**: Camera/microphone access with error handling

### ✅ Best Practices
- JSDoc comments on all providers
- Error handling
- TypeScript-ready (add type definitions)
- localStorage persistence
- Auto-cleanup (timers, streams)
- Consistent naming conventions

## 📝 Notes

- All dates are ISO 8601 format
- Toast auto-dismiss after 5 seconds (configurable)
- Media streams auto-cleanup on unmount
- localStorage keys prefixed with `nexmeet_`
- Default user set up for demo purposes
- Context throws errors if used outside provider (developer-friendly)

---

**Created for EtherXMeet Video Conferencing App**
Ready for UI development and integration!
