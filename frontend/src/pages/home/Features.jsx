import React from 'react';
import RevealOnScroll from '../../components/motion/RevealOnScroll';
import { Bolt, Cog, Cpu, FileText, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const capabilities = [
  {
    index: "01",
    eyebrow: "01 · WHY CHOOSE S.K. ENTERPRISE",
    title: "Fast Track Special Alloy Valve",
    description: "Fast track for special alloy valve",
    icon: <Bolt className="w-6 h-6 text-accent" />,
    isFeatured: true
  },
  {
    index: "02",
    eyebrow: "02 · WHY CHOOSE S.K. ENTERPRISE",
    title: "Complete Spare Parts Supply",
    description: "Complete spare parts supply",
    icon: <Cog className="w-6 h-6 text-accent" />
  },
  {
    index: "03",
    eyebrow: "03 · WHY CHOOSE S.K. ENTERPRISE",
    title: "Professional Valve Technology",
    description: "Professional valve technology",
    icon: <Cpu className="w-6 h-6 text-accent" />
  },
  {
    index: "04",
    eyebrow: "04 · WHY CHOOSE S.K. ENTERPRISE",
    title: "All Available Documentation",
    description: "All available documentation",
    icon: <FileText className="w-6 h-6 text-accent" />
  },
  {
    index: "05",
    eyebrow: "05 · WHY CHOOSE S.K. ENTERPRISE",
    title: "Tailor Made Valve Solution",
    description: "Tailor made valve solution",
    icon: <Wrench className="w-6 h-6 text-accent" />
  }
];

const Features = () => {
  return (
    <section className="py-24 md:py-32 bg-white transition-colors duration-300 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-container-max mx-auto px-6 sm:px-8">
        
        {/* Section Header - Cargokite Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-slate-200 pb-12">
          <RevealOnScroll direction="up" delay={0}>
            <div className="max-w-3xl">
              <span className="text-xs font-mono text-accent font-bold uppercase tracking-widest block mb-3">
                WHY CHOOSE S.K. ENTERPRISE
              </span>
              <h2 className="font-headline text-3xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight uppercase leading-tight">
                WHY CHOOSE <br />
                <span className="text-accent font-light">S.K. ENTERPRISE.</span>
              </h2>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll direction="up" delay={0.15}>
            <p className="text-slate-600 max-w-sm font-medium text-sm sm:text-base leading-relaxed border-l-2 border-accent pl-4">
              The company's motto is to deliver the clients with nothing less than best and quality is one such parameter where we make no compromises.
            </p>
          </RevealOnScroll>
        </div>

        {/* Cargokite Scale Contrast Grid: 1 Full-Width Asset + 2x2 Grid */}
        <div className="space-y-8">
          
          {/* Featured Full-Width Blueprint Card (Asset #1) */}
          {capabilities.slice(0, 1).map((cap) => (
            <RevealOnScroll key={cap.index} direction="up" delay={0.1}>
              <div className="bg-white p-8 sm:p-12 md:p-16 rounded-industrial-lg border border-slate-200 hover:border-accent transition-all duration-300 relative overflow-hidden group shadow-lg hover:shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="font-tabular font-mono text-xs font-bold text-slate-500 px-3 py-1 rounded-full">
                        {cap.eyebrow}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-500">ISO 9001 : 2015 Co.</span>
                    </div>

                    <h3 className="font-headline text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase group-hover:text-accent transition-colors">
                      {cap.title}
                    </h3>

                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl font-normal">
                      {cap.description}
                    </p>

                    {cap.highlight && (
                      <div className="p-4 sm:p-5 rounded-industrial-md bg-slate-50 border border-slate-200 flex items-start gap-3.5 max-w-2xl">
                        <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed font-mono">
                          {cap.highlight}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between h-full border-t lg:border-t-0 lg:border-l border-slate-200 pt-6 lg:pt-0 lg:pl-12">
                    <div className="w-16 h-16 rounded-industrial-lg bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-110 group-hover:border-accent transition-all shadow-sm mb-6">
                      {cap.icon}
                    </div>

                    <div className="space-y-4 w-full lg:text-right">
                      <span className="text-xs font-mono font-bold text-slate-500 block">DIRECT FACTORY PRICING</span>
                      <Link 
                        to="/contactus" 
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent hover:bg-accent-hover text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md group-hover:translate-x-1"
                      >
                        <span>Request Priority Dispatch</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </RevealOnScroll>
          ))}

          {/* 2x2 Grid for Remaining Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.slice(1).map((cap, i) => (
              <RevealOnScroll
                key={cap.index}
                direction="up"
                delay={0.15 * (i + 1)}
              >
                <div className="bg-white p-8 sm:p-10 rounded-industrial-lg border border-slate-200 hover:border-accent/80 transition-all duration-300 flex flex-col justify-between h-full group shadow-md hover:shadow-lg">
                  <div>
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                      <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-accent transition-colors">
                        {cap.eyebrow}
                      </span>
                      <div className="w-12 h-12 rounded-industrial-md bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-110 group-hover:border-accent transition-all">
                        {cap.icon}
                      </div>
                    </div>

                    <h3 className="font-headline text-xl sm:text-2xl font-bold mb-4 text-slate-900 tracking-tight group-hover:text-accent transition-colors">
                      {cap.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                      {cap.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono font-bold text-slate-500">
                    <span>ISO 9001 : 2015</span>
                    <span className="text-accent">IAS ACCREDITED</span>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Features;
