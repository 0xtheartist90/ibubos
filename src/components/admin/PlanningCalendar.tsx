'use client';

import { useState } from 'react';

import Link from 'next/link';

export type PlannedItem = {
    id: string;
    type: 'blog' | 'project';
    status: 'draft' | 'published';
    title: string;
    planned: string; // 'YYYY-MM-DD'
};

type Props = {
    plannedItems: PlannedItem[];
    initialYear: number;
    initialMonth: number;
    todayKey: string; // 'YYYY-MM-DD'
};

const pad = (value: number) => String(value).padStart(2, '0');

const PlanningCalendar = ({ plannedItems, initialYear, initialMonth, todayKey }: Props) => {
    const [{ year, month }, setView] = useState({ year: initialYear, month: initialMonth });

    const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
    const mondayStart = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;
    const monthPrefix = `${year}-${pad(month)}`;

    const plannedByDay = new Map<number, PlannedItem[]>();
    plannedItems.forEach((item) => {
        if (!item.planned.startsWith(monthPrefix)) return;
        const day = Number(item.planned.slice(8, 10));
        plannedByDay.set(day, [...(plannedByDay.get(day) ?? []), item]);
    });

    const shift = (amount: number) =>
        setView((current) => {
            const next = current.month + amount;
            if (next < 1) return { year: current.year - 1, month: 12 };
            if (next > 12) return { year: current.year + 1, month: 1 };

            return { year: current.year, month: next };
        });

    const monthLabel = new Intl.DateTimeFormat('nl-NL', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
        new Date(Date.UTC(year, month - 1, 1))
    );

    return (
        <section className='admin-calendar'>
            <div className='admin-calendar__header'>
                <h2>Planning</h2>
                <div className='admin-calendar__nav'>
                    <button type='button' onClick={() => shift(-1)} aria-label='Vorige maand'>
                        ←
                    </button>
                    <strong>{monthLabel}</strong>
                    <button type='button' onClick={() => shift(1)} aria-label='Volgende maand'>
                        →
                    </button>
                </div>
            </div>
            <div className='admin-calendar__grid'>
                {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((weekday) => (
                    <span key={weekday} className='admin-calendar__weekday'>
                        {weekday}
                    </span>
                ))}
                {Array.from({ length: mondayStart }, (_, index) => (
                    <span key={`empty-${index}`} className='admin-calendar__day admin-calendar__day--empty' />
                ))}
                {Array.from({ length: daysInMonth }, (_, index) => {
                    const day = index + 1;
                    const isToday = todayKey === `${monthPrefix}-${pad(day)}`;

                    return (
                        <div key={day} className={`admin-calendar__day${isToday ? ' admin-calendar__day--today' : ''}`}>
                            <span className='admin-calendar__date'>{day}</span>
                            {(plannedByDay.get(day) ?? []).map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/admin/${item.type === 'blog' ? 'blogs' : 'projecten'}/${item.id}`}
                                    className={`admin-calendar__item admin-calendar__item--${item.status}`}
                                    title={item.title}>
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    );
                })}
            </div>
            <p className='admin-calendar__legend'>
                <span className='admin-calendar__item admin-calendar__item--draft'>Concept</span>
                <span className='admin-calendar__item admin-calendar__item--published'>Live</span>
                Geef een concept een geplande datum in de editor: het verschijnt hier en gaat die dag automatisch live.
            </p>
        </section>
    );
};

export default PlanningCalendar;
