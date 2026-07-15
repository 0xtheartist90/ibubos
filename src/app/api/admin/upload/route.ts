import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

import { hasAdminSession } from '@/lib/admin/auth';
import { getUploadError } from '@/lib/admin/upload';

export const runtime = 'nodejs';

const extensions: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
};

const safeName = (file: File) => {
    const base = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9._-]/g, '-').slice(0, 60) || 'afbeelding';
    const suffix = randomUUID().slice(0, 8);

    return `${base}-${suffix}.${extensions[file.type] ?? 'jpg'}`;
};

export async function POST(request: Request) {
    if (!(await hasAdminSession())) {
        return NextResponse.json({ error: 'Niet geautoriseerd.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
        return NextResponse.json({ error: 'Kies eerst een afbeelding.' }, { status: 400 });
    }

    const uploadError = getUploadError(file);
    if (uploadError === 'unsupported-type') {
        return NextResponse.json({ error: 'Gebruik een JPG, PNG of WebP-afbeelding.' }, { status: 400 });
    }
    if (uploadError === 'too-large') {
        return NextResponse.json({ error: 'De afbeelding mag maximaal 4,5 MB zijn.' }, { status: 400 });
    }

    // Met een Blob-token (productie op Vercel) gaat de foto naar Vercel Blob.
    if (process.env.BLOB_READ_WRITE_TOKEN) {
        try {
            const blob = await put(`admin-images/${safeName(file)}`, file, {
                access: 'public',
                addRandomSuffix: false
            });

            return NextResponse.json({ url: blob.url });
        } catch (error) {
            console.error('Blob upload mislukt:', error);

            return NextResponse.json({ error: 'Uploaden naar de opslag mislukte. Probeer het opnieuw.' }, { status: 502 });
        }
    }

    // Zonder token (lokaal / zelf gehost) schrijven we naar public/images/uploads.
    // Vercel heeft een alleen-lezen bestandssysteem, dus daar is dit geen optie.
    if (process.env.VERCEL) {
        return NextResponse.json(
            { error: 'Uploads zijn nog niet ingesteld. Koppel een Vercel Blob-store en voeg BLOB_READ_WRITE_TOKEN toe.' },
            { status: 503 }
        );
    }

    try {
        const filename = safeName(file);
        const directory = join(process.cwd(), 'public', 'images', 'uploads');
        await mkdir(directory, { recursive: true });
        await writeFile(join(directory, filename), Buffer.from(await file.arrayBuffer()));

        return NextResponse.json({ url: `/images/uploads/${filename}` });
    } catch (error) {
        console.error('Lokale upload mislukt:', error);

        return NextResponse.json({ error: 'Opslaan van de afbeelding mislukte. Probeer het opnieuw.' }, { status: 502 });
    }
}
