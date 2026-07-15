import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const relatedSource = readFileSync('src/components/content/RelatedContent.tsx', 'utf8');
const projectsSource = readFileSync('src/app/projecten/page.tsx', 'utf8');
const blogDetailSource = readFileSync('src/app/blogs/[slug]/page.tsx', 'utf8');
const projectDetailSource = readFileSync('src/app/projecten/[slug]/page.tsx', 'utf8');
const globalStyles = readFileSync('src/app/globals.css', 'utf8');

test('related content uses compact rows instead of archive cards', () => {
    assert.doesNotMatch(relatedSource, /BlogCard|ProjectCard/);
    assert.match(relatedSource, /related-row/);
});

test('allows the long project hero title to wrap at a natural breakpoint', () => {
    assert.match(projectsSource, /Praktijk&shy;voorbeelden/);
});

test('places related content in a supporting detail sidebar', () => {
    for (const source of [blogDetailSource, projectDetailSource]) {
        assert.match(source, /detail-layout/);
        assert.match(source, /detail-sidebar/);
    }
});

test('places detail back links in the green content section instead of the hero', () => {
    for (const source of [blogDetailSource, projectDetailSource]) {
        const heroStart = source.indexOf("className='detail-hero");
        const textureStart = source.indexOf("className='texture-section");
        const backLink = source.indexOf("className='detail-back");

        assert.ok(heroStart !== -1);
        assert.ok(textureStart !== -1);
        assert.ok(backLink !== -1);
        assert.ok(backLink > textureStart);
        assert.ok(backLink > heroStart);
    }
});

test('keeps related sidebar rows readable at a larger supporting scale', () => {
    assert.match(globalStyles, /grid-template-columns: 4\.8rem minmax\(0, 1fr\) 1\.15rem/);
    assert.match(globalStyles, /\.related-row__copy strong \{[\s\S]*?font-size: 1\.18rem/);
});

test('reserves space for related row arrows beside long titles', () => {
    assert.match(globalStyles, /grid-template-columns: 4\.8rem minmax\(0, 1fr\) 1\.15rem/);
    assert.match(globalStyles, /\.related-row__copy \{[\s\S]*?min-width: 0/);
    assert.match(globalStyles, /\.related-row__arrow \{[\s\S]*?justify-self: end/);
});
