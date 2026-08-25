import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Mukta_Mahee } from 'next/font/google';
import localFont from 'next/font/local';

import { ThemeProvider } from 'next-themes';

import '@/app/globals.css';
import { Analytics } from '@/components/analytics';
import NavigationBar from '@/components/layout/NavigationBar';
import SiteFooter from '@/components/layout/SiteFooter';
import RevealObserver from '@/components/RevealObserver';
import SmoothScroll from '@/components/SmoothScroll';
import { siteUrl } from '@/lib/site';

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
const muktaMahee = Mukta_Mahee({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-mukta',
    display: 'swap'
});

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: 'Ibu Bos | Resilient cities en co-creatie',
    description:
        'Ibu Bos helpt steden, communities en organisaties met duurzame ontwikkeling, zelforganisatie en inclusieve groei.',
    openGraph: {
        type: 'website',
        locale: 'nl_NL',
        siteName: 'Ibu Bos',
        title: 'Ibu Bos | Resilient cities en co-creatie',
        description:
            'Ibu Bos helpt steden, communities en organisaties met duurzame ontwikkeling, zelforganisatie en inclusieve groei.',
        images: ['/images/og-image.png']
    },
    twitter: {
        card: 'summary_large_image'
    },
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
                className={`${geistSans.variable} ${geistMono.variable} ${muktaMahee.variable} bg-background text-foreground overscroll-none antialiased`}>
                <ThemeProvider attribute='class' forcedTheme='light'>
                    <SmoothScroll />
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
