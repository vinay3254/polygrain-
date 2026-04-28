# EtherXMeet Quick Reference Guide

## 🎯 Fastest Way to Start

```bash
npm run dev
```

Visit: **http://localhost:3001**

---

## 🚀 Create & Join Meetings

### New Meeting (2 clicks)
1. Click **"New Meeting"** on landing page
2. ✅ Meeting created, auto-join in progress

### Join Meeting (4 steps)
1. Click **"Join Meeting"**
2. Enter meeting code (auto-formatted: `xxx-xxxx-xxx`)
3. Enter your name + pick avatar color
4. Click **"Join Now"**

---

## 🎨 Meeting Room Controls

### Bottom Bar (Control Deck)

| Control | Keyboard | Action |
|---------|----------|--------|
| 🎤 Mute | `M` | Toggle microphone |
| 📹 Camera | `V` | Toggle video |
| 📺 Share | `S` | Start screen share |
| ✋ Hand | `R` | Raise hand |
| 😊 React | — | Send emoji burst |
| 💬 Chat | `C` | Open chat panel |
| 👥 People | — | List participants |
| ⋮ More | — | More options |

### Quick Actions (Top of Bottom Bar)

- 🤖 **NEXAI** — AI transcription + summaries
- 📊 **Insights** — Live analytics overlay
- 🎨 **Whiteboard** — Collaborative drawing canvas
- 🎮 **Games** — Icebreaker games (host only)
- 👥 **Breakouts** — Split into breakout rooms

### More Menu

- Recording Studio
- Virtual Background
- Voice Effects
- Security Panel
- Translation
- Smart Agenda
- Scheduler
- Async Messages

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `M` | Mute/Unmute |
| `V` | Toggle video |
| `S` | Screen share |
| `R` | Raise hand |
| `C` | Chat |
| `Cmd+K` / `Ctrl+K` | Command palette |
| `Escape` | Close panels |
| `Space` | Push-to-talk (hold) |

---

## 🎬 Recording a Meeting

### Steps:
1. **More** → **Recording Studio**
2. Select layout (Grid / Active Speaker / Side-by-side)
3. Toggle: Chat, Whiteboard, Reactions
4. Click **Start Recording**
5. Red "REC" badge appears
6. Click **Stop Recording** when done

### Results:
- Auto-saved to `/recordings`
- Auto-generated chapters from agenda
- Searchable transcript
- Exportable as video + PDF

---

## 🗣️ Voice Effects

**More** → **Voice FX**

Available effects (Tone.js-powered):
- 🤖 Robot Voice
- 📉 Deep Voice
- 🎈 Helium Voice
- 🔊 Echo Chamber
- 📻 Radio Static
- 🤐 Whisper Mode

Plus:
- 5-band EQ (Bass Boost, Voice Clarity, Flat, Warm)
- Noise suppression toggle
- Focus Audio (suppress non-speaker sound)

---

## 🎯 Games (Host Only)

**Games** button or **More** → **Engagement Games**

Available games:
1. **Quick Poll** — Host creates poll, live results bar chart
2. **Word Association** — One-word game, word cloud forms
3. **2 Truths 1 Lie** — Turn-based with voting
4. **Trivia Quiz** — 5 questions per round with leaderboard
5. **Emoji Mood Check** — All pick emoji simultaneously
6. **Speed Networking** — Random 1-on-1 for 2 minutes

All games end with a leaderboard.

---

## 🗺️ Whiteboard

**Whiteboard** button → Full-screen canvas

### Tools:
- ✏️ Pen
- 🖍️ Highlighter
- 🗑️ Eraser
- ◻️ Shapes (rect, circle, arrow, line)
- 📝 Text
- 📌 Sticky Notes
- 🖼️ Image upload
- 🎯 Focus Pointer (laser)

### Templates:
- Kanban board
- Mind map
- Retrospective board
- Flowchart grid

### Export:
- PNG
- PDF
- Copy canvas

---

## 🎙️ Smart Agenda

**More** → **Smart Agenda**

### Setup:
1. Add agenda items (title, duration, owner)
2. Items appear as progress bar
3. Auto-advance timer at top
4. Host can skip/extend items

### Results:
- Post-meeting: Agenda vs actual time comparison
- Meeting health indicator (on time / behind / ahead)

---

## 🌐 Translation

**More** → **Translation**

- Choose your language (20+ options)
- All speech appears translated in subtitle bar
- Each person sets their own language preference
- Toggle chat translation auto-translate

---

## 🎓 Async Video Messages

**More** → **Async Messages**

1. Click **"Leave a Video Message"**
2. Record up to 5 minutes (camera + mic)
3. Add text overlay (optional)
4. Add emoji reactions (optional)
5. Send to participant
6. Recipient gets notification
7. Can reply with video (threading)

---

## 🔐 Security Panel

**More** → **Security**

Host controls:
- 🔒 Lock meeting (no new joins)
- 🚪 Waiting room (approve each join)
- 🚫 Remove/block participant
- 🔇 Disable chat / screen share / reactions
- 📋 Activity log (suspicious events)
- 💧 Watermark (recording deterrent)
- 🛡️ E2E encryption status

---

## 📊 Analytics

### During Meeting:
**Insights** panel (right sidebar) shows:
- Speaking time % per person (live bar chart)
- Who hasn't spoken (with nudge)
- Engagement score per person
- Meeting pace (too fast / on track / too slow)
- Interruption counter

### Post-Meeting:
Go to `/analytics` for full report:
- Speaking timeline (swimlane chart)
- Word cloud from transcription
- Participation equity score
- Exportable PDF report

---

## 📅 Scheduler

**More** → **Scheduler**

1. Enter meeting title, date, time, duration
2. Set recurring (daily / weekly / once)
3. Add participants (email tags)
4. Select timezone
5. Auto-generates calendar invite (.ics)
6. Browser reminder 15 min before

### Auto-triggers:
- Meeting lobby opens 5 min before
- Calendar event added to user calendar
- Email notification sent

---

## 👥 Breakout Rooms

**Breakouts** button or **More** → **Breakouts**

### Host Flow:
1. Click **"Create Breakout Rooms"**
2. Choose: Manual assign or Smart Split (AI)
3. Set room count + time limit
4. Click **"Start"**

### Features:
- 📊 Activity feed (see which rooms active)
- 📢 Broadcast message to all rooms
- 🚪 Wander mode (allow free movement)
- ⏱️ Auto-close with countdown + warning

---

## 🏠 My Persistent Room

**Dashboard** → Your profile → **My Room**

Every user gets a permanent room:
- URL: `etherxmeet.app/room/[username]`
- Customizable name + description
- Waiting room message
- Auto-admit trusted contacts
- Shows room stats (total meetings, hours, collaborators)

---

## 📱 Dashboard

**Dashboard** at `/dashboard`

Shows:
- 📅 Upcoming meetings timeline
- 🎬 Recent meetings (quick rejoin)
- 🔥 Meeting streak (consecutive days)
- ⏱️ Total monthly meeting hours
- 👥 Top collaborators (avatar grid)
- 💬 Async video inbox
- 🔔 Notification center

---

## ⚙️ Settings

Visit `/settings` for full configuration:

### Tabs:
1. **Profile** — Name, email, title, timezone
2. **Audio** — Mic selection, EQ presets, noise suppression
3. **Video** — Camera, resolution, virtual background
4. **Appearance** — Theme (dark/light/AMOLED), accent colors
5. **Notifications** — Browser, email, reminder timing
6. **Privacy** — Data retention, recording consent, analytics
7. **Keyboard** — Shortcut reference

---

## 🎨 Virtual Background

**More** → **Virtual Background**

### Options:
- 🌫️ Blur (light / heavy)
- 🎨 Solid colors (12 options)
- 🏢 Preset scenes (Office, Cafe, Space, Beach, Library, Neon City)
- 📸 Custom image upload
- 🎬 Animated (Rainy Window, Fireplace, Lo-Fi Room)
- 🏢 Branded (company logo watermark)

### Preview:
- Live preview in settings panel
- Apply before using in meeting

---

## 💬 Chat

Click **Chat** button to open chat panel (right sidebar)

- 💬 Send messages
- 📍 Share links/code
- 🔄 Auto-translate (if enabled)
- ⏱️ Timestamps on all messages
- 🔍 Searchable history

---

## 👥 Participants

Click **People** button to list all attendees

- 📊 Speaking time % per person
- 🎤 Mute status
- 📹 Video status
- ✋ Hand raised indicator
- 🔗 Network quality dots (green/yellow/red)

---

## 📱 Screen Share

Click **Share+** in bottom bar

### Steps:
1. Choose: Tab / Window / Full Screen
2. Select which to share
3. Click **Share**
4. Annotation tools appear (optional)
5. Click **Stop** when done

### Annotation while sharing:
- Draw on top of screen
- All attendees see annotations
- Clear drawing
- End presentation mode

---

## 🏋️ Network Quality Indicator

Top-right of each video tile:
- 🟢 **Green** = Strong connection (≥ 25 Mbps)
- 🟡 **Yellow** = Fair connection (15-24 Mbps)
- 🔴 **Red** = Weak connection (< 15 Mbps)

---

## ❓ Troubleshooting

| Issue | Fix |
|-------|-----|
| Can't join meeting | Check meeting code format (xxx-xxxx-xxx) |
| Camera not working | Grant camera permission in browser settings |
| Mic not working | Select correct device in Audio settings |
| Screen share fails | Use supported browser (Chrome/Edge/Firefox) |
| Whiteboard not saving | Whiteboard is session-only, export before leaving |
| Recording not saved | Check localStorage hasn't hit quota |

---

## 🎯 Pro Tips

✅ **Enable Recording + Transcription** — Auto-generates chapters + searchable content
✅ **Use Agenda Rail** — Keeps meeting on track, easier to navigate recording later
✅ **Set Virtual Background** — Looks professional without needing a tidy office
✅ **Enable Analytics** — Spot who isn't speaking, improve meeting equity
✅ **Use Games** — Great icebreaker for larger meetings
✅ **Raise Hand** — Better signal than talking over people
✅ **Bookmark Your Room** — Your persistent room at `/room/[your-username]`
✅ **Customize Accent Color** — Make the UI feel personal in settings
✅ **Use Push-to-Talk** — Great for noisy environments (hold Space to talk)

---

## 📞 Common User Flows

### Quick 1-on-1 Call
1. Click **New Meeting** (1 sec)
2. Share meeting code (instant)
3. Other person joins (30 sec)
4. ✅ Connected

### Team Standup with Recording
1. Create meeting 5 min early
2. Enable recording (red REC badge)
3. Run standup 15 min
4. Stop recording (auto-saved)
5. Go to `/recordings` → View with chapters

### Design Critique with Whiteboard
1. New meeting
2. Click **Whiteboard**
3. Paste design (🖼️ Image tool)
4. Annotate together with team
5. Export as PNG when done

### Async Follow-up
1. Someone wasn't at meeting
2. Click **Async Messages**
3. Record 2-min video summary
4. Send to colleague
5. They reply with video
6. Threading conversation saved

---

## 🔗 Quick Links

| Link | Purpose |
|------|---------|
| `/` | Landing + create/join |
| `/room/abc-def-ghi` | Meeting room |
| `/dashboard` | Your meetings + inbox |
| `/recordings` | Video library |
| `/analytics` | Post-meeting stats |
| `/settings` | Profile + preferences |

---

**Happy Collaborating! 🎉**

For detailed feature docs, see `EtherXMeet_GUIDE.md`
