'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

import Lenis from 'lenis';

const SmoothScroll = () => {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith('/admin');

    useEffect(() => {
        if (isAdmin) return;
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
            syncTouch: false,
            anchors: true
        });

        let frame = 0;
        const raf = (time: number) => {
            lenis.raf(time);
            frame = window.requestAnimationFrame(raf);
        };
        frame = window.requestAnimationFrame(raf);

        return () => {
            window.cancelAnimationFrame(frame);
            lenis.destroy();
        };
    }, [isAdmin]);

    return null;
};

export default SmoothScroll;
