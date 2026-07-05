import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expoOut easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis requestAnimationFrame to GSAP ticker
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);

    // Prevent lag smoothing from interfering with Lenis smooth scroll
    gsap.ticker.lagSmoothing(0, 0);

    // Refresh ScrollTrigger when images or fonts finish loading or DOM height changes
    let resizeTimeout;
    const handleResizeOrLoad = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener('load', handleResizeOrLoad);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(handleResizeOrLoad);
    }

    const resizeObserver = new ResizeObserver(() => {
      handleResizeOrLoad();
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('load', handleResizeOrLoad);
      resizeObserver.disconnect();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  // Handle route transitions: reset scroll position and refresh ScrollTrigger
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  return <div className="smooth-scroll-wrapper">{children}</div>;
};

export default SmoothScroll;
