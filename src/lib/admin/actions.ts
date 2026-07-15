'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { del } from '@vercel/blob';

import { requireAdmin } from './auth';
import { isBlobImageUrl } from './upload';
import {
    countImageReferences,
    createContent,
    deleteContent,
    findContentBySlug,
    getAdminContent,
    setContentStatus,
    updateContent
} from '../content/repository';
import type { ContentType } from '../content/types';
import { normalizeContentInput } from '../content/validation';

const value = (formData: FormData, name: string) => String(formData.get(name) ?? '').trim();
const lines = (input: string) => input.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);

const parseForm = (type: ContentType, formData: FormData) => {
    const sections = [1, 2, 3, 4]
        .map((index) => ({
            heading: value(formData, `sectionHeading${index}`),
            body: value(formData, `sectionBody${index}`)
        }))
        .filter((section) => section.heading || section.body);
    const common = {
        title: value(formData, 'title'),
        slug: value(formData, 'slug') || undefined,
        description: value(formData, 'summary'),
        image: value(formData, 'image'),
        label: value(formData, 'label'),
        intro: value(formData, 'summary'),
        sections,
        tags: [value(formData, 'label')],
        plannedAt: value(formData, 'plannedAt') || undefined
    };

    return type === 'blog'
        ? { ...common, takeaway: value(formData, 'takeaway') }
        : { ...common, facts: lines(value(formData, 'facts')), outcome: value(formData, 'outcome') };
};

const removeOrphanedImage = async (image: string | null | undefined, excludedId: string) => {
    if (!image || !isBlobImageUrl(image)) return;
    try {
        if ((await countImageReferences(image, excludedId)) === 0) await del(image);
    } catch {
        // Opruimen van blobs mag opslaan of verwijderen nooit blokkeren.
    }
};

const refreshType = (type: ContentType) => {
    revalidatePath('/');
    revalidatePath(type === 'blog' ? '/blogs' : '/projecten', 'layout');
};

export const saveContentAction = async (type: ContentType, id: string | null, formData: FormData) => {
    await requireAdmin();
    const existing = id ? await getAdminContent(id) : undefined;
    let draft;
    try {
        draft = normalizeContentInput(type, parseForm(type, formData), existing);
    } catch {
        redirect(`/admin/${type === 'blog' ? 'blogs' : 'projecten'}/${id ?? 'new'}?error=validation`);
    }
    if (await findContentBySlug(type, draft.slug, id ?? undefined)) {
        redirect(`/admin/${type === 'blog' ? 'blogs' : 'projecten'}/${id ?? 'new'}?error=slug`);
    }

    const item = id ? await updateContent(id, draft) : await createContent(draft);
    if (!item) throw new Error('De content kon niet worden opgeslagen.');
    if (id && existing && existing.image !== item.image) await removeOrphanedImage(existing.image, id);
    refreshType(type);
    redirect(`/admin/${type === 'blog' ? 'blogs' : 'projecten'}/${item.id}?saved=1`);
};

export const publishContentAction = async (type: ContentType, id: string) => {
    await requireAdmin();
    await setContentStatus(id, 'published');
    refreshType(type);
    redirect(`/admin/${type === 'blog' ? 'blogs' : 'projecten'}/${id}?published=1`);
};

export const unpublishContentAction = async (type: ContentType, id: string) => {
    await requireAdmin();
    await setContentStatus(id, 'draft');
    refreshType(type);
    redirect(`/admin/${type === 'blog' ? 'blogs' : 'projecten'}/${id}?saved=1`);
};

export const deleteContentAction = async (type: ContentType, id: string, formData: FormData) => {
    await requireAdmin();
    if (formData.get('confirm') !== 'yes') return;
    const removed = await deleteContent(id);
    await removeOrphanedImage(removed?.image, id);
    refreshType(type);
    redirect(`/admin/${type === 'blog' ? 'blogs' : 'projecten'}`);
};
