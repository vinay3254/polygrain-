import { createContext, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { AUTH_USER_KEY, buildStoredUser, DEFAULT_USER_PROFILE } from '../utils/auth';

const DEFAULT_SETTINGS = {
  appearance: {
    theme: 'dark',
    accent: '#4F46E5',
    fontScale: 'comfortable',
    highContrast: false,
    customCursor: true,
  },
  notifications: {
    browser: true,
    email: true,
    reminders: '15m',
  },
  privacy: {
    retention: '90d',
    recordingConsent: true,
    autoTranslateChat: true,
  },
  audio: {
    pushToTalk: false,
    noiseSuppression: true,
    focusAudio: false,
    equalizerPreset: 'Voice Clarity',
  },
  video: {
    resolution: '1080p',
    background: { type: 'preset', value: 'Neon City', blur: 0, branded: true },
    translationLanguage: 'es',
  },
};

const UserContext = createContext(null);

/**
 * Stores the current user profile and cross-page user preferences.
 *
 * @param {{ children: import('react').ReactNode }} props
 */
export function UserProvider({ children }) {
  const [storedUser, setUser] = useLocalStorage(AUTH_USER_KEY, DEFAULT_USER_PROFILE);
  const [settings, setSettings] = useLocalStorage('nexmeet_user_settings', DEFAULT_SETTINGS);
  const user = useMemo(() => buildStoredUser(storedUser), [storedUser]);

  const updateUser = (updates) => {
    setUser((previousUser) => ({
      ...buildStoredUser(previousUser),
      ...updates,
    }));
  };

  const updateSettings = (section, updates) => {
    setSettings((previousSettings) => ({
      ...previousSettings,
      [section]: {
        ...previousSettings[section],
        ...updates,
      },
    }));
  };

  const value = useMemo(
    () => ({
      user,
      settings,
      updateUser,
      updateSettings,
      resetSettings: () => setSettings(DEFAULT_SETTINGS),
    }),
    [settings, user, setSettings],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
}

export const useUser = useUserContext;
