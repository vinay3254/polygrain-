import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import HMS from '@100mslive/server-sdk';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 4000);

const ACCESS_KEY = process.env.VITE_100MS_APP_KEY || process.env.HMS_ACCESS_KEY;
const APP_SECRET = process.env.VITE_100MS_APP_SECRET || process.env.HMS_SECRET;
const DEFAULT_ROLE = process.env.VITE_100MS_DEFAULT_ROLE || 'host';
const TEMPLATE_ID = process.env.VITE_100MS_TEMPLATE_ID;

if (!ACCESS_KEY || !APP_SECRET) {
  console.warn('100ms credentials are missing. Set VITE_100MS_APP_KEY and VITE_100MS_APP_SECRET in .env.');
}

let hms = null;
const roomCodeCache = new Map();

app.use(cors());
app.use(express.json());

const requireHmsConfig = (req, res, next) => {
  if (!hms && ACCESS_KEY && APP_SECRET) {
    try {
      hms = new HMS.SDK(ACCESS_KEY, APP_SECRET);
    } catch (error) {
      hms = null;
    }
  }

  if (!hms) {
    return res.status(500).json({
      error: '100ms server credentials are missing. Set VITE_100MS_APP_KEY and VITE_100MS_APP_SECRET.',
    });
  }
  return next();
};

const normalizeCode = (code = '') => code.trim().toLowerCase();

async function findRoomByCode(roomCode) {
  const normalized = normalizeCode(roomCode);
  if (!normalized) {
    return null;
  }

  if (roomCodeCache.has(normalized)) {
    return roomCodeCache.get(normalized);
  }

  for await (const room of hms.rooms.list()) {
    for await (const codeObj of hms.roomCodes.list(room.id, { enabled: true })) {
      const cacheValue = {
        roomId: room.id,
        role: codeObj.role,
      };
      roomCodeCache.set(normalizeCode(codeObj.code), cacheValue);

      if (normalizeCode(codeObj.code) === normalized) {
        return cacheValue;
      }
    }
  }

  return null;
}

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/create-room', requireHmsConfig, async (req, res) => {
  try {
    const username = req.body?.username?.trim() || `user-${Date.now()}`;

    const roomParams = TEMPLATE_ID
      ? { name: `etherxmeet-${Date.now()}`, template_id: TEMPLATE_ID }
      : { name: `etherxmeet-${Date.now()}` };

    const room = await hms.rooms.create(roomParams);
    const roomCodes = await hms.roomCodes.create(room.id);

    const selectedRoomCode = roomCodes.find((item) => item.role === DEFAULT_ROLE) || roomCodes[0];
    const selectedRole = selectedRoomCode?.role || DEFAULT_ROLE;

    if (!selectedRoomCode?.code) {
      return res.status(500).json({ error: 'Unable to create room code.' });
    }

    roomCodeCache.set(normalizeCode(selectedRoomCode.code), {
      roomId: room.id,
      role: selectedRole,
    });

    const authToken = await hms.auth.getAuthToken({
      roomId: room.id,
      role: selectedRole,
      userId: username,
    });

    return res.json({
      roomCode: selectedRoomCode.code,
      role: selectedRole,
      roomId: room.id,
      authToken: authToken.token,
    });
  } catch (error) {
    console.error('create-room failed', error);
    return res.status(500).json({ error: 'Failed to create room.' });
  }
});

app.post('/get-token', requireHmsConfig, async (req, res) => {
  try {
    const roomCode = req.body?.roomCode;
    const username = req.body?.username?.trim() || `user-${Date.now()}`;

    if (!roomCode) {
      return res.status(400).json({ error: 'roomCode is required.' });
    }

    const match = await findRoomByCode(roomCode);
    if (!match) {
      return res.status(404).json({ error: 'Room code not found.' });
    }

    const authToken = await hms.auth.getAuthToken({
      roomId: match.roomId,
      role: match.role || DEFAULT_ROLE,
      userId: username,
    });

    return res.json({
      roomCode,
      roomId: match.roomId,
      role: match.role || DEFAULT_ROLE,
      authToken: authToken.token,
    });
  } catch (error) {
    console.error('get-token failed', error);
    return res.status(500).json({ error: 'Failed to generate join token.' });
  }
});

app.listen(PORT, () => {
  console.log(`100ms token server running on http://localhost:${PORT}`);
});
