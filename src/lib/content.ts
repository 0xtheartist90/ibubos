export type ContentSection = {
    heading: string;
    body: string;
};

export type BlogPost = {
    slug: string;
    title: string;
    description: string;
    image: string;
    label: string;
    readTime: string;
    intro: string;
    sections: ContentSection[];
    takeaway: string;
    tags: string[];
};

export type Project = {
    slug: string;
    title: string;
    description: string;
    image: string;
    label: string;
    intro: string;
    facts: string[];
    sections: ContentSection[];
    outcome: string;
    tags: string[];
};

export const blogPosts: BlogPost[] = [
    {
        slug: 'veerkracht-begint-bij-mensen',
        title: 'Veerkracht begint bij mensen',
        description:
            'Reflecties over zelforganisatie, community building en de zachte infrastructuur die steden toekomstbestendig maakt.',
        image: '/images/over%20ibu.webp',
        label: 'Reflectie',
        readTime: '4 min lezen',
        intro:
            'Een veerkrachtige stad ontstaat niet alleen door beleid, gebouwen of programma’s. Ze ontstaat wanneer mensen zich gezien voelen, hun waarde kunnen toevoegen en samen verantwoordelijkheid durven dragen.',
        sections: [
            {
                heading: 'Van systeemtaal naar mensentaal',
                body:
                    'In complexe vraagstukken is de verleiding groot om te beginnen met structuren, rollen en plannen. Ibu Bos begint bij de mensen in het systeem: wat zij zien, dragen, missen en kunnen bijdragen.'
            },
            {
                heading: 'Veerkracht vraagt bedding',
                body:
                    'Zelforganisatie ontstaat niet vanzelf. Groepen hebben veiligheid, ritme en heldere afspraken nodig om spanning productief te maken en niet te vermijden.'
            },
            {
                heading: 'Waarde zichtbaar maken',
                body:
                    'Inclusieve groei begint wanneer verschillende vormen van kennis worden erkend: professionele kennis, ervaringskennis, lokale wijsheid en creatieve verbeelding.'
            }
        ],
        takeaway:
            'De belangrijkste vraag is niet alleen wat er moet gebeuren, maar wie er nodig is om het op een gedragen manier mogelijk te maken.',
        tags: ['veerkracht', 'mensen', 'community']
    },
    {
        slug: 'co-creatie-zonder-schijnparticipatie',
        title: 'Co-creatie zonder schijnparticipatie',
        description:
            'Over hoe je echte samenwerking organiseert, ook wanneer belangen, spanning en tempo verschillen.',
        image: '/images/cocreatieveaanpak.webp',
        label: 'Werkwijze',
        readTime: '6 min lezen',
        intro:
            'Co-creatie is meer dan mensen uitnodigen aan tafel. Het vraagt een proces waarin invloed echt gedeeld wordt en waar spanning niet wordt weggepoetst.',
        sections: [
            {
                heading: 'Begin met verkennen',
                body:
                    'Voordat er oplossingen komen, moet helder worden welke vragen, belangen en onderstromen er leven. Die verkenning voorkomt dat een traject te snel dichtgetimmerd wordt.'
            },
            {
                heading: 'Maak verbinding concreet',
                body:
                    'Verbinding klinkt zacht, maar is praktisch werk: taal vinden, verwachtingen expliciet maken en voorwaarden scheppen om eerlijk mee te doen.'
            },
            {
                heading: 'Van energie naar structuur',
                body:
                    'Een goed co-creatief proces beweegt tussen openheid en focus. Creativiteit krijgt richting wanneer rollen, besluiten en vervolgstappen helder worden.'
            }
        ],
        takeaway:
            'Echte co-creatie vraagt moed: om zeggenschap te delen, verschillen te verdragen en samen te bouwen aan wat nog niet vaststaat.',
        tags: ['co-creatie', 'participatie', 'samenwerking']
    },
    {
        slug: 'van-experiment-naar-duurzame-inbedding',
        title: 'Van experiment naar duurzame inbedding',
        description:
            'Lessen uit projecten waarin lokale waarde, partnerschap en meerjarige verandering samenkomen.',
        image: '/images/lokaalgeld.webp',
        label: 'Projectlessen',
        readTime: '5 min lezen',
        intro:
            'Veel vernieuwende projecten starten met energie, maar stranden wanneer de pilot voorbij is. De kunst is om vanaf het begin na te denken over eigenaarschap, opschaling en inbedding.',
        sections: [
            {
                heading: 'Ontwerp voorbij de pilot',
                body:
                    'Een experiment wordt sterker wanneer er vroeg wordt gekeken naar wat nodig is om het te dragen: partners, middelen, besluitvorming en lokale routines.'
            },
            {
                heading: 'Werk met gedeelde waarden',
                body:
                    'In projecten zoals Lokaal Geld Zuidoost helpt een manifest of gedeeld droombeeld om partners bij elkaar te houden wanneer het complex wordt.'
            },
            {
                heading: 'Verduurzamen is een fase op zich',
                body:
                    'Verduurzaming vraagt aandacht voor meerjarenplanning, overdracht, coaching en het vertalen van experiment naar dagelijkse praktijk.'
            }
        ],
        takeaway:
            'Duurzame verandering ontstaat wanneer innovatie niet naast de praktijk blijft staan, maar onderdeel wordt van lokale structuren.',
        tags: ['verduurzaming', 'innovatie', 'lokale-waarde']
    },
    {
        slug: 'de-kracht-van-de-onderstroom',
        title: 'De kracht van de onderstroom',
        description:
            'Waarom spanningen, twijfel en onuitgesproken belangen waardevolle informatie zijn in ieder veranderproces.',
        image: '/images/teammoment.webp',
        label: 'Facilitatie',
        readTime: '5 min lezen',
        intro:
            'Wat niet wordt uitgesproken, stuurt een samenwerking vaak sterker dan wat wel op de agenda staat. Aandacht voor de onderstroom maakt ruimte voor eerlijkheid en beweging.',
        sections: [
            {
                heading: 'Spanning is informatie',
                body:
                    'Weerstand hoeft geen blokkade te zijn. Vaak laat zij zien waar belangen botsen, vertrouwen ontbreekt of eerdere ervaringen nog doorwerken.'
            },
            {
                heading: 'Maak het bespreekbaar',
                body:
                    'Een facilitator vertraagt waar nodig, stelt vragen zonder oordeel en helpt een groep woorden te geven aan wat tot dan toe alleen voelbaar was.'
            },
            {
                heading: 'Van ongemak naar richting',
                body:
                    'Wanneer verschillen op tafel mogen komen, ontstaat een realistischer beeld van wat de samenwerking nodig heeft om verder te kunnen.'
            }
        ],
        takeaway:
            'De onderstroom verdwijnt niet door haar te negeren; ze wordt juist een bron van richting wanneer een groep haar samen durft te onderzoeken.',
        tags: ['facilitatie', 'samenwerking', 'onderstroom']
    },
    {
        slug: 'inclusieve-groei-in-de-praktijk',
        title: 'Inclusieve groei in de praktijk',
        description:
            'Hoe je ruimte maakt voor verschillende stemmen en voorkomt dat alleen de gebruikelijke perspectieven bepalen wat waardevol is.',
        image: '/images/over%20ibu.webp',
        label: 'Inclusie',
        readTime: '6 min lezen',
        intro:
            'Inclusie is geen losse activiteit aan het einde van een plan. Het begint bij de manier waarop vragen worden geformuleerd, mensen worden uitgenodigd en besluiten worden genomen.',
        sections: [
            {
                heading: 'Kijk wie er ontbreekt',
                body:
                    'Een brede uitnodiging is niet automatisch toegankelijk. Onderzoek welke groepen niet vanzelfsprekend aansluiten en welke drempels daarin een rol spelen.'
            },
            {
                heading: 'Waardeer verschillende kennis',
                body:
                    'Ervaringskennis en lokale wijsheid verdienen een gelijkwaardige plek naast professionele expertise en beleidskennis.'
            },
            {
                heading: 'Deel invloed zichtbaar',
                body:
                    'Maak duidelijk welke keuzes openstaan, wie beslist en hoe bijdragen terugkomen in het vervolg. Dat bouwt vertrouwen en voorkomt participatiemoeheid.'
            }
        ],
        takeaway:
            'Inclusieve groei ontstaat wanneer deelname niet alleen mogelijk is, maar mensen daadwerkelijk invloed ervaren op de richting en het resultaat.',
        tags: ['inclusie', 'participatie', 'community']
    },
    {
        slug: 'van-netwerk-naar-sterk-samenwerkingsverband',
        title: 'Van netwerk naar sterk samenwerkingsverband',
        description:
            'Praktische bouwstenen voor partners die meer willen zijn dan een verzameling goede intenties.',
        image: '/images/cocreatieveaanpak.webp',
        label: 'Samenwerking',
        readTime: '5 min lezen',
        intro:
            'Een netwerk wordt pas een samenwerkingsverband wanneer partners een gedeelde bedoeling vertalen naar duidelijke rollen, ritme en wederzijdse verantwoordelijkheid.',
        sections: [
            {
                heading: 'Begin bij de bedoeling',
                body:
                    'Een gedeeld doel helpt partners om voorbij individuele belangen te kijken. Het moet concreet genoeg zijn om keuzes aan te toetsen en ruim genoeg om mee te bewegen.'
            },
            {
                heading: 'Ontwerp het samenspel',
                body:
                    'Spreek af hoe besluiten vallen, wie welke bijdrage levert en hoe nieuwe partners kunnen aansluiten zonder steeds opnieuw te beginnen.'
            },
            {
                heading: 'Onderhoud de relatie',
                body:
                    'Samenwerking vraagt een vast ritme voor reflectie. Niet alleen de voortgang, maar ook vertrouwen, energie en frictie verdienen aandacht.'
            }
        ],
        takeaway:
            'Sterke samenwerking is geen structuur die je eenmaal tekent, maar een relatie die je doelbewust blijft onderhouden.',
        tags: ['samenwerking', 'co-creatie', 'netwerk']
    },
    {
        slug: 'speelsheid-als-serieuze-veranderkracht',
        title: 'Speelsheid als serieuze veranderkracht',
        description:
            'Waarom creativiteit en gedeeld plezier juist bij complexe maatschappelijke opgaven voor nieuwe ruimte zorgen.',
        image: '/images/Marquee/ibu5.webp',
        label: 'Perspectief',
        readTime: '4 min lezen',
        intro:
            'Wanneer een vraagstuk zwaar voelt, vernauwt vaak ook het denken. Speelsheid helpt groepen om los te komen van vaste patronen zonder de ernst van de opgave te ontkennen.',
        sections: [
            {
                heading: 'Doorbreek het bekende',
                body:
                    'Een onverwachte werkvorm of creatieve vraag maakt zichtbaar welke aannames normaal onbesproken blijven en nodigt uit tot andere perspectieven.'
            },
            {
                heading: 'Bouw gedeelde energie',
                body:
                    'Plezier is niet alleen ontspanning. Samen lachen en maken versterkt relaties en vergroot de bereidheid om ook moeilijke gesprekken te voeren.'
            },
            {
                heading: 'Koppel vrijheid aan focus',
                body:
                    'Speels werken wordt krachtig wanneer experimenten steeds terugverbonden worden aan de bedoeling en leiden tot concrete vervolgstappen.'
            }
        ],
        takeaway:
            'Speelsheid maakt complexiteit niet kleiner, maar vergroot het handelingsvermogen van de mensen die ermee aan de slag gaan.',
        tags: ['facilitatie', 'innovatie', 'samenwerking']
    },
    {
        slug: 'zelforganisatie-vraagt-om-heldere-kaders',
        title: 'Zelforganisatie vraagt om heldere kaders',
        description:
            'Vrijheid en verantwoordelijkheid groeien wanneer een groep precies weet waar ruimte zit en wat gezamenlijk bewaakt wordt.',
        image: '/images/Resilient%20cities.webp',
        label: 'Organisatie',
        readTime: '6 min lezen',
        intro:
            'Zelforganisatie wordt soms verward met volledige vrijheid. In werkelijkheid kunnen mensen pas zelfstandig handelen wanneer de gezamenlijke bedoeling, grenzen en verantwoordelijkheden helder zijn.',
        sections: [
            {
                heading: 'Maak de speelruimte zichtbaar',
                body:
                    'Benoem welke besluiten een groep zelf kan nemen, waar afstemming nodig is en welke waarden niet onderhandelbaar zijn.'
            },
            {
                heading: 'Verdeel verantwoordelijkheid',
                body:
                    'Eigenaarschap groeit wanneer rollen niet alleen als taken worden beschreven, maar ook als mandaat om te handelen en keuzes te maken.'
            },
            {
                heading: 'Leer in korte cycli',
                body:
                    'Regelmatige reflectie helpt om afspraken bij te stellen op basis van de praktijk, zonder bij iedere verandering het hele systeem opnieuw te ontwerpen.'
            }
        ],
        takeaway:
            'Heldere kaders beperken zelforganisatie niet; ze geven mensen juist het vertrouwen en mandaat om initiatief te nemen.',
        tags: ['zelforganisatie', 'veerkracht', 'samenwerking']
    },
    {
        slug: 'zeven-kenmerken-van-veerkracht',
        title: 'Zeven kenmerken van veerkracht',
        description:
            'Een toegankelijke blik op wat steden, wijken en organisaties helpt om met verandering en onzekerheid om te gaan.',
        image: '/images/Marquee/ibu7.webp',
        label: 'Veerkracht',
        readTime: '7 min lezen',
        intro:
            'Veerkracht is meer dan herstellen na een tegenslag. Het is het vermogen om vooruit te kijken, te leren, verbinding te houden en verschillende oplossingen mogelijk te maken.',
        sections: [
            {
                heading: 'Diversiteit en verbinding',
                body:
                    'Verschillende perspectieven vergroten het aantal mogelijke antwoorden, terwijl sterke relaties ervoor zorgen dat kennis en hulp ook werkelijk kunnen stromen.'
            },
            {
                heading: 'Leren en vooruitkijken',
                body:
                    'Veerkrachtige systemen reflecteren op ervaringen, volgen veranderingen in hun omgeving en maken ruimte om tijdig te experimenteren.'
            },
            {
                heading: 'Ruimte voor initiatief',
                body:
                    'Wanneer verantwoordelijkheid niet op één plek ligt, kunnen mensen lokaal handelen en sneller reageren op wat zich daadwerkelijk voordoet.'
            }
        ],
        takeaway:
            'Veerkracht groeit wanneer analyse, relaties en lokaal handelingsvermogen elkaar versterken in plaats van los van elkaar te worden ontwikkeld.',
        tags: ['veerkracht', 'resilient-cities', 'zelforganisatie']
    }
];

export const projects: Project[] = [
    {
        slug: 'lokaal-geld-zuidoost',
        title: 'Lokaal Geld Zuidoost',
        description:
            'Een co-creatief traject waarin Ibu Bos met partners onderzocht hoe meer waarde in de community kan blijven en lokale economie kan groeien.',
        image: '/images/lokaalgeld.webp',
        label: 'Recent project',
        intro:
            'Lokaal Geld Zuidoost is een voorbeeld van hoe Ibu Bos maatschappelijke vragen vertaalt naar samenwerking, gedeelde waarden en concrete beweging.',
        facts: ['Community waarde', 'Consortiumvorming', 'Manifest met partners'],
        sections: [
            {
                heading: 'De vraag',
                body:
                    'Hoe kan meer waarde in de community blijven en hoe kan lokale economie groeien op een manier die past bij de mensen en plekken in Zuidoost?'
            },
            {
                heading: 'De aanpak',
                body:
                    'Ibu Bos bouwde mee aan een consortium van partners en faciliteerde het proces om gedeelde waarden, belangen en een gezamenlijk droombeeld scherp te krijgen.'
            },
            {
                heading: 'De beweging',
                body:
                    'Het traject bracht partijen samen rond een manifest waarin lokale waarde, samenwerking en toekomstgericht denken centraal staan.'
            }
        ],
        outcome:
            'Een gedragen basis voor verdere samenwerking, met gedeelde taal en richting voor lokale economische groei.',
        tags: ['lokale-waarde', 'co-creatie', 'community']
    },
    {
        slug: 'resilient-cities',
        title: 'Resilient cities',
        description:
            'Analyse, strategie en implementatie voor steden, wijken en communities die sterker willen samenwerken aan toekomstige uitdagingen.',
        image: '/images/Resilient%20cities.webp',
        label: 'Aanpak',
        intro:
            'Resilient cities hebben resilient mensen, organisaties en samenwerkingsverbanden nodig. Ibu Bos helpt om die veerkracht zichtbaar en werkbaar te maken.',
        facts: ['Veerkrachtanalyse', 'Living labs', 'Strategie naar actie'],
        sections: [
            {
                heading: 'Starten met analyse',
                body:
                    'Samen met lokale stakeholders wordt onderzocht welke kansen, risico’s en bestaande krachten aanwezig zijn in een wijk, dorp of stad.'
            },
            {
                heading: 'Samen richting maken',
                body:
                    'Op basis van de analyse worden doelen, prioriteiten en samenwerkingsvormen ontwikkeld die passen bij de lokale context.'
            },
            {
                heading: 'Implementeren en verduurzamen',
                body:
                    'Ibu Bos helpt om strategie te vertalen naar concrete acties, lokale inbedding en meerjarige doorontwikkeling.'
            }
        ],
        outcome:
            'Een praktische veerkrachtstrategie die niet alleen op papier klopt, maar gedragen wordt door de mensen die ermee werken.',
        tags: ['veerkracht', 'resilient-cities', 'strategie']
    },
    {
        slug: 'community-lab-zuidoost',
        title: 'Community Lab Zuidoost',
        description:
            'Een veilige experimenteerruimte waarin bewoners, makers en organisaties samen oplossingen voor lokale opgaven ontwikkelen.',
        image: '/images/Marquee/ibu2.webp',
        label: 'Living lab',
        intro:
            'Een living lab brengt onderzoek en dagelijkse praktijk bij elkaar. Niet op afstand, maar midden in de omgeving waar vragen spelen en oplossingen zich moeten bewijzen.',
        facts: ['Lokale coalitie', 'Experimenteren', 'Leren in de praktijk'],
        sections: [
            {
                heading: 'De vraag',
                body:
                    'Hoe ontstaat een toegankelijke plek waar uiteenlopende betrokkenen samen kunnen onderzoeken, ontwerpen en leren rond lokale uitdagingen?'
            },
            {
                heading: 'De aanpak',
                body:
                    'Ibu Bos verbond initiatiefnemers, hielp gedeelde spelregels te formuleren en ontwierp een ritme van kleine experimenten en gezamenlijke reflectie.'
            },
            {
                heading: 'De beweging',
                body:
                    'Ideeën werden niet alleen besproken, maar direct in de praktijk beproefd. Daardoor groeiden zowel de oplossingen als het onderlinge vertrouwen.'
            }
        ],
        outcome:
            'Een lokale leeromgeving waarin eigenaarschap, kennisdeling en concrete experimenten elkaar versterken.',
        tags: ['community', 'innovatie', 'co-creatie']
    },
    {
        slug: 'veerkrachtstrategie-voor-de-wijk',
        title: 'Veerkrachtstrategie voor de wijk',
        description:
            'Van losse initiatieven naar een gedeelde koers met bewoners, professionals en lokale besluitvormers.',
        image: '/images/Resilient%20cities.webp',
        label: 'Strategie',
        intro:
            'Wijken beschikken vaak al over veel energie en kennis. Een veerkrachtstrategie maakt die kwaliteiten zichtbaar en verbindt ze aan gezamenlijke prioriteiten voor de toekomst.',
        facts: ['Stakeholderanalyse', 'Gedeelde doelen', 'Actieagenda'],
        sections: [
            {
                heading: 'De vraag',
                body:
                    'Hoe brengen we bestaande initiatieven, urgente opgaven en langetermijndoelen samen in een richting die lokaal wordt herkend en gedragen?'
            },
            {
                heading: 'De aanpak',
                body:
                    'Met interviews, werksessies en een gezamenlijke analyse werden patronen, kansen en kwetsbaarheden vertaald naar concrete veerkrachtdoelen.'
            },
            {
                heading: 'De beweging',
                body:
                    'Partners kregen een gedeeld verhaal en een overzichtelijke actieagenda waarin verantwoordelijkheden en eerste experimenten helder zijn.'
            }
        ],
        outcome:
            'Een gedragen koers die lokale energie bundelt en strategie direct verbindt met uitvoerbare stappen.',
        tags: ['veerkracht', 'strategie', 'community']
    },
    {
        slug: 'coalitie-voor-inclusieve-groei',
        title: 'Coalitie voor inclusieve groei',
        description:
            'Een samenwerking waarin maatschappelijke en lokale partners bouwen aan kansen die voor meer mensen bereikbaar zijn.',
        image: '/images/teammoment.webp',
        label: 'Coalitie',
        intro:
            'Inclusieve groei vraagt om partners die niet alleen dezelfde ambitie uitspreken, maar ook bereid zijn invloed, kennis en middelen anders te organiseren.',
        facts: ['Partnerselectie', 'Gedeelde waarden', 'Inclusieve besluitvorming'],
        sections: [
            {
                heading: 'De vraag',
                body:
                    'Hoe bouwen verschillende organisaties aan een gezamenlijke aanpak zonder dat lokale stemmen en ervaringskennis naar de achtergrond verdwijnen?'
            },
            {
                heading: 'De aanpak',
                body:
                    'Ibu Bos faciliteerde het gesprek over waarden, zeggenschap en rollen, en hielp de coalitie om inclusie te vertalen naar concrete procesafspraken.'
            },
            {
                heading: 'De beweging',
                body:
                    'De samenwerking verschoof van losse intenties naar gedeeld eigenaarschap en een werkwijze waarin verschillende perspectieven zichtbaar meewegen.'
            }
        ],
        outcome:
            'Een coalitie met heldere afspraken over invloed, bijdrage en de manier waarop lokale waarde centraal blijft staan.',
        tags: ['inclusie', 'samenwerking', 'participatie']
    },
    {
        slug: 'transitie-in-de-praktijk',
        title: 'Transitie in de praktijk',
        description:
            'Een begeleid veranderproces dat langetermijnambitie koppelt aan experimenten, reflectie en duurzame inbedding.',
        image: '/images/cocreatieveaanpak.webp',
        label: 'Transitie',
        intro:
            'Een transitie laat zich niet volledig plannen. Wel kun je condities creëren waarin mensen samen leren, gericht experimenteren en succesvolle bewegingen duurzaam verankeren.',
        facts: ['Vijf fasen', 'Procesbegeleiding', 'Duurzame inbedding'],
        sections: [
            {
                heading: 'De vraag',
                body:
                    'Hoe blijft een organisatie bewegen richting een nieuwe werkelijkheid terwijl de dagelijkse praktijk ondertussen gewoon doorgaat?'
            },
            {
                heading: 'De aanpak',
                body:
                    'Het proces volgde de vijf fasen van verkennen, verbinden, formeren, creëren en verduurzamen, met ruimte om steeds terug te keren naar wat nodig was.'
            },
            {
                heading: 'De beweging',
                body:
                    'Kleine experimenten leverden bewijs en energie, terwijl gezamenlijke reflectie hielp om lessen te vertalen naar structuur en meerjarige keuzes.'
            }
        ],
        outcome:
            'Een veranderproces met concrete resultaten én voldoende leervermogen om de beweging na afloop zelfstandig voort te zetten.',
        tags: ['verduurzaming', 'innovatie', 'zelforganisatie']
    }
];

export const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export const getPaginatedItems = <T>(items: T[], page: number, pageSize: number) => {
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    const currentPage = Math.min(Math.max(Math.trunc(page) || 1, 1), totalPages);
    const start = (currentPage - 1) * pageSize;

    return {
        items: items.slice(start, start + pageSize),
        currentPage,
        totalPages
    };
};

type TaggedContent = {
    slug: string;
    tags: string[];
};

const rankBySharedTags = <T extends TaggedContent>(items: T[], tags: string[], excludedSlug: string, limit: number) =>
    items
        .filter((item) => item.slug !== excludedSlug)
        .map((item, index) => ({
            item,
            index,
            score: item.tags.filter((tag) => tags.includes(tag)).length
        }))
        .sort((a, b) => b.score - a.score || a.index - b.index)
        .slice(0, limit)
        .map(({ item }) => item);

export const getRelatedBlogPosts = (post: BlogPost, limit = 3) =>
    rankBySharedTags(blogPosts, post.tags, post.slug, limit);

export const getRelatedProjects = (project: Project, limit = 2) =>
    rankBySharedTags(projects, project.tags, project.slug, limit);

export const getBlogDetailRelated = (post: BlogPost) => ({
    kind: 'blogs' as const,
    items: getRelatedBlogPosts(post, 3)
});

export const getProjectDetailRelated = (project: Project) => ({
    kind: 'projects' as const,
    items: getRelatedProjects(project, 2)
});

export const featuredBlog = blogPosts[0];
export const featuredProject = projects[0];
