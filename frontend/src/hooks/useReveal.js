import { useLayoutEffect } from 'react';
import { gsap } from '../lib/gsap';

/**
 * Custom hook for scroll/intersection-triggered reveal animations.
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

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const targets = stagger && element.children ? element.children : element;

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, x: 0, y: 0, scale: 1 });
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

    let tween;
    const ctx = gsap.context(() => {
      tween = gsap.fromTo(
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
          paused: true,
        }
      );
    }, ref);

    if (typeof IntersectionObserver === 'undefined') {
      tween?.play();
      return () => ctx.revert();
    }

    let hasPlayed = false;
    let observer;

    const height = element.getBoundingClientRect().height || element.offsetHeight || 0;
    const isTall = typeof window !== 'undefined' && height > window.innerHeight * 3;
    const rootMargin = isTall ? '0px' : `0px 0px -${threshold * 100}% 0px`;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hasPlayed = true;
            tween?.play();
            if (once) {
              observer.disconnect();
            }
          } else if (!once) {
            tween?.reverse();
          }
        });
      },
      {
        threshold: 0,
        rootMargin,
      }
    );

    observer.observe(element);

    const checkFailsafe = () => {
      if (hasPlayed || !ref.current) return;
      const rect = element.getBoundingClientRect();
      const inViewport = (
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0
      );
      if (inViewport) {
        hasPlayed = true;
        tween?.play();
        if (once) {
          observer.disconnect();
        }
      }
    };

    const failsafeTimer = setTimeout(checkFailsafe, 1500);
    window.addEventListener('load', checkFailsafe);

    return () => {
      clearTimeout(failsafeTimer);
      window.removeEventListener('load', checkFailsafe);
      observer.disconnect();
      ctx.revert();
    };
  }, [ref, direction, duration, delay, distance, stagger, threshold, once]);
};
