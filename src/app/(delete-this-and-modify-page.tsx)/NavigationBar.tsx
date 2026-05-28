import Image from 'next/image';

const navItems = [
    { href: '#over', label: 'Over' },
    { href: '#werkwijze', label: 'Werkwijze' },
    { href: '#aanbod', label: 'Aanbod' },
    { href: '#contact', label: 'Contact' }
];

const NavigationBar = () => {
    return (
        <header className='fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8'>
            <div className='mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[8px] border border-[#FDF5E2]/35 bg-[#FDF5E2]/90 px-4 py-3 shadow-[0_18px_45px_rgba(21,88,59,0.14)] backdrop-blur-md'>
                <a href='#home' aria-label='Ibu Bos home' className='shrink-0'>
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
                <a className='brand-nav-cta' href='mailto:maartje@ibubos.nl'>
                    Contact
                </a>
            </div>
        </header>
    );
};

export default NavigationBar;
