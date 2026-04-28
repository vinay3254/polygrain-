# EtherXMeet — Product Document

## Overview

EtherXMeet is a decentralized Web3 video conferencing platform that combines real-time video meetings with on-chain transparency. Every meeting, participant, chat message, and end event is recorded on a blockchain smart contract, giving users a verifiable, tamper-proof record of their communication history. Built on Ethereum-compatible networks (with Polygon support), EtherXMeet brings trust and decentralization to the video conferencing space.

---

## Problem Statement

Traditional video conferencing platforms (Zoom, Google Meet, Teams) are centralized. Meeting records, chat logs, and participant data are owned and controlled by corporations. There is no way for users to independently verify meeting history, prove attendance, or own their data. EtherXMeet solves this by anchoring every key meeting event on a public blockchain.

---

## Key Features

### 1. On-Chain Meeting Lifecycle
Every meeting goes through a fully on-chain lifecycle managed by the `MeetingRegistry` smart contract:
- **Create** — Host creates a meeting, triggering a blockchain transaction that mints a unique meeting ID
- **Join** — Participants join by signing a transaction recorded on-chain
- **Chat** — Messages are sent as on-chain transactions, permanently stored
- **End** — Host ends the meeting with a final transaction, closing the on-chain record

### 2. Video Conferencing
Real-time video and audio powered by **8x8.vc** (Jitsi-as-a-Service), supporting:
- Camera and microphone access
- Screen sharing
- Full-screen mode
- Multi-participant rooms

### 3. IPFS Meeting Receipts
At the end of each meeting, a receipt is generated and pinned to **IPFS via Pinata**, containing:
- Meeting ID and room code
- Transaction hash
- Block number
- Duration in minutes
- Participant count
- IPFS CID for permanent retrieval

### 4. Wallet Authentication
Users connect via **MetaMask** (or any EIP-1193 wallet). No username or password required for Web3 login — the wallet address is the identity.

### 5. Google OAuth
Traditional email/password registration and Google OAuth are supported for users who prefer Web2 authentication alongside the Web3 wallet flow.

### 6. ChainHUD
A real-time heads-up display overlaid on the meeting room showing:
- Connected wallet address
- Current network (Hardhat / Polygon)
- Contract address
- Live block number

### 7. Gold-Themed UI
EtherXMeet features a distinctive dark luxury aesthetic:
- Background: `#090B0B` (near-black)
- Primary Gold: `#D4B571`
- Shadow Gold: `#6F5115`
- Animated video background with gold color grading
- Glassmorphism cards with gold borders

---

## Technical Architecture

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + Vite | UI framework and build tool |
| React Router v6 | Client-side routing |
| Framer Motion | Animations and page transitions |
| ethers.js v6 | Blockchain interaction |
| Tailwind CSS v4 | Utility styling |
| Axios | HTTP requests to backend |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | User data and session storage |
| Passport.js | Google OAuth 2.0 strategy |
| JWT | Stateless authentication tokens |
| LiveKit Server SDK | Room token generation (video) |

### Blockchain
| Technology | Purpose |
|---|---|
| Solidity | Smart contract language |
| Hardhat | Local development node and deployment |
| MeetingRegistry.sol | Core smart contract |
| Polygon (mainnet/testnet) | Production deployment target |

### Storage
| Technology | Purpose |
|---|---|
| Pinata | IPFS pinning service |
| IPFS | Decentralized meeting receipt storage |

---

## Smart Contract — MeetingRegistry

Deployed at `0x5FbDB2315678afecb367f032d93F642f64180aa3` (localhost / Hardhat).

### Key Functions
```solidity
createMeeting(string roomCode)       // Host creates a meeting
joinMeeting(uint256 meetingId)       // Participant joins
sendMessage(uint256 meetingId, string content)  // On-chain chat
endMeeting(uint256 meetingId)        // Host ends the meeting
```

### Events Emitted
- `MeetingCreated(meetingId, host, roomCode, timestamp)`
- `ParticipantJoined(meetingId, participant, timestamp)`
- `MessageSent(meetingId, sender, content, timestamp)`
- `MeetingEnded(meetingId, timestamp)`

---

## User Flow

```
1. User visits http://localhost:3000
2. Connects MetaMask wallet on landing page
3. Clicks "New Meeting" → MetaMask prompts createMeeting tx
4. Room page opens with 8x8.vc video + ChainHUD overlay
5. Participants join via shared URL → joinMeeting tx
6. Chat messages sent → sendMessage tx (pending → confirmed)
7. Host clicks "End Meeting" → endMeeting tx
8. Meeting receipt generated → pinned to IPFS
9. Receipt modal shown with tx hash, CID, duration, participants
```

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Landing | Connect wallet, create or join meeting |
| `/login` | Login | Email/password or Google OAuth |
| `/register` | Register | Create a new account |
| `/dashboard` | Dashboard | Meeting history, quick actions |
| `/room/:code` | Room | Live video + on-chain chat + ChainHUD |

---

## Environment Variables

### Frontend (`frontend/.env`)
```
VITE_PINATA_JWT=           # Pinata JWT for IPFS uploads
VITE_PINATA_GATEWAY=       # IPFS gateway URL
VITE_NETWORK=localhost     # "localhost" or "mainnet"
VITE_LIVEKIT_WS_URL=       # LiveKit WebSocket URL
```

### Backend (`backend/.env`)
```
PORT=5000
MONGO_URI=                 # MongoDB connection string
JWT_SECRET=                # JWT signing secret
GOOGLE_CLIENT_ID=          # Google OAuth client ID
GOOGLE_CLIENT_SECRET=      # Google OAuth client secret
LIVEKIT_API_KEY=           # LiveKit API key
LIVEKIT_API_SECRET=        # LiveKit API secret
```

---

## Running the Project

```bash
# Terminal 1 — Hardhat node
npx hardhat node

# Terminal 2 — Deploy contract
npx hardhat run scripts/deploy.js --network localhost

# Terminal 3 — Frontend
cd frontend && npm run dev

# Terminal 4 — Backend
cd backend && npm run dev
```

Frontend: `http://localhost:3000`
Backend: `http://localhost:5000`
Blockchain RPC: `http://127.0.0.1:8545`

---

## MetaMask Setup

| Field | Value |
|---|---|
| Network name | Hardhat |
| RPC URL | http://127.0.0.1:8545 |
| Chain ID | 31337 |
| Currency | ETH |

Test account private key (10,000 ETH pre-funded):
```
0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

---

## Roadmap

- [ ] Recording functionality via LiveKit cloud recording
- [ ] Polygon mainnet deployment
- [ ] ENS name resolution for wallet display
- [ ] Meeting NFT receipts (ERC-721 mint on meeting end)
- [ ] DAO-based meeting governance
- [ ] Mobile app (React Native)
- [ ] End-to-end encrypted on-chain messaging

---

## Team

| Role | Responsibility |
|---|---|
| Full-Stack Developer | Frontend, backend, smart contracts |
| Blockchain Engineer | Solidity, Hardhat, Polygon deployment |
| UI/UX Designer | Gold theme, glassmorphism, animations |

---

*EtherXMeet — Own your meetings. Every word, on-chain.*
