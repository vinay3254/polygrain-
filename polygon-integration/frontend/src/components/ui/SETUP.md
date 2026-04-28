# Setup Guide for EtherXMeet UI Components

## Prerequisites

Make sure you have these packages installed:

```bash
npm install framer-motion
npm install tailwindcss
```

## Tailwind Configuration

Add the following to your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          50: '#EEEDFC',
          100: '#D7D4F8',
          200: '#B0ABF1',
          300: '#8882E9',
          400: '#6159E2',
          500: '#4F46E5',
          600: '#2F27CE',
          700: '#231D9C',
          800: '#18136A',
          900: '#0C0A38'
        },
        secondary: {
          DEFAULT: '#06B6D4',
          50: '#D0F5FC',
          100: '#A7EEF9',
          200: '#55E0F4',
          300: '#1CCCEB',
          400: '#06B6D4',
          500: '#0595B3',
          600: '#047486',
          700: '#03535A',
          800: '#02323D',
          900: '#011120'
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'ripple': 'ripple 0.6s ease-out',
      },
      keyframes: {
        ripple: {
          '0%': {
            width: '0',
            height: '0',
            opacity: '0.5',
          },
          '100%': {
            width: '300px',
            height: '300px',
            opacity: '0',
          }
        }
      }
    },
  },
  plugins: [],
}
```

## CSS Setup

### Option 1: Import in your main CSS file

Add to your `src/index.css` or `src/App.css`:

```css
@import './components/ui/animations.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Option 2: Add animations directly to your global CSS

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  @keyframes ripple {
    0% {
      width: 0;
      height: 0;
      opacity: 0.5;
    }
    100% {
      width: 300px;
      height: 300px;
      opacity: 0;
    }
  }

  .animate-ripple {
    animation: ripple 0.6s ease-out;
  }
}
```

## Usage in Your App

### Import Components

```jsx
// Import individual components
import Button from './components/ui/Button';
import Modal from './components/ui/Modal';

// Or import from index
import { Button, Modal, Input, Card } from './components/ui';
```

### Basic Example

```jsx
import React, { useState } from 'react';
import { Button, Modal, Input } from './components/ui';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-8">
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Welcome"
      >
        <p>Hello from EtherXMeet UI!</p>
      </Modal>
    </div>
  );
}

export default App;
```

## Testing the Components

Run the demo page to see all components in action:

```jsx
import UIDemo from './components/ui/UIDemo';

function App() {
  return <UIDemo />;
}
```

## Browser Compatibility

These components require:
- Modern browser with CSS `backdrop-filter` support
- React 16.8+ (Hooks)
- ES6+ JavaScript

### Fallback for older browsers

If `backdrop-filter` is not supported, the glassmorphic effect will gracefully degrade to solid backgrounds.

To add a polyfill, include this in your CSS:

```css
@supports not (backdrop-filter: blur(10px)) {
  .backdrop-blur-md,
  .backdrop-blur-xl {
    background: rgba(0, 0, 0, 0.8) !important;
  }
}
```

## Performance Tips

1. **Lazy load components**: Use React.lazy() for components not needed immediately
2. **Reduce motion**: Respect user preferences

```jsx
// In your global CSS
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Customization

### Change Primary Color

Modify the color values in your component files or override via props:

```jsx
<Button 
  className="bg-purple-600/80 hover:bg-purple-600/90 border-purple-400/30"
>
  Custom Color
</Button>
```

### Add Custom Variants

Extend the variant styles in each component:

```jsx
// In Button.jsx
const variantStyles = {
  primary: '...',
  secondary: '...',
  // Add your custom variant
  custom: 'bg-purple-600/80 hover:bg-purple-600/90 text-white border-purple-400/30',
};
```

## Troubleshooting

### Issue: Framer Motion animations not working
**Solution**: Ensure `framer-motion` is installed: `npm install framer-motion`

### Issue: Backdrop blur not showing
**Solution**: Check browser support for `backdrop-filter` CSS property

### Issue: Tailwind classes not applying
**Solution**: 
1. Verify Tailwind is properly configured
2. Check that your component files are included in Tailwind's `content` array
3. Restart your dev server

### Issue: Components look unstyled
**Solution**: Make sure you've imported Tailwind CSS in your main CSS file:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Next Steps

- Customize colors in your Tailwind config
- Add more variants to components
- Create composite components using these building blocks
- Integrate with your state management (Redux, Zustand, etc.)
- Add form validation libraries (React Hook Form, Formik)

## Support

For issues or questions, refer to:
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/
- React: https://react.dev/

---

**Happy coding! 🚀**
