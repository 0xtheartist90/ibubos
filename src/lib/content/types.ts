export type ContentType = 'blog' | 'project';
export type ContentStatus = 'draft' | 'published';

export type ContentSection = {
    heading: string;
    body: string;
};

export type ContentRecord = {
    id: string;
    type: ContentType;
    status: ContentStatus;
    slug: string;
    title: string;
    description: string;
    image: string;
    label: string;
    intro: string;
    sections: ContentSection[];
    tags: string[];
    readTime: string | null;
    takeaway: string | null;
    facts: string[] | null;
    outcome: string | null;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date | null;
    plannedAt: Date | null;
};

export type ContentDraft = Omit<ContentRecord, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt'> & {
    publishedAt?: Date | null;
};

