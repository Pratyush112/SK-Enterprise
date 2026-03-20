import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-on-background dark:bg-black text-white pt-24 pb-12 border-t border-white/5 font-body transition-colors duration-300">
            <div className="max-w-screen-2xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    <div className="space-y-6">
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
                            <li><Link to="/about" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 font-medium tracking-wide">About Us</Link></li>
                            <li><Link to="/quality" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 font-medium tracking-wide">Quality Standards</Link></li>
                            <li><Link to="/contact" className="text-surface-variant/80 dark:text-slate-400 hover:text-primary-fixed dark:hover:text-primary transition-colors duration-300 font-medium tracking-wide">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-headline font-bold text-lg mb-6 text-white tracking-widest uppercase">Connect</h5>
                        <div className="flex gap-4">
                            <a href="#" className="w-12 h-12 bg-white/5 dark:bg-white/10 hover:bg-primary-fixed text-white hover:text-on-primary-fixed rounded-full flex items-center justify-center transition-all duration-300">
                                <span className="material-symbols-outlined">share</span>
                            </a>
                            <a href="#" className="w-12 h-12 bg-white/5 dark:bg-white/10 hover:bg-primary-fixed text-white hover:text-on-primary-fixed rounded-full flex items-center justify-center transition-all duration-300">
                                <span className="material-symbols-outlined">mail</span>
                            </a>
                        </div>
                        <p className="mt-6 text-surface-variant/80 dark:text-slate-400 font-medium text-sm transition-colors duration-300">
                            skenterprise2989@gmail.com <br/> saha.biswa2013@gmail.com  <br/>
                            +91 8296631533 <br/> +91 9748028331
                        </p>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors duration-300">
                    <p className="text-surface-variant/60 dark:text-slate-500 text-sm font-medium transition-colors duration-300">
                        &copy; {new Date().getFullYear()} SK Enterprise. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-surface-variant/60 dark:text-slate-500 font-medium">
                        <Link to="#" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
                        <Link to="#" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
