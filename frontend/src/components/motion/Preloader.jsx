import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

// Policy constants (change here to tune behaviour)
const SEEN_KEY = 'sk_preloader_seen';
const COUNT_MS = 600;      // counter duration
const CURTAIN_S = 0.4;     // curtain slide-up duration
const SKIP_BELOW_PX = 768; // no preloader on phones

const shouldSkip = () => {
  if (typeof window === 'undefined') return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  if (window.matchMedia(`(max-width: ${SKIP_BELOW_PX - 1}px)`).matches) return true;
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
};

const Preloader = ({ onComplete }) => {
  // Lazy initial state: when skipping, the overlay is never rendered (no one-frame flash)
  const [isVisible, setIsVisible] = useState(() => !shouldSkip());
  const containerRef = useRef(null);
  const numberRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isVisible) {
      onCompleteRef.current?.();
      return;
    }
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* storage blocked: ignore */ }

    let raf;
    let start = null;
    let tween;

    const tick = (ts) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / COUNT_MS, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const n = Math.floor(eased * 100);
      // Write straight to the DOM: no React re-render per frame
      if (numberRef.current) numberRef.current.textContent = n < 10 ? `0${n}` : String(n);

      if (p < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (numberRef.current) numberRef.current.textContent = '100';
      tween = gsap.to(containerRef.current, {
        yPercent: -100,
        duration: CURTAIN_S,
        ease: 'power3.inOut',
        onComplete: () => {
          setIsVisible(false);
          onCompleteRef.current?.();
        },
      });
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      tween?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] bg-white text-slate-900 flex flex-col justify-between p-8 sm:p-12 md:p-16 select-none border-b border-slate-200"
    >
      {/* Top bar */}
      <div className="flex justify-between items-center text-xs font-mono tracking-widest uppercase text-slate-500 border-b border-slate-200 pb-4">
        <span>SK ENTERPRISE • HOWRAH WORKS</span>
        <span className="text-accent-text font-bold">EST. 1992</span>
      </div>

      {/* Counter */}
      <div className="flex flex-col items-start justify-center my-auto">
        <div className="font-tabular font-mono text-7xl sm:text-9xl md:text-[11rem] font-black tracking-tighter text-slate-900 leading-none">
          <span ref={numberRef}>00</span>
          <span className="text-accent-text text-4xl sm:text-6xl md:text-8xl ml-2">%</span>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-auto w-full">
        <div
          className="w-full font-sans font-black tracking-tighter leading-none text-[12vw] select-none mb-4 sm:mb-6 whitespace-nowrap overflow-hidden"
          style={{ WebkitTextStroke: '1.5px #64748b', color: 'transparent' }}
        >
          <span style={{ WebkitTextStroke: '1.5px #0096c7' }}>SK</span> Enterprise
        </div>
        <div className="mt-4 text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-500">
          Manufacturers of : C.I. | S.S. | G.M. | Valves | Cocks & Fittings.
        </div>
        <div className="flex justify-between items-end text-xs font-mono text-slate-500 border-t border-slate-200 pt-4">
          <div>
            <span>STANDARD COMPLIANCE: </span>
            {/* Standards text is decided by the owner (see Phase 1, step 1.7). Keep whatever is in the file today. */}
            <span className="text-slate-900 font-bold">IS 3042 • BS 7775 • AWWA C560</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
