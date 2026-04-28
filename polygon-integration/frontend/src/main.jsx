import React from 'react'
import ReactDOM from 'react-dom/client'
import { HMSRoomProvider } from '@100mslive/react-sdk'
import App from './App.jsx'
import './index.css'
import './styles/ambient.css'

// Clear legacy seed data on first load after this version
const DATA_VERSION = '2';
if (localStorage.getItem('nexmeet_data_version') !== DATA_VERSION) {
  localStorage.removeItem('nexmeet_upcoming_meetings');
  localStorage.removeItem('nexmeet_saved_recordings');
  localStorage.removeItem('nexmeet_async_messages');
  localStorage.removeItem('nexmeet_notifications');
  localStorage.setItem('nexmeet_data_version', DATA_VERSION);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HMSRoomProvider>
      <App />
    </HMSRoomProvider>
  </React.StrictMode>,
)
