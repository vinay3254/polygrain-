import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Copy,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  MoreVertical,
  Settings,
  UserRound,
} from 'lucide-react';
import Dropdown from '../ui/Dropdown';
import { useMeeting } from '../../context/MeetingContext';
import { useUser } from '../../context/UserContext';
import { ROUTES } from '../../utils/constants';
import { clearAuthSession, getUserInitials } from '../../utils/auth';

function buildMeetingCode(meetingId) {
  if (!meetingId) {
    return 'ETHX-ROOM';
  }

  const normalized = meetingId.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  if (normalized.length <= 4) {
    return `ETHX-${normalized}`;
  }

  return normalized.match(/.{1,4}/g)?.slice(0, 3).join('-') || normalized;
}

function buildWeatherLabel(hour) {
  if (hour >= 18 || hour < 6) {
    return '24°C Clear';
  }

  if (hour >= 12) {
    return '29°C Bright';
  }

  return '26°C Calm';
}

export default function TopBar({ showMeetingInfo = false }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const { meetingId, meetingTitle, startTime } = useMeeting();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const timezone = user.timezone || 'UTC';

  const elapsedTime = useMemo(() => {
    const seconds = Math.max(0, Math.floor((now - startTime) / 1000));
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainder = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
    }

    return `${minutes.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  }, [now, startTime]);

  const localClock = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        month: 'short',
        timeZone: timezone,
      }).format(now),
    [now, timezone],
  );

  const currentHour = useMemo(
    () =>
      Number(
        new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          hour12: false,
          timeZone: timezone,
        }).format(now),
      ),
    [now, timezone],
  );

  const weatherLabel = useMemo(() => buildWeatherLabel(currentHour), [currentHour]);
  const meetingCode = useMemo(() => buildMeetingCode(meetingId), [meetingId]);
  const userInitials = useMemo(() => getUserInitials(user.name), [user.name]);

  const copyMeetingLink = () => {
    navigator.clipboard?.writeText(`${window.location.origin}/room/${meetingId || 'etherx'}`);
  };

  const handleLogout = () => {
    clearAuthSession();
    window.location.replace(ROUTES.LOGIN);
  };

  const meetingOptions = [
    {
      label: 'Copy Invite Link',
      icon: <Copy className="h-4 w-4" />,
      onClick: copyMeetingLink,
    },
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="h-4 w-4" />,
      onClick: () => navigate(ROUTES.DASHBOARD),
    },
    {
      label: 'Settings',
      icon: <Settings className="h-4 w-4" />,
      onClick: () => navigate(ROUTES.SETTINGS),
    },
    {
      label: 'Logout',
      icon: <LogOut className="h-4 w-4" />,
      onClick: handleLogout,
    },
  ];

  const userOptions = meetingOptions.filter((option) => option.label !== 'Copy Invite Link');
  const logoutButton = (
    <button
      type="button"
      onClick={handleLogout}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/70 transition-all duration-300 hover:text-[#D4B571] bg-transparent border-none cursor-pointer"
    >
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline">Logout</span>
    </button>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-transparent font-inter">
      <div className="mx-auto flex max-w-[1680px] flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-6 xl:px-8">
        <button
          onClick={() => navigate(ROUTES.HOME)}
          className="flex min-w-0 items-center bg-transparent border-none p-0 cursor-pointer"
        >
          <EtherxMark />
        </button>

        {showMeetingInfo ? (
          <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
            <TopChip
              eyebrow="Meeting"
              value={meetingTitle || 'ETHERX Board Review'}
              detail={`Elapsed ${elapsedTime}`}
            />
            <TopChip eyebrow="Local Time" value={localClock} />
            <TopChip eyebrow="Weather" value={weatherLabel} />

            <button
              onClick={copyMeetingLink}
              className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-[#D4B571]/30 hover:shadow-[0_0_0_1px_rgba(212,175,55,0.12)]"
              title="Copy invite link"
            >
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">Code</p>
                <p className="text-sm font-medium text-white">{meetingCode}</p>
              </div>
              <Copy className="h-4 w-4 text-[#D4B571]" />
            </button>

            <IconShell title="Secure room">
              <LockKeyhole className="h-4 w-4 text-[#D4B571]" />
            </IconShell>

            <Dropdown
              position="bottom-right"
              trigger={
                <IconShell title="Meeting options">
                  <MoreVertical className="h-4 w-4 text-white/72" />
                </IconShell>
              }
              items={meetingOptions}
            />

            {logoutButton}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="hidden md:block text-left px-2">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-white/45">{user.plan}</p>
            </div>

            <Dropdown
              position="bottom-right"
              trigger={
                <button className="flex items-center gap-2 px-2 py-1 transition-all duration-300 hover:text-[#D4B571] bg-transparent border-none cursor-pointer">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#D4B571,#6F5115)] text-sm font-semibold text-black">
                    {userInitials}
                  </div>
                  <UserRound className="h-4 w-4 text-white/65" />
                </button>
              }
              items={userOptions}
            />

            {logoutButton}
          </div>
        )}
      </div>
    </header>
  );
}

function EtherxMark() {
  return (
    <img
      src="/src/assets/etherx_transparent.png"
      alt="EtherX Meet"
      style={{ height: '110px', width: 'auto', display: 'block' }}
    />
  );
}

function TopChip({ eyebrow, value, detail }) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <p className="text-[10px] uppercase tracking-[0.24em] text-white/38">{eyebrow}</p>
      <p className="mt-0.5 text-sm font-medium text-white">{value}</p>
      {detail ? <p className="mt-0.5 text-xs text-white/45">{detail}</p> : null}
    </div>
  );
}

function IconShell({ children, title }) {
  return (
    <button
      className="flex h-[52px] w-[52px] items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-[#D4B571]/30 hover:text-[#D4B571]"
      title={title}
      type="button"
    >
      {children}
    </button>
  );
}
