---
name: Lumina OS
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bccbb8'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#869584'
  outline-variant: '#3d4a3c'
  surface-tint: '#4ee171'
  primary: '#4ee171'
  on-primary: '#003913'
  primary-container: '#21c055'
  on-primary-container: '#004719'
  inverse-primary: '#006e2b'
  secondary: '#b1cbd0'
  on-secondary: '#1b3438'
  secondary-container: '#324b4f'
  on-secondary-container: '#9fbabf'
  tertiary: '#b9c8de'
  on-tertiary: '#233143'
  tertiary-container: '#99a8bd'
  on-tertiary-container: '#2f3d4f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6efe8a'
  primary-fixed-dim: '#4ee171'
  on-primary-fixed: '#002108'
  on-primary-fixed-variant: '#00531e'
  secondary-fixed: '#cce7ec'
  secondary-fixed-dim: '#b1cbd0'
  on-secondary-fixed: '#041f23'
  on-secondary-fixed-variant: '#324b4f'
  tertiary-fixed: '#d4e4fa'
  tertiary-fixed-dim: '#b9c8de'
  on-tertiary-fixed: '#0d1c2d'
  on-tertiary-fixed-variant: '#39485a'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
  terminal-green: '#21C055'
  deep-forest: '#1B3438'
  slate-gray: '#94A3B8'
  background-dark: '#0F172A'
  surface-card: '#1E293B'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 32px
  lg: 64px
  xl: 128px
  gutter: 24px
  margin: 24px
---

## Brand & Style

The design system is built upon a "Personal Operating System" metaphor, blending high-utility efficiency with a refined, developer-centric aesthetic. It positions the user as the architect of their own digital space—professional, organized, yet deeply personal.

The style is **Modern Minimalist with a Technical Edge**. It prioritizes clarity through heavy whitespace and sharp typography, while using subtle code-inspired elements (monospaced accents) and vibrant highlights to suggest a living, breathing system. The interface should feel like a high-end dashboard: functional, responsive, and quietly powerful.

## Colors

The palette is anchored in a sophisticated dark mode, utilizing high-contrast accents to guide the eye. 

- **Primary:** A vibrant "Terminal Green" used for calls to action, active states, and success indicators.
- **Secondary:** A deep, muted teal used for subtle backgrounds and container fills to add depth beyond pure black/gray.
- **Neutral:** A range of slates and deep blues that form the core surface of the OS, ensuring text remains legible without the harshness of pure black.
- **Accents:** Use white sparingly for primary headings and critical information to maximize visual hierarchy against the dark backdrop.

## Typography

This design system uses a dual-font approach to reinforce the "Personal OS" theme:
- **Inter** handles all primary communication. It is set with tight letter-spacing for headlines to create a modern, "Swiss" feel and standard spacing for body text to ensure readability.
- **JetBrains Mono** is the secondary "utility" font. It is used for labels, metadata, system status, and small UI components like tags or chips. It provides the technical, "under-the-hood" character of the system.
- **Weights:** Use "Extra Bold" for major headlines and "Medium" for mono-labels to ensure a clear distinction between content and system metadata.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. While the content containers remain centered and constrained (max-width 1200px) on desktop to maintain readability, the internal elements utilize a strict 8px grid system.

- **Grid:** A 12-column grid for desktop, 8-column for tablet, and 4-column for mobile.
- **Rhythm:** Generous vertical spacing (MD to LG units) between sections to create an editorial, airy feel.
- **Margins:** Consistent 24px outer margins on mobile to ensure content doesn't touch the screen edge.
- **Reflow:** On mobile, complex grid structures collapse into a single-column vertical stack, maintaining the same spacing units to preserve the visual hierarchy.

## Elevation & Depth

This design system avoids heavy shadows in favor of **Tonal Layering and Border Definition**.

- **Surfaces:** Depth is created by shifting background colors. The base background is the darkest shade, with cards and modals using a slightly lighter slate (#1E293B).
- **Outlines:** Instead of shadows, use 1px solid borders (color: Secondary or a low-opacity White) to define component boundaries. This mimics a clean, digital schematic.
- **Active States:** Use the Primary Green for subtle outer glows (low spread, high blur) on focused elements to simulate a "powered-on" device state.
- **Backdrop:** Modals and overlays should utilize a heavy background blur (20px+) with a semi-transparent dark overlay to keep the focus on the OS "window."

## Shapes

The shape language is **Soft yet Structured**. 

A base radius of `0.25rem` (4px) is applied to small components like inputs and tags to maintain a technical feel. Larger containers like cards use `0.5rem` (8px) to soften the overall appearance of the interface. 

Avoid fully circular buttons; instead, use slightly rounded rectangles to maintain the professional OS aesthetic. The only exception is for status indicators or specific icon-only utility buttons.

## Components

- **Buttons:** Primary buttons use a solid Green fill with dark text. Secondary buttons use an outline style with the Primary color or a White stroke. All buttons should have a subtle hover transition that increases the brightness of the fill.
- **Chips/Tags:** Use JetBrains Mono for the text. Use a low-opacity Primary Green background with a solid Green border for "active" tags, and a low-opacity Slate for "inactive" ones.
- **Input Fields:** Dark background (#0F172A), 1px slate border, and the primary color for the focus state border. Use Monospace font for placeholder text.
- **Cards:** No shadows. Use a subtle 1px border (#1E293B) and a slightly lighter background than the page. Headlines within cards should be Inter Bold.
- **Status Indicators:** Small, pulsing circles using the Primary Green to indicate "Live" or "System Online" status, reinforcing the Personal OS theme.
- **System Navigation:** A vertical or horizontal dock-style menu with high-contrast icons and minimal labels using the `label-caps` typography style.