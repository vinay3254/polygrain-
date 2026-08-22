import React from 'react'
import ReactDOM from 'react-dom/client'
import { HMSRoomProvider } from '@100mslive/react-sdk'
import App from './App.jsx'
import './index.css'
import './styles/ambient.css'

// ── Migrate legacy seed data ────────────────────────────────────────────────
const DATA_VERSION = '2';
if (localStorage.getItem('nexmeet_data_version') !== DATA_VERSION) {
  localStorage.removeItem('nexmeet_upcoming_meetings');
  localStorage.removeItem('nexmeet_saved_recordings');
  localStorage.removeItem('nexmeet_async_messages');
  localStorage.removeItem('nexmeet_notifications');
  localStorage.setItem('nexmeet_data_version', DATA_VERSION);
}

// ── Evict stale Web3Auth tokens ─────────────────────────────────────────────
// Previous versions used Web3Auth for authentication. Those JWTs have issuer
// "web3auth.io" which the 100ms HMS SDK rejects with "Unrecognized Web3Auth
// token issuer". Detect and clear them so users aren't stuck on the login page.
const AUTH_VERSION = '3';
if (localStorage.getItem('nexmeet_auth_version') !== AUTH_VERSION) {
  const storedToken = localStorage.getItem('nexmeet_token');
  if (storedToken) {
    try {
      // Decode the JWT payload (base64url middle segment) without verifying signature
      const payloadB64 = storedToken.split('.')[1];
      if (payloadB64) {
        const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));
        // If issuer is web3auth.io (old provider), wipe the session
        if (payload?.iss && String(payload.iss).includes('web3auth')) {
          localStorage.removeItem('nexmeet_token');
          localStorage.removeItem('nexmeet_user');
        }
      }
    } catch {
      // Malformed token — remove it to be safe
      localStorage.removeItem('nexmeet_token');
      localStorage.removeItem('nexmeet_user');
    }
  }
  localStorage.setItem('nexmeet_auth_version', AUTH_VERSION);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HMSRoomProvider>
      <App />
    </HMSRoomProvider>
  </React.StrictMode>,
)
