import React, { useState } from 'react';
import {
  Button,
  Modal,
  Input,
  Slider,
  Badge,
  Tooltip,
  Avatar,
  Dropdown,
  Tabs,
  Switch,
  Card,
  Spinner
} from './components/ui';

/**
 * Demo page showcasing all UI components
 */
export default function UIDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');

  // Dropdown items
  const dropdownItems = [
    {
      label: 'Profile',
      onClick: () => alert('Profile clicked'),
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      label: 'Settings',
      onClick: () => alert('Settings clicked'),
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    { label: 'Divider', disabled: true },
    {
      label: 'Logout',
      onClick: () => alert('Logout clicked'),
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      )
    }
  ];

  // Tabs configuration
  const tabs = [
    {
      id: 'tab1',
      label: 'Overview',
      icon: '📊',
      content: (
        <div className="p-4 bg-white/5 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Overview Content</h3>
          <p>This is the overview tab content with some information.</p>
        </div>
      )
    },
    {
      id: 'tab2',
      label: 'Analytics',
      icon: '📈',
      content: (
        <div className="p-4 bg-white/5 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Analytics Content</h3>
          <p>Analytics data and charts would go here.</p>
        </div>
      )
    },
    {
      id: 'tab3',
      label: 'Settings',
      icon: '⚙️',
      content: (
        <div className="p-4 bg-white/5 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Settings Content</h3>
          <p>Configuration options and preferences.</p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            EtherXMeet UI Components
          </h1>
          <p className="text-xl text-white/70">
            Glassmorphic Design System with Framer Motion
          </p>
        </div>

        {/* Buttons Section */}
        <Card title="Buttons" hoverable>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="sm">Primary Small</Button>
              <Button variant="primary" size="md">Primary Medium</Button>
              <Button variant="primary" size="lg">Primary Large</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button icon={<span>🚀</span>}>With Icon</Button>
            </div>
          </div>
        </Card>

        {/* Modal Section */}
        <Card title="Modal">
          <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example Modal"
            size="md"
          >
            <div className="space-y-4">
              <p>This is a glassmorphic modal with backdrop blur.</p>
              <p>Press ESC or click outside to close.</p>
              <Button onClick={() => setIsModalOpen(false)}>Close</Button>
            </div>
          </Modal>
        </Card>

        {/* Inputs & Forms */}
        <Card title="Inputs & Forms">
          <div className="space-y-4 max-w-md">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              error="Password must be at least 8 characters"
            />
            <Slider
              label="Volume Control"
              min={0}
              max={100}
              value={sliderValue}
              onChange={setSliderValue}
              showValue
            />
            <Switch
              checked={switchChecked}
              onChange={setSwitchChecked}
              label="Enable Notifications"
            />
          </div>
        </Card>

        {/* Badges */}
        <Card title="Badges">
          <div className="flex flex-wrap gap-3">
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="success" size="sm">Small</Badge>
            <Badge variant="info" size="lg">Large</Badge>
            <Badge variant="success" icon="✓">With Icon</Badge>
          </div>
        </Card>

        {/* Avatars */}
        <Card title="Avatars">
          <div className="flex flex-wrap gap-4 items-end">
            <Avatar name="John Doe" size="sm" status="online" />
            <Avatar name="Jane Smith" size="md" status="away" />
            <Avatar name="Bob Wilson" size="lg" status="offline" />
            <Avatar 
              name="Alice Johnson" 
              size="xl" 
              status="online"
              src="https://i.pravatar.cc/150?img=1"
            />
          </div>
        </Card>

        {/* Tooltips */}
        <Card title="Tooltips">
          <div className="flex flex-wrap gap-4">
            <Tooltip content="Top tooltip" position="top">
              <Button variant="ghost">Hover - Top</Button>
            </Tooltip>
            <Tooltip content="Bottom tooltip" position="bottom">
              <Button variant="ghost">Hover - Bottom</Button>
            </Tooltip>
            <Tooltip content="Left tooltip" position="left">
              <Button variant="ghost">Hover - Left</Button>
            </Tooltip>
            <Tooltip content="Right tooltip" position="right">
              <Button variant="ghost">Hover - Right</Button>
            </Tooltip>
          </div>
        </Card>

        {/* Dropdown */}
        <Card title="Dropdown">
          <Dropdown
            trigger={
              <Button variant="secondary">
                Open Menu
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            }
            items={dropdownItems}
            position="bottom-left"
          />
        </Card>

        {/* Tabs */}
        <Card title="Tabs">
          <Tabs tabs={tabs} defaultTab="tab1" />
        </Card>

        {/* Spinners */}
        <Card title="Loading Spinners">
          <div className="flex flex-wrap gap-8 items-center">
            <div className="text-center">
              <Spinner variant="circle" size="sm" />
              <p className="text-xs text-white/70 mt-2">Circle SM</p>
            </div>
            <div className="text-center">
              <Spinner variant="circle" size="md" />
              <p className="text-xs text-white/70 mt-2">Circle MD</p>
            </div>
            <div className="text-center">
              <Spinner variant="circle" size="lg" />
              <p className="text-xs text-white/70 mt-2">Circle LG</p>
            </div>
            <div className="text-center">
              <Spinner variant="dots" size="md" />
              <p className="text-xs text-white/70 mt-2">Dots</p>
            </div>
            <div className="text-center">
              <Spinner variant="pulse" size="md" color="#06b6d4" />
              <p className="text-xs text-white/70 mt-2">Pulse</p>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center text-white/50 text-sm mt-12">
          <p>EtherXMeet UI Components Library - Glassmorphic Design</p>
        </div>
      </div>
    </div>
  );
}
