import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';

import ProjectCard from '@/components/content/ProjectCard';
import { featuredProject, projects } from '@/lib/content';

export const metadata: Metadata = {
    title: 'Projecten | Ibu Bos',
    description: 'Projecten en praktijkvoorbeelden van Ibu Bos rond co-creatie, veerkracht en lokale waarde.'
};

const ProjectenPage = () => {
    return (
        <main className='archive-page font-brand text-[#15583B]'>
            <section className='archive-hero archive-hero--projects bg-[#FDF5E2] px-5 pb-12 pt-32 sm:px-8 sm:pb-16 sm:pt-36 lg:px-10'>
                <div className='archive-hero__grid archive-hero__grid--reverse mx-auto max-w-7xl'>
                    <Link href={`/projecten/${featuredProject.slug}`} className='archive-feature'>
                        <Image
                            src={featuredProject.image}
                            alt={featuredProject.title}
                            width={2500}
                            height={1667}
                            sizes='(max-width: 1024px) 100vw, 52vw'
                            className='archive-feature__image'
                            priority
                        />
                        <span className='archive-feature__caption'>
                            <span>{featuredProject.label}</span>
                            <strong>{featuredProject.title}</strong>
                            <em>Bekijk project</em>
                        </span>
                    </Link>
                    <div className='archive-hero__copy'>
                        <div className='archive-hero__eyebrow'>
                            <span>02</span>
                            <p className='section-kicker'>Projecten & praktijk</p>
                        </div>
                        <h1>Praktijk&shy;voorbeelden van co-creatie.</h1>
                        <p className='archive-hero__intro'>
                            Een groeiend overzicht van trajecten waarin Ibu Bos samen met partners werkt aan
                            duurzame ontwikkeling, zelforganisatie en inclusieve groei.
                        </p>
                        <Link href={`/projecten/${featuredProject.slug}`} className='archive-hero__link'>
                            Ontdek het uitgelichte project
                            <ArrowUpRight aria-hidden />
                        </Link>
                    </div>
                </div>
            </section>

            <section className='bg-[#FDF5E2] px-5 pb-14 sm:px-8 sm:pb-24 lg:px-10'>
                <div className='mx-auto grid max-w-7xl gap-7 lg:grid-cols-2'>
                    {projects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default ProjectenPage;
