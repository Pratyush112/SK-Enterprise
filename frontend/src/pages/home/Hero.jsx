import React from 'react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="z-10">
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface dark:text-white tracking-tight leading-[1.1] mb-8 transition-colors duration-300">
            OUR <span className="text-primary">MOTO.</span>
          </h1>
          <p className="text-on-surface-variant dark:text-slate-300 text-xl leading-relaxed mb-10 max-w-xl transition-colors duration-300">
            SK Enterprise moto is to deliver the clients nothing less that the best quality with not compromise, delivering quality that exceeds industry standards.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-container transition-all hover:-translate-y-1 shadow-xl shadow-primary/25">
              Explore Products
            </button>
            <button className="bg-secondary-container dark:bg-slate-800 text-on-secondary-container dark:text-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-surface-container-highest dark:hover:bg-slate-700 transition-all hover:-translate-y-1 border border-transparent dark:border-white/10">
              Get a Quote
            </button>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-4 bg-primary/5 dark:bg-primary/20 rounded-[2rem] blur-2xl group-hover:bg-primary/10 dark:group-hover:bg-primary/30 transition-colors duration-500"></div>
          <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl border border-outline-variant/20 dark:border-white/10 transition-colors duration-300">
            <img className="w-full h-full object-cover aspect-[4/3] transform group-hover:scale-105 transition-transform duration-700" alt="Close up of high precision industrial valve machinery" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxtsAiz2WiR5nGVn74m-WPu-psSBMTdGqKcmWe0r_EA-vfK8vbJEDHWrtUOjuJKGVAV3FRrI-YSwIalEY-4UwJcBx2Flx4PIHuWhLRwS37chrmx_SH9SKsVel8hp9krA4krgNEXZao8O-0z4MtyIGNDwCb8GvRmutNu3XE670dEAH1jTVzJzFdn-2ycjCJ4qldhI-Q3OV4Q9ELvQCebJCcZOdKYGNaizQBwT8V-m4AywfzvVIb28LNGJwpMohJWgxL-WzTV9-yiL-V"/>
          </div>
          {/* Blueprint Accent */}
          <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest dark:bg-slate-800 p-6 rounded-xl shadow-xl border border-outline-variant/10 dark:border-white/10 hidden md:block transition-colors duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-fixed dark:bg-primary/20 flex items-center justify-center transition-colors duration-300">
                <span className="material-symbols-outlined text-primary">settings</span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-tighter transition-colors duration-300">Certified precision</p>
                <p className="text-lg font-black font-headline text-primary leading-none transition-colors duration-300">ISO 9001:2015</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
