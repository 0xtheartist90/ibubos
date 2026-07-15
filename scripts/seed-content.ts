import { loadEnvConfig } from '@next/env';

import { blogPosts, projects } from '../src/lib/content.ts';
import { getDb } from '../src/lib/db/client.ts';
import { contentEntries } from '../src/lib/db/schema.ts';

loadEnvConfig(process.cwd());

const publishedAt = (index: number) => new Date(Date.UTC(2025, 0, 15 - index, 12));

const blogs = blogPosts.map((post, index) => ({
    type: 'blog',
    status: 'published',
    ...post,
    facts: null,
    outcome: null,
    publishedAt: publishedAt(index)
}));

const projectRows = projects.map((project, index) => ({
    type: 'project',
    status: 'published',
    ...project,
    readTime: null,
    takeaway: null,
    publishedAt: publishedAt(index)
}));

const seed = async () => {
    const db = getDb();
    if (!db) throw new Error('DATABASE_URL ontbreekt.');

    await db.insert(contentEntries).values([...blogs, ...projectRows]).onConflictDoNothing();
    console.log(`Seed klaar: ${blogs.length} blogs en ${projectRows.length} projecten gecontroleerd.`);
};

seed().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
