import { createContext, useContext, useMemo, useState } from 'react';
import { TOAST_TYPES } from '../utils/constants';

const UIContext = createContext(null);

/**
 * Global UI orchestration for toasts, command palette visibility, and overlays.
 *
 * @param {{ children: import('react').ReactNode }} props
 */
export function UIProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [networkStatus, setNetworkStatus] = useState('stable');
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nexmeet_theme') || 'dark';
    }
    return 'dark';
  });

  const addToast = (message, type = TOAST_TYPES.INFO, duration = 4000) => {
    const id = crypto.randomUUID();
    setToasts((previousToasts) => [...previousToasts, { id, message, type, duration }]);
    return id;
  };

  const removeToast = (toastId) => {
    setToasts((previousToasts) => previousToasts.filter((toast) => toast.id !== toastId));
  };

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexmeet_theme', newTheme);
    }
  };

  const value = useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
      isCommandPaletteOpen,
      openCommandPalette: () => setIsCommandPaletteOpen(true),
      closeCommandPalette: () => setIsCommandPaletteOpen(false),
      toggleCommandPalette: () => setIsCommandPaletteOpen((previous) => !previous),
      networkStatus,
      setNetworkStatus,
      isReconnecting,
      setIsReconnecting,
      theme,
      setTheme,
    }),
    [isCommandPaletteOpen, isReconnecting, networkStatus, toasts, theme],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }

  return context;
}
