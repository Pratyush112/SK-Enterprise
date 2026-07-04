import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowRight, ShieldCheck } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();

    // Theme state initialized from system preference or localStorage
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return true;
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const toggleTheme = () => {
        const nextTheme = !isDark;
        setIsDark(nextTheme);
        if (nextTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'About Us', path: '/aboutus' },
        { label: 'Products', path: '/products' },
        { label: 'Parts', path: '/parts' },
        { label: 'Contact Us', path: '/contactus' }
    ];

    const isActive = (path) => pathname === path;

    return (
        <header className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 transition-colors duration-300 pt-[env(safe-area-inset-top)]">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between font-sans">
                {/* Logo & Brand Title */}
                <Link
                    to="/"
                    className="flex items-center gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl py-1 px-1.5 transition-all"
                    aria-label="SK Enterprise Home"
                >
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-slate-900 border border-slate-800 p-1 flex items-center justify-center shadow-md group-hover:border-blue-500/50 transition-colors">
                        <img 
                            src="/logo.jpg" 
                            alt="SK Enterprise" 
                            className="w-full h-full object-contain rounded-lg" 
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base sm:text-lg font-black text-white tracking-wider uppercase font-headline group-hover:text-blue-400 transition-colors leading-tight">
                            SK Enterprise
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 font-mono tracking-normal hidden xs:block">
                            Flow Control Systems
                        </span>
                    </div>
                </Link>

                {/* Desktop Center Pill Navigation */}
                <div className="hidden lg:flex items-center bg-slate-900/80 border border-slate-800/80 p-1.5 rounded-full shadow-inner">
                    {navLinks.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={`px-5 py-2 rounded-full font-semibold text-xs transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                                    active
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Right Actions: Theme Toggle & Quote CTA */}
                <div className="hidden lg:flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                        className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
                    </button>

                    <Link
                        to="/contactus"
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 transition-all flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                        <span>Get a Quote</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                {/* Mobile Controls (Theme Toggle + Hamburger) */}
                <div className="flex items-center gap-2 lg:hidden">
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                        className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                        {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
                    </button>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu-drawer"
                        className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    >
                        {isMenuOpen ? <X className="w-6 h-6 text-blue-400" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        id="mobile-menu-drawer"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="lg:hidden border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-2xl overflow-hidden shadow-2xl"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-3 max-w-lg mx-auto">
                            <div className="grid grid-cols-1 gap-1.5">
                                {navLinks.map((item) => {
                                    const active = isActive(item.path);
                                    return (
                                        <Link
                                            key={item.label}
                                            to={item.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-between ${
                                                active
                                                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                                                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                                            }`}
                                        >
                                            <span>{item.label}</span>
                                            {active && <span className="w-2 h-2 rounded-full bg-blue-400" />}
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
                                <Link
                                    to="/contactus"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
                                >
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Request Custom Quote</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
