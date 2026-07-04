import React, { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { ShieldCheck } from 'lucide-react';

/**
 * AMES Foundation-inspired circular stamp badge.
 * Tactile field-journal craft with overshoot back-easing entrance and continuous rotation.
 */
const StampBadge = ({
    text = "100% HYDROSTATIC TESTED • HOWRAH WORKS • EST. 1989 • ",
    className = "",
    size = "w-28 h-28 sm:w-36 sm:h-36",
    icon = <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
}) => {
    const badgeRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const element = badgeRef.current;
        if (!element) return;

        const ctx = gsap.context(() => {
            // Overshoot back-easing entrance
            gsap.fromTo(
                element,
                { scale: 0.4, opacity: 0, rotate: -30 },
                { scale: 1, opacity: 1, rotate: 0, duration: 0.9, ease: 'back.out(1.8)', delay: 0.2 }
            );

            // Continuous slow rotation if motion permitted
            if (!prefersReducedMotion && textRef.current) {
                gsap.to(textRef.current, {
                    rotate: 360,
                    duration: 25,
                    repeat: -1,
                    ease: 'none'
                });
            }
        }, badgeRef);

        return () => ctx.revert();
    }, []);

    // Generate unique ID for SVG textPath
    const pathId = `stamp-text-path-${Math.random().toString(36).substring(2, 9)}`;

    return (
        <div 
            ref={badgeRef}
            className={`stamp-badge relative flex items-center justify-center select-none ${size} ${className}`}
        >
            {/* Outer Circular Border & Background */}
            <div className="absolute inset-0 rounded-full bg-white/90 border border-slate-300 shadow-xl backdrop-blur-md flex items-center justify-center">
                {/* Inner Icon / Seal */}
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shadow-inner">
                    {icon}
                </div>
            </div>

            {/* Rotating Circular Text */}
            <svg
                ref={textRef}
                className="absolute inset-0 w-full h-full p-1"
                viewBox="0 0 100 100"
            >
                <path
                    id={pathId}
                    d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    fill="none"
                />
                <text className="text-[9.5px] font-mono font-bold uppercase tracking-[0.18em] fill-slate-700">
                    <textPath xlinkHref={`#${pathId}`} startOffset="0%">
                        {text}
                    </textPath>
                </text>
            </svg>
        </div>
    );
};

export default StampBadge;
