import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer role="contentinfo" aria-label="Site Footer" className="bg-on-background dark:bg-black text-white pt-24 pb-12 border-t border-white/5 font-body transition-colors duration-300">
            <div className="max-w-screen-2xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    <div className="space-y-6">
                        <img src="/logo.jpg" alt="SK Enterprise Logo" className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-md bg-white p-1" />
                        <h4 className="font-headline text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
                            SK Enterprise
                        </h4>
                        <div className="inline-block px-3 py-1 rounded bg-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/30">
                            ISO 9001:2015 Certified Works
                        </div>
                        <p className="text-surface-variant/80 dark:text-slate-400 font-medium leading-relaxed max-w-sm transition-colors duration-300 text-sm">
                            Premier manufacturer of mission-critical Sluice Gates, Penstock Gates, and high-tensile industrial fasteners for water boards and heavy infrastructure.
                        </p>
                    </div>

                    <div>
                        <h5 className="font-headline font-bold text-lg mb-6 text-white tracking-widest uppercase">Products</h5>
                        <ul className="space-y-2">
                            <li><Link to="/products" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 font-medium tracking-wide min-h-[44px] inline-flex items-center">Sluice Gates</Link></li>
                            <li><Link to="/products" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 font-medium tracking-wide min-h-[44px] inline-flex items-center">Penstock Gates</Link></li>
                            <li><Link to="/parts" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 font-medium tracking-wide min-h-[44px] inline-flex items-center">Industrial Fasteners</Link></li>
                            <li><Link to="/parts" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 font-medium tracking-wide min-h-[44px] inline-flex items-center">Custom Stud Bolts</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-headline font-bold text-lg mb-6 text-white tracking-widest uppercase">Company</h5>
                        <ul className="space-y-2">
                            <li><Link to="/aboutus" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 font-medium tracking-wide min-h-[44px] inline-flex items-center">About Us</Link></li>
                            <li><Link to="/quality" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 font-medium tracking-wide min-h-[44px] inline-flex items-center">Quality Assurance</Link></li>
                            <li><Link to="/contactus" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 font-medium tracking-wide min-h-[44px] inline-flex items-center">Technical Helpdesk</Link></li>
                            <li><Link to="/WhyUs" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 font-medium tracking-wide min-h-[44px] inline-flex items-center">Why Choose Us</Link></li>
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
                                <div className="flex flex-col gap-1 pt-1.5">
                                    <a href="mailto:skenterprise2989@gmail.com" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 min-h-[32px] inline-flex items-center">
                                        skenterprise2989@gmail.com
                                    </a>
                                    <a href="mailto:saha.biswa2013@gmail.com" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 min-h-[32px] inline-flex items-center">
                                        saha.biswa2013@gmail.com
                                    </a>
                                </div>
                            </div>

                            {/* Phones */}
                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-white/5 dark:bg-white/10 group-hover:bg-primary-fixed text-white group-hover:text-on-primary-fixed rounded-full flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm">
                                    <span className="material-symbols-outlined text-[22px]">call</span>
                                </div>
                                <div className="flex flex-col gap-1 pt-1.5">
                                    <a href="tel:+918296631533" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 min-h-[32px] inline-flex items-center">
                                        +91 82966 31533
                                    </a>
                                    <a href="tel:+919748028331" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 min-h-[32px] inline-flex items-center">
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
