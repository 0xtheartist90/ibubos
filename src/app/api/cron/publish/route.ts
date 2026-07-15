import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { ContentSetupError, publishDueContent } from '@/lib/content/repository';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Alles dat gepland staat voor vandaag (Amsterdamse tijd) of eerder is aan de beurt.
const dueCutoff = () => {
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(new Date());

    return new Date(`${today}T23:59:59Z`);
};

export async function GET(request: Request) {
    const secret = process.env.CRON_SECRET;
    if (!secret) {
        return NextResponse.json({ error: 'CRON_SECRET ontbreekt in de omgeving.' }, { status: 503 });
    }
    if (request.headers.get('authorization') !== `Bearer ${secret}`) {
        return NextResponse.json({ error: 'Niet geautoriseerd.' }, { status: 401 });
    }

    try {
        const published = await publishDueContent(dueCutoff());

        if (published.length) {
            revalidatePath('/');
            revalidatePath('/blogs', 'layout');
            revalidatePath('/projecten', 'layout');
        }

        return NextResponse.json({
            published: published.map((item) => ({ type: item.type, slug: item.slug, title: item.title }))
        });
    } catch (error) {
        if (error instanceof ContentSetupError) {
            return NextResponse.json({ error: error.message }, { status: 503 });
        }
        throw error;
    }
}
