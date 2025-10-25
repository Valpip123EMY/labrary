# Labrary - Grammarly-Inspired Design

## Overview
A professional research opportunity platform inspired by Grammarly's clean, modern design aesthetic. Features dark navy background with teal accent colors and crisp white cards.

## Design System

### Color Palette
```
Primary (Teal): HSL(174, 72%, 40%)
Background (Dark Navy): HSL(230, 35%, 7%)
Card Background: White
Text on Dark: White
Text on Light: Gray-900
```

### Typography
- Headings: Bold, -0.02em letter-spacing
- Body: Regular, -0.015em letter-spacing
- Line height: 1.15 for headings, 1.5 for body

## Layout Structure

### 1. Header (White Background)
- Labrary logo with teal circular icon
- Navigation menu: Browse, Institutions, Resources
- Sign In + Get Started (teal button)
- Fixed top, border-bottom

### 2. Hero Section (Dark Background)
**Left Column:**
- Small label: "Labrary for Researchers"
- Large heading: "Discover Your Next Research Opportunity"
- Description paragraph
- Two CTAs: "Browse Opportunities" (teal) + "Sign Up Free" (outline)
- Social proof text

**Right Column (Desktop):**
- White card mockup showing:
  - Gray placeholder text bars
  - Teal highlighted suggestion box
  - Action buttons

### 3. Feature Cards (Dark Background)
- 4-column grid on desktop
- Icons in gray boxes with teal accents
- Feature title + description
- Features:
  1. Smart Discovery (Search icon)
  2. Top Institutions (Building icon)
  3. Career Growth (TrendingUp icon)
  4. Verified Positions (Shield icon)

### 4. Search Section (White Background)
- Centered search bar
- Max-width container
- Search icon left-aligned
- Clean rounded input

### 5. Opportunities Grid (Dark Background)
- Section heading: "Latest Opportunities"
- Result count subtitle
- 3-column grid (responsive)
- White cards with:
  - Type badge (teal background)
  - Position title (hover: teal)
  - Institution name
  - Description (2-line clamp)
  - Meta info with icons (location, duration, deadline)
  - Arrow icon (appears on hover)
  - Border hover effect

### 6. Modal (White Card)
- Dark overlay backdrop
- Rounded 2xl card
- Close button (top-right)
- Content sections:
  - Type badge + Title + Institution
  - Meta grid (6 items, gray background)
  - About section
  - Requirements (bullet points with teal dots)
  - Skills & Topics (gray tags)
  - Action buttons (Apply + Save)

### 7. Footer (Dark Background)
- Copyright + Links
- Minimal, single row
- White/60 text color

## Component Specifications

### Cards
```css
- Background: white
- Border-radius: 12px (rounded-xl)
- Padding: 24px (p-6)
- Shadow on hover
- Border: gray-100
- Hover border: primary/30
- Transition: all 200ms
```

### Buttons
**Primary (Teal):**
- Background: primary color
- Hover: primary/90
- Text: white
- Font-weight: 600

**Outline (White):**
- Border: 2px white
- Hover: white/10 background
- Text: white
- Font-weight: 600

### Icons
- Size: 16px-20px (h-4 to h-5)
- Color: Matches text color
- Used for: navigation, meta info, features

## Responsive Behavior

### Mobile (< 768px)
- Hero: Single column
- Features: 1-2 columns
- Opportunities: Single column
- Header: Condensed navigation
- Reduced padding

### Tablet (768px - 1024px)
- Hero: Still stacked
- Features: 2 columns
- Opportunities: 2 columns

### Desktop (> 1024px)
- Hero: 2 columns with mockup
- Features: 4 columns
- Opportunities: 3 columns
- Full navigation visible

## Key Interactions

### Hover States
- Cards: Shadow increase + border color change
- Buttons: Background opacity change
- Links: Color change to white/primary
- Arrow icons: Translate-x animation

### Click Actions
- Card click → Opens modal
- Close modal → Backdrop or X button
- Search → Live filtering
- Apply button → (Would navigate to application)

## Technical Stack
- React + TypeScript
- Tailwind CSS
- Lucide React (icons)
- Vite (build tool)

## Brand Identity

### Name: Labrary
- Fusion of "Lab" + "Library"
- Represents: Research laboratory + knowledge library
- Logo: Circular teal badge with "L"

### Voice & Tone
- Professional yet approachable
- Academic but not stuffy
- Empowering and supportive
- Clear and direct

## Comparison to Grammarly

| Element | Grammarly | Labrary |
|---------|-----------|---------|
| Background | Dark navy | Dark navy ✓ |
| Accent | Green | Teal |
| Cards | White | White ✓ |
| Hero | Split layout | Split layout ✓ |
| Features | Icon grid | Icon grid ✓ |
| Typography | Clean, bold | Clean, bold ✓ |
| CTA | Prominent button | Prominent button ✓ |
| Overall feel | Professional | Professional ✓ |

## Future Enhancements
- Category filtering tabs
- Advanced search filters
- Save/bookmark functionality
- User authentication
- Application tracking
- Email notifications
- Institution profiles
- Dark mode toggle
