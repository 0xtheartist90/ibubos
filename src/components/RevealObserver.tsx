'use client';

import { useEffect } from 'react';

const revealSelector = [
    "main:not(.admin-page) > section [class~='grid'] > *",
    '.archive-feature',
    '.blog-card',
    '.project-card',
    '.detail-article > section',
    '.detail-sidebar',
    '.featured-blog__copy',
    '.featured-blog__media',
    '.contact-media',
    '.process-orbit',
    '.full-bleed-media',
    '.hero-reveal'
].join(', ');

const staggerChildSelector = ':scope > .section-kicker, :scope > h2, :scope > h3';

// Containers with overflow hidden: their image can settle from a slight zoom.
const mediaSelector = [
    '.archive-feature',
    '.blog-card',
    '.project-card',
    '.featured-blog__media',
    '.contact-media',
    '.full-bleed-media'
].join(', ');

const STAGGER_STEP = 90;
const STAGGER_MAX = 450;

const RevealObserver = () => {
    useEffect(() => {
        const root = document.documentElement;
        const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
        const supportsIntersectionObserver = 'IntersectionObserver' in window;
        let observer: IntersectionObserver | null = null;

        const scan = () => {
            document.querySelectorAll(revealSelector).forEach((element) => {
                if (!(element instanceof HTMLElement)) return;
                if (element.classList.contains('reveal-target')) return;
                // Hero children have their own load choreography.
                if (!element.matches('.hero-reveal') && element.closest('.hero-reveal')) return;

                element.classList.add('reveal-target');
                if (element.matches('.hero-reveal')) {
                    // Hero has its own choreography; no extra treatment.
                } else if (element.matches(mediaSelector)) {
                    element.classList.add('reveal-media');
                } else if (element.querySelector(staggerChildSelector)) {
                    element.classList.add('reveal-stagger');
                } else if (element.matches('img') || element.querySelector('img')) {
                    // Unclipped images open with a wipe instead of a zoom.
                    element.classList.add('reveal-wipe');
                }

                if (reducedMotion || !observer) {
                    element.classList.add('is-revealed');
                } else if (element.matches('.hero-reveal')) {
                    window.requestAnimationFrame(() => element.classList.add('is-revealed'));
                } else {
                    observer.observe(element);
                }
            });
        };

        root.classList.add('reveal-ready');

        if (!reducedMotion && supportsIntersectionObserver) {
            observer = new IntersectionObserver(
                (entries) => {
                    // Elements entering the viewport together cascade in visual
                    // order; a single element entering later reveals immediately.
                    const batch = entries
                        .filter((entry) => entry.isIntersecting)
                        .sort((a, b) => {
                            const rectA = a.boundingClientRect;
                            const rectB = b.boundingClientRect;

                            return rectA.top - rectB.top || rectA.left - rectB.left;
                        });

                    batch.forEach((entry, index) => {
                        const element = entry.target;
                        if (element instanceof HTMLElement) {
                            element.style.setProperty(
                                '--reveal-delay',
                                `${Math.min(index * STAGGER_STEP, STAGGER_MAX)}ms`
                            );
                        }
                        element.classList.add('is-revealed');
                        observer?.unobserve(element);
                    });
                },
                { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
            );
        }

        scan();
        const mutations = new MutationObserver(scan);
        mutations.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer?.disconnect();
            mutations.disconnect();
            root.classList.remove('reveal-ready');
        };
    }, []);

    return null;
};

export default RevealObserver;
