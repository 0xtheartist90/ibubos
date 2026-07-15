import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

import { hasAdminSession } from '@/lib/admin/auth';
import { getUploadError } from '@/lib/admin/upload';

export const runtime = 'nodejs';

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

    const filename = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const blob = await put(`admin-images/${filename}`, file, {
        access: 'public',
        addRandomSuffix: true
    });

    return NextResponse.json({ url: blob.url });
}
