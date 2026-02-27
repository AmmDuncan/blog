# Reading Customization Feature

## Overview

Add a floating button above the theme switch that opens a popover/panel for customizing the blog reading experience — font family, font size, and line height.

## Current State

- ThemeSwitch is a fixed pill button at `bottom-6 right-6` (z-50)
- Post body text uses CSS custom properties: `--p-font-size: 18px`, `--h1-font-size` through `--h6-font-size`
- Body font is Inter (sans), with Crimson Text (serif) available but unused in post body
- Post content is rendered as raw HTML via `dangerouslySetInnerHTML` in `PostBody` component
- Theme preference is persisted via cookies using `cookies-next`

## UI Design

### Trigger Button

- Fixed position, directly above the ThemeSwitch (`bottom-[calc(24px+56px)] right-6`)
- Icon: typography icon (e.g. `Aa` text or a font icon)
- Same visual style as the ThemeSwitch (rounded pill, matching bg/border)

### Popover Panel

- Opens upward from the button
- Sections:
  1. **Font Family** — Toggle between: Sans (Inter), Serif (Crimson Text), Mono (system)
  2. **Font Size** — Slider or step buttons (small / medium / large / x-large), maps to `--p-font-size` values (16px / 18px / 20px / 22px). Heading sizes scale proportionally.
  3. **Content Width** — Toggle between: narrow (60ch), default (68ch), wide (76ch)
- Close on click outside or pressing Escape

## Architecture

### New Files

| File                                          | Purpose                                    |
| --------------------------------------------- | ------------------------------------------ |
| `src/context/reading.tsx`                     | Context + provider for reading preferences |
| `src/components/common/ReadingCustomizer.tsx` | Floating button + popover UI               |

### Modified Files

| File                                           | Change                                                                                                                           |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/layout.tsx`                           | Add `ReadingProvider`, render `ReadingCustomizer` above `ThemeSwitch`                                                            |
| `src/app/globals.css`                          | Replace hardcoded font-size values with CSS custom properties that the context controls. Add font-family variable for post body. |
| `src/app/_components/PostBody/PostBody.tsx`    | Apply inline style variables from reading context                                                                                |
| `src/app/posts/_components/SinglePostPage.tsx` | Apply content width from reading context                                                                                         |

### State Management

- Create `ReadingContext` (same pattern as `ThemeContext`)
- Store preferences in a cookie (like theme) to persist across sessions and avoid flash
- Read cookie server-side in `layout.tsx` to set initial CSS variables on `<html>` (same approach as dark mode)

### CSS Variable Strategy

Add new custom properties controlled by the reading context:

```css
:root {
  --reading-font-family: var(--font-inter), sans-serif;
  --reading-font-size: 18px;
  --reading-content-width: 68ch;
}
```

Update `.post-body` styles to consume these:

```css
.post-body {
  font-family: var(--reading-font-family);
}

.post-body:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6) {
  font-size: var(--reading-font-size);
}
```

Update `SinglePostPage` container:

```css
.post-container {
  max-width: var(--reading-content-width);
}
```

Heading sizes scale relative to the base: `calc(var(--reading-font-size) * <ratio>)`.

## Implementation Steps

1. Create `ReadingContext` with cookie persistence (mirror ThemeContext pattern)
2. Create `ReadingCustomizer` component (button + popover)
3. Wire context into layout, apply CSS variables to `<html>`
4. Update `PostBody` and `SinglePostPage` to use new CSS variables
5. Style the popover to match the blog's design language
6. Test across light/dark themes and different post lengths

## Scope Boundaries

- Only affects `.post-body` content — Navbar, footer, homepage cards are not changed
- Feature is purely client-side with cookie persistence (no database)
- No new dependencies needed (reuse existing `cookies-next`, CSS variables)
