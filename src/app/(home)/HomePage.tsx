import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowUpRight,
    Compass,
    Handshake,
    Leaf,
    Mail,
    Map,
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
        icon: Map,
        title: 'Integrale gebiedsontwikkeling',
        text: 'Masterplan Zuidoost · Arenapoort · G-Buurt Moving Forward'
    },
    {
        icon: Leaf,
        title: 'Energie & duurzaamheids-transities',
        text: 'Gebiedsgericht SLIM · Energie van Utrecht · Donut Economie'
    },
    {
        icon: UsersRound,
        title: 'Sociale innovatie, participatie & democratisering',
        text: 'Living Labs · buurtplatformen · fieldlabs · participatieverordening'
    },
    {
        icon: Compass,
        title: 'Circulaire economie & lokaal ondernemen',
        text: '2PING (lokale munt) · Donut Deals · Meer Ondernemen'
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
                    <source src='/images/homehero.webm' type='video/webm' />
                </video>
                <div className='absolute inset-0 bg-[#E88A32]/18' />
                <div className='hero-reveal relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-between px-5 pb-16 pt-28 text-center sm:px-8 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-24'>
                    <Image
                        src='/images/Logo.webp'
                        alt='Ibu Bos logo'
                        width={540}
                        height={540}
                        priority
                        className='h-56 w-56 drop-shadow-[0_2px_18px_rgba(0,0,0,0.28)] sm:h-64 sm:w-64 lg:h-72 lg:w-72'
                    />
                    <p className='max-w-2xl text-xl font-bold leading-8 text-[#FDF5E2] drop-shadow-[0_2px_18px_rgba(0,0,0,0.28)] sm:text-2xl'>
                        Bouwt aan veerkrachtige steden, wijken en organisaties. Voor duurzame ontwikkeling,
                        zelforganisatie en inclusieve groei.
                    </p>
                </div>
            </section>

            <section id='over' className='bg-[#FDF5E2] px-5 py-12 sm:px-8 sm:py-20 lg:px-10'>
                <div className='mx-auto grid max-w-7xl gap-8 sm:gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center'>
                    <div className='max-w-2xl'>
                        <p className='section-kicker'>Over Maartje Bos</p>
                        <h2 className='mt-3 max-w-xl text-3xl font-extrabold leading-tight sm:mt-4 sm:text-6xl'>
                            Groei begint bij het zien van veerkracht.
                        </h2>
                        <div className='mt-5 space-y-4 text-base leading-7 sm:mt-8 sm:space-y-6 sm:text-xl sm:leading-8'>
                            <p>
                                Maartje richtte Ibu Bos op in 2016, vanuit een diep verlangen naar een inclusieve,
                                duurzame en innovatieve samenleving.
                            </p>
                            <p className='border-l-4 border-[#E88A32] pl-4 font-bold italic'>
                                “Een stad waar niet je afkomst of je milieu bepaalt wat je kunt bijdragen, maar wat
                                je als mens te bieden hebt.”
                            </p>
                            <p>
                                Al 19 jaar werkt ze aan sociale en duurzame transities, democratisering,
                                zelforganisatie en integrale gebiedsontwikkeling. Ze navigeert moeiteloos tussen
                                overheid, bewoners, maatschappelijke organisaties, bedrijven en kennisinstellingen.
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
                                Vier expertisegebieden.
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

            <section aria-label='Projecten in beeld' className='full-bleed-media'>
                <Image
                    src='/images/projectenhero.webp'
                    alt=''
                    width={2688}
                    height={1536}
                    sizes='100vw'
                    className='full-bleed-media__image'
                />
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

            <section aria-label='Blogs in beeld' className='full-bleed-media'>
                <Image
                    src='/images/blogshero.webp'
                    alt=''
                    width={2688}
                    height={1536}
                    sizes='100vw'
                    className='full-bleed-media__image'
                />
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
