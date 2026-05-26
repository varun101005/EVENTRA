# 🎨 EVENTRA UI Preview & Layout Guide

## Visual Design Overview

This document describes the user interface layout and design of EVENTRA.

---

## 📱 Full Application Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ╔═══════════════════════════════════════════════════════════════╗ │
│  ║  🌟 EVENTRA                              Event-Driven Language  ║ │
│  ║                                              [🌙 Dark Mode]    ║ │
│  ╚═══════════════════════════════════════════════════════════════╝ │
│                                                                     │
│  ┌──────────────────────────────┬────────────────────────────────┐ │
│  │                              │                                 │ │
│  │  📝 CODE EDITOR              │  💻 OUTPUT CONSOLE             │ │
│  │  ┌────────────────────────┐  │  ┌──────────────────────────┐  │ │
│  │  │ 1 start {              │  │  │ Event triggered: start   │  │ │
│  │  │ 2   say "Welcome!"     │  │  │ Welcome to EVENTRA!      │  │ │
│  │  │ 3 }                    │  │  │ This is awesome!         │  │ │
│  │  │ 4                      │  │  │                           │  │ │
│  │  │ 5 on click {           │  │  │                           │  │ │
│  │  │ 6   say "Clicked!"     │  │  │                           │  │ │
│  │  │ 7 }                    │  │  │                           │  │ │
│  │  │ 8                      │  │  │                           │  │ │
│  │  │ 9 on login {           │  │  │                           │  │ │
│  │  │10   input username     │  │  │                           │  │ │
│  │  │11   say "Hello " + usr │  │  │                           │  │ │
│  │  └────────────────────────┘  │  └──────────────────────────┘  │ │
│  │                              │                                 │ │
│  │  ┌────────────────────────┐  │  ⚡ EVENT TRIGGERS             │ │
│  │  │ ▶ RUN CODE  🗑 CLEAR   │  │  ┌────────┐ ┌────────────┐    │ │
│  │  └────────────────────────┘  │  │ ⚡ click│ │⚡ login     │    │ │
│  │                              │  │          │ │            │    │ │
│  │                              │  └──────────┘ └────────────┘    │ │
│  │                              │                                 │ │
│  └──────────────────────────────┴────────────────────────────────┘ │
│                                                                     │
│  ════════════════════════════════════════════════════════════════  │
│  Built with React & Spring Boot | EVENTRA © 2026                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Color Scheme

### Dark Mode (Default)

| Element | Color Code | Usage |
|---------|------------|-------|
| Primary Background | `#1e1e2e` | Main app background |
| Secondary Background | `#2d2d44` | Panels, cards |
| Tertiary Background | `#3d3d5c` | Headers, accents |
| Primary Text | `#ffffff` | Main text |
| Secondary Text | `#b0b0c0` | Subtitles |
| Accent Blue | `#7aa2f7` | Buttons, highlights |
| Success Green | `#9ece6a` | Run button |
| Error Red | `#f7768e` | Error messages |
| Console Background | `#1a1a2e` | Output terminal |
| Console Text | `#9ece6a` | Terminal output |

### Light Mode

| Element | Color Code | Usage |
|---------|------------|-------|
| Primary Background | `#f5f5f5` | Main app background |
| Secondary Background | `#ffffff` | Panels, cards |
| Tertiary Background | `#e0e0e0` | Headers, accents |
| Primary Text | `#1a1a2e` | Main text |
| Secondary Text | `#555566` | Subtitles |
| Accent Blue | `#4a6fa5` | Buttons, highlights |
| Success Green | `#5a8f3a` | Run button |
| Error Red | `#d64550` | Error messages |
| Console Background | `#f0f0f0` | Output terminal |
| Console Text | `#333333` | Terminal output |

---

## 🧩 Component Breakdown

### 1. Header Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   🌟 EVENTRA              Event-Driven Programming Language │
│                                              [☀️ Light Mode]│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Features**:
- Gradient background (dark blue gradient)
- Large bold title with accent color
- Subtitle in smaller font
- Theme toggle button (right-aligned)
- Bottom border with accent color
- Box shadow for depth

**Dimensions**:
- Height: ~80px
- Padding: 1.5rem
- Font sizes: Title 2.5rem, Subtitle 1rem

---

### 2. Code Editor Section

```
┌──────────────────────────────────┐
│  📝 Code Editor                  │
│ ┌──────────────────────────────┐ │
│ │ 1  start {                   │ │
│ │ 2    say "Hello"             │ │
│ │ 3  }                         │ │
│ │ 4                            │ │
│ │ 5  on click {                │ │
│ │ 6    say "Clicked!"          │ │
│ │ 7  }                         │ │
│ └──────────────────────────────┘ │
│ ┌──────────────────────────────┐ │
│ │  ▶ Run Code    🗑 Clear      │ │
│ └──────────────────────────────┘ │
└──────────────────────────────────┘
```

**Features**:
- Monaco Editor integration
- Line numbers enabled
- Syntax highlighting area
- Run/Clear buttons below editor
- Resizable container
- Border with accent color

**Dimensions**:
- Takes 50% width (left panel)
- Min-height: 400px
- Flex layout for buttons

---

### 3. Output Console Section

```
┌──────────────────────────────────┐
│  💻 Output Console               │
│ ┌──────────────────────────────┐ │
│ │ Event triggered: start       │ │
│ │ Hello, World!                │ │
│ │ Welcome to EVENTRA!          │ │
│ │                              │ │
│ │ [Auto-scrolls to bottom]     │ │
│ └──────────────────────────────┘ │
└──────────────────────────────────┘
```

**Features**:
- Terminal-like appearance
- Monospace font (Courier New)
- Green text on dark background
- Auto-scroll to latest output
- Scrollable when overflow
- Inset shadow for depth

**Dimensions**:
- Height: 200-300px
- Font size: 14px
- Padding: 1rem

---

### 4. Event Trigger Buttons

```
┌──────────────────────────────────┐
│  ⚡ Event Triggers               │
│ ┌────────┐ ┌──────────┐         │
│ │⚡ click │ │⚡ login   │ ...     │
│ └────────┘ └──────────┘         │
│                                  │
│ 💡 Tip: Events auto-detected     │
└──────────────────────────────────┘
```

**Features**:
- Dynamic button generation
- One button per event (excluding "start")
- Loading state during execution
- Disabled state while running
- Hover effects
- Info tip below buttons

**Button States**:
- **Normal**: Accent color background
- **Hover**: Slightly darker
- **Loading**: Gray, opacity 0.6
- **Disabled**: Not-allowed cursor

---

## 📐 Responsive Behavior

### Desktop (> 1024px)
- Two-column layout (side-by-side)
- Full header with all elements
- Large fonts and spacing

### Tablet (768px - 1024px)
- Two-column layout maintained
- Slightly reduced fonts
- Compact spacing

### Mobile (< 768px)
```
┌─────────────────────┐
│  🌟 EVENTRA         │
│  [🌙 Dark Mode]     │
├─────────────────────┤
│  📝 Code Editor     │
│  ┌───────────────┐  │
│  │ Editor        │  │
│  └───────────────┘  │
├─────────────────────┤
│  💻 Output Console  │
│  ┌───────────────┐  │
│  │ Console       │  │
│  └───────────────┘  │
├─────────────────────┤
│  ⚡ Events          │
│  [btn1] [btn2]      │
└─────────────────────┘
```
- Single column layout (stacked)
- Centered header
- Reduced padding
- Smaller fonts

---

## 🎭 Interactive Elements

### Buttons

**Run Button**:
- Color: Success green
- Icon: ▶ (play)
- Hover: Scale 1.05
- Active: Scale 0.98
- Loading: Gray, spinning icon (optional)

**Clear Button**:
- Color: Gray/neutral
- Icon: 🗑 (trash)
- Hover: Darken
- Subtle compared to Run

**Event Buttons**:
- Color: Accent blue
- Icon: ⚡ (lightning)
- Format: "⚡ eventName"
- Hover: Lift effect
- Active: Press down

**Theme Toggle**:
- Dual state: 🌙/☀️
- Color: Yellow (sun)/Dark blue (moon)
- Smooth transition
- Min-width: 140px

---

## ✨ Animations & Transitions

### Applied Effects

1. **Theme Toggle**: 
   - Background color fade (0.3s ease)
   - Icon transition

2. **Button Hover**:
   - Transform scale (0.3s)
   - Box-shadow enhancement

3. **Panel Appearance**:
   - Fade-in on load
   - Slide-up animation

4. **Output Console**:
   - Smooth scroll
   - Text fade-in

---

## 🖱️ User Interaction Flow

```
1. User opens app
   ↓
2. Sees default code in editor
   ↓
3. Clicks "▶ Run Code"
   ↓
4. Backend executes code
   ↓
5. Output appears in console
   ↓
6. Event buttons generated (if any)
   ↓
7. User clicks event button
   ↓
8. Event output appended to console
   ↓
9. User can toggle theme anytime
   ↓
10. User can clear output anytime
```

---

## 📊 Typography

### Font Stack
```css
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

### Font Sizes

| Element | Size | Weight |
|---------|------|--------|
| App Title | 2.5rem | Bold (700) |
| Subtitle | 1rem | Normal (400) |
| Section Headers | 1.2rem | Semi-bold (600) |
| Body Text | 1rem | Normal (400) |
| Console Output | 14px | Normal (400) |
| Buttons | 1rem | Semi-bold (600) |
| Footer | 0.9rem | Normal (400) |

---

## 🎯 Accessibility Features

### Implemented
✅ High contrast between text and backgrounds
✅ Clear focus indicators on buttons
✅ Semantic HTML structure
✅ ARIA labels on interactive elements
✅ Keyboard navigation support
✅ Screen reader friendly

### Recommendations
- Add keyboard shortcuts (Ctrl+Enter to run)
- Add tooltips explaining features
- Increase font size option
- Color blind friendly palette available

---

## 📱 Browser Compatibility

### Tested On
- ✅ Chrome/Edge (Best experience)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

### Minimum Requirements
- ES6 support
- CSS Grid support
- Flexbox support
- Monaco Editor compatibility

---

## 🖼️ Icon Legend

| Icon | Meaning | Location |
|------|---------|----------|
| 🌟 | EVENTRA logo | Header |
| 🌙 | Dark mode | Theme toggle |
| ☀️ | Light mode | Theme toggle |
| 📝 | Code editor | Section header |
| 💻 | Output console | Section header |
| ⚡ | Event trigger | Event buttons |
| ▶ | Run/Execute | Run button |
| 🗑 | Clear/Delete | Clear button |
| 💡 | Tip/Info | Info boxes |
| 🔧 | Settings/Tech | Footer |

---

## 🎨 Design Principles

1. **Clean & Modern**: Minimalist design with focus on functionality
2. **Dark Mode First**: Optimized for long coding sessions
3. **Responsive**: Works on all screen sizes
4. **Accessible**: Usable by everyone
5. **Performant**: Smooth animations, fast rendering
6. **Intuitive**: Self-explanatory UI elements

---

## 📏 Spacing System

Based on 8px grid:

- `0.5rem` = 4px (micro spacing)
- `0.75rem` = 6px (tight spacing)
- `1rem` = 8px (base spacing)
- `1.5rem` = 12px (medium spacing)
- `2rem` = 16px (large spacing)
- `3rem` = 24px (extra large spacing)

---

## 🌈 CSS Custom Properties

Key variables used:

```css
--bg-primary: Main background
--bg-secondary: Panel backgrounds
--text-primary: Main text color
--text-secondary: Subtitle color
--accent-color: Primary accent (blue)
--success-color: Success state (green)
--error-color: Error state (red)
--border-color: Borders and dividers
--shadow: Box shadow effect
```

---

## 🎉 Summary

The EVENTRA UI is designed to be:
- **Professional** yet approachable
- **Functional** without being cluttered
- **Modern** with best practices
- **Educational** for learners
- **Extensible** for future features

Every design decision prioritizes the user experience while maintaining aesthetic appeal and usability.

---

**Design Philosophy**: "Code should be written in an environment that inspires creativity and reduces cognitive load."

Built with ❤️ using modern web standards!
