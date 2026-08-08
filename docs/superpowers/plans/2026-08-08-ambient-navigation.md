# Ambient Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Give the Yue portfolio a QQ IM-inspired, cursor-responsive ambient light field and six hidden hero shortcut icons without changing its dark rose-pink identity or existing content presentation.

**Architecture:** Retain the static single-page site. Replace the current 10,000-particle Three.js hero runtime and content-tilt runtime with a lightweight DOM/CSS ambient-field controller. Semantic shortcut anchors sit around the hero; the existing navigation remains the conventional navigation path.

**Tech Stack:** Static HTML, CSS custom properties, vanilla JavaScript, inline SVG, Node.js built-in node:test, Playwright CLI.

## Global Constraints

- Preserve the dark rose-pink palette, centered minimal Yue hero, module order, award card experience, and intentionally collapsed Samsung detail panel.
- Do not add job-title copy, hero CTAs, resume promotion, award summaries, filters, QQ blue/white styling, particle trails, emoji icons, icon grids, or moving text/cards.
- The six shortcuts supplement navigation rather than replace it.
- Hero pointer response is gentle; later sections retain only low-intensity ambient drift.
- Touch and reduced-motion modes never rely on hover or continuous pointer tracking.

---

### Task 1: Establish a no-dependency interaction contract

**Files:**
- Create: package.json
- Create: tests/ambient-navigation.test.mjs

**Interfaces:**
- Consumes: root index.html.
- Produces: npm test, a static contract for required IDs, links, accessibility attributes, and non-goals.

- [ ] **Step 1: Write the failing test**

~~~js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const shortcuts = [
  ['experience', '实习'], ['projects', '项目'], ['awards', '获奖'],
  ['skills', '技能'], ['education', '教育'], ['contact', '联系'],
];

test('ambient field and six accessible shortcuts exist', () => {
  assert.match(html, /id="ambient-field"/);
  assert.match(html, /class="ambient-layer ambient-layer--one"/);
  for (const [destination, label] of shortcuts) {
    assert.match(html, new RegExp('href="#' + destination + '"[^>]*aria-label="[^"]*' + label));
  }
});

test('motion and navigation fallbacks exist', () => {
  assert.match(html, /prefers-reduced-motion:\s*reduce/);
  assert.match(html, /class="nav-menu-toggle"/);
  assert.match(html, /aria-controls="navLinks"/);
  assert.match(html, /const AmbientField\s*=\s*\(/);
  assert.doesNotMatch(html, /const HeroNebula\s*=/);
  assert.doesNotMatch(html, /three\.min\.js/);
});
~~~

- [ ] **Step 2: Add the native test command**

~~~json
{
  "private": true,
  "scripts": { "test": "node --test tests/*.test.mjs" }
}
~~~

- [ ] **Step 3: Verify the test fails**

Run: npm test

Expected: FAIL because index.html does not yet have the ambient field, shortcut links, menu control, or AmbientField controller.

- [ ] **Step 4: Commit the contract**

~~~bash
git add package.json tests/ambient-navigation.test.mjs
git commit -m "test: define ambient navigation contract"
~~~

### Task 2: Add the semantic field and six hidden hero shortcuts

**Files:**
- Modify: index.html around the current mainNav and hero markup (lines 2398-2438).

**Interfaces:**
- Consumes: current section IDs (#experience, #projects, #awards, #skills, #education, #contact).
- Produces: #ambient-field; three ambient layers; six .hero-explorer-link anchors; a .nav-menu-toggle button for #navLinks.

- [ ] **Step 1: Add the field inside .hero, before the existing canvas**

~~~html
<div id="ambient-field" aria-hidden="true">
  <span class="ambient-layer ambient-layer--one"></span>
  <span class="ambient-layer ambient-layer--two"></span>
  <span class="ambient-layer ambient-layer--three"></span>
</div>
~~~

- [ ] **Step 2: Add six perimeter anchors**

Create one a.hero-explorer-link per destination. Each must have an href, a Chinese aria-label, a data-label, and one inline line SVG. Use the modifier classes --experience, --projects, --awards, --skills, --education, and --contact. Keep all anchors outside .hero-content so the central Yue composition remains unobstructed.

- [ ] **Step 3: Add the mobile menu control to #mainNav**

~~~html
<button id="navMenuToggle" class="nav-menu-toggle" type="button"
        aria-label="打开导航菜单" aria-controls="navLinks" aria-expanded="false">
  <span></span><span></span>
</button>
~~~

- [ ] **Step 4: Run the test**

Run: npm test

Expected: the field and shortcut assertions pass; controller assertions still fail.

- [ ] **Step 5: Commit the semantic markup**

~~~bash
git add index.html
git commit -m "feat: add ambient navigation markup"
~~~

### Task 3: Replace the particle hero with the restrained ambient controller

**Files:**
- Modify: index.html hero CSS around lines 454-560.
- Modify: index.html scripts around lines 3398-3810.
- Modify: index.html head to remove the unused Three.js script.

**Interfaces:**
- Consumes: #ambient-field and its three layer children.
- Produces: CSS variables --ambient-x, --ambient-y, and --ambient-strength; AmbientField with pointer smoothing and section-aware intensity.

- [ ] **Step 1: Extend the failing test for non-goals**

~~~js
test('the ambient implementation preserves approved non-goals', () => {
  assert.doesNotMatch(html, /hero-cta|award-summary|particle-trail/i);
  assert.match(html, /exp-toggle" disabled/);
  assert.match(html, /--accent-cyan:\s*#E6397C/);
});
~~~

- [ ] **Step 2: Verify it fails before refactoring**

Run: npm test

Expected: FAIL because HeroNebula and the Three.js script still exist.

- [ ] **Step 3: Implement the three CSS layers**

Use fixed, pointer-event-free, blurred radial-gradient surfaces behind page content. Use only existing rose-pink color variables. Give each layer distinct scale, opacity, drift duration, and transform offsets calculated from --ambient-x and --ambient-y. Hero strength is 1; ordinary sections use a low strength; projects and awards use the lowest opacity and motion. Keep content z-index above the field.

- [ ] **Step 4: Replace HeroNebula and device-orientation tilt with one controller**

~~~js
const AmbientField = (() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const current = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  let rafId = 0;

  function render() {
    current.x += (target.x - current.x) * 0.045;
    current.y += (target.y - current.y) * 0.045;
    root.style.setProperty('--ambient-x', current.x.toFixed(4));
    root.style.setProperty('--ambient-y', current.y.toFixed(4));
    if (!reduceMotion.matches && finePointer.matches) rafId = requestAnimationFrame(render);
  }

  function setPointer(event) {
    target.x = (event.clientX / window.innerWidth - 0.5) * 2;
    target.y = (event.clientY / window.innerHeight - 0.5) * 2;
  }

  function resetPointer() { target.x = 0; target.y = 0; }
  document.addEventListener('pointermove', setPointer, { passive: true });
  document.addEventListener('pointerleave', resetPointer, { passive: true });
  render();
  return { setPointer, resetPointer };
})();
~~~

Use an IntersectionObserver to set --ambient-strength to 1 for the hero, a quiet value for ordinary sections, and the lowest value for projects and awards. On a reduced-motion media-query change, cancel the frame, reset variables to zero, and leave all links usable.

- [ ] **Step 5: Keep hero text still**

Remove the mouse/device-orientation transforms that currently move .hero-content, .hero-glow, and .scroll-hint. Retain the existing custom cursor; only the ambient layers respond to pointer movement.

- [ ] **Step 6: Verify static behavior**

Run: npm test and then run Select-String against index.html for HeroNebula and three.min.js.

Expected: npm test PASS; Select-String has no matches.

- [ ] **Step 7: Commit the ambient field**

~~~bash
git add index.html tests/ambient-navigation.test.mjs
git commit -m "feat: add restrained ambient light field"
~~~

### Task 4: Style and operate the exploration shortcuts and mobile fallback

**Files:**
- Modify: index.html hero and ambient CSS around lines 454-560.
- Modify: index.html smooth-scroll and cursor script around lines 3344-3396.
- Modify: index.html mobile navigation CSS around lines 2268-2360.

**Interfaces:**
- Consumes: six .hero-explorer-link anchors, #navMenuToggle, #navLinks, and AmbientField.
- Produces: pointer-proximity/focus reveal, smooth destination navigation, and a mobile menu whose aria-expanded state is accurate.

- [ ] **Step 1: Extend the failing test**

~~~js
test('all shortcut modules and menu behavior are wired', () => {
  for (const name of ['experience', 'projects', 'awards', 'skills', 'education', 'contact']) {
    assert.match(html, new RegExp('hero-explorer-link--' + name));
  }
  assert.match(html, /navMenuToggle\.addEventListener\('click'/);
  assert.match(html, /classList\.toggle\('open'/);
});
~~~

- [ ] **Step 2: Verify the test fails**

Run: npm test

Expected: FAIL until proximity behavior and menu control are present.

- [ ] **Step 3: Style the low-presence perimeter icons**

Use absolute hero positioning and a 44px by 44px minimum hit area. Resting opacity is near zero but pointer events remain enabled. The matching hover, focus-visible, and .is-near states reveal the fine-line icon, a restrained rose-pink glow, and a small label via data-label. Never render them as a row, grid, card, or permanent dashboard.

- [ ] **Step 4: Add pointer proximity and keyboard focus**

On hero pointermove, compare the pointer with every shortcut bounding-box center. Add .is-near to only the closest link within 140 pixels; otherwise remove it from every link. Use focus and blur handlers to produce identical reveal behavior for keyboard users. Reuse the existing hash smooth-scroll handler rather than creating another scroll system.

- [ ] **Step 5: Add the touch-accessible menu**

At max-width 768px, keep nav as a compact fixed shell, reveal .nav-menu-toggle, and retain the existing full-screen .nav-links.open pattern. Clicking the control updates .open, aria-expanded, and its label between 打开导航菜单 and 关闭导航菜单. Close it after a nav link click and on Escape. Hide .hero-explorer-link for coarse pointers because it is not the mobile navigation path.

- [ ] **Step 6: Run static and keyboard checks**

Run: npm test.

Then use Playwright CLI on a local static server: Tab to one hero shortcut, press Enter, and verify the URL hash becomes its destination.

- [ ] **Step 7: Commit the shortcut behavior**

~~~bash
git add index.html tests/ambient-navigation.test.mjs
git commit -m "feat: add exploratory hero shortcuts"
~~~

### Task 5: Verify visual restraint, motion, and responsive behavior

**Files:**
- Modify: index.html only if a concrete acceptance-criteria failure is found.
- Test: tests/ambient-navigation.test.mjs.

**Interfaces:**
- Consumes: completed static test command and local static site.
- Produces: fresh desktop, reduced-motion, and mobile evidence.

- [ ] **Step 1: Run complete static validation**

Run: npm test and git diff --check.

Expected: PASS and no whitespace errors.

- [ ] **Step 2: Perform desktop visual verification**

Serve the repository locally, open the hero at desktop width with Playwright CLI, capture a baseline screenshot, move the pointer between two shortcut zones, and capture a second screenshot. Confirm Yue remains centered, only the closest icon reveals, no text moves, and the field offsets gently without a trail.

- [ ] **Step 3: Verify reduced motion**

Open with reduced motion emulated. Confirm standard navigation works, ambient offsets stay at rest, and no pointer-following loop runs.

- [ ] **Step 4: Verify mobile**

At 390px width, confirm the compact menu opens and closes #navLinks, all six destinations are reachable, hero shortcuts are hidden, and there is no horizontal overflow.

- [ ] **Step 5: Recheck approved non-goals**

Compare the finished index.html with docs/superpowers/specs/2026-08-08-ambient-navigation-design.md. Confirm no hero CTA/job-title additions, no exp-toggle change, no award aggregate UI, and no palette replacement.

- [ ] **Step 6: Commit only a concrete verification fix**

~~~bash
git add index.html tests/ambient-navigation.test.mjs
git commit -m "fix: refine ambient navigation behavior"
~~~

Skip this commit when verification made no source change.
