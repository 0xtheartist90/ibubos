import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowUpRight,
    Compass,
    Handshake,
    Leaf,
    Mail,
    Map,
    Mic2,
    Phone,
    Sparkles,
    Sprout,
    Target,
    UsersRound
} from 'lucide-react';

import { getFeaturedBlog } from '@/lib/content/repository';

const processSteps = ['Verkennen', 'Verbinden', 'Formeren', 'Creeren', 'Verduurzamen'];

const marqueeImages = [
    { src: '/images/Marquee/ibu1.webp', width: 1620, height: 1080 },
    { src: '/images/Marquee/ibu2.webp', width: 1604, height: 1080 },
    { src: '/images/Marquee/ibu3.webp', width: 1620, height: 1080 },
    { src: '/images/Marquee/ibu4.webp', width: 1620, height: 1080 },
    { src: '/images/Marquee/ibu5.webp', width: 1620, height: 1080 },
    { src: '/images/Marquee/ibu6.webp', width: 1620, height: 1080 },
    { src: '/images/Marquee/ibu7.webp', width: 1620, height: 1080 }
];

const services = [
    {
        icon: Compass,
        title: 'Programma ontwikkeling',
        text: 'Van vraagstuk naar gedragen richting, met ruimte voor complexiteit.'
    },
    {
        icon: UsersRound,
        title: 'Co-creatie en facilitering',
        text: 'Sessies waarin groepen elkaar vinden en scherpe keuzes kunnen maken.'
    },
    {
        icon: Leaf,
        title: 'Veerkrachtstrategie',
        text: 'Analyse, prioriteiten en concrete stappen voor duurzame inbedding.'
    }
];

const expectations = [
    { icon: Compass, text: 'Scherpe vragen' },
    { icon: Sparkles, text: 'Speelse energie' },
    { icon: Target, text: 'Strategie naar actie' }
];

const resilienceThemes = [
    { icon: Handshake, text: 'Sterke samenwerkingsverbanden' },
    { icon: Sprout, text: 'Living labs voor innovatie' },
    { icon: Map, text: 'Veerkrachtanalyse en implementatie' }
];

const HomePage = async () => {
    const featuredBlog = await getFeaturedBlog();

return (
        <main className='font-brand text-brand-green'>
            <section id='home' className='relative min-h-screen overflow-hidden bg-[#FDF5E2]'>
                <video
                    className='absolute inset-0 h-full w-full object-cover object-center'
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label='Ibu Bos hero video'>
                    <source src='/images/Hero3.webm' type='video/webm' />
                </video>
                <div className='absolute inset-0 bg-[#E88A32]/18' />
                <div className='relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-5 pb-8 pt-28 text-center sm:px-8 lg:px-10'>
                    <div className='flex max-w-4xl flex-col items-center text-[#FDF5E2] drop-shadow-[0_2px_18px_rgba(0,0,0,0.28)]'>
                        <Image
                            src='/images/Logo.webp'
                            alt='Ibu Bos logo'
                            width={540}
                            height={540}
                            priority
                            className='mb-5 h-64 w-64 sm:h-80 sm:w-80 lg:h-[27rem] lg:w-[27rem]'
                        />
                        <p className='max-w-2xl text-xl font-bold leading-8 text-[#FDF5E2] sm:text-2xl'>
                            Voor duurzame ontwikkeling, zelforganisatie en inclusieve groei. Samen bouwen we aan
                            veerkrachtige steden voor de 21e eeuw.
                        </p>
                    </div>
                </div>
            </section>

            <section id='over' className='bg-[#FDF5E2] px-5 py-12 sm:px-8 sm:py-20 lg:px-10'>
                <div className='mx-auto grid max-w-7xl gap-8 sm:gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center'>
                    <div className='max-w-2xl'>
                        <p className='section-kicker'>Over Ibu Bos</p>
                        <h2 className='mt-3 max-w-xl text-3xl font-extrabold leading-tight sm:mt-4 sm:text-6xl'>
                            Groei begint bij wat mensen te bieden hebben.
                        </h2>
                        <div className='mt-5 space-y-4 text-base leading-7 sm:mt-8 sm:space-y-6 sm:text-xl sm:leading-8'>
                            <p>
                                Ibu Bos is ontstaan uit het verlangen van pionier, co-creator en community bouwer
                                Maartje Bos naar een veerkrachtige samenleving waar ieders waarde zichtbaar wordt.
                            </p>
                            <p>
                                Ibu betekent groei in het Igbo. In het Indonesisch betekent Ibu moeder en krachtige
                                vrouw: precies de combinatie van bedding, beweging en moed die in het werk centraal
                                staat.
                            </p>
                        </div>
                    </div>
                    <aside className='editorial-aside'>
                        <Image
                            src='/images/over%20ibu.webp'
                            alt='Maartje Bos van Ibu Bos'
                            width={2500}
                            height={1667}
                            sizes='(max-width: 1024px) 100vw, 42vw'
                            className='editorial-image'
                        />
                    </aside>
                </div>
            </section>

            <section id='werkwijze' className='texture-section px-5 py-12 text-[#FDF5E2] sm:px-8 sm:py-20 lg:px-10'>
                <div className='mx-auto max-w-7xl'>
                    <div className='grid gap-8 sm:gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center'>
                        <div className='process-orbit' aria-label='Vijf fasen van de co-creatieve aanpak'>
                            <div className='process-orbit__core'>
                                <span>Co-creatie</span>
                                <strong>van vraag naar verandering</strong>
                            </div>
                            <div className='process-orbit__steps'>
                                {processSteps.map((step, index) => (
                                    <div key={step} className='process-orbit__step'>
                                        <span>0{index + 1}</span>
                                        <h3>{step}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='process-copy max-w-3xl'>
                            <p className='section-kicker text-[#FDF5E2]/80'>De co-creatieve aanpak</p>
                            <h2 className='mt-3 text-3xl font-extrabold leading-tight sm:mt-4 sm:text-5xl'>
                                Van eerste vraag naar gedragen verandering.
                            </h2>
                            <p className='mt-4 text-base leading-7 text-[#FDF5E2]/90 sm:mt-6 sm:text-xl sm:leading-8'>
                                Ibu Bos helpt teams, wijken, dorpen en steden om samen te werken aan wat ertoe doet.
                                Met waarderende vragen, heldere structuur en ruimte voor de spanning die bij echte
                                verandering hoort.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section aria-label='Ibu Bos fotogalerij' className='overflow-hidden bg-[#FDF5E2] py-0'>
                <div className='marquee-track'>
                    {[...marqueeImages, ...marqueeImages].map((image, index) => (
                        <Image
                            key={`${image.src}-${index}`}
                            src={image.src}
                            alt=''
                            width={image.width}
                            height={image.height}
                            sizes='(max-width: 768px) 78vw, 34vw'
                            className='marquee-image'
                        />
                    ))}
                </div>
            </section>

            <section id='aanbod' className='bg-[#FDF5E2] px-5 py-12 sm:px-8 sm:py-20 lg:px-10'>
                <div className='mx-auto max-w-7xl'>
                    <div className='grid gap-6 sm:gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end'>
                        <div>
                            <p className='section-kicker'>Werk met mij</p>
                            <h2 className='mt-3 text-3xl font-extrabold leading-tight sm:mt-4 sm:text-6xl'>
                                Programma ontwikkeling, facilitering en veerkrachtstrategie.
                            </h2>
                        </div>
                        <div className='space-y-4 text-base leading-7 sm:space-y-6 sm:text-xl sm:leading-8'>
                            <p>
                                Zoek je verdieping, een vernieuwende way of working of de volgende stap met je team?
                                Maartje levert aanbod op maat en training in company.
                            </p>
                            <div className='flex flex-wrap gap-3'>
                                {expectations.map((expectation) => {
                                    const Icon = expectation.icon;

                                    return (
                                        <span key={expectation.text} className='icon-chip'>
                                            <Icon aria-hidden className='h-4 w-4' />
                                            {expectation.text}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className='mt-8 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch'>
                        <div className='service-composition'>
                            {services.map((service) => {
                                const Icon = service.icon;

                                return (
                                    <div key={service.title} className='icon-panel'>
                                        <Icon aria-hidden className='h-7 w-7 text-[#E88A32]' />
                                        <h3>{service.title}</h3>
                                        <p>{service.text}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <Image
                            src='/images/teammoment.webp'
                            alt='Ibu Bos teammoment'
                            width={2500}
                            height={1667}
                            sizes='(max-width: 1024px) 100vw, 42vw'
                            className='editorial-image mobile-compact-image'
                        />
                    </div>
                </div>
            </section>

            <section id='resilient-cities' className='texture-section texture-section--flipped px-5 py-12 text-[#FDF5E2] sm:px-8 sm:py-20 lg:px-10'>
                <div className='mx-auto grid max-w-7xl gap-8 sm:gap-14 lg:grid-cols-[1fr_1fr] lg:items-center'>
                    <div className='space-y-5 sm:space-y-7'>
                        <Image
                            src='/images/Resilient%20cities.webp'
                            alt='Resilient cities'
                            width={1920}
                            height={1080}
                            sizes='(max-width: 1024px) 100vw, 48vw'
                            className='editorial-image editorial-image--wide'
                        />
                        <p className='max-w-xl text-base leading-7 sm:text-xl sm:leading-8'>
                            Sta je aan het begin van een samenwerking, heb je een maatschappelijk vraagstuk of wil je
                            een living lab bouwen? Ibu Bos helpt bij analyse, strategie en duurzame inbedding.
                        </p>
                    </div>
                    <div>
                        <p className='section-kicker text-[#FDF5E2]/80'>Resilient cities</p>
                        <h2 className='mt-3 text-3xl font-extrabold leading-tight sm:mt-4 sm:text-6xl'>
                            Klaar zijn voor de kansen en uitdagingen van de toekomst.
                        </h2>
                        <div className='mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4 lg:grid-cols-1'>
                            {resilienceThemes.map((theme) => {
                                const Icon = theme.icon;

                                return (
                                    <div key={theme.text} className='texture-icon-row'>
                                        <Icon aria-hidden className='h-5 w-5 text-[#E88A32]' />
                                        <span>{theme.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <Link href='/projecten' className='brand-button mt-7 sm:mt-9'>
                            Bekijk onze projecten
                            <ArrowUpRight aria-hidden className='ml-2 h-5 w-5' />
                        </Link>
                    </div>
                </div>
            </section>

            <section id='projecten' className='bg-[#FDF5E2] px-5 py-12 sm:px-8 sm:py-20 lg:px-10'>
                <div className='mx-auto grid max-w-7xl gap-8 sm:gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center'>
                    <div className='project-media'>
                        <Image
                            src='/images/lokaalgeld.webp'
                            alt='Lokaal Geld Zuidoost'
                            width={2500}
                            height={1667}
                            sizes='(max-width: 1024px) 100vw, 52vw'
                            className='editorial-image'
                        />
                    </div>
                    <div className='space-y-4 sm:space-y-6'>
                        <p className='section-kicker'>Recent project</p>
                        <h2 className='mt-3 text-3xl font-extrabold leading-tight sm:mt-4 sm:text-6xl'>
                            Lokaal Geld Zuidoost laat zien hoe co-creatie waarde vasthoudt in de community.
                        </h2>
                        <p className='text-base leading-7 sm:text-xl sm:leading-8'>
                            Vanuit de behoefte om te onderzoeken hoe meer waarde in de community kan blijven, bouwde
                            Ibu Bos met partners een consortium op en schreef een manifest rond gedeelde waarden en een
                            gezamenlijk droombeeld.
                        </p>
                        <a
                            className='podcast-note'
                            href='https://open.spotify.com/episode/1nYkOz5Y4Daz45F6ktqFYD?si=BHSynye4SMeUYt_RLLrVcg&dl_branch=1&nd=1'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label='Luister naar de podcast over Lokaal Geld Zuidoost op Spotify'
                        >
                            <Mic2 aria-hidden className='h-6 w-6' />
                            Interesse in deze aanpak? Luister naar de podcast en de lessen uit het project.
                        </a>
                    </div>
                </div>
            </section>

            <section id='uitgelichte-blog' className='featured-blog texture-section px-5 py-12 text-[#FDF5E2] sm:px-8 sm:py-20 lg:px-10'>
                <div className='featured-blog__layout mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center'>
                    <div className='featured-blog__copy'>
                        <div className='featured-blog__meta'>
                            <span>{featuredBlog.label}</span>
                        </div>
                        <p className='section-kicker'>Uitgelichte blog</p>
                        <h2>{featuredBlog.title}</h2>
                        <p className='featured-blog__description'>{featuredBlog.description}</p>
                        <div className='featured-blog__actions'>
                            <Link href={`/blogs/${featuredBlog.slug}`} className='brand-button'>
                                Lees het artikel
                                <ArrowUpRight aria-hidden className='ml-2 h-5 w-5' />
                            </Link>
                            <Link href='/blogs' className='featured-blog__archive-link'>
                                Bekijk alle blogs
                            </Link>
                        </div>
                    </div>
                    <Link href={`/blogs/${featuredBlog.slug}`} className='featured-blog__media'>
                        <Image
                            src={featuredBlog.image}
                            alt={featuredBlog.title}
                            width={2500}
                            height={1667}
                            sizes='(max-width: 1024px) 100vw, 55vw'
                        />
                        <span className='featured-blog__media-label'>Lees verder</span>
                        <ArrowUpRight aria-hidden />
                    </Link>
                </div>
            </section>

            <section id='contact' className='contact-section bg-[#FDF5E2] px-5 py-12 text-[#15583B] sm:px-8 sm:py-16 lg:px-10'>
                <div className='mx-auto grid max-w-7xl gap-8 sm:gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center'>
                    <div>
                        <p className='section-kicker'>Contact</p>
                        <h2 className='mt-3 text-3xl font-extrabold leading-tight sm:text-6xl'>
                            Zullen we samen kijken wat er nodig is?
                        </h2>
                        <p className='mt-4 max-w-xl text-base leading-7 sm:mt-5 sm:text-xl sm:leading-8'>
                            Wil je sparren over een samenwerking, training of vraagstuk? Stuur een bericht en Maartje
                            neemt contact met je op.
                        </p>
                        <div className='mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row'>
                            <a className='brand-button' href='mailto:maartje@ibubos.nl'>
                                <Mail aria-hidden className='mr-2 h-5 w-5' />
                                Mail Maartje
                            </a>
                            <a className='brand-button brand-button--outline' href='tel:+31619039645'>
                                <Phone aria-hidden className='mr-2 h-5 w-5' />
                                Bel direct
                            </a>
                        </div>
                    </div>
                    <div className='contact-media'>
                        <Image
                            src='/images/cocreatieveaanpak.webp'
                            alt='Co-creatieve aanpak sessie'
                            width={2688}
                            height={1536}
                            sizes='(max-width: 1024px) 100vw, 48vw'
                            className='editorial-image editorial-image--wide'
                        />
                    </div>
                </div>
            </section>

        </main>
    );
};

export default HomePage;
