import { sql } from 'drizzle-orm';
import { check, jsonb, pgTable, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core';

export type ContentSection = {
    heading: string;
    body: string;
};

export const contentEntries = pgTable(
    'content_entries',
    {
        id: uuid('id').defaultRandom().primaryKey(),
        type: text('type').notNull(),
        status: text('status').default('draft').notNull(),
        slug: text('slug').notNull(),
        title: text('title').notNull(),
        description: text('description').notNull(),
        image: text('image').notNull(),
        label: text('label').notNull(),
        intro: text('intro').notNull(),
        sections: jsonb('sections').$type<ContentSection[]>().notNull(),
        tags: text('tags').array().notNull(),
        readTime: text('read_time'),
        takeaway: text('takeaway'),
        facts: text('facts').array(),
        outcome: text('outcome'),
        createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
        updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
        publishedAt: timestamp('published_at', { withTimezone: true })
    },
    (table) => [
        check('content_entries_type_check', sql`${table.type} in ('blog', 'project')`),
        check('content_entries_status_check', sql`${table.status} in ('draft', 'published')`),
        unique('content_entries_type_slug_unique').on(table.type, table.slug)
    ]
);

export type ContentEntry = typeof contentEntries.$inferSelect;
export type NewContentEntry = typeof contentEntries.$inferInsert;
