import React from 'react';

const QualityAssurance = () => {
  return (
    <section className="py-24 bg-surface dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="bg-on-background dark:bg-slate-900 rounded-[2rem] overflow-hidden relative min-h-[500px] flex items-center border border-transparent dark:border-white/10 transition-colors duration-300">
          <div className="absolute inset-0 opacity-40 dark:opacity-30 mix-blend-overlay">
            <img className="w-full h-full object-cover" alt="Technician performing quality inspection on industrial hardware" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmqwCLfLKzsOLB3qUVx2fNL_NMsxlw4MVzJkH3-HQKtgYBUSqcPFSIjb5-prxkbEatt9t1aLZb8fxWa2RDvX6RfhOFuRoxxmFTens06b8RQhYqv4ZFKTQerKh6xLkLFEAp_w55fv9qGz4BuPNbcfeLG3d1QXY82hi6qo578oq1ju0TZJX2QJw8HxKlrcfcaoqMG0g_d_qL4819PkJZrIxYF29BN_RPqg_9tTvLw3cye9vAgkWGmwOx2dtXIma3uex9QlF5zErP9Jrz"/>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-on-background dark:from-slate-900 via-on-background/60 dark:via-slate-900/80 to-transparent"></div>
          <div className="relative z-10 p-12 md:p-24 max-w-3xl">
            <span className="text-primary-fixed font-bold tracking-[0.2em] uppercase text-sm mb-6 block">Our Commitment</span>
            <h2 className="font-headline text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight">Certified Quality Assurance</h2>
            <p className="text-surface-variant dark:text-slate-300 text-xl leading-relaxed mb-12">
              Our proprietary "interior quality assurance system" integrates rigorous testing protocols at every stage of fabrication, ensuring our "zero defects" goal is achieved for every client.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-1 bg-primary h-full"></div>
                <div>
                  <p className="text-white font-bold text-lg">Zero Defects</p>
                  <p className="text-surface-variant/80 dark:text-slate-400 text-sm transition-colors duration-300">Targeted precision through automated inspection.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1 bg-primary h-full"></div>
                <div>
                  <p className="text-white font-bold text-lg">Global Compliance</p>
                  <p className="text-surface-variant/80 dark:text-slate-400 text-sm transition-colors duration-300">Meeting international ASTM and ISO specifications.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityAssurance;
