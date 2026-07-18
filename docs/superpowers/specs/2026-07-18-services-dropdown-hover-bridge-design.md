# Services Dropdown Hover Bridge Design

**Date:** 2026-07-18

**Status:** Approved

## Problem

The desktop Services dropdown closes while the pointer travels from the trigger to the menu. The menu is visually separated from the trigger by `mt-5` (20px), while the parent navigation item closes immediately on `mouseleave`. That physical gap can fall outside the interactive descendant area.

## Design

- Preserve the dropdown's exact visible position, 20px below its current anchor.
- Replace the dropdown's top margin with an absolutely positioned wrapper at `top-full` that has `pt-5`.
- Place the visible menu inside that wrapper without a top margin.
- Keep the wrapper inside the Services `<li>` so the invisible padded bridge remains part of the hoverable descendant area.
- Keep the existing `onMouseEnter`, `onMouseLeave`, focus departure, click toggle, outside pointer, and Escape behavior.
- Do not change menu width, colors, border, shadow, typography, links, or mobile navigation.

## Validation

- A source-contract test verifies that the bridge wrapper uses `top-full pt-5` and the visible menu no longer uses `mt-5`.
- Browser interaction follows the pointer from the Services trigger, through the 20px bridge, to each menu item without closing.
- Moving outside the Services item still closes the menu.
- Click toggle, Escape, keyboard focus, outside-click, and mobile navigation continue working.
- Tests, ESLint, TypeScript, and the production build pass.
