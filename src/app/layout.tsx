import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { ThemeProvider } from 'next-themes';

import '@/app/globals.css';
import { Analytics } from '@/components/analytics';
import NavigationBar from '@/components/layout/NavigationBar';
import SiteFooter from '@/components/layout/SiteFooter';
import RevealObserver from '@/components/RevealObserver';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

export const metadata: Metadata = {
    title: 'Ibu Bos | Resilient cities en co-creatie',
    description:
        'Ibu Bos helpt steden, communities en organisaties met duurzame ontwikkeling, zelforganisatie en inclusieve groei.',
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/images/favicon.webp'
    }
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        // ? https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
        // ? https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
        <html suppressHydrationWarning lang='nl'>
            <head>
                {/* Voor de eerste paint, zodat de entrance vanaf frame één loopt zonder flikkering.
                    De timeout maakt alles zichtbaar als hydration ooit faalt. */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: "(function(){if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('reveal-ready');setTimeout(function(){if(!document.querySelector('.reveal-target'))d.classList.remove('reveal-ready')},2500)})()"
                    }}
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground overscroll-none antialiased`}>
                <ThemeProvider attribute='class'>
                    <RevealObserver />
                    <NavigationBar />
                    {children}
                    <SiteFooter />
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    );
};

export default Layout;
