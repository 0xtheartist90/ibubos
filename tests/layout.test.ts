import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const layoutSource = readFileSync('src/app/layout.tsx', 'utf8');
const homeSource = readFileSync('src/app/(home)/HomePage.tsx', 'utf8');
const revealSource = readFileSync('src/components/RevealObserver.tsx', 'utf8');
const globalStyles = readFileSync('src/app/globals.css', 'utf8');

test('renders the site footer from the shared app layout', () => {
    assert.match(layoutSource, /<SiteFooter\s*\/>/);
    assert.doesNotMatch(homeSource, /<footer/);
});

test('mounts a shared accessible reveal observer', () => {
    assert.match(layoutSource, /<RevealObserver\s*\/\>/);
    assert.match(revealSource, /IntersectionObserver/);
    assert.match(revealSource, /prefers-reduced-motion/);
    assert.match(globalStyles, /html\.reveal-ready \.reveal-target/);
});
