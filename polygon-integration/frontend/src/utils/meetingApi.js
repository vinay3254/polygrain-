import axios from 'axios';
import { getAuthToken } from './auth';
import { getApiErrorMessage } from './apiClient';

const meetingApiClient = axios.create({
  baseURL: import.meta.env.VITE_MEETING_API_BASE_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

meetingApiClient.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

async function post(path, body) {
  try {
    const response = await meetingApiClient.post(path, body);
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Request failed.'));
  }
}

export function createRoom(username) {
  return post('/create-room', { username });
}

export function getJoinToken(roomCode, username) {
  return post('/get-token', { roomCode, username });
}
