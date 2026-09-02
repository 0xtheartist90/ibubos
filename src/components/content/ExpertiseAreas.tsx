'use client';

import { useEffect, useRef, useState } from 'react';

import { Compass, Leaf, Map, UsersRound } from 'lucide-react';

const areas = [
    {
        icon: Map,
        title: 'Integrale gebiedsontwikkeling',
        projects: [
            { name: 'Masterplan Zuidoost', description: 'Korte projectomschrijving volgt binnenkort.' },
            { name: 'Arenapoort', description: 'Korte projectomschrijving volgt binnenkort.' },
            { name: 'G-Buurt Moving Forward', description: 'Korte projectomschrijving volgt binnenkort.' }
        ]
    },
    {
        icon: Leaf,
        title: 'Energie & duurzaamheids-transities',
        projects: [
            { name: 'Gebiedsgericht SLIM', description: 'Korte projectomschrijving volgt binnenkort.' },
            { name: 'Energie van Utrecht', description: 'Korte projectomschrijving volgt binnenkort.' },
            { name: 'Donut Economie', description: 'Korte projectomschrijving volgt binnenkort.' },
            { name: 'Groene Hub', description: 'Korte projectomschrijving volgt binnenkort.' }
        ]
    },
    {
        icon: UsersRound,
        title: 'Sociale innovatie, participatie & democratisering',
        projects: [
            { name: 'Living Labs', description: 'Korte projectomschrijving volgt binnenkort.' },
            { name: 'Buurtplatformen', description: 'Korte projectomschrijving volgt binnenkort.' },
            { name: 'Fieldlabs', description: 'Korte projectomschrijving volgt binnenkort.' },
            { name: 'Participatieverordening', description: 'Korte projectomschrijving volgt binnenkort.' }
        ]
    },
    {
        icon: Compass,
        title: 'Circulaire economie & lokaal ondernemen',
        projects: [
            { name: '2PING (lokale munt)', description: 'Korte projectomschrijving volgt binnenkort.' },
            { name: 'Donut Deals', description: 'Korte projectomschrijving volgt binnenkort.' },
            { name: 'Meer Ondernemen', description: 'Korte projectomschrijving volgt binnenkort.' }
        ]
    }
];

const ExpertiseAreas = () => {
    const [open, setOpen] = useState<string | null>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // Tik buiten de projecten sluit de open omschrijving (touch-gedrag).
    useEffect(() => {
        if (!open) return;

        const onPointer = (event: PointerEvent) => {
            if (listRef.current && !listRef.current.contains(event.target as Node)) setOpen(null);
        };
        document.addEventListener('pointerdown', onPointer);

        return () => document.removeEventListener('pointerdown', onPointer);
    }, [open]);

    return (
        <div className='service-composition' ref={listRef}>
            {areas.map((area) => {
                const Icon = area.icon;

                return (
                    <div key={area.title} className='icon-panel'>
                        <Icon aria-hidden className='h-7 w-7 shrink-0 text-[#E88A32]' />
                        <div className='min-w-0'>
                            <h3>{area.title}</h3>
                            <ul className='project-chips'>
                                {area.projects.map((project) => {
                                    const isOpen = open === project.name;

                                    return (
                                        <li key={project.name} className='project-chip-wrap'>
                                            <button
                                                type='button'
                                                className={`project-chip${isOpen ? ' project-chip--open' : ''}`}
                                                aria-expanded={isOpen}
                                                onClick={() => setOpen(isOpen ? null : project.name)}>
                                                {project.name}
                                            </button>
                                            <span role='tooltip' className='project-chip__tip'>
                                                {project.description}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ExpertiseAreas;
