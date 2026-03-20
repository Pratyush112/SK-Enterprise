import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-on-background dark:bg-black text-white pt-24 pb-12 border-t border-white/5 font-body transition-colors duration-300">
            <div className="max-w-screen-2xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    <div className="space-y-6">
                        <img src="/logo.jpg" alt="logo" className="w-24 h-24 rounded-full" />
                        <h4 className="font-headline text-3xl font-black uppercase tracking-tighter text-white">
                            SK Enterprise
                        </h4>
                        <p className="text-surface-variant/80 dark:text-slate-400 font-medium leading-relaxed max-w-sm transition-colors duration-300">
                            Engineering the future of industrial infrastructure with precision hardware and unyielding reliability.
                        </p>
                    </div>

                    <div>
                        <h5 className="font-headline font-bold text-lg mb-6 text-white tracking-widest uppercase">Products</h5>
                        <ul className="space-y-4">
                            <li><Link to="/products" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 font-medium tracking-wide">Sluice Gates</Link></li>
                            <li><Link to="/parts" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 font-medium tracking-wide">Industrial Fasteners</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-headline font-bold text-lg mb-6 text-white tracking-widest uppercase">Company</h5>
                        <ul className="space-y-4">
                            <li><Link to="/aboutus" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 font-medium tracking-wide">About Us</Link></li>
                            <li><Link to="/quality" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 font-medium tracking-wide">Quality Standards</Link></li>
                            <li><Link to="/contact" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 font-medium tracking-wide">Contact</Link></li>
                            <li><Link to="/WhyUs" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 font-medium tracking-wide">Why SK Enterprise</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-headline font-bold text-lg mb-6 text-white tracking-widest uppercase">Connect</h5>
                        <div className="flex flex-col gap-6 text-sm font-medium transition-colors duration-300">
                            {/* Emails */}
                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-white/5 dark:bg-white/10 group-hover:bg-primary-fixed text-white group-hover:text-on-primary-fixed rounded-full flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm">
                                    <span className="material-symbols-outlined text-[22px]">mail</span>
                                </div>
                                <div className="flex flex-col gap-2 pt-1.5">
                                    <a href="mailto:skenterprise2989@gmail.com" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300">
                                        skenterprise2989@gmail.com
                                    </a>
                                    <a href="mailto:saha.biswa2013@gmail.com" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300">
                                        saha.biswa2013@gmail.com
                                    </a>
                                </div>
                            </div>

                            {/* Phones */}
                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-white/5 dark:bg-white/10 group-hover:bg-primary-fixed text-white group-hover:text-on-primary-fixed rounded-full flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm">
                                    <span className="material-symbols-outlined text-[22px]">call</span>
                                </div>
                                <div className="flex flex-col gap-2 pt-1.5">
                                    <a href="tel:+918296631533" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300">
                                        +91 82966 31533
                                    </a>
                                    <a href="tel:+919748028331" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300">
                                        +91 97480 28331
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 dark:border-white/5 flex flex-col md:flex-row justify-center items-center gap-4 transition-colors duration-300">
                    <p className="text-surface-variant/60 dark:text-slate-500 text-sm font-medium transition-colors duration-300">
                        &copy; {new Date().getFullYear()} SK Enterprise. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
