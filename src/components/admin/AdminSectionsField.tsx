'use client';

import { useState } from 'react';

import type { ContentSection } from '@/lib/content/types';

const AdminSectionsField = ({ initialSections }: { initialSections: ContentSection[] }) => {
    const [sections, setSections] = useState<ContentSection[]>(initialSections.length ? initialSections : [{ heading: '', body: '' }]);

    const updateSection = (index: number, field: keyof ContentSection, value: string) => {
        setSections((current) => current.map((section, sectionIndex) => (
            sectionIndex === index ? { ...section, [field]: value } : section
        )));
    };

    return (
        <fieldset className='admin-sections'>
            <legend>Inhoud</legend>
            {sections.map((section, index) => (
                <div key={index} className='admin-section-fields'>
                    <div className='admin-section-heading'>
                        <label>
                            Tussenkop {index + 1}
                            <input
                                name={`sectionHeading${index + 1}`}
                                value={section.heading}
                                onChange={(event) => updateSection(index, 'heading', event.target.value)}
                                required
                            />
                        </label>
                        {sections.length > 1 ? (
                            <button type='button' onClick={() => setSections((current) => current.filter((_, sectionIndex) => sectionIndex !== index))}>
                                Verwijderen
                            </button>
                        ) : null}
                    </div>
                    <label>
                        Tekst {index + 1}
                        <textarea
                            name={`sectionBody${index + 1}`}
                            value={section.body}
                            onChange={(event) => updateSection(index, 'body', event.target.value)}
                            required
                        />
                    </label>
                </div>
            ))}
            {sections.length < 4 ? (
                <button type='button' className='admin-section-add' onClick={() => setSections((current) => [...current, { heading: '', body: '' }])}>
                    + Inhoudsblok toevoegen
                </button>
            ) : null}
        </fieldset>
    );
};

export default AdminSectionsField;
