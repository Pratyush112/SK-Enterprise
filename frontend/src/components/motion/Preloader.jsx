import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

/**
 * Cargokite-inspired 00% -> 100% tabular numeral preloader.
 * Manufactures anticipation before revealing full-bleed industrial hardware.
 */
const Preloader = ({ onComplete }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const containerRef = useRef(null);
    const numberRef = useRef(null);

    useEffect(() => {
        // Check reduced motion
        const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            setIsVisible(false);
            if (onComplete) onComplete();
            return;
        }

        let startTime = null;
        const duration = 2000; // 2 seconds

        const animateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Cubic ease out for tabular counting
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easedProgress * 100);
            
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animateCount);
            } else {
                setCount(100);
                
                // Animate out curtain
                gsap.to(containerRef.current, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: 'power3.inOut',
                    delay: 0.2,
                    onComplete: () => {
                        setIsVisible(false);
                        if (onComplete) onComplete();
                    }
                });
            }
        };

        const animationFrame = requestAnimationFrame(animateCount);
        return () => cancelAnimationFrame(animationFrame);
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div 
            ref={containerRef}
            className="fixed inset-0 z-[100] bg-white text-slate-900 flex flex-col justify-between p-8 sm:p-12 md:p-16 select-none border-b border-slate-200"
        >
            {/* Top Bar: Eyebrow */}
            <div className="flex justify-between items-center text-xs font-mono tracking-widest uppercase text-slate-500 border-b border-slate-200 pb-4">
                <span>SK ENTERPRISE • HOWRAH WORKS</span>
                <span className="text-accent font-bold">EST. 1990s</span>
            </div>

            {/* Center / Left Side: Large Tabular Numeral Counter */}
            <div className="flex flex-col items-start justify-center my-auto">
                <div ref={numberRef} className="font-tabular font-mono text-7xl sm:text-9xl md:text-[11rem] font-black tracking-tighter text-slate-900 leading-none">
                    {count < 10 ? `0${count}` : count}
                    <span className="text-accent text-4xl sm:text-6xl md:text-8xl ml-2">%</span>
                </div>
                <div className="mt-4 text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-500">
                    INITIALIZING HYDROSTATIC & METALLURGICAL DATA
                </div>
            </div>

            {/* Bottom Section: Massive Reference Text & System Status */}
            <div className="mt-auto w-full">
                {/* Massive Outlined Reference Typography (LangChain Academy style) */}
                <div 
                    className="w-full font-black tracking-tighter leading-none text-[12vw] select-none mb-4 sm:mb-6 whitespace-nowrap overflow-hidden"
                    style={{ 
                        fontFamily: "'Roboto', sans-serif",
                        WebkitTextStroke: '4px rgba(148, 163, 184, 1)',
                        color: 'transparent'
                    }}
                >
                    <span style={{ WebkitTextStroke: '4px rgba(0, 180, 216, 01)'}}>SK</span> Enterprise
                </div>

                {/* Bottom Bar: System Status */}
                <div className="flex justify-between items-end text-xs font-mono text-slate-500 border-t border-slate-200 pt-4">
                    <div>
                        <span>STANDARD COMPLIANCE: </span>
                        <span className="text-slate-900 font-bold">IS 3042 • BS 7775 • AWWA C560</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                        <span className="text-accent font-bold uppercase tracking-wider">SYSTEM READY</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
