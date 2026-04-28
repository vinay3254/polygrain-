# How to Run NexMeet (Polygon Integration)

## Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | 22 LTS (even version) | https://nodejs.org |
| MetaMask | Latest | https://metamask.io/download |
| Pinata account | Free tier | https://app.pinata.cloud |

> **Node.js version matters.** Hardhat requires an even-numbered LTS version (18, 20, 22). Node 25 will show a warning but still works.

---

## 1. Clone and Install

```bash
git clone <repo-url>
cd nexmeet
git checkout feature/polygon-integration

# Install contract dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend dependencies
cd backend && npm install && cd ..
```

---

## 2. Set Up Environment Variables

Copy the example file and fill in your values:

```bash
cp frontend/.env.example frontend/.env
```

Edit `frontend/.env`:

```
VITE_PINATA_JWT=your_jwt_from_pinata
VITE_PINATA_GATEWAY=https://gateway.pinata.cloud/ipfs
VITE_NETWORK=localhost
```

**Getting your Pinata JWT:**
1. Go to https://app.pinata.cloud/keys
2. Click **New Key** → enable Admin → click **Create**
3. Copy the **JWT Secret** value

---

## 3. Start the Hardhat Node

Open **Terminal 1** and keep it running:

```bash
cd nexmeet/.worktrees/polygon-integration
npx hardhat node
```

You will see 20 test accounts printed with their private keys and 10,000 ETH each. Keep this terminal open.

---

## 4. Deploy the Smart Contract

Open **Terminal 2**:

```bash
cd nexmeet/.worktrees/polygon-integration
npx hardhat run scripts/deploy.js --network localhost
```

Expected output:
```
Deploying MeetingRegistry
Deployer : 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
ABI + address saved to frontend/src/contracts/MeetingRegistry.json
```

The contract address is automatically saved — no manual copy needed.

---

## 5. Start the Frontend

Open **Terminal 3**:

```bash
cd nexmeet/.worktrees/polygon-integration/frontend
npm run dev
```

The app runs at **http://localhost:3000**

---

## 6. Start the Backend (Optional)

The backend handles auth and recordings only (Socket.io has been removed).

Open **Terminal 4**:

```bash
cd nexmeet/.worktrees/polygon-integration/backend
npm run dev
```

---

## 7. Configure MetaMask

1. Install MetaMask as a browser extension
2. Open MetaMask → click the network dropdown → **Add a custom network**

| Field | Value |
|---|---|
| Network name | Hardhat |
| RPC URL | http://127.0.0.1:8545 |
| Chain ID | 31337 |
| Currency symbol | ETH |

3. Import a test account: MetaMask → Add account → **Import account** → paste this private key:

```
0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

This is Hardhat Account #0 — pre-funded with 10,000 ETH.

---

## 8. Test the Full Flow

### Create a room as host

1. Go to `http://localhost:3000` and start a new meeting
2. The URL will include `?role=host` — MetaMask pops up to approve `createMeeting`
3. Approve the transaction — meeting is now on-chain

### Join as a participant

1. Share the room URL **without** `?role=host`
2. Open it in another browser window with a different MetaMask account
3. Approve the `joinMeeting` transaction

### Send a chat message

1. Type in the chat box (bottom-right) and press Enter or Send
2. Message appears immediately with a `⋯` pending indicator
3. MetaMask approves the `sendMessage` transaction
4. After ~3 seconds the pending indicator disappears — message confirmed on-chain

### End the meeting

1. Host clicks **End Meeting** (only visible to the host)
2. Approve the `endMeeting` transaction
3. Chat input disables — meeting is closed on-chain

---

## Run Smart Contract Tests

```bash
cd nexmeet/.worktrees/polygon-integration
npx hardhat test
```

Expected: **30 passing**

---

## Common Issues

**"MetaMask is locked or has no accounts"**
→ Open MetaMask, unlock it, make sure an account is selected, then click Connect Wallet again.

**"MeetingRegistry: meeting does not exist"**
→ You navigated to a room URL without `?role=host`. Create the meeting from the dashboard or add `?role=host` to the URL.

**"could not coalesce error"**
→ MetaMask is on the wrong network. Switch to the Hardhat network (Chain ID 31337) in MetaMask.

**Hardhat node not running**
→ Terminal 1 must stay open with `npx hardhat node` running throughout your session. If you restart the node, redeploy the contract (Step 4).

**Port 3000 already in use**
→ Another process is using port 3000. Kill it or change the port in `frontend/vite.config.js`.
