import React from 'react';
import { Bolt, Cog, Cpu, FileText, Wrench, ShieldCheck } from 'lucide-react';

const Features = () => {
  return (
    <section className="py-24 bg-surface-container-low dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-2xl">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface dark:text-white tracking-tight mb-4 transition-colors duration-300">Why Choose SK Enterprise</h2>
            <div className="h-1.5 w-24 bg-primary rounded-full"></div>
          </div>
          <p className="text-on-surface-variant dark:text-slate-300 max-w-sm font-medium transition-colors duration-300">Uncompromising standards in engineering, logistics, and material science for mission-critical infrastructure.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature Card 1 */}
          <div className="bg-surface-container-lowest dark:bg-slate-800 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/5 dark:border-white/5">
            <div className="w-14 h-14 rounded-full bg-primary-fixed dark:bg-primary/20 flex items-center justify-center mb-8 transition-colors duration-300 text-primary">
              <Bolt className="w-7 h-7" />
            </div>
            <h3 className="font-headline text-2xl font-bold mb-4 dark:text-white transition-colors duration-300">Fast Track Special Alloy Dispatch</h3>
            <p className="text-on-surface-variant dark:text-slate-300 leading-relaxed transition-colors duration-300">Rapid manufacturing and delivery workflows designed to meet critical project shutdown timelines without compromising hydrostatic integrity.</p>
          </div>
          {/* Feature Card 2 */}
          <div className="bg-surface-container-lowest dark:bg-slate-800 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/5 dark:border-white/5">
            <div className="w-14 h-14 rounded-full bg-primary-fixed dark:bg-primary/20 flex items-center justify-center mb-8 transition-colors duration-300 text-primary">
              <Cog className="w-7 h-7" />
            </div>
            <h3 className="font-headline text-2xl font-bold mb-4 dark:text-white transition-colors duration-300">100% Spares Interchangeability</h3>
            <p className="text-on-surface-variant dark:text-slate-300 leading-relaxed transition-colors duration-300">Comprehensive inventory of precision-engineered spares, stems, wedges, and fasteners manufactured to exact dimensional tolerances.</p>
          </div>
          {/* Feature Card 3 */}
          <div className="bg-surface-container-lowest dark:bg-slate-800 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/5 dark:border-white/5 md:row-span-2 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-full bg-primary-fixed dark:bg-primary/20 flex items-center justify-center mb-8 transition-colors duration-300 text-primary">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="font-headline text-3xl font-bold mb-6 dark:text-white transition-colors duration-300">Advanced Valve Technology</h3>
              <p className="text-on-surface-variant dark:text-slate-300 leading-relaxed mb-6 transition-colors duration-300">Leveraging state-of-the-art CNC machining and custom metallurgy (Ductile Iron, Ni-Resist, SS 316, Super Duplex) to engineer gates that withstand abrasive sewage and saline seawater.</p>
              <div className="p-4 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/10">
                <div className="flex items-center gap-2 font-bold text-primary dark:text-blue-400 mb-1">
                  <ShieldCheck className="w-5 h-5" /> Zero Leakage Guarantee
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">Every gate is subjected to strict seating and unseating pressure tests exceeding AWWA C560 standards.</p>
              </div>
            </div>
            <img className="rounded-lg object-cover w-full h-48 mt-6 shadow-md" alt="Diagram of advanced industrial sensor and valve technology" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0qKqwlnPcTsUlvVU2Ik29EnwuwTvk3DF8GDoLM8wP1fke-yhj7IvHDNEhDfAObieTqyqVSEJYkC1eok7fpTggttl7NjExGUfW177Jss9SYLrIsUsPb-Wen0S_jV6Fdh5ides0cnUL4XDAWxKe3c0Z9Y90hOhwA14E7qI2StsrNblzg-drvFyGD8rN0gT_rLlt6gOB4R1LErCYKv_nkyhv4-sow16MpuDtX1D7Bk5bnGNlYTkRoFGoAsOHTU4irp0uilXio0Hp17Ix"/>
          </div>
          {/* Feature Card 4 */}
          <div className="bg-surface-container-lowest dark:bg-slate-800 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/5 dark:border-white/5">
            <div className="w-14 h-14 rounded-full bg-primary-fixed dark:bg-primary/20 flex items-center justify-center mb-8 transition-colors duration-300 text-primary">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="font-headline text-2xl font-bold mb-4 dark:text-white transition-colors duration-300">Full Audit Documentation</h3>
            <p className="text-on-surface-variant dark:text-slate-300 leading-relaxed transition-colors duration-300">Complete material test certificates (MTC 3.1/3.2), hydrostatic inspection logs, and QAP compliance records for every dispatched unit.</p>
          </div>
          {/* Feature Card 5 */}
          <div className="bg-surface-container-lowest dark:bg-slate-800 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/5 dark:border-white/5">
            <div className="w-14 h-14 rounded-full bg-primary-fixed dark:bg-primary/20 flex items-center justify-center mb-8 transition-colors duration-300 text-primary">
              <Wrench className="w-7 h-7" />
            </div>
            <h3 className="font-headline text-2xl font-bold mb-4 dark:text-white transition-colors duration-300">Tailor-Made Configurations</h3>
            <p className="text-on-surface-variant dark:text-slate-300 leading-relaxed transition-colors duration-300">Custom engineering services including non-standard dimensions, electric/pneumatic actuator integration, and extended spindle assemblies.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
