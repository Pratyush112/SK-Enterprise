import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats = [
  { value: "Zero", label: "Defect Goal", sub: "CONTINUOUS IMPROVEMENT" },
  { value: "100%", label: "Quality Assurance", sub: "OVERALL MANAGEMENT" },
  { value: "1 by 1", label: "Tested Valves", sub: "STRENGTH & SEAL TEST" },
  { value: "ISO", label: "9001 : 2015 Co.", sub: "CERTIFIED PROGRAM" }
];

const StatOverlay = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".stat-overlay-card", 
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "clamp(top 90%)",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative z-30 max-w-container-max mx-auto px-6 sm:px-8 -mt-24 -mb-24 sm:-mt-28 sm:-mb-28 md:-mt-32 md:-mb-32 select-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="stat-overlay-card p-6 sm:p-8 rounded-industrial-lg bg-slate-900/95 border border-slate-700/80 hover:border-accent hover:bg-slate-800 transition-all group flex flex-col justify-between h-full shadow-2xl backdrop-blur-md min-h-[220px]"
          >
            <div>
              <span className="font-tabular font-headline text-3xl sm:text-4xl md:text-5xl font-black text-white group-hover:text-accent transition-colors block mb-2 sm:mb-3">
                {stat.value}
              </span>
              <span className="font-bold text-sm sm:text-base text-slate-200 block mb-2">
                {stat.label}
              </span>
            </div>
            <span className="font-mono text-[11px] sm:text-xs text-accent pt-4 border-t border-slate-700/80 block mt-4 sm:mt-6 font-bold uppercase tracking-wider">
              {stat.sub}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatOverlay;
