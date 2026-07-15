import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const layoutSource = readFileSync('src/app/layout.tsx', 'utf8');
const homeSource = readFileSync('src/app/(delete-this-and-modify-page.tsx)/HomePage.tsx', 'utf8');

test('renders the site footer from the shared app layout', () => {
    assert.match(layoutSource, /<SiteFooter\s*\/>/);
    assert.doesNotMatch(homeSource, /<footer/);
});
