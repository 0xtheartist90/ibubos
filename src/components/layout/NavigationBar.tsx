'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Mail, Menu, X } from 'lucide-react';

const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projecten', label: 'Projecten' },
    { href: '/blogs', label: 'Blogs' }
];

const NavigationBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className='fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8'>
            <div className='relative mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[8px] border border-[#FDF5E2]/35 bg-[#FDF5E2]/90 px-4 py-3 shadow-[0_18px_45px_rgba(21,88,59,0.14)] backdrop-blur-md'>
                <button
                    type='button'
                    aria-label={open ? 'Sluit menu' : 'Open menu'}
                    aria-expanded={open}
                    onClick={() => setOpen((value) => !value)}
                    className='-ml-1 inline-flex h-10 w-10 shrink-0 items-center justify-center text-[#15583B] transition-colors hover:text-[#E88A32] md:hidden'>
                    {open ? <X aria-hidden className='h-6 w-6' /> : <Menu aria-hidden className='h-6 w-6' />}
                </button>
                <a
                    href='/'
                    aria-label='Ibu Bos home'
                    className='absolute left-1/2 -translate-x-1/2 shrink-0 md:static md:translate-x-0'>
                    <Image
                        src='/images/Logo%20Topnav.webp'
                        alt='Ibu Bos'
                        width={189}
                        height={60}
                        priority
                        className='h-10 w-auto sm:h-12'
                    />
                </a>
                <nav aria-label='Hoofdnavigatie' className='hidden items-center gap-6 text-sm font-extrabold uppercase text-[#15583B] md:flex'>
                    {navItems.map((item) => (
                        <a key={item.href} href={item.href} className='transition-colors hover:text-[#E88A32]'>
                            {item.label}
                        </a>
                    ))}
                </nav>
                <a className='brand-nav-cta' href='mailto:maartje@ibubos.nl' aria-label='Contact'>
                    <Mail aria-hidden className='h-5 w-5 md:hidden' />
                    <span className='hidden md:inline'>Contact</span>
                </a>
            </div>
            {open ? (
                <nav
                    aria-label='Mobiele navigatie'
                    className='mx-auto mt-2 max-w-7xl rounded-[8px] border border-[#FDF5E2]/35 bg-[#FDF5E2]/95 px-2 py-2 shadow-[0_18px_45px_rgba(21,88,59,0.14)] backdrop-blur-md md:hidden'>
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className='block rounded-[6px] px-3 py-3 text-sm font-extrabold uppercase text-[#15583B] transition-colors hover:bg-[#15583B]/5 hover:text-[#E88A32]'>
                            {item.label}
                        </a>
                    ))}
                </nav>
            ) : null}
        </header>
    );
};

export default NavigationBar;
