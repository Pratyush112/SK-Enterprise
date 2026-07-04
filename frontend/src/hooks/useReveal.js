import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

/**
 * Custom hook for GSAP scroll-triggered animations.
 * @param {React.RefObject} ref - Reference to the DOM element to animate
 * @param {Object} options - Animation configuration options
 */
export const useReveal = (ref, options = {}) => {
  const {
    direction = 'up',       // 'up', 'down', 'left', 'right', 'fade', 'scale'
    duration = 0.8,
    delay = 0,
    distance = 40,
    stagger = 0,
    threshold = 0.15,
    once = true,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(element, { opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    let initialProps = { opacity: 0 };
    if (direction === 'up') initialProps.y = distance;
    if (direction === 'down') initialProps.y = -distance;
    if (direction === 'left') initialProps.x = distance;
    if (direction === 'right') initialProps.x = -distance;
    if (direction === 'scale') {
      initialProps.scale = 0.92;
      initialProps.opacity = 0;
    }

    const targets = stagger && element.children ? element.children : element;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        initialProps,
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay,
          stagger: stagger || 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: `top ${100 - threshold * 100}%`,
            toggleActions: once ? 'play none none none' : 'play reverse play reverse',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [ref, direction, duration, delay, distance, stagger, threshold, once]);
};
