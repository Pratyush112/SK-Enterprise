
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../lib/gsap';
import { ChevronDown, ShieldCheck, Award, MapPin } from 'lucide-react';
import Preloader from '../../components/motion/Preloader';
import StampBadge from '../../components/ui/StampBadge';

import hero640 from '../../assets/images/hero-640.webp';
import hero1024 from '../../assets/images/hero-1024.webp';
import hero1600 from '../../assets/images/hero-1600.webp';

const Hero = () => {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  // GSAP Cinematic Animations & Parallax
  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Background parallax on scroll
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 25,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Only trigger entrance animation after preloader completes or if disabled
      if (isPreloaderDone || prefersReducedMotion) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Title lines reveal
        if (titleRef.current) {
          const lines = titleRef.current.querySelectorAll('.hero-line');
          tl.fromTo(
            lines,
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, delay: 0.1 }
          );
        }

        // Content reveal
        if (contentRef.current) {
          const items = contentRef.current.children;
          tl.fromTo(
            items,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
            '-=0.6'
          );
        }
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isPreloaderDone]);

  return (
    <>
      <Preloader onComplete={() => setIsPreloaderDone(true)} />

      <section 
        ref={heroRef} 
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-50 pt-24 pb-36 sm:pb-44 md:pb-48 px-6 sm:px-8 select-none"
      >
        {/* Background Parallax Layer with Contrast Scrim */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div ref={bgRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
            <img 
              className="w-full h-full object-cover opacity-90" 
              alt="SK Enterprise Industrial Valve Manufacturing Works" 
              src={hero1024}
              srcSet={`${hero640} 640w, ${hero1024} 1024w, ${hero1600} 1600w`}
              sizes="100vw"
              width={1600}
              height={2133}
              decoding="async"
            />
          </div>
          {/* Clean Cinematic Scrim - Guaranteeing Bright Typography is 100% Visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/75 via-slate-900/65 to-slate-900/85 backdrop-blur-[1px]"></div>
        </div>

        {/* Floating AMES Stamp Badge */}
        <div className="absolute top-28 right-8 z-20 hidden lg:block">
          <StampBadge text="ISO 9001 : 2015 CERTIFIED CO. • IAS ACCREDITED MSCB-119 • S.K. ENTERPRISE • " />
        </div>

        {/* Main Hero Content - Centered Engineering Gravitas */}
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center mt-8 sm:mt-12">
          
          {/* Eyebrow Badge */}
          <div className="flex flex-col items-center w-full">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-accent/40 text-accent font-mono text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span>ISO 9001 : 2015 Certified Co. • IAS ACCREDITED MSCB-119</span>
            </div>
          </div>

          {/* Masked Headline Reveal - Bright White & Bright Cyan */}
          <h1 ref={titleRef} className="flex flex-col items-center mb-8 font-headline">
            <span className="block overflow-hidden">
              <span className="hero-line block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05] uppercase">
                S.K. ENTERPRISE
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-accent tracking-tight leading-[1.05] uppercase">
                VALVES | COCKS & FITTINGS
              </span>
            </span>
          </h1>

          {/* Subheadline & Trust Indicators */}
          <div ref={contentRef} className="flex flex-col items-center max-w-3xl mx-auto">
            <p className="text-slate-100 text-lg sm:text-xl md:text-2xl leading-relaxed mb-12 font-semibold max-w-3xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Manufacturers of : C.I. | S.S. | G.M. | Valves | Cocks & Fittings. The company's motto is to deliver the clients with nothing less than best and quality is one such parameter where we make no compromises.
            </p>

            {/* Industrial Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl pt-8 border-t border-slate-700/60 text-left">
              <div className="p-5 rounded-industrial-md bg-slate-900/85 border border-slate-700/60 flex items-start gap-3.5 backdrop-blur-md shadow-xl hover:border-accent transition-all group">
                <Award className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Certification</p>
                  <p className="text-base font-bold text-white group-hover:text-accent transition-colors">ISO 9001 : 2015 Certified Co.</p>
                </div>
              </div>

              <div className="p-5 rounded-industrial-md bg-slate-900/85 border border-slate-700/60 flex items-start gap-3.5 backdrop-blur-md shadow-xl hover:border-accent transition-all group">
                <ShieldCheck className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Accreditation</p>
                  <p className="text-base font-bold text-white group-hover:text-accent transition-colors">IAS ACCREDITED MSCB-119</p>
                </div>
              </div>

              <div className="p-5 rounded-industrial-md bg-slate-900/85 border border-slate-700/60 flex items-start gap-3.5 backdrop-blur-md shadow-xl hover:border-accent transition-all group">
                <MapPin className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Products</p>
                  <p className="text-base font-bold text-white group-hover:text-accent transition-colors">Valves | Cocks & Fittings</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cargokite Scroll Cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
          {/* <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500">Scroll to explore</span> */}
          {/* 
          */}
        </div>
      </section>
    </>
  );
};

export default Hero;
