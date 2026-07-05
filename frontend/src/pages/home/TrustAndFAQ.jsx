import React, { useState, useRef } from 'react';
import RevealOnScroll from '../../components/motion/RevealOnScroll';
import Marquee from '../../components/motion/Marquee';
import { Award, ShieldCheck, CheckCircle2, HelpCircle, Plus, X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const faqs = [
  {
    index: "Q.01",
    question: "What manufacturing standards and certifications does S.K. Enterprise comply with?",
    answer: "All Cast Iron Sluice Gates and Thimble Mounted Gates are engineered and tested in strict accordance with IS:3042 and BS:7775 standards. Our manufacturing facility operates under an ISO 9001:2015 Quality Management System accredited by IAS (MSCB-119), ensuring rigorous quality control from raw casting to final hydrostatic testing."
  },
  {
    index: "Q.02",
    question: "What hydrostatic testing and quality inspection protocols are performed before dispatch?",
    answer: "Every industrial valve and sluice gate undergoes rigorous testing prior to factory dispatch. This includes non-destructive testing (NDT) during raw casting, followed by hydrostatic body strength tests (at 1.5x working pressure) and seat/sealing leakage tests (at 1.1x working pressure) as per IS:3042 protocols. Each valve is stamped with a unique heat number for complete metallurgical traceability."
  },
  {
    index: "Q.03",
    question: "What material grades and metallurgy options are available for sluice gates and valves?",
    answer: "We manufacture across diverse metallurgy specifications: Cast Iron grades FG 200 / FG 260 (IS:210) for heavy-duty structural frames, Stainless Steel grades SS 304 / SS 316 / SS 316L for spindles, fasteners, and penstocks, and Gun Metal (LTB-2 as per IS:318) or EPDM/neoprene rubber for resilient precision sealing."
  },
  {
    index: "Q.04",
    question: "Do you provide custom sizing and tailored engineering solutions for municipal and industrial projects?",
    answer: "Yes. In addition to standard dimensions, we specialize in tailor-made valve and gate solutions. Our engineering team customizes seating vs. unseating head ratings, rising vs. non-rising spindle configurations, extension rod assemblies, and manual/motorized actuation to match exact project BOQ specifications for irrigation boards, water treatment plants (WTPs), sewage treatment plants (STPs), and flood control infrastructure."
  },
  {
    index: "Q.05",
    question: "What documentation and compliance test certificates are provided with orders?",
    answer: "We provide comprehensive technical documentation with every supply, including Material Test Certificates (MTCs) correlating to heat numbers, Hydrostatic Test Guarantee Certificates, General Arrangement (GA) drawings, and IS-standard compliance inspection reports required for municipal and government procurement audits."
  },
  {
    index: "Q.06",
    question: "What is your typical delivery timeline and spare parts availability?",
    answer: "We maintain ex-stock availability for standard industrial valves and fasteners for urgent requirements. For custom fabricated sluice gates and penstocks, we operate on fast-track manufacturing schedules. We also supply a complete range of replacement spares, including high-tensile anchor studs, spindle rods, rubber seals, and operating nut assemblies."
  }
];

const TrustAndFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".trust-card", 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".trust-grid",
          start: "clamp(top 85%)",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: containerRef });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  // JSON-LD FAQ Schema for Google AI Overviews & Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-slate-900 text-white transition-colors duration-300 border-t border-slate-800 relative overflow-hidden">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      {/* Infinite Trust Strip Marquee - Clean Architectural Typography */}
      {/* <div className="mb-24 pb-12 border-b border-slate-800">
        <p className="text-center text-sm font-sans font-bold text-slate-400 uppercase tracking-widest mb-8">
          S.K. ENTERPRISE • ISO 9001 : 2015 CERTIFIED CO. • IAS ACCREDITED MSCB-119
        </p>
        <Marquee speed={35}>
          <span className="font-headline font-black text-xl md:text-2xl text-slate-200 tracking-wider">ISO 9001 : 2015 CERTIFIED CO.</span>
          <span className="text-accent font-bold">•</span>
          <span className="font-headline font-black text-xl md:text-2xl text-slate-200 tracking-wider">IAS ACCREDITED MSCB-119</span>
          <span className="text-accent font-bold">•</span>
          <span className="font-headline font-black text-xl md:text-2xl text-slate-200 tracking-wider">WHY CHOOSE S.K. ENTERPRISE</span>
          <span className="text-accent font-bold">•</span>
        </Marquee>
      </div> */}

      <div className="max-w-container-max mx-auto px-6 sm:px-8">
        
        {/* Certifications & Trust Showcase */}
        <RevealOnScroll direction="up" delay={0}>
          <div className="bg-slate-800/50 rounded-industrial-lg p-8 sm:p-12 md:p-16 border border-slate-700/80 mb-24 shadow-2xl hover:shadow-[0_0_30px_rgba(0,180,216,0.15)] transition-all">
            <div className="text-center max-w-3xl mx-auto mb-16">
              {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-accent/40 text-accent font-mono text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md shadow-lg">
                <Award className="w-3.5 h-3.5" />
                <span>ISO 9001 : 2015 CERTIFIED CO.</span>
              </div> */}
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase mb-4">
                S.K. ENTERPRISE.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                The company's motto is to deliver the clients with nothing less than best and quality is one such parameter where we make no compromises.
              </p>
            </div>

            <div className="trust-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="trust-card bg-slate-900/80 p-6 sm:p-8 rounded-industrial-md border border-slate-700/60 flex items-start gap-4 shadow-lg hover:border-accent transition-colors">
                <div className="w-12 h-12 rounded-industrial-md bg-slate-800 border border-slate-700 text-accent flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-white mb-2">ISO 9001 : 2015 Certified Co.</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">ISO 9001 : 2015 Certified Co.</p>
                </div>
              </div>

              <div className="trust-card bg-slate-900/80 p-6 sm:p-8 rounded-industrial-md border border-slate-700/60 flex items-start gap-4 shadow-lg hover:border-accent transition-colors">
                <div className="w-12 h-12 rounded-industrial-md bg-slate-800 border border-slate-700 text-accent flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-white mb-2">IAS ACCREDITED MSCB-119</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">IAS ACCREDITED Management Systems Certification Body MSCB-119.</p>
                </div>
              </div>

              <div className="trust-card bg-slate-900/80 p-6 sm:p-8 rounded-industrial-md border border-slate-700/60 flex items-start gap-4 shadow-lg hover:border-accent transition-colors">
                <div className="w-12 h-12 rounded-industrial-md bg-slate-800 border border-slate-700 text-accent flex items-center justify-center shrink-0 shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-white mb-2">Manufacturers of :</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">C.I. | S.S. | G.M. | Valves | Cocks & Fittings.</p>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Cargokite FAQ Accordion (+ to × rotation, monospace numbering) */}
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll direction="up" delay={0.1}>
            <div className="text-center mb-16">
              {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-accent font-mono text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md shadow-lg">
                <span>S.K. ENTERPRISE</span>
              </div> */}
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase mb-4">
                FREQUENTLY ASKED QUESTIONS.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-medium">
                Manufacturers of : C.I. | S.S. | G.M. | Valves | Cocks & Fittings.
              </p>
            </div>
          </RevealOnScroll>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <RevealOnScroll key={faq.index} direction="up" delay={0.05 * index}>
                  <div className={`bg-slate-800/60 rounded-industrial-md border transition-all duration-300 overflow-hidden shadow-lg ${isOpen ? 'border-accent ring-1 ring-accent/20 bg-slate-800' : 'border-slate-700/80 hover:border-slate-600'}`}>
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full px-6 sm:px-8 py-6 text-left font-headline font-bold text-base sm:text-lg text-white flex justify-between items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent group"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-tabular font-mono text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded border border-accent/30 shrink-0">
                          {faq.index}
                        </span>
                        <span className="group-hover:text-accent transition-colors">{faq.question}</span>
                      </div>
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-accent text-white border-accent rotate-90 shadow-sm' : 'bg-slate-900 text-slate-400 border-slate-700 group-hover:text-white'}`}>
                        {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-6 sm:px-8 pb-6 pt-2 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-700/80 pl-16 font-normal">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrustAndFAQ;
