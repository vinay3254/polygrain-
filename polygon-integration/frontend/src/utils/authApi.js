import apiClient from './apiClient';

async function submitAuth(path, payload) {
  const response = await apiClient.post(path, payload);
  const authData = response.data?.data;

  if (!authData?.token || !authData?.user) {
    throw new Error('Authentication response was incomplete.');
  }

  return authData;
}

export function loginUser(credentials) {
  return submitAuth('/api/auth/login', credentials);
}

export function registerUser(payload) {
  return submitAuth('/api/auth/register', payload);
}
