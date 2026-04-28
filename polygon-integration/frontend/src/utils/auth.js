export const AUTH_TOKEN_KEY = 'nexmeet_token';
export const AUTH_USER_KEY = 'nexmeet_user';

export const DEFAULT_USER_PROFILE = {
  id: 'nex-user',
  name: 'Astra Vale',
  title: 'Product Strategy Lead',
  email: 'astra.vale@etherxmeet.app',
  timezone: 'Asia/Kolkata',
  avatarColor: 'primary',
  plan: 'Enterprise',
  roomSlug: 'astra-vale',
  roomName: 'Astra Room',
  roomDescription: 'Persistent room for async reviews, design crits, and weekly operating rituals.',
  avatar: null,
};

function slugify(value = '') {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || DEFAULT_USER_PROFILE.roomSlug;
}

export function buildStoredUser(user = {}) {
  const name = user.name?.trim() || DEFAULT_USER_PROFILE.name;
  const email = user.email?.trim().toLowerCase() || DEFAULT_USER_PROFILE.email;
  const id = user.id || user._id || DEFAULT_USER_PROFILE.id;
  const firstName = name.split(' ')[0] || 'EtherXMeet';

  return {
    ...DEFAULT_USER_PROFILE,
    ...user,
    id,
    _id: user._id || id,
    name,
    email,
    title: user.title || DEFAULT_USER_PROFILE.title,
    timezone: user.timezone || DEFAULT_USER_PROFILE.timezone,
    avatarColor: user.avatarColor || DEFAULT_USER_PROFILE.avatarColor,
    plan: user.plan || DEFAULT_USER_PROFILE.plan,
    roomSlug: user.roomSlug || slugify(name),
    roomName: user.roomName || `${firstName} Room`,
    roomDescription:
      user.roomDescription ||
      `${name}'s persistent EtherXMeet room for live sessions and async follow-ups.`,
  };
}

export function getAuthToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getStoredUser() {
  if (typeof window === 'undefined') {
    return null;
  }

  const rawValue = window.localStorage.getItem(AUTH_USER_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return buildStoredUser(JSON.parse(rawValue));
  } catch (error) {
    console.error('Failed to parse saved EtherXMeet user:', error);
    return null;
  }
}

export function persistAuthSession({ token, user }) {
  if (typeof window === 'undefined') {
    return;
  }

  const normalizedUser = buildStoredUser(user);
  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(normalizedUser));
}

export function clearAuthSession() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.localStorage.removeItem(AUTH_USER_KEY);
}

export function isAuthenticated() {
  return Boolean(getAuthToken());
}

export function getUserInitials(name = '') {
  return name
    .split(' ')
    .map((segment) => segment[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
