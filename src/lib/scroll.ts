/**
 * Lenis smooth scroll + GSAP ScrollTrigger synchronization
 * Initializes on client only. Handles reduced motion preference.
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function initLenis() {
    if (typeof window === 'undefined') return null;
    if (lenisInstance) return lenisInstance;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    lenisInstance = new Lenis({
        duration: prefersReducedMotion ? 0 : 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: !prefersReducedMotion,
        touchMultiplier: 1.5,
    });

    lenisInstance.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenisInstance?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return lenisInstance;
}

export function getLenis(): Lenis | null {
    return lenisInstance;
}

export function destroyLenis() {
    if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
    }
}

export { gsap, ScrollTrigger };