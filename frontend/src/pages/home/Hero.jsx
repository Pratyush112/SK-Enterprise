import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api'; // Import your axios API instanc

const Hero = () => {

  const [heroImg, setHeroImg] = useState('https://storage.googleapis.com/sk-enterprise/Website-hero-image/Website%20Image.jpeg');

  useEffect(() => {
    const fetchHeroImageFromMongo = async() => {
      try{
       // Replace '/settings/hero' with your actual backend endpoint route
        const response = await api.get('/settings/hero'); 
        
        // Assuming your backend sends JSON like: { heroImage: "https://storage.googleapis.com/..." }
        if (response.data && response.data.heroImage) {
          setHeroImg(response.data.heroImage);
        } 
      } catch (error) {
        console.error("Failed to fetch Hero image from MongoDB:", error);
        // Will seamlessly fallback to the default image if API fails
      }
    };
    fetchHeroImageFromMongo();
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-24 md:pb-24 overflow-hidden transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold text-xs uppercase tracking-wider mb-6 border border-blue-200/60 dark:border-blue-800/60 shadow-sm transition-all duration-300">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
            ISO 9001:2015 Certified Manufacturing
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6 transition-colors duration-300">
            PRECISION <span className="text-blue-600 dark:text-blue-400">FLOW CONTROL.</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl transition-colors duration-300 font-medium">
            SK Enterprise (Est. 1990s) manufactures mission-critical Cast Iron Sluice Gates, Penstock Gates, and high-tensile industrial fasteners at our Howrah facility. Designed to exceed IS 3042, BS 7775, and AWWA C501 standards.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10 text-sm font-bold text-slate-800 dark:text-slate-200">
            <li className="flex items-center gap-2.5"><span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0"></span>30+ Years Heritage (Est. 1990s)</li>
            <li className="flex items-center gap-2.5"><span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0"></span>Howrah Works & GST Registered</li>
            <li className="flex items-center gap-2.5"><span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0"></span>100% Hydrostatic Tested to IS:3042</li>
            <li className="flex items-center gap-2.5"><span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0"></span>Cast Iron FG 200/260 & SS 316</li>
            <li className="flex items-center gap-2.5"><span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0"></span>Proprietor: Mr. Biswajit Saha</li>
            <li className="flex items-center gap-2.5"><span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0"></span>Rapid Spares & BOQ Tender Support</li>
          </ul>
          <div className="flex flex-wrap gap-4">
            <Link to="/products" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-500 transition-all hover:-translate-y-1 shadow-xl shadow-blue-600/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 min-h-[48px] flex items-center justify-center">
              Explore Catalog
            </Link>
            <Link to="/contactus" className="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-all hover:-translate-y-1 border border-transparent dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 min-h-[48px] flex items-center justify-center">
              Request Technical Quote
            </Link>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-4 bg-primary/5 dark:bg-primary/20 rounded-[2rem] blur-2xl group-hover:bg-primary/10 dark:group-hover:bg-primary/30 transition-colors duration-500"></div>
          <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl border border-outline-variant/20 dark:border-white/10 transition-colors duration-300">
            <img className="w-full h-full object-cover aspect-[4/3] transform transition-transform duration-700" alt="hero image" src={heroImg}/>
          </div>
          {/* Blueprint Accent */}
          <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 hidden md:block transition-all duration-300 backdrop-blur-md z-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center border border-blue-100 dark:border-blue-800/50 shrink-0 transition-colors duration-300">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl">verified</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 transition-colors duration-300">Certified precision</p>
                <p className="text-lg font-black font-headline text-blue-600 dark:text-blue-400 leading-none transition-colors duration-300">ISO 9001:2015</p>
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
