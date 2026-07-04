import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-24 md:pb-24 overflow-hidden transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            ISO 9001:2015 Certified Manufacturing
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface dark:text-white tracking-tight leading-[1.1] mb-6 transition-colors duration-300">
            PRECISION <span className="text-primary">FLOW CONTROL.</span>
          </h1>
          <p className="text-on-surface-variant dark:text-slate-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl transition-colors duration-300 font-medium">
            SK Enterprise engineers mission-critical Sluice Gates, Penstock Gates, and high-tensile industrial fasteners. Designed to exceed IS, BS, and ASTM standards for heavy infrastructure.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-sm font-bold text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span>Zero-Defect Guarantee</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span>100% Hydrostatic Tested</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span>Custom Metallurgy & Alloys</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span>Rapid Spares & Dispatch</li>
          </ul>
          <div className="flex flex-wrap gap-4">
            <Link to="/products" className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-container transition-all hover:-translate-y-1 shadow-xl shadow-primary/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              Explore Catalog
            </Link>
            <Link to="/contactus" className="bg-secondary-container dark:bg-slate-800 text-on-secondary-container dark:text-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-surface-container-highest dark:hover:bg-slate-700 transition-all hover:-translate-y-1 border border-transparent dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              Request Technical Quote
            </Link>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-4 bg-primary/5 dark:bg-primary/20 rounded-[2rem] blur-2xl group-hover:bg-primary/10 dark:group-hover:bg-primary/30 transition-colors duration-500"></div>
          <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl border border-outline-variant/20 dark:border-white/10 transition-colors duration-300">
            <img className="w-full h-full object-cover aspect-[4/3] transform group-hover:scale-105 transition-transform duration-700" alt="Close up of high precision industrial sluice gate machinery" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxtsAiz2WiR5nGVn74m-WPu-psSBMTdGqKcmWe0r_EA-vfK8vbJEDHWrtUOjuJKGVAV3FRrI-YSwIalEY-4UwJcBx2Flx4PIHuWhLRwS37chrmx_SH9SKsVel8hp9krA4krgNEXZao8O-0z4MtyIGNDwCb8GvRmutNu3XE670dEAH1jTVzJzFdn-2ycjCJ4qldhI-Q3OV4Q9ELvQCebJCcZOdKYGNaizQBwT8V-m4AywfzvVIb28LNGJwpMohJWgxL-WzTV9-yiL-V"/>
          </div>
          {/* Blueprint Accent */}
          <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest dark:bg-slate-800 p-6 rounded-xl shadow-xl border border-outline-variant/10 dark:border-white/10 hidden md:block transition-colors duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-fixed dark:bg-primary/20 flex items-center justify-center transition-colors duration-300">
                <span className="material-symbols-outlined text-primary">verified</span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-tighter transition-colors duration-300">Certified precision</p>
                <p className="text-lg font-black font-headline text-primary leading-none transition-colors duration-300">ISO 9001:2015</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Strip */}
      {/* <div className="max-w-screen-2xl mx-auto px-8 mt-20 pt-10 border-t border-outline/10 dark:border-white/10">
        <p className="text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6">
          Trusted by Municipal Corporations, EPC Contractors & Industrial Water Authorities Across India
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          <span className="font-headline font-black text-lg md:text-xl text-slate-600 dark:text-slate-400">WATER BOARDS</span>
          <span className="font-headline font-black text-lg md:text-xl text-slate-600 dark:text-slate-400">EPC PROJECTS</span>
          <span className="font-headline font-black text-lg md:text-xl text-slate-600 dark:text-slate-400">HEAVY INDUSTRY</span>
          <span className="font-headline font-black text-lg md:text-xl text-slate-600 dark:text-slate-400">MUNICIPAL CORP</span>
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
