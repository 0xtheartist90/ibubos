type PublishedTagged = {
    slug: string;
    tags: string[];
    publishedAt: Date | null;
};

const publicationTime = (item: PublishedTagged) => item.publishedAt?.getTime() ?? 0;

export const orderPublished = <T extends PublishedTagged>(items: T[]) =>
    [...items].sort((a, b) => publicationTime(b) - publicationTime(a) || a.slug.localeCompare(b.slug));

export const rankRelated = <T extends PublishedTagged>(
    items: T[],
    tags: string[],
    excludedSlug: string,
    limit: number
) =>
    items
        .filter((item) => item.slug !== excludedSlug)
        .map((item) => ({
            item,
            score: item.tags.filter((tag) => tags.includes(tag)).length
        }))
        .sort(
            (a, b) =>
                b.score - a.score ||
                publicationTime(b.item) - publicationTime(a.item) ||
                a.item.slug.localeCompare(b.item.slug)
        )
        .slice(0, limit)
        .map(({ item }) => item);

