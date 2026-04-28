# EtherXMeet UI Components Library

A comprehensive, reusable UI components library with glassmorphic styling, built with React, Tailwind CSS, and Framer Motion.

## Design System

- **Style**: Glassmorphic with backdrop blur and rgba borders
- **Colors**:
  - Primary: `#4F46E5` (Indigo)
  - Secondary: `#06B6D4` (Cyan)
  - Danger: `#EF4444` (Red)
- **Animations**: Smooth Framer Motion transitions
- **Accessibility**: ARIA labels and keyboard support

## Components

### 1. Button
Interactive button with multiple variants, sizes, and loading state.

```jsx
import { Button } from './components/ui';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `icon`: React element
- `loading`: boolean
- `disabled`: boolean

### 2. Modal
Accessible modal with backdrop blur and focus trap.

```jsx
import { Modal } from './components/ui';

<Modal isOpen={isOpen} onClose={handleClose} title="Modal Title" size="md">
  <p>Modal content here</p>
</Modal>
```

**Props:**
- `isOpen`: boolean
- `onClose`: function
- `title`: string
- `size`: 'sm' | 'md' | 'lg' | 'xl'

### 3. Input
Form input with label, error state, and icon support.

```jsx
import { Input } from './components/ui';

<Input
  type="email"
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
/>
```

**Props:**
- `type`: 'text' | 'number' | 'email' | 'password'
- `label`: string
- `placeholder`: string
- `value`: string
- `onChange`: function
- `error`: string
- `icon`: React element

### 4. Slider
Range slider with tooltip and custom styling.

```jsx
import { Slider } from './components/ui';

<Slider
  min={0}
  max={100}
  value={volume}
  onChange={setVolume}
  label="Volume"
  showValue={true}
/>
```

**Props:**
- `min`: number
- `max`: number
- `value`: number
- `onChange`: function
- `label`: string
- `showValue`: boolean

### 5. Badge
Small pill badge with variants.

```jsx
import { Badge } from './components/ui';

<Badge variant="success" size="md">
  Active
</Badge>
```

**Props:**
- `variant`: 'success' | 'warning' | 'danger' | 'info'
- `size`: 'sm' | 'md' | 'lg'
- `icon`: React element

### 6. Tooltip
Hover tooltip with positioning.

```jsx
import { Tooltip } from './components/ui';

<Tooltip content="Click to copy" position="top">
  <button>Copy</button>
</Tooltip>
```

**Props:**
- `content`: string
- `position`: 'top' | 'bottom' | 'left' | 'right'

### 7. Avatar
User avatar with initials, image, and status indicator.

```jsx
import { Avatar } from './components/ui';

<Avatar
  name="John Doe"
  src="/avatar.jpg"
  size="md"
  status="online"
/>
```

**Props:**
- `name`: string
- `src`: string (URL)
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `status`: 'online' | 'offline' | 'away'

### 8. Dropdown
Dropdown menu with keyboard navigation.

```jsx
import { Dropdown } from './components/ui';

const items = [
  { label: 'Profile', onClick: () => {}, icon: <UserIcon /> },
  { label: 'Settings', onClick: () => {}, icon: <SettingsIcon /> },
  { label: 'Logout', onClick: () => {}, icon: <LogoutIcon /> },
];

<Dropdown
  trigger={<button>Menu</button>}
  items={items}
  position="bottom-left"
/>
```

**Props:**
- `trigger`: React element
- `items`: Array of { label, onClick, icon, disabled }
- `position`: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'

### 9. Tabs
Tabbed interface with smooth transitions.

```jsx
import { Tabs } from './components/ui';

const tabs = [
  { id: 'tab1', label: 'Overview', content: <div>Content 1</div> },
  { id: 'tab2', label: 'Analytics', content: <div>Content 2</div> },
];

<Tabs tabs={tabs} defaultTab="tab1" />
```

**Props:**
- `tabs`: Array of { id, label, content, icon }
- `defaultTab`: string (tab id)

### 10. Switch
Toggle switch with smooth animation.

```jsx
import { Switch } from './components/ui';

<Switch
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Enable notifications"
/>
```

**Props:**
- `checked`: boolean
- `onChange`: function
- `label`: string
- `disabled`: boolean

### 11. Card
Glass card with optional header and hover effect.

```jsx
import { Card } from './components/ui';

<Card
  title="Card Title"
  icon={<StarIcon />}
  hoverable={true}
  actions={<button>Edit</button>}
>
  <p>Card content</p>
</Card>
```

**Props:**
- `title`: string
- `icon`: React element
- `actions`: React element
- `hoverable`: boolean

### 12. Spinner
Loading spinner with multiple variants.

```jsx
import { Spinner } from './components/ui';

<Spinner size="md" variant="circle" color="#6366f1" />
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `variant`: 'circle' | 'dots' | 'pulse'
- `color`: string (hex color)

## Installation

1. Ensure you have the required dependencies:
```bash
npm install framer-motion
```

2. Import the animations CSS in your main CSS file:
```css
@import './components/ui/animations.css';
```

3. Configure Tailwind to support the glassmorphic styles (if needed):
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      }
    }
  }
}
```

## Usage

Import components individually or all at once:

```jsx
// Individual import
import Button from './components/ui/Button';

// Import from index
import { Button, Modal, Input } from './components/ui';
```

## Accessibility

All components include:
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Screen reader compatibility

## Browser Support

These components work in all modern browsers that support:
- CSS backdrop-filter
- ES6+
- React 16.8+ (Hooks)
