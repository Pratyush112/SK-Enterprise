import React from 'react';
import RevealOnScroll from '../../components/motion/RevealOnScroll';
import PinnedScrubSection from '../../components/motion/PinnedScrubSection';
import { ShieldCheck, Activity, Shield } from 'lucide-react';

const stats = [
  { value: "Zero", label: "Defect Goal", sub: "CONTINUOUS IMPROVEMENT" },
  { value: "100%", label: "Quality Assurance", sub: "OVERALL MANAGEMENT" },
  { value: "1 by 1", label: "Tested Valves", sub: "STRENGTH & SEAL TEST" },
  { value: "ISO", label: "9001 : 2015 Co.", sub: "CERTIFIED PROGRAM" }
];

const QualityAssurance = () => {
  return (
    <div className="bg-white">
      {/* Top Stat Counters Section */}
      <section className="py-20 md:py-28 bg-white text-slate-900 relative border-t border-slate-200">
        <div className="max-w-container-max mx-auto px-6 sm:px-8">
          
          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 border-b border-slate-200 pb-12">
            <div className="lg:col-span-7">
              <RevealOnScroll direction="up" delay={0}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-accent font-mono text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>maintains a fully implemented certified Quality Assurance and Quality Control</span>
                </div>
                <h2 className="font-headline text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-[1.08] text-slate-900">
                  Quality <br />
                  <span className="text-accent">Control</span>.
                </h2>
              </RevealOnScroll>
            </div>

            <div className="lg:col-span-5">
              <RevealOnScroll direction="up" delay={0.15}>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed border-l-2 border-accent pl-6 font-medium">
                  S.K. Enterprise's Quality Goal: Continuous improvement & Zero defect, Meeting and even exceeding the quality and service needs of customers.
                </p>
              </RevealOnScroll>
            </div>
          </div>

          {/* Industrial Stat Counters - Bright & Crisp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, idx) => (
              <RevealOnScroll
                key={stat.label}
                direction="up"
                delay={0.1 * idx}
              >
                <div className="p-8 rounded-industrial-lg bg-white border border-slate-200 hover:border-accent transition-all group flex flex-col justify-between h-full shadow-lg hover:shadow-xl">
                  <div>
                    <span className="font-tabular font-headline text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 group-hover:text-accent transition-colors block mb-3">
                      {stat.value}
                    </span>
                    <span className="font-bold text-base text-slate-900 block mb-2">
                      {stat.label}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-accent pt-4 border-t border-slate-200 block mt-6 font-bold">
                    {stat.sub}
                  </span>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Exact PDF Page 4 Paragraphs */}
          <RevealOnScroll direction="up" delay={0.2}>
            <div className="bg-slate-50 p-8 sm:p-12 rounded-industrial-lg border border-slate-200 space-y-6 text-slate-700 leading-relaxed font-normal shadow-md">
              <p className="text-base sm:text-lg">
                We own interior quality assurance system, implementing overall quality management in the whole process. Every and each valve has a unique heat number to achieve traceability. All raw materials must carry on the material composition and mechanical performance review before entering the factory, to completely eradicate unqualified materials. Non-destructive testing for valve pipes is necessary before and during raw material processing. Valves should pass valve body strength test, hydraulic pressure seal test and gas seal test one by one before leaving factory. Besides, valves for specific application need more tests, to guarantee all products are all qualified before delivery
              </p>
              <p className="text-base sm:text-lg border-t border-slate-200 pt-6 font-semibold text-slate-900">
                Except internal severe work system and workflow, there are also the third-party certification authority and customer approval to ensure quality. S.K. Enterprise
              </p>
            </div>
          </RevealOnScroll>

        </div>
      </section>

      {/* AMES Pinned Scrollytelling Section */}
      {/* <PinnedScrubSection /> */}
    </div>
  );
};

export default QualityAssurance;
