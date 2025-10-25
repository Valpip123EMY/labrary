# Ultra-Minimal Design - Research Platform

## Philosophy
Inspired by Apple and contemporary minimalism: maximum clarity, zero decoration, pure focus on content.

## Core Principles

### 1. **Pure White & Black**
- Background: Pure white (#FFFFFF)
- Text: Pure black (#000000)
- Opacity for hierarchy: /50, /40, /30
- No grays, no colors, no decoration

### 2. **Maximum White Space**
- Generous padding (p-12, p-16 on modal)
- Large gaps between elements
- Breathing room around all content
- Content max-width: 4xl (56rem)

### 3. **Typography Scale**
- Hero: 5xl-7xl (60-72px)
- Modal titles: 4xl-5xl (36-48px)
- Card titles: xl (20px)
- Body: base (16px)
- Meta: sm-xs (12-14px)
- Tight letter-spacing: -0.03em for headings

### 4. **Simplified Components**

#### Header
- Just logo text and sign in button
- No navigation menu
- Minimal height (h-20)
- Thin border (border-black/5)

#### Hero
- Centered layout
- Large heading + subtitle
- Single rounded search input
- No stats, no images, no badges

#### Filters
- Simple underlined tabs
- No pills, no backgrounds
- Active state: underline only
- Horizontal scroll on mobile

#### Cards
- List layout (not grid)
- Border-bottom separators
- No shadows, no images
- Hover: subtle background tint
- Meta info in single line with bullets

#### Modal
- White background overlay
- Generous padding (p-16)
- Clean grid for meta info
- Simple bullet lists
- Single CTA button

### 5. **Interactions**
- Subtle hover states (opacity changes)
- No animations or transitions (or very subtle)
- No shadows or elevation
- Clean focus states

## Layout Structure

```
Header (h-20, border-bottom)
  ↓
Hero (py-32, centered)
  - Large heading
  - Search input
  ↓
Filters (tabs with underline)
  ↓
Main (single column, max-w-4xl)
  - List of opportunities
  - Border-bottom separators
  ↓
Footer (minimal, 3 links)
```

## Design Tokens

### Colors
```css
--background: white
--foreground: black
--border: black/5
--muted-text: black/40
--hover: black/[0.01]
```

### Spacing
- Container: max-w-6xl
- Padding: px-6, py-16
- Gap: gap-8, gap-12
- Section spacing: mt-32

### Typography
- Font: System (Inter fallback)
- Weight: 400 (normal), 600 (semibold), 700 (bold)
- Line height: 1.2 (headings), 1.6 (body)

## Key Differences from Previous Design

| Before | After |
|--------|-------|
| Colored accents | Pure black/white |
| Card grid | Single column list |
| Image headers | No images |
| Complex filters | Simple tabs |
| Multiple CTAs | Single action |
| Decorative elements | Zero decoration |
| Shadows & elevation | Flat design |
| Stats & badges | Clean typography |

## Mobile Considerations
- Maintains simplicity
- Horizontal scroll for filters
- Reduced padding (p-12 → p-6)
- Full-width modals
- Touch-friendly tap targets

## Accessibility
- High contrast (black on white)
- Clear focus states
- Semantic HTML
- Screen reader friendly
- Keyboard navigation

## Result
A top-tier, professional platform that puts research opportunities front and center with zero distractions.
