import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema.ts';

type Database = ReturnType<typeof drizzle<typeof schema>>;

let database: Database | null = null;

export const isDatabaseConfigured = () => Boolean(process.env.DATABASE_URL?.trim());

export const getDb = (): Database | null => {
    const databaseUrl = process.env.DATABASE_URL?.trim();

    if (!databaseUrl) {
        return null;
    }

    if (!database) {
        database = drizzle(neon(databaseUrl), { schema });
    }

    return database;
};
