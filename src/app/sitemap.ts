import type { MetadataRoute } from 'next';

import { listPublishedBlogs, listPublishedProjects } from '@/lib/content/repository';
import { siteUrl } from '@/lib/site';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
    const [blogs, projects] = await Promise.all([listPublishedBlogs(), listPublishedProjects()]);

    return [
        { url: siteUrl, changeFrequency: 'weekly', priority: 1 },
        { url: `${siteUrl}/projecten`, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${siteUrl}/blogs`, changeFrequency: 'weekly', priority: 0.9 },
        ...projects.map((project) => ({
            url: `${siteUrl}/projecten/${project.slug}`,
            changeFrequency: 'monthly' as const,
            priority: 0.7
        })),
        ...blogs.map((blog) => ({
            url: `${siteUrl}/blogs/${blog.slug}`,
            changeFrequency: 'monthly' as const,
            priority: 0.7
        }))
    ];
};

export default sitemap;
