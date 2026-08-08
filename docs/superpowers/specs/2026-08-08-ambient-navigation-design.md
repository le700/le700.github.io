# Yue Portfolio Ambient Navigation Design

## Goal

Refresh the portfolio's interaction language without changing its dark rose-pink palette, minimal first-screen composition, existing content order, or the intentionally collapsed internship details. The experience should borrow QQ IM's sense of a calm page with a living, cursor-responsive background, while retaining Yue's existing visual identity.

## Approved Scope

### 1. Ambient light field

- Retain the current dark palette and rose-pink accent family. Do not introduce QQ IM's blue-and-white visual system.
- Use two or three large, blurred, low-saturation light-field layers behind the page content.
- On the hero, pointer movement creates a subtle target offset and glow concentration. Motion must ease toward the target and continue briefly after the pointer stops.
- On all later sections, keep the same background family at roughly one-tenth of the hero's response strength. The section content itself must not move.
- Reduce the field's opacity and motion in dense sections such as Projects and Awards so it never competes with text, media, or certificates.
- When the pointer leaves the window, return the field to its resting state through the same easing rather than snapping.

### 2. Hidden shortcut icons on the hero

The hero gains six ambient, line-style icon shortcuts. They are an additional desktop navigation method, not a replacement for the existing navigation.

| Shortcut | Destination | Icon concept |
| --- | --- | --- |
| 实习 | `#experience` | robotic arm / articulated joint |
| 项目 | `#projects` | viewfinder / cube |
| 获奖 | `#awards` | trophy |
| 技能 | `#skills` | connected nodes |
| 教育 | `#education` | book / graduation cap |
| 联系 | `#contact` | signal / conversation bubble |

- Keep the central `Yue` wordmark and existing introductory content unobstructed.
- Position the six exploration zones around the outer hero field; do not present them as a row, grid, card wall, or permanent dashboard.
- Icons are nearly imperceptible at rest. On pointer proximity or focus, fade in with a small scale increase and restrained rose-pink glow.
- Show only a small module name while the corresponding icon is active. The label fades out with the icon.
- On click, smooth-scroll to the destination section, then let the icon fade back into the field.
- Icons must be semantic buttons or links, keyboard focusable, and expose accessible labels. Existing desktop navigation remains available.

### 3. Responsive and motion behavior

- Do not rely on hover for mobile navigation. Keep conventional links or an equivalent touch-accessible menu for every section.
- On touch devices, render the hero background as a static or very-low-frequency ambient field. Do not simulate pointer exploration.
- Respect `prefers-reduced-motion`: disable pointer tracking, inertia, transitions, and looping field motion while leaving the page usable.
- Preserve readable contrast and avoid oversized glow around text.

## Explicit Non-Goals

- Do not add job-title copy, CTA buttons, resume promotion, or a data-summary dashboard to the hero.
- Do not force-open or otherwise change the timing of the Samsung internship detail panel.
- Do not replace the award card experience with aggregate counts or filters.
- Do not change the dark rose-pink palette to QQ blue, white, or purple.
- Do not add particle trails, emoji icons, a cursor-following icon chain, or decorative motion on cards and text.

## Acceptance Criteria

1. The first screen remains visually sparse and centered around `Yue`.
2. Desktop pointer movement produces a continuous, gentle light-field response with no visible cursor trail.
3. All six module shortcuts appear only through exploration/focus, navigate to the correct existing section, and work with keyboard input.
4. Subsequent sections feel visually connected by low-intensity ambient motion without reducing content legibility.
5. Mobile and reduced-motion modes preserve every navigation path and avoid hover-dependent behavior.
6. Existing dark rose-pink branding, content hierarchy, and folded internship state remain unchanged.
