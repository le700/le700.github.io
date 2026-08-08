import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

const shortcuts = [
  ['experience', '实习'],
  ['projects', '项目'],
  ['awards', '获奖'],
  ['skills', '技能'],
  ['education', '教育'],
  ['contact', '联系'],
];

test('ambient field and six accessible shortcuts exist', () => {
  assert.match(html, /id="ambient-field"/);
  assert.match(html, /class="ambient-layer ambient-layer--one"/);

  for (const [destination, label] of shortcuts) {
    assert.match(
      html,
      new RegExp('href="#' + destination + '"[^>]*aria-label="[^"]*' + label),
    );
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

test('the ambient implementation preserves approved non-goals', () => {
  assert.doesNotMatch(html, /hero-cta|award-summary|particle-trail/i);
  assert.match(html, /exp-toggle" disabled/);
  assert.match(html, /--accent-cyan:\s*#E6397C/);
});

test('all shortcut modules and menu behavior are wired', () => {
  for (const name of ['experience', 'projects', 'awards', 'skills', 'education', 'contact']) {
    assert.match(html, new RegExp('hero-explorer-link--' + name));
  }
  assert.match(html, /navMenuToggle\.addEventListener\('click'/);
  assert.match(html, /classList\.toggle\('open'/);
});

test('ambient opacity avoids CSS arithmetic multiplication', () => {
  assert.match(html, /--ambient-one-opacity:/);
  assert.match(html, /--ambient-two-opacity:/);
  assert.match(html, /--ambient-three-opacity:/);
  assert.doesNotMatch(html, /opacity:\s*calc\([^;]*\*/);
});

test('shortcut destinations remain deep-linkable after smooth scrolling', () => {
  assert.match(html, /history\.pushState\(null, '', this\.getAttribute\('href'\)\)/);
});
