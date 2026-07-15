import assert from 'node:assert/strict';
import test from 'node:test';

import {
    getFeaturedBlog,
    getFeaturedProject,
    getPublishedBlog,
    listPublishedBlogs,
    listPublishedProjects
} from '../src/lib/content/repository.ts';

test('uses the complete static content as public fallback without a database', async () => {
    const originalUrl = process.env.DATABASE_URL;
    delete process.env.DATABASE_URL;

    try {
        assert.equal((await listPublishedBlogs()).length, 9);
        assert.equal((await listPublishedProjects()).length, 6);
        assert.equal((await getFeaturedBlog()).slug, 'veerkracht-begint-bij-mensen');
        assert.equal((await getFeaturedProject()).slug, 'lokaal-geld-zuidoost');
        assert.equal((await getPublishedBlog('co-creatie-zonder-schijnparticipatie'))?.label, 'Werkwijze');
        assert.equal(await getPublishedBlog('bestaat-niet'), undefined);
    } finally {
        if (originalUrl) process.env.DATABASE_URL = originalUrl;
    }
});
