import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    // Touch devices scroll natively; do not run a Lenis loop on them
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    let lenis = null;
    let tickerCallback = null;

    if (!isTouch) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,   // replaces the removed `smooth` option
        syncTouch: false,    // replaces the removed `smoothTouch` option
      });
      lenis.on('scroll', ScrollTrigger.update);
      tickerCallback = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0, 0);
    }

    // ScrollTrigger already refreshes itself on window `load`, so the manual `load` listener is gone.
    let timer;
    const refreshSoon = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 250);
    };

    if (document.fonts?.ready) document.fonts.ready.then(refreshSoon);

    // Only refresh when the page height really changes. contentRect comes from the observer,
    // so no layout read is forced inside the callback.
    let lastHeight = 0;
    const ro = new ResizeObserver((entries) => {
      const h = Math.round(entries[0].contentRect.height);
      if (Math.abs(h - lastHeight) > 2) {
        lastHeight = h;
        refreshSoon();
      }
    });
    ro.observe(document.body);

    return () => {
      clearTimeout(timer);
      ro.disconnect();
      if (tickerCallback) gsap.ticker.remove(tickerCallback);
      lenis?.destroy();
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
