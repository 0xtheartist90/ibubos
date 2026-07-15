'use client';

import { useEffect, useRef, useState } from 'react';

const pad = (value: number) => String(value).padStart(2, '0');

const parseKey = (key: string) => {
    const match = key.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;

    return { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
};

const formatLabel = (key: string) => {
    const parsed = parseKey(key);
    if (!parsed) return '';

    return new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
        new Date(Date.UTC(parsed.year, parsed.month - 1, parsed.day))
    );
};

const AdminDateField = ({ name, defaultValue }: { name: string; defaultValue: string }) => {
    const [value, setValue] = useState(defaultValue);
    const [open, setOpen] = useState(false);
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(new Date());
    const initial = parseKey(value) ?? parseKey(today)!;
    const [view, setView] = useState({ year: initial.year, month: initial.month });
    const wrapRef = useRef<HTMLDivElement>(null);

    // Sluit de popup bij klikken buiten het veld of met Escape.
    useEffect(() => {
        if (!open) return;

        const onPointer = (event: PointerEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false);
        };
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false);
        };
        document.addEventListener('pointerdown', onPointer);
        document.addEventListener('keydown', onKey);

        return () => {
            document.removeEventListener('pointerdown', onPointer);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);

    const daysInMonth = new Date(Date.UTC(view.year, view.month, 0)).getUTCDate();
    const mondayStart = (new Date(Date.UTC(view.year, view.month - 1, 1)).getUTCDay() + 6) % 7;
    const monthPrefix = `${view.year}-${pad(view.month)}`;
    const monthLabel = new Intl.DateTimeFormat('nl-NL', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
        new Date(Date.UTC(view.year, view.month - 1, 1))
    );

    const shift = (amount: number) =>
        setView((current) => {
            const next = current.month + amount;
            if (next < 1) return { year: current.year - 1, month: 12 };
            if (next > 12) return { year: current.year + 1, month: 1 };

            return { year: current.year, month: next };
        });

    const select = (day: number) => {
        setValue(`${monthPrefix}-${pad(day)}`);
        setOpen(false);
    };

    const clear = () => {
        setValue('');
        setOpen(false);
    };

    return (
        <div className='admin-date' ref={wrapRef}>
            <input type='hidden' name={name} value={value} />
            <button
                type='button'
                className='admin-date__trigger'
                aria-haspopup='dialog'
                aria-expanded={open}
                onClick={() => setOpen((current) => !current)}>
                {value ? formatLabel(value) : 'Kies een datum'}
            </button>
            {value ? (
                <button type='button' className='admin-date__clear' onClick={clear}>
                    Wissen
                </button>
            ) : null}
            {open ? (
                <div className='admin-date__popover' role='dialog' aria-label='Kies een datum'>
                    <div className='admin-calendar__nav admin-date__nav'>
                        <button type='button' onClick={() => shift(-1)} aria-label='Vorige maand'>
                            ←
                        </button>
                        <strong>{monthLabel}</strong>
                        <button type='button' onClick={() => shift(1)} aria-label='Volgende maand'>
                            →
                        </button>
                    </div>
                    <div className='admin-date__grid'>
                        {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((weekday) => (
                            <span key={weekday} className='admin-date__weekday'>
                                {weekday}
                            </span>
                        ))}
                        {Array.from({ length: mondayStart }, (_, index) => (
                            <span key={`empty-${index}`} />
                        ))}
                        {Array.from({ length: daysInMonth }, (_, index) => {
                            const day = index + 1;
                            const key = `${monthPrefix}-${pad(day)}`;

                            return (
                                <button
                                    type='button'
                                    key={day}
                                    className={`admin-date__day${value === key ? ' admin-date__day--selected' : ''}${today === key ? ' admin-date__day--today' : ''}`}
                                    onClick={() => select(day)}>
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default AdminDateField;
