# Glorp Widget Documentation

## Overview

The Glorp Widget is an interactive, fun pixel-art character generator that displays random "Glorp" characters in a comic book-style thought bubble. It's designed as an Easter egg widget for the portfolio website.

## Features

### Core Functionality
- **Random Character Generation**: Displays one of 6 different pixel-art Glorp characters
- **Interactive Animation**: Click the Glorp Box to generate a new character
- **Thought Bubble Animation**: Characters appear in an organic, cloud-shaped thought bubble
- **Thinking Bubbles**: Three animated bubbles appear during generation (mimicking "thinking" animation)

### Visual Design
- **Pixel Art Style**: Uses `imageRendering: "pixelated"` to maintain crisp pixel art
- **Organic Bubble Shape**: Custom `border-radius` creates an irregular, comic book-style thought bubble
- **Blue Theme**: Vibrant blue colors (`blue-500`/`blue-400`) with dark mode support
- **Smooth Animations**:
  - `fadeInBounce`: Fade-in effect for bubbles and image
  - `gentleBounce`: Subtle floating motion for thinking bubbles
  - Glorpbox bounces when idle

### Responsive Design
- **Desktop Only**: Hidden on mobile devices (< 768px) using `hidden md:block`
- **Fixed Position**: Positioned at bottom-right corner (`absolute bottom-2 right-4`)

### Accessibility
- **ARIA Labels**: Descriptive labels for screen readers
- **Live Regions**: `aria-live="polite"` announces state changes
- **Semantic Roles**: `role="complementary"` and `role="status"`
- **Busy State**: `aria-busy` indicates loading state

## Technical Implementation

### Architecture

```
GlorpWidget.tsx (149 lines)
├── Constants
│   ├── GLORP_IMAGES (6 images)
│   ├── THINKING_BUBBLES (3 bubble configurations)
│   └── TIMING (4 timing constants)
├── State Management
│   ├── isGenerating
│   ├── currentGlorpIndex
│   ├── isVisible
│   ├── animationKey
│   ├── isResetting
│   └── timeoutsRef (cleanup)
└── Components
    ├── Glorp Box Button
    ├── Thinking Bubbles (mapped)
    └── Thought Bubble with Image
```

### Key Technologies
- **Next.js Image**: Optimized image loading with `unoptimized` flag for pixel art
- **React Hooks**: `useState`, `useEffect`, `useRef`
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Full type safety

### Animation Timing

All timing constants are defined in the `TIMING` object:

```typescript
const TIMING = {
    FADE_OUT: 300,              // Fade out duration
    STATE_RESET_DELAY: 10,      // Minimal delay for state reset
    THINKING_DURATION: 1500,    // How long thinking bubbles show
    GLORP_DISPLAY_DURATION: 5000 // How long the Glorp is visible
}
```

### Memory Management

The component implements proper cleanup for all timeouts:
- Uses `useRef` to track all active timeouts
- `useEffect` cleanup function clears timeouts on unmount
- New clicks clear previous timeouts to prevent memory leaks

### CSS Animations

Two keyframe animations defined in `globals.css`:

```css
@keyframes fadeInBounce {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes gentleBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
```

## File Structure

```
app/
├── components/
│   ├── GlorpWidget.tsx          # Main component
│   └── GlorpWidget.README.md    # This file
├── globals.css                   # Contains keyframe animations
└── [locale]/layout.tsx          # Where widget is imported

public/
└── glorps/
    ├── glorpbox.png             # The clickable box
    ├── babyglorp.png           # Character 1
    ├── danceglorp.png          # Character 2
    ├── dogglorp.png            # Character 3
    ├── larryglorp.png          # Character 4
    ├── smolglorp.png           # Character 5
    └── threeglorps.png         # Character 6
```

## Usage

### Integration

The widget is imported in the main layout:

```tsx
import GlorpWidget from "../components/GlorpWidget";

// In the component:
<body className="relative min-h-screen">
  <ThemeProvider>
    <NextIntlClientProvider messages={messages}>
      {children}
      <GlorpWidget />
    </NextIntlClientProvider>
  </ThemeProvider>
</body>
```

### Adding New Glorps

To add a new Glorp character:

1. Add the PNG file to `public/glorps/`
2. Add the filename to the `GLORP_IMAGES` array:

```typescript
const GLORP_IMAGES = [
    "babyglorp.png",
    // ... existing glorps
    "newglorp.png"  // Add here
];
```

### Customizing Animations

#### Timing
Edit the `TIMING` constants:
```typescript
const TIMING = {
    GLORP_DISPLAY_DURATION: 8000  // Show for 8 seconds instead of 5
}
```

#### Bubble Configuration
Edit the `THINKING_BUBBLES` array:
```typescript
const THINKING_BUBBLES = [
    { size: "w-3 h-3", top: "-top-16", right: "right-8", delay: "0s" },
    // Add more bubbles or modify existing ones
];
```

#### Thought Bubble Shape
Modify the `borderRadius` style:
```typescript
style={{
    borderRadius: '60% 40% 50% 50% / 50% 50% 50% 50%'  // More circular
}}
```

### Customizing Colors

The widget uses Tailwind color classes:
- Thinking bubbles: `bg-blue-500 dark:bg-blue-400`
- Thought bubble: `bg-blue-500 dark:bg-blue-600`
- Border: `border-blue-500 dark:border-blue-400`

Change these to any Tailwind color to match your theme.

## Animation Flow

```
User clicks Glorp Box
    ↓
Fade out existing content (300ms)
    ↓
Reset state
    ↓
Show thinking bubbles (1500ms)
    - 3 bubbles fade in sequentially
    - Gentle bounce animation
    ↓
Pick random Glorp
    ↓
Show Glorp in thought bubble (5000ms)
    - Fade in animation
    ↓
Fade out (300ms)
    ↓
Back to idle (Glorpbox bounces)
```

## Performance Considerations

### Optimizations
- ✅ Next.js Image component for optimized loading
- ✅ Proper timeout cleanup (no memory leaks)
- ✅ CSS keyframes in global stylesheet (not inline)
- ✅ Component only renders on desktop (`hidden md:block`)
- ✅ Images use `unoptimized` flag (required for pixel art)

### Bundle Size
- Component: ~4KB
- Images: ~7 PNG files (~50KB total)
- No external dependencies

## Browser Support

Works in all modern browsers that support:
- CSS Custom Properties
- CSS Grid/Flexbox
- CSS Animations
- ES6+ JavaScript

## Accessibility Checklist

- ✅ Keyboard accessible (button is focusable)
- ✅ Screen reader friendly (ARIA labels)
- ✅ Semantic HTML roles
- ✅ Live region announcements
- ✅ Meaningful alt text on images
- ✅ Focus indicators (browser default)

## Future Improvements

Potential enhancements:
- [ ] Add sound effects on generation
- [ ] Allow users to favorite/save Glorps
- [ ] Add more Glorp variations
- [ ] Animate the Glorp Box on hover
- [ ] Add keyboard shortcuts (e.g., press 'G' to generate)
- [ ] Track which Glorps have been seen
- [ ] Share Glorps to social media

## Troubleshooting

### Widget not showing
- Check if you're on desktop (widget is hidden on mobile)
- Verify the component is imported in layout
- Check browser console for errors

### Images not loading
- Verify images exist in `public/glorps/`
- Check filename matches exactly (case-sensitive)
- Ensure Next.js dev server is running

### Animations not working
- Check if `globals.css` is imported
- Verify keyframes are defined in globals.css
- Check browser console for CSS errors

## Credits

Designed and implemented with Claude Code.
Glorp characters are pixel art assets.

---

**Last Updated**: December 2025
**Version**: 1.0.0
