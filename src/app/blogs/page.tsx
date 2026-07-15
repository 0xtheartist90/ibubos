import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';

import BlogCard from '@/components/content/BlogCard';
import { blogPosts, featuredBlog, getPaginatedItems } from '@/lib/content';

export const metadata: Metadata = {
    title: 'Blogs | Ibu Bos',
    description: 'Blogs en inzichten van Ibu Bos over co-creatie, veerkracht en inclusieve groei.'
};

type BlogsPageProps = {
    searchParams: Promise<{ page?: string }>;
};

const BlogsPage = async ({ searchParams }: BlogsPageProps) => {
    const { page } = await searchParams;
    const requestedPage = Number.parseInt(page ?? '1', 10);
    const { items, currentPage, totalPages } = getPaginatedItems(blogPosts, requestedPage, 3);

    return (
        <main className='archive-page font-brand text-[#15583B]'>
            <section className='archive-hero archive-hero--blogs bg-[#FDF5E2] px-5 pb-12 pt-32 sm:px-8 sm:pb-16 sm:pt-36 lg:px-10'>
                <div className='archive-hero__grid mx-auto max-w-7xl'>
                    <div className='archive-hero__copy'>
                        <div className='archive-hero__eyebrow'>
                            <span>01</span>
                            <p className='section-kicker'>Blogs & inzichten</p>
                        </div>
                        <h1>Inzichten over veerkrachtige verandering.</h1>
                        <p className='archive-hero__intro'>
                            Hier verzamelt Ibu Bos observaties, lessen en perspectieven over co-creatie,
                            zelforganisatie, inclusieve groei en het bouwen aan veerkrachtige steden.
                        </p>
                        <Link href={`/blogs/${featuredBlog.slug}`} className='archive-hero__link'>
                            Lees het uitgelichte verhaal
                            <ArrowUpRight aria-hidden />
                        </Link>
                    </div>
                    <Link href={`/blogs/${featuredBlog.slug}`} className='archive-feature'>
                        <Image
                            src={featuredBlog.image}
                            alt={featuredBlog.title}
                            width={2500}
                            height={1667}
                            sizes='(max-width: 1024px) 100vw, 52vw'
                            className='archive-feature__image'
                            priority
                        />
                        <span className='archive-feature__caption'>
                            <span>{featuredBlog.label}</span>
                            <strong>{featuredBlog.title}</strong>
                            <em>{featuredBlog.readTime}</em>
                        </span>
                    </Link>
                </div>
            </section>

            <section className='texture-section px-5 py-12 text-[#FDF5E2] sm:px-8 sm:py-20 lg:px-10'>
                <div className='mx-auto grid max-w-7xl gap-6 md:grid-cols-3'>
                    {items.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </div>
                <nav className='pagination mx-auto max-w-7xl' aria-label='Blogpagina’s'>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                        <Link
                            key={pageNumber}
                            href={pageNumber === 1 ? '/blogs' : `/blogs?page=${pageNumber}`}
                            aria-current={pageNumber === currentPage ? 'page' : undefined}
                        >
                            {pageNumber}
                        </Link>
                    ))}
                </nav>
            </section>
        </main>
    );
};

export default BlogsPage;
