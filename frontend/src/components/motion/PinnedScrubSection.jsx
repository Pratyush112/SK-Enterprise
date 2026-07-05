import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { ShieldCheck, CheckCircle2, Award, Activity, ArrowDown } from 'lucide-react';
import { Skeleton } from '../ui/Skeleton';

const defaultStages = [
    {
        num: "01",
        title: "CNC Metallurgy & Dimensional Tolerance Audit",
        subtitle: "PRECISION MACHINING WORKS",
        desc: "Every cast iron and stainless steel casting (IS 210 Gr FG 200/260, SS 316) is machined on high-precision CNC centers. All sealing faces and spindle threads are verified against strict ±0.05mm mechanical tolerance limits before assembly.",
        spec: "TOLERANCE: ±0.05 MM • METALLURGY: CI / SS316",
        icon: <Award className="w-6 h-6 text-accent" />
    },
    {
        num: "02",
        title: "100% Hydrostatic Seating & Unseating Pressure Test",
        subtitle: "HYDROSTATIC TEST PROTOCOL",
        desc: "Every single-faced and double-faced sluice gate is mounted on automated hydrostatic test rigs. Gates are pressurized to 1.5x working pressure (up to 30 meters water head) to guarantee zero-leakage or Class VI tight shut-off.",
        spec: "TEST PRESSURE: 1.5X WORKING HEAD • STANDARD: IS 3042",
        icon: <Activity className="w-6 h-6 text-accent" />
    },
    {
        num: "03",
        title: "QAP Documentation & Tender MTC 3.1 Certification",
        subtitle: "DISPATCH READY AUDIT",
        desc: "Complete Quality Assurance Plan (QAP) compliance logs, hydrostatic inspection test certificates, and EN 10204 3.1 Material Test Certificates (MTC) are compiled and packaged with every shipment for municipal and EPC contractors.",
        spec: "CERTIFICATION: FULL MTC 3.1 • COMPLIANCE: IS / BS / AWWA",
        icon: <ShieldCheck className="w-6 h-6 text-accent" />
    }
];

/**
 * AMES Foundation-inspired Pinned Scrub Section (Option B).
 * Pins the viewport while scrolling scrubs through the Quality Verification Protocol.
 * Supports both legacy 3-stage protocol and dynamic N-step quality control sequences.
 */
const PinnedScrubSection = ({ steps = null, isDark = false, hideHeader = false }) => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const fingerRef = useRef(null);
    const cardsRef = useRef([]);

    // Normalize items from dynamic steps or default stages
    const items = (steps && steps.length > 0)
        ? steps.map((s) => ({
            num: String(s.order).padStart(2, "0"),
            title: s.title,
            subtitle: `STEP ${String(s.order).padStart(2, "0")} • QUALITY PROTOCOL`,
            desc: s.description,
            spec: s.order === 1 ? "MATERIAL AUDIT • CHEMICAL & MECHANICAL" :
                  s.order === 2 ? "TRACEABILITY • UNIQUE HEAT NUMBER" :
                  s.order === 3 ? "NDT & HYDROSTATIC • 100% TESTED" :
                  "CERTIFIED QUALITY • THIRD-PARTY MTC 3.1",
            icon: <ShieldCheck className="w-6 h-6 text-accent" />,
            imageUrl: s.imageUrl,
            alt: s.alt
        }))
        : defaultStages;

    useEffect(() => {
        const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const element = sectionRef.current;
        if (!element) return;

        const mm = gsap.matchMedia();

        // Desktop / Laptop: Pinned Scrollytelling with Ames Foundation crossfade-in-place
        mm.add("(min-width: 1024px)", () => {
            const totalSteps = items.length;

            // Set initial state: Card 0 visible, Card 1, 2, 3... hidden below
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                if (i === 0) {
                    gsap.set(card, { opacity: 1, y: 0, scale: 1, zIndex: 10, pointerEvents: "auto", borderColor: "rgba(0, 180, 216, 0.8)" });
                } else {
                    gsap.set(card, { opacity: 0, y: 40, scale: 0.95, zIndex: 1, pointerEvents: "none", borderColor: isDark ? "rgba(51, 65, 85, 0.6)" : "rgba(203, 213, 225, 0.6)" });
                }
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start: "top center-=10%",
                    end: `+=${totalSteps * 90}%`,
                    pin: true,
                    scrub: 0.7,
                    anticipatePin: 1
                }
            });

            // Animate index finger / progress tracker from top to bottom
            if (fingerRef.current) {
                tl.fromTo(
                    fingerRef.current,
                    { top: "5%" },
                    { top: "88%", ease: "none", duration: totalSteps - 1 },
                    0
                );
            }

            // Dynamically generate crossfade transitions between consecutive steps
            for (let i = 0; i < totalSteps - 1; i++) {
                const startTime = i * 1.0;
                if (cardsRef.current[i] && cardsRef.current[i + 1]) {
                    tl.to(
                        cardsRef.current[i],
                        { opacity: 0, y: -40, scale: 0.95, pointerEvents: "none", borderColor: isDark ? "rgba(51, 65, 85, 0.6)" : "rgba(203, 213, 225, 0.6)", duration: 0.6, ease: "power2.inOut" },
                        startTime + 0.4
                    );
                    tl.fromTo(
                        cardsRef.current[i + 1],
                        { opacity: 0, y: 40, scale: 0.95, zIndex: 10, pointerEvents: "none", borderColor: isDark ? "rgba(51, 65, 85, 0.6)" : "rgba(203, 213, 225, 0.6)" },
                        { opacity: 1, y: 0, scale: 1, pointerEvents: "auto", borderColor: "rgba(0, 180, 216, 0.8)", duration: 0.6, ease: "power2.inOut" },
                        startTime + 0.4
                    );
                }
            }
        });

        // Mobile / Tablet: Smooth natural scroll reveals without pinning
        mm.add("(max-width: 1023px)", () => {
            // Animate finger tied to container scroll
            if (fingerRef.current && containerRef.current) {
                gsap.fromTo(
                    fingerRef.current,
                    { top: "5%" },
                    {
                        top: "88%",
                        ease: "none",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%",
                            end: "bottom 50%",
                            scrub: true
                        }
                    }
                );
            }

            // Animate each card smoothly as it enters the viewport
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(
                    card,
                    { opacity: 0.3, y: 30, scale: 0.98, borderColor: isDark ? "rgba(51, 65, 85, 0.6)" : "rgba(203, 213, 225, 0.6)" },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        borderColor: "rgba(0, 180, 216, 0.8)",
                        duration: 0.6,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            end: "top 50%",
                            scrub: true
                        }
                    }
                );
            });
        });

        return () => mm.revert();
    }, [items, isDark]);

    return (
        <div 
            ref={sectionRef} 
            className={`w-full relative flex flex-col justify-center overflow-hidden selection:bg-accent selection:text-white ${
                !hideHeader ? (isDark ? "py-16 md:py-24 bg-[#0f172a] text-white" : "min-h-screen bg-slate-50 text-slate-900 py-16 md:py-24 border-t border-slate-200") : ""
            }`}
        >
            <div className={`${!hideHeader ? "max-w-container-max mx-auto px-6 sm:px-8" : ""} w-full`}>
                
                {/* Header (Optional / Backwards Compatible) */}
                {!hideHeader && (
                    <div className="max-w-3xl mb-12 sm:mb-16">
                        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-accent font-mono text-xs font-bold uppercase tracking-widest mb-4 shadow-sm ${
                            isDark ? "bg-slate-800/80 border-slate-700" : "bg-white border-slate-300"
                        }`}>
                            <Activity className="w-3.5 h-3.5 animate-pulse" />
                            <span>INTERIOR QUALITY ASSURANCE PROTOCOL</span>
                        </div>
                        <h2 className={`font-headline text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-tight ${
                            isDark ? "text-white" : "text-slate-900"
                        }`}>
                            THE 3-STAGE <br />
                            <span className="text-accent">HYDROSTATIC JOURNEY.</span>
                        </h2>
                        <p className={`text-sm sm:text-base mt-4 font-medium max-w-xl ${
                            isDark ? "text-slate-300" : "text-slate-600"
                        }`}>
                            Scroll to inspect how every single cast iron sluice gate and industrial fastener is audited at our Howrah manufacturing works before dispatch.
                        </p>
                    </div>
                )}

                {/* Main Interactive Scrub Grid */}
                <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-start">
                    
                    {/* Left Column: Progress Indicator & Narrative Guide (4 cols) */}
                    <div className={`lg:col-span-4 p-6 sm:p-8 rounded-industrial-lg border relative h-full flex flex-col justify-between min-h-[300px] shadow-lg ${
                        isDark ? "bg-slate-800/60 border-slate-700/80 text-white" : "bg-white border-slate-200 text-slate-900"
                    }`}>
                        <div>
                            <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block mb-2">
                                SCROLL POSITION INDEX
                            </span>
                            <h3 className="text-xl font-bold font-headline">
                                Inspection Roadmap
                            </h3>
                            <p className={`text-xs mt-2 leading-relaxed font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                                Our QAP protocol ensures 0% defect tolerance across all {items.length} quality checkpoints.
                            </p>
                        </div>

                        {/* Pinned Scrub Finger Indicator */}
                        <div className={`relative h-48 sm:h-64 border-l-2 my-6 ml-4 pl-6 flex flex-col justify-between font-mono text-xs font-bold ${
                            isDark ? "border-slate-700 text-slate-400" : "border-slate-300 text-slate-500"
                        }`}>
                            {items.map((it) => (
                                <div key={it.num} className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full -ml-[29px] ${isDark ? "bg-slate-500" : "bg-slate-400"}`} />
                                    <span className="truncate">STAGE {it.num} • {it.title.split(" ")[0].toUpperCase()}</span>
                                </div>
                            ))}

                            {/* Traveling Index Finger Indicator */}
                            <div 
                                ref={fingerRef}
                                className="absolute left-0 -ml-[9px] top-[5%] w-4 h-4 rounded-full bg-accent border-2 border-white shadow-lg shadow-accent/50 flex items-center justify-center transition-all"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                            </div>
                        </div>

                        <div className={`pt-4 border-t flex items-center justify-between text-[11px] font-mono font-bold ${
                            isDark ? "border-slate-700/80 text-slate-400" : "border-slate-200 text-slate-500"
                        }`}>
                            <span>STATUS: LIVE AUDIT</span>
                            <ArrowDown className="w-3.5 h-3.5 text-accent animate-bounce" />
                        </div>
                    </div>

                    {/* Right Column: Cards (8 cols) */}
                    <div className="lg:col-span-8 grid grid-cols-1 gap-6 lg:gap-0 relative min-h-[420px]">
                        {items.map((stage, idx) => (
                            <div
                                key={stage.num}
                                ref={(el) => (cardsRef.current[idx] = el)}
                                className={`col-start-1 row-auto lg:col-start-1 lg:row-start-1 p-6 sm:p-10 rounded-industrial-lg border transition-shadow duration-300 shadow-xl ${
                                    isDark ? "bg-slate-800/80 border-slate-700/80 text-white" : "bg-white border-slate-200 text-slate-900"
                                }`}
                            >
                                <div className={`grid grid-cols-1 ${stage.imageUrl !== undefined ? "md:grid-cols-12" : ""} gap-6 items-center mb-6 pb-6 border-b ${
                                    isDark ? "border-slate-700/80" : "border-slate-200"
                                }`}>
                                    {stage.imageUrl !== undefined && (
                                        <div className="md:col-span-5 aspect-[4/3] rounded-xl overflow-hidden border border-slate-700/80 bg-slate-900/60 shadow-inner">
                                            {stage.imageUrl ? (
                                                <img src={stage.imageUrl} alt={stage.alt || stage.title} loading="lazy" className="w-full h-full object-cover" />
                                            ) : (
                                                <Skeleton className="w-full h-full !bg-slate-800/80 !rounded-none" />
                                            )}
                                        </div>
                                    )}
                                    <div className={stage.imageUrl !== undefined ? "md:col-span-7" : "w-full"}>
                                        <div className="flex items-center justify-between gap-4 mb-3">
                                            <div className="flex items-center gap-3">
                                                <span className="font-tabular font-mono text-2xl sm:text-3xl font-black text-accent bg-accent/10 px-3 py-1.5 rounded-industrial-md border border-accent/20">
                                                    {stage.num}
                                                </span>
                                                <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest">
                                                    {stage.subtitle}
                                                </span>
                                            </div>
                                            {!stage.imageUrl && (
                                                <div className={`w-12 h-12 rounded-industrial-md border flex items-center justify-center shrink-0 shadow-sm ${
                                                    isDark ? "bg-slate-900/60 border-slate-700" : "bg-slate-50 border-slate-200"
                                                }`}>
                                                    {stage.icon}
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="text-lg sm:text-2xl font-bold font-headline tracking-tight">
                                            {stage.title}
                                        </h4>
                                    </div>
                                </div>

                                <p className={`text-sm sm:text-base leading-relaxed mb-6 font-normal ${
                                    isDark ? "text-slate-300" : "text-slate-600"
                                }`}>
                                    {stage.desc}
                                </p>

                                <div className={`p-3.5 rounded-industrial-md border flex items-center justify-between text-xs font-mono font-bold ${
                                    isDark ? "bg-slate-900/60 border-slate-700/80 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"
                                }`}>
                                    <span className="text-accent">{stage.spec}</span>
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default PinnedScrubSection;
