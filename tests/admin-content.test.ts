import assert from 'node:assert/strict';
import test from 'node:test';

import {
    blogInputSchema,
    createSlug,
    imageSchema,
    normalizeContentInput,
    projectInputSchema
} from '../src/lib/content/validation.ts';
import { orderPublished, rankRelated } from '../src/lib/content/ranking.ts';
import { getUploadError } from '../src/lib/admin/upload.ts';

const sections = [{ heading: 'Een heldere tussenkop', body: 'Dit is een geldige inhoudelijke paragraaf.' }];

test('creates clean Dutch-friendly slugs', () => {
    assert.equal(createSlug('Co-creatie & Groei in de Wijk!'), 'co-creatie-groei-in-de-wijk');
    assert.equal(createSlug('  Veerkracht   begint bij mensen  '), 'veerkracht-begint-bij-mensen');
});

test('normalizes a new blog as a draft', () => {
    const result = normalizeContentInput('blog', {
        title: 'Nieuwe blog',
        description: 'Een duidelijke samenvatting voor de nieuwe blog.',
        image: '/images/over%20ibu.webp',
        label: 'Reflectie',
        intro: 'Een voldoende lange introductie voor deze nieuwe blog.',
        sections,
        tags: [' Veerkracht ', 'community', 'veerkracht'],
        takeaway: 'Dit is de kern van het verhaal en ruim lang genoeg.'
    });

    assert.equal(result.status, 'draft');
    assert.equal(result.slug, 'nieuwe-blog');
    assert.deepEqual(result.tags, ['veerkracht', 'community']);
    assert.equal(result.readTime, null);
    assert.equal(result.facts, null);
    assert.equal(result.outcome, null);
});

test('keeps a published slug stable when its title changes', () => {
    const result = normalizeContentInput(
        'blog',
        {
            title: 'Volledig nieuwe titel',
            description: 'Een duidelijke samenvatting voor de aangepaste blog.',
            image: '/images/over%20ibu.webp',
            label: 'Reflectie',
            intro: 'Een voldoende lange introductie voor de aangepaste blog.',
            sections,
            tags: ['veerkracht'],
            takeaway: 'Dit is de kern van het aangepaste verhaal.'
        },
        { slug: 'bestaande-url', status: 'draft', publishedAt: new Date('2025-01-01') }
    );

    assert.equal(result.slug, 'bestaande-url');
});

test('rejects partially filled sections and invalid remote images', () => {
    assert.equal(
        blogInputSchema.safeParse({
            title: 'Nieuwe blog',
            description: 'Een duidelijke samenvatting voor de nieuwe blog.',
            image: '/images/over%20ibu.webp',
            label: 'Reflectie',
            intro: 'Een voldoende lange introductie voor deze nieuwe blog.',
            sections: [{ heading: 'Alleen een kop', body: '' }],
            tags: ['veerkracht'],
            takeaway: 'Dit is de kern van het verhaal en ruim lang genoeg.'
        }).success,
        false
    );
    assert.equal(imageSchema.safeParse('https://example.com/photo.webp').success, false);
    assert.equal(
        imageSchema.safeParse('https://example.public.blob.vercel-storage.com/photo.webp').success,
        true
    );
});

test('requires project facts and clears blog-only fields', () => {
    const parsed = projectInputSchema.parse({
        title: 'Nieuw project',
        description: 'Een duidelijke samenvatting voor dit nieuwe project.',
        image: '/images/lokaalgeld.webp',
        label: 'Co-creatie',
        intro: 'Een voldoende lange introductie voor dit nieuwe project.',
        sections,
        tags: ['samenwerking'],
        facts: ['Amsterdam Zuidoost'],
        outcome: 'Een concreet resultaat dat ruim lang genoeg is.'
    });

    const normalized = normalizeContentInput('project', parsed);
    assert.equal(normalized.readTime, null);
    assert.equal(normalized.takeaway, null);
    assert.deepEqual(normalized.facts, ['Amsterdam Zuidoost']);
});

test('orders published content and ranks related items deterministically', () => {
    const items = [
        { slug: 'oud', tags: ['a'], publishedAt: new Date('2025-01-01') },
        { slug: 'nieuw', tags: ['a', 'b'], publishedAt: new Date('2025-02-01') },
        { slug: 'midden', tags: ['b'], publishedAt: new Date('2025-01-15') }
    ];

    assert.deepEqual(orderPublished(items).map(({ slug }) => slug), ['nieuw', 'midden', 'oud']);
    assert.deepEqual(rankRelated(items, ['a', 'b'], 'nieuw', 2).map(({ slug }) => slug), ['midden', 'oud']);
});

test('accepts up to four content sections', () => {
    const fourSections = Array.from({ length: 4 }, (_, index) => ({
        heading: `Tussenkop ${index + 1}`,
        body: 'Dit is een geldige inhoudelijke paragraaf voor dit blok.'
    }));

    assert.equal(
        blogInputSchema.safeParse({
            title: 'Blog met vier blokken',
            description: 'Een duidelijke samenvatting voor de nieuwe blog.',
            image: '/images/over%20ibu.webp',
            label: 'Reflectie',
            intro: 'Een voldoende lange introductie voor deze nieuwe blog.',
            sections: fourSections,
            tags: ['reflectie'],
            takeaway: 'Dit is de kern van het verhaal en ruim lang genoeg.'
        }).success,
        true
    );
});

test('validates admin image uploads', () => {
    assert.equal(getUploadError({ type: 'image/webp', size: 1024 }), null);
    assert.equal(getUploadError({ type: 'image/svg+xml', size: 1024 }), 'unsupported-type');
    assert.equal(getUploadError({ type: 'image/jpeg', size: 5 * 1024 * 1024 + 1 }), 'too-large');
});
