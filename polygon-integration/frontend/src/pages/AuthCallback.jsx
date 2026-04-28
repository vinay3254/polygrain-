import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { ROUTES } from '../utils/constants';

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState('Signing you in with Google...');

  useEffect(() => {
    const finalizeGoogleAuth = async () => {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get('token');

      if (!token) {
        setStatus('Google sign-in failed. Redirecting to login...');
        window.setTimeout(() => navigate(ROUTES.LOGIN, { replace: true }), 1500);
        return;
      }

      window.localStorage.setItem('nexmeet_token', token);

      try {
        const response = await apiClient.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data?.data?.user;

        if (!user) {
          throw new Error('Unable to fetch profile after Google login.');
        }

        window.localStorage.setItem('nexmeet_user', JSON.stringify(user));
        navigate(ROUTES.HOME, { replace: true });
      } catch (_error) {
        window.localStorage.removeItem('nexmeet_token');
        window.localStorage.removeItem('nexmeet_user');
        setStatus('Unable to complete sign-in. Redirecting to login...');
        window.setTimeout(() => navigate(ROUTES.LOGIN, { replace: true }), 1500);
      }
    };

    finalizeGoogleAuth();
  }, [location.search, navigate]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#202124',
        color: '#e8eaed',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <p style={{ fontSize: '14px', color: '#9aa0a6' }}>{status}</p>
    </div>
  );
}
