import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/layout/AnimatedPage';
import { staggerContainer, staggerChild } from '../utils/animationVariants';
import {
  Bell,
  ChevronRight,
  Moon,
  Palette,
  Settings as SettingsIcon,
  Shield,
  Zap,
  Lock,
  Volume2,
  Mic,
  Video as VideoIcon,
  Keyboard,
  User,
  LogOut,
} from 'lucide-react';
import TopBar from '../components/layout/TopBar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Switch from '../components/ui/Switch';
import Tabs from '../components/ui/Tabs';
import { useUserContext } from '../context/UserContext';
import { useUI } from '../context/UIContext';

const KEYBOARD_SHORTCUTS = [
  { keys: 'M', description: 'Mute/Unmute microphone' },
  { keys: 'V', description: 'Turn camera on/off' },
  { keys: 'S', description: 'Share screen' },
  { keys: 'R', description: 'Raise hand' },
  { keys: 'C', description: 'Open chat' },
  { keys: 'Cmd+K', description: 'Command palette' },
  { keys: 'Escape', description: 'Close panels' },
  { keys: 'Space', description: 'Push to talk (hold)' },
];

export default function Settings() {
  const { user, updateUser } = useUserContext();
  const { theme, setTheme } = useUI();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    title: user.title || '',
    timezone: user.timezone || 'UTC',
  });

  const [audioDevice, setAudioDevice] = useState('default');
  const [videoDevice, setVideoDevice] = useState('default');
  const [notificationSettings, setNotificationSettings] = useState({
    browserNotifications: true,
    emailNotifications: false,
    meetingReminders: true,
    chatNotifications: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    dataRetention: 90,
    recordingConsent: true,
    analyticsTracking: false,
  });

  const handleProfileUpdate = () => {
    updateUser(formData);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <AnimatedPage>
    <div className="min-h-[100dvh] bg-app-background text-app-text" style={{ position: 'relative' }}>
      <div className="aurora-bg aurora-subtle" aria-hidden="true" />
      <TopBar />

      <main className="mx-auto max-w-6xl px-4 py-8 pb-24 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <SettingsIcon className="h-8 w-8 text-indigo-400" />
            <h1 className="text-4xl font-bold font-syne">Settings</h1>
          </div>
          <p className="text-white/50 mt-1">Manage your profile, devices, and preferences</p>
        </motion.div>

        <Tabs
          tabs={[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'audio', label: 'Audio', icon: Mic },
            { id: 'video', label: 'Video', icon: VideoIcon },
            { id: 'appearance', label: 'Appearance', icon: Palette },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'privacy', label: 'Privacy', icon: Shield },
            { id: 'shortcuts', label: 'Keyboard', icon: Keyboard },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <motion.div
          key={activeTab}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-8"
        >
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div variants={staggerChild} className="space-y-6">
              <SettingCard title="Profile Information" description="Update your account details">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                  <Input
                    label="Title/Role"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Product Manager"
                  />
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Timezone
                    </label>
                    <select className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white backdrop-blur-xl transition-colors hover:border-white/20 focus:border-indigo-400 focus:outline-none">
                      <option>UTC</option>
                      <option>EST (UTC-5)</option>
                      <option>CST (UTC-6)</option>
                      <option>PST (UTC-8)</option>
                      <option>GMT (UTC+0)</option>
                      <option>IST (UTC+5:30)</option>
                      <option>SGT (UTC+8)</option>
                    </select>
                  </div>
                </div>
              </SettingCard>

              <SettingCard title="Account Plan" description="Your current subscription">
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-white">EtherXMeet Pro</h4>
                      <p className="text-sm text-white/60 mt-1">
                        Unlimited meetings, advanced features, 1000 GB storage
                      </p>
                      <p className="text-xs text-emerald-300 mt-2">
                        Renews on May 8, 2026
                      </p>
                    </div>
                    <div className="rounded-full bg-emerald-400/20 px-4 py-2">
                      <span className="text-xs font-semibold text-emerald-300">Active</span>
                    </div>
                  </div>
                </div>
              </SettingCard>

              <div className="flex gap-4">
                <Button variant="primary" onClick={handleProfileUpdate}>
                  Save Changes
                </Button>
                <Button variant="ghost">Cancel</Button>
              </div>
            </motion.div>
          )}

          {/* Audio Tab */}
          {activeTab === 'audio' && (
            <motion.div variants={staggerChild} className="space-y-6">
              <SettingCard title="Audio Input" description="Select your microphone">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Microphone
                  </label>
                  <select
                    value={audioDevice}
                    onChange={(e) => setAudioDevice(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white backdrop-blur-xl"
                  >
                    <option value="default">Default Device</option>
                    <option value="usb">USB Audio Interface</option>
                    <option value="headset">Wireless Headset</option>
                  </select>
                </div>
              </SettingCard>

              <SettingCard title="Audio Output" description="Select your speakers">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Speaker
                  </label>
                  <select
                    defaultValue="default"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white backdrop-blur-xl"
                  >
                    <option value="default">Default Device</option>
                    <option value="speakers">Built-in Speakers</option>
                    <option value="headphone">Headphones</option>
                  </select>
                </div>
              </SettingCard>

              <SettingCard title="Audio Effects" description="Enhance your audio">
                <div className="space-y-4">
                  <SettingToggle
                    label="Noise Suppression"
                    description="Reduce background noise during calls"
                    enabled={true}
                  />
                  <SettingToggle
                    label="Echo Cancellation"
                    description="Remove echo from your audio"
                    enabled={true}
                  />
                  <SettingToggle
                    label="Auto Gain Control"
                    description="Automatically adjust microphone level"
                    enabled={true}
                  />
                </div>
              </SettingCard>
            </motion.div>
          )}

          {/* Video Tab */}
          {activeTab === 'video' && (
            <motion.div variants={staggerChild} className="space-y-6">
              <SettingCard title="Video Input" description="Select your camera">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Camera
                  </label>
                  <select
                    value={videoDevice}
                    onChange={(e) => setVideoDevice(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white backdrop-blur-xl"
                  >
                    <option value="default">Default Device</option>
                    <option value="external">External USB Camera</option>
                    <option value="builtin">Built-in Camera</option>
                  </select>
                </div>
              </SettingCard>

              <SettingCard title="Resolution" description="Choose video quality">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: '720p', desc: 'Standard' },
                    { label: '1080p', desc: 'High (Recommended)', selected: true },
                    { label: '4K', desc: 'Ultra High' },
                  ].map((res) => (
                    <div
                      key={res.label}
                      className={`rounded-lg border-2 p-4 cursor-pointer transition-all ${
                        res.selected
                          ? 'border-indigo-400 bg-indigo-400/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="font-semibold text-white">{res.label}</div>
                      <div className="text-sm text-white/60">{res.desc}</div>
                    </div>
                  ))}
                </div>
              </SettingCard>

              <SettingCard title="Virtual Background" description="Always enabled in settings">
                <SettingToggle
                  label="Auto-blur Background"
                  description="Apply default blur when camera starts"
                  enabled={false}
                />
              </SettingCard>
            </motion.div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <motion.div variants={staggerChild} className="space-y-6">
              <SettingCard title="Theme" description="Choose your preferred appearance">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'dark', label: 'Dark', icon: Moon },
                    { id: 'light', label: 'Light', icon: Zap },
                    { id: 'amoled', label: 'AMOLED', icon: Settings },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleThemeChange(t.id)}
                      className={`rounded-lg border-2 p-4 transition-all ${
                        theme === t.id
                          ? 'border-indigo-400 bg-indigo-400/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <t.icon className="h-6 w-6 mx-auto mb-2 text-white" />
                      <div className="font-semibold text-white">{t.label}</div>
                    </button>
                  ))}
                </div>
              </SettingCard>

              <SettingCard title="Accent Color" description="Customize primary color">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  {[
                    { name: 'Indigo', color: 'bg-indigo-500' },
                    { name: 'Cyan', color: 'bg-cyan-500' },
                    { name: 'Emerald', color: 'bg-emerald-500' },
                    { name: 'Purple', color: 'bg-purple-500' },
                    { name: 'Rose', color: 'bg-rose-500' },
                    { name: 'Amber', color: 'bg-amber-500' },
                  ].map((accent) => (
                    <button
                      key={accent.name}
                      className={`h-12 rounded-lg border-2 border-white/10 transition-all hover:border-white/30 ${accent.color}`}
                      title={accent.name}
                    />
                  ))}
                </div>
              </SettingCard>

              <SettingCard title="Accessibility" description="Improve usability">
                <div className="space-y-4">
                  <SettingToggle
                    label="High Contrast Mode"
                    description="Increase contrast for better visibility"
                    enabled={false}
                  />
                  <SettingToggle
                    label="Large Font Size"
                    description="Increase text size globally"
                    enabled={false}
                  />
                  <SettingToggle
                    label="Reduce Motion"
                    description="Minimize animations"
                    enabled={false}
                  />
                </div>
              </SettingCard>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <motion.div variants={staggerChild} className="space-y-6">
              <SettingCard title="Desktop Notifications" description="Manage browser alerts">
                <div className="space-y-4">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <SettingToggle
                      key={key}
                      label={key === 'browserNotifications' ? 'Browser Notifications'
                            : key === 'emailNotifications' ? 'Email Notifications'
                            : key === 'meetingReminders' ? 'Meeting Reminders'
                            : 'Chat Notifications'}
                      description={
                        key === 'browserNotifications' ? 'Get desktop alerts for meeting events'
                        : key === 'emailNotifications' ? 'Receive email summaries and updates'
                        : key === 'meetingReminders' ? 'Remind me before scheduled meetings'
                        : 'Alert me when messages arrive'
                      }
                      enabled={value}
                      onChange={(newValue) =>
                        setNotificationSettings({ ...notificationSettings, [key]: newValue })
                      }
                    />
                  ))}
                </div>
              </SettingCard>

              <SettingCard title="Notification Timing" description="When to notify me">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-white/80 mb-2 block">
                      Meeting Reminder Time
                    </label>
                    <select className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white backdrop-blur-xl">
                      <option>5 minutes before</option>
                      <option selected>15 minutes before</option>
                      <option>30 minutes before</option>
                      <option>1 hour before</option>
                    </select>
                  </div>
                </div>
              </SettingCard>
            </motion.div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <motion.div variants={staggerChild} className="space-y-6">
              <SettingCard title="Data & Privacy" description="Control your data">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-white/80 mb-2 block">
                      Data Retention Period (days)
                    </label>
                    <input
                      type="number"
                      value={privacySettings.dataRetention}
                      onChange={(e) =>
                        setPrivacySettings({
                          ...privacySettings,
                          dataRetention: parseInt(e.target.value),
                        })
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white backdrop-blur-xl"
                      min="7"
                      max="365"
                    />
                    <p className="text-xs text-white/50 mt-2">
                      How long to keep your meeting data
                    </p>
                  </div>
                </div>
              </SettingCard>

              <SettingCard title="Recordings" description="Recording consent and storage">
                <div className="space-y-4">
                  <SettingToggle
                    label="Allow Recording"
                    description="Participants may record this meeting"
                    enabled={privacySettings.recordingConsent}
                    onChange={(value) =>
                      setPrivacySettings({ ...privacySettings, recordingConsent: value })
                    }
                  />
                  <SettingToggle
                    label="Analytics & Tracking"
                    description="Help improve EtherXMeet with usage data"
                    enabled={privacySettings.analyticsTracking}
                    onChange={(value) =>
                      setPrivacySettings({ ...privacySettings, analyticsTracking: value })
                    }
                  />
                </div>
              </SettingCard>

              <SettingCard title="Security" description="Manage permissions">
                <div className="rounded-lg border border-indigo-400/30 bg-indigo-400/10 p-4">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-indigo-400" />
                    <div>
                      <p className="font-medium text-white">End-to-End Encryption</p>
                      <p className="text-xs text-white/60 mt-1">
                        Your meetings are encrypted end-to-end
                      </p>
                    </div>
                  </div>
                </div>
              </SettingCard>
            </motion.div>
          )}

          {/* Keyboard Shortcuts Tab */}
          {activeTab === 'shortcuts' && (
            <motion.div variants={staggerChild} className="space-y-6">
              <SettingCard
                title="Keyboard Shortcuts"
                description="Quick access to common actions"
              >
                <div className="rounded-lg border border-white/10 divide-y divide-white/10 overflow-hidden">
                  {KEYBOARD_SHORTCUTS.map((shortcut) => (
                    <div
                      key={shortcut.keys}
                      className="flex items-center justify-between bg-white/5 px-4 py-3 hover:bg-white/10 transition-colors"
                    >
                      <span className="text-white/70">{shortcut.description}</span>
                      <div className="flex gap-2">
                        {shortcut.keys.split('+').map((key, i) => (
                          <span key={key}>
                            {i > 0 && <span className="text-white/40 mx-1">+</span>}
                            <kbd className="rounded bg-white/10 px-2 py-1 text-xs font-semibold text-white border border-white/20">
                              {key}
                            </kbd>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SettingCard>

              <SettingCard title="Custom Shortcuts" description="Customize your keybindings">
                <p className="text-white/60 text-sm">
                  Right now, default shortcuts are fixed. Custom rebinding coming soon!
                </p>
              </SettingCard>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
    </AnimatedPage>
  );
}

/**
 * Reusable settings card component
 */
function SettingCard({ title, description, children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/50 mt-1">{description}</p>
      </div>
      {children}
    </div>
  );
}

/**
 * Reusable toggle setting component
 */
function SettingToggle({ label, description, enabled = false, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white font-medium">{label}</p>
        <p className="text-sm text-white/50 mt-1">{description}</p>
      </div>
      <Switch checked={enabled} onChange={onChange} />
    </div>
  );
}
