---
name: Atelier Alabaster
colors:
  surface: '#fbf8ff'
  surface-dim: '#dad9e3'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f2fd'
  surface-container: '#eeedf7'
  surface-container-high: '#e8e7f1'
  surface-container-highest: '#e3e1ec'
  on-surface: '#1a1b22'
  on-surface-variant: '#47464b'
  inverse-surface: '#2f3038'
  inverse-on-surface: '#f1effa'
  outline: '#77767b'
  outline-variant: '#c8c5cb'
  surface-tint: '#5f5e61'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1e'
  on-primary-container: '#858387'
  inverse-primary: '#c8c5ca'
  secondary: '#ac3400'
  on-secondary: '#ffffff'
  secondary-container: '#fd6b36'
  on-secondary-container: '#5d1900'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#04210e'
  on-tertiary-container: '#6c8b71'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4e1e6'
  primary-fixed-dim: '#c8c5ca'
  on-primary-fixed: '#1b1b1e'
  on-primary-fixed-variant: '#47464a'
  secondary-fixed: '#ffdbd0'
  secondary-fixed-dim: '#ffb59d'
  on-secondary-fixed: '#390c00'
  on-secondary-fixed-variant: '#832600'
  tertiary-fixed: '#c9ebcd'
  tertiary-fixed-dim: '#aecfb2'
  on-tertiary-fixed: '#04210e'
  on-tertiary-fixed-variant: '#304d37'
  background: '#fbf8ff'
  on-background: '#1a1b22'
  surface-variant: '#e3e1ec'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '500'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 26px
    fontWeight: '500'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.005em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
  label-technical:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system channels the disciplined restraint of modernist industrial design (Braun, Dieter Rams) fused with the tactile sophistication of an architectural monograph or high-end studio journal (Architectural Digest, Cereal). 

### Philosophy & Visual Tone
- **Warm Minimalist Precision**: Clinical clarity softened by natural material undertones (stone, linen, limestone, handmade paper).
- **Disciplined Geometry**: Structural elements rely on precision alignment, generous spatial rhythm, and delicate 1px hairline divisions rather than heavy structural frames or drop shadows.
- **Editorial Legibility**: Uncompromising typographic hierarchy where dense technical specification data coexists seamlessly with sweeping, open architectural layouts.
- **Tactile Micro-Surfaces**: Surfaces feel physical and grounded, utilizing layered micro-tonal shifts to denote interactive planes, hierarchy, and nested studio viewports.

## Colors

The palette is anchored in architectural materials: creamy raw paper, lime wash, warm zinc, and fired earth. High-contrast typography provides rigorous legibility across pale, warm tinted grounds.

### Palette Architecture
- **Canvas & Surface Grounds**:
  - Base Canvas: `#FBFBFA` (warm alabaster tint)
  - Surface Substrate: `#F7F6F3` (creamy paper tone)
  - Surface Elevated / Card: `#FFFFFF` (pure plaster)
  - Surface Muted / Well: `#EFECE6` (limestone wash)
- **Hairlines & Grid Divisions**:
  - Primary Border: `#E2E0DC` (warm stone hairline)
  - Subtle Inset / Divider: `#EBE9E4`
  - Active / Focus Border: `#18181b` (charcoal stroke)
- **Ink & Typography**:
  - Ink Heavy (Headings, primary values): `#18181B` (deepest warm charcoal)
  - Ink Medium (Body, active icons): `#27272A`
  - Ink Muted (Metadata, structural guides): `#52525B`
  - Ink Ghost (Disabled states, captions): `#71717A`
- **Functional Accents**:
  - Accent Terracotta (Studio highlights, active tools, destructive/emphasis): `#C2410C` (muted brick tone, fallback `#EA580C`)
  - Accent Mineral Sage (Structural safety, valid states, success metrics): `#4D6B53` (muted olive/sage)
  - Accent Amber Warning: `#B45309`

## Typography

The typographic hierarchy marries technical drafting precision with editorial elegance.

- **Headlines (`Space Grotesk`)**: Provides an architectural, structural cadence with subtle geometric nuances. Always set tight with slightly negative tracking to ensure commanding editorial authority.
- **Body (`Plus Jakarta Sans`)**: Clean, neutral, high-legibility geometric sans with refined counters. Delivers low cognitive friction for continuous documentation and tool reading.
- **Labels & Numerical Telemetry (`JetBrains Mono`)**: Monospaced technical indicators, dimensions, coordinates, draft notation, and status labels evoke architectural blueprint stampings and CAD precision.

## Layout & Spacing

The layout model is governed by architectural module logic: disciplined structural grids divided by crisp hairline borders rather than artificial floating cards.

### Layout System
- **Grid Structure**: 12-column variable fluid grid desktop system constrained to a maximum content container of `1600px` for ultra-wide studio monitors. Mobile surfaces collapse to a 4-column stack.
- **Hairline Framing**: Structural areas (toolbars, viewport sidebars, parameter panels) are framed with continuous `1px` borders (`#E2E0DC`), creating a grid-blueprint aesthetic.
- **Proportional Spacing**: Spacing values adhere to a strict 4px / 8px scale. Generous empty canvas regions create an open, atelier-like breathing space between dense technical control centers.

## Elevation & Depth

This system avoids heavy drop shadows and faux blur effects in favor of clean planar depth, subtle surface tints, and hairline offsets.

- **Tier 0 (Base Canvas)**: Tinted `#FBFBFA`. The infinite workspace background.
- **Tier 1 (Panels & Toolbars)**: Solid `#F7F6F3` bounded by `#E2E0DC` 1px borders.
- **Tier 2 (Cards & Active Workspaces)**: `#FFFFFF` resting cleanly inside Tier 1 or Tier 0 containers with sharp 1px borders.
- **Tactile Shadows (Micro-elevation)**:
  - Default Elevated Surface: `box-shadow: 0 1px 2px rgba(24, 24, 27, 0.03), 0 4px 12px rgba(24, 24, 27, 0.02);`
  - Floating Overlays / Context Menus: Crisp 1px border (`#E2E0DC`) combined with `box-shadow: 0 8px 24px -4px rgba(24, 24, 27, 0.06);`
- **Active State / Selection**: Indicated via crisp 1px `#18181B` outlines or slight micro-recessions (1px inner shadow on sunken wells).

## Shapes

The design system employs a refined "Soft Architectural" radius model (`roundedness: 1`), embodying the precision of machined stone or trimmed drafting sheets.

- **Interactive Elements & Buttons**: `0.25rem` (4px). Clean, crisp corners with just enough softening to prevent visual harshness.
- **Cards & Inspector Surfaces**: `0.5rem` (8px). Structural framing stays grounded.
- **Modals & Drawers**: `0.75rem` (12px).
- **Status Tags & Dimension Badges**: `0.25rem` (4px) or full pill `9999px` strictly for floating micro-tags and coordinate flags.

## Components

### Buttons
- **Primary**: Solid charcoal surface (`#18181B`), text `#FBFBFA`, crisp 4px border radius. Hover: `#27272A`. Active: `#000000`.
- **Secondary / Studio Tool**: `#FFFFFF` background, hairline border `1px solid #E2E0DC`, text `#18181B`. Hover: `#F7F6F3` with border `#18181B`.
- **Accent (Terracotta)**: `#C2410C` background, white text. Reserved strictly for primary project release, render initiation, or critical commit actions.
- **Ghost / Drafting Tool**: Transparent background, text `#52525B`. Hover: `#EFECE6` with text `#18181B`.

### Input Fields & Selectors
- Background `#FFFFFF`, border `1px solid #E2E0DC`, radius `4px`.
- Typography: `JetBrains Mono` for dimensional numerical inputs; `Plus Jakarta Sans` for labels and descriptions.
- Focus State: Border color `#18181B` with no diffuse glow; crisp 1px solid stroke.
- Prefixes & Units (`mm`, `pt`, `°`): Styled in `JetBrains Mono` at `#71717A`.

### Status Indicators & Chips
- Architectural stamp format: compact, monospaced text, `4px` padding.
- **Safety / Confirmed**: Tint `#EBF3ED`, border `1px solid #C4DCC8`, text `#4D6B53`.
- **Draft / In Progress**: Tint `#F7F6F3`, border `1px solid #E2E0DC`, text `#52525B`.
- **Alert / Over-tolerance**: Tint `#FEF3EC`, border `1px solid #F8D1BA`, text `#C2410C`.

### Cards & Spatial Containers
- Background `#FFFFFF` with `1px solid #E2E0DC`.
- Zero intrusive drop shadow at rest; utilizes structural rhythm and hairline dividing headers to separate parameters from spatial views.
- Section headers within cards feature a 1px border-bottom (`#E2E0DC`) with all-caps uppercase labels in `Space Grotesk` or `JetBrains Mono`.

### Checkboxes & Radios
- Checkbox: `16px x 16px` square, `2px` roundedness, `1px solid #E2E0DC`. Checked: solid `#18181B` with a sharp white checkmark.
- Radio: Circular with concentric charcoal dot when active.