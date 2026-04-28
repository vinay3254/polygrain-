// frontend/src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AnimationProvider } from './context/AnimationContext';
import { MeetingProvider } from './context/MeetingContext';
import { UserProvider } from './context/UserContext';
import { UIProvider } from './context/UIContext';
import { WalletProvider } from './context/WalletContext';
import VideoBackground from './components/effects/VideoBackground';
import Landing from './pages/Landing';
import Join from './pages/Join';
import Room from './pages/Room';
import Dashboard from './pages/Dashboard';
import Recordings from './pages/Recordings';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthCallback from './pages/AuthCallback';
import CommandPalette from './components/layout/CommandPalette';
import ToastSystem from './components/layout/ToastSystem';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ROUTES } from './utils/constants';

/** Inner component so useLocation can be called inside BrowserRouter. */
function AppRoutes() {
  const location = useLocation();
  return (
    <>

      <CommandPalette />
      <ToastSystem />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path={ROUTES.LOGIN}         element={<Login />} />
          <Route path={ROUTES.REGISTER}      element={<Register />} />
          <Route path={ROUTES.AUTH_CALLBACK} element={<AuthCallback />} />
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.HOME}        element={<Landing />} />
            <Route path={ROUTES.JOIN}        element={<Join />} />
            <Route path={ROUTES.ROOM}        element={<Room />} />
            <Route path={ROUTES.DASHBOARD}   element={<Dashboard />} />
            <Route path={ROUTES.RECORDINGS}  element={<Recordings />} />
            <Route path={ROUTES.ANALYTICS}   element={<Analytics />} />
            <Route path={ROUTES.SETTINGS}    element={<Settings />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <VideoBackground />
      <WalletProvider>
        <AnimationProvider>
          <UserProvider>
            <UIProvider>
              <MeetingProvider>
                <AppRoutes />
              </MeetingProvider>
            </UIProvider>
          </UserProvider>
        </AnimationProvider>
      </WalletProvider>
    </BrowserRouter>
  );
}

export default App;
