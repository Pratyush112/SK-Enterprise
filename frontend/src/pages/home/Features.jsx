import React from 'react';

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
            <div className="w-14 h-14 rounded-full bg-primary-fixed dark:bg-primary/20 flex items-center justify-center mb-8 transition-colors duration-300">
              <span className="material-symbols-outlined text-primary text-3xl">bolt</span>
            </div>
            <h3 className="font-headline text-2xl font-bold mb-4 dark:text-white transition-colors duration-300">Fast Track for Special Alloy Valve</h3>
            <p className="text-on-surface-variant dark:text-slate-300 leading-relaxed transition-colors duration-300">Rapid delivery systems designed to meet critical timelines without compromising component integrity.</p>
          </div>
          {/* Feature Card 2 */}
          <div className="bg-surface-container-lowest dark:bg-slate-800 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/5 dark:border-white/5">
            <div className="w-14 h-14 rounded-full bg-primary-fixed dark:bg-primary/20 flex items-center justify-center mb-8 transition-colors duration-300">
              <span className="material-symbols-outlined text-primary text-3xl">precision_manufacturing</span>
            </div>
            <h3 className="font-headline text-2xl font-bold mb-4 dark:text-white transition-colors duration-300">Spare Parts Supply</h3>
            <p className="text-on-surface-variant dark:text-slate-300 leading-relaxed transition-colors duration-300">Comprehensive inventory of precision-engineered spares for global maintenance support.</p>
          </div>
          {/* Feature Card 3 */}
          <div className="bg-surface-container-lowest dark:bg-slate-800 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/5 dark:border-white/5 md:row-span-2 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-full bg-primary-fixed dark:bg-primary/20 flex items-center justify-center mb-8 transition-colors duration-300">
                <span className="material-symbols-outlined text-primary text-3xl">biotech</span>
              </div>
              <h3 className="font-headline text-3xl font-bold mb-6 dark:text-white transition-colors duration-300">Professional Valve Technology</h3>
              <p className="text-on-surface-variant dark:text-slate-300 leading-relaxed mb-8 transition-colors duration-300">Leveraging the latest in industrial automation and metallurgy to produce components that withstand extreme environments.</p>
            </div>
            <img className="rounded-lg object-cover w-full h-48 mt-4" alt="Diagram of advanced industrial sensor technology" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0qKqwlnPcTsUlvVU2Ik29EnwuwTvk3DF8GDoLM8wP1fke-yhj7IvHDNEhDfAObieTqyqVSEJYkC1eok7fpTggttl7NjExGUfW177Jss9SYLrIsUsPb-Wen0S_jV6Fdh5ides0cnUL4XDAWxKe3c0Z9Y90hOhwA14E7qI2StsrNblzg-drvFyGD8rN0gT_rLlt6gOB4R1LErCYKv_nkyhv4-sow16MpuDtX1D7Bk5bnGNlYTkRoFGoAsOHTU4irp0uilXio0Hp17Ix"/>
          </div>
          {/* Feature Card 4 */}
          <div className="bg-surface-container-lowest dark:bg-slate-800 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/5 dark:border-white/5">
            <div className="w-14 h-14 rounded-full bg-primary-fixed dark:bg-primary/20 flex items-center justify-center mb-8 transition-colors duration-300">
              <span className="material-symbols-outlined text-primary text-3xl">description</span>
            </div>
            <h3 className="font-headline text-2xl font-bold mb-4 dark:text-white transition-colors duration-300">Full Documentation</h3>
            <p className="text-on-surface-variant dark:text-slate-300 leading-relaxed transition-colors duration-300">Complete traceability and compliance documentation for every engineered solution.</p>
          </div>
          {/* Feature Card 5 */}
          <div className="bg-surface-container-lowest dark:bg-slate-800 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/5 dark:border-white/5">
            <div className="w-14 h-14 rounded-full bg-primary-fixed dark:bg-primary/20 flex items-center justify-center mb-8 transition-colors duration-300">
              <span className="material-symbols-outlined text-primary text-3xl">architecture</span>
            </div>
            <h3 className="font-headline text-2xl font-bold mb-4 dark:text-white transition-colors duration-300">Tailor-Made Valve Solutions</h3>
            <p className="text-on-surface-variant dark:text-slate-300 leading-relaxed transition-colors duration-300">Custom engineering services to address unique project specifications and constraints.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
