import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();

    // Theme state
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

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

    const navLinks = ['Home', 'About Us', 'Sluice Gates', 'Nuts & Bolts', 'Contact Us'];

    const isActive = (path) => {
        const target = path === 'Home' ? '/' : `/${path.toLowerCase().replace(/\s+/g, '')}`;
        return pathname === target;
    };

    return (
        <header className="absolute top-0 w-full z-50 transition-all duration-300">
            <nav className="flex justify-between items-center px-6 md:px-8 py-4 max-w-screen-2xl mx-auto font-headline font-bold tracking-tight">
                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-3 flex-1 transition-colors duration-300"
                >
                    <img src="/logo.jpg" alt="Logo" className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover shadow-sm bg-white" />
                    <span className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        SK Enterprise
                    </span>
                </Link>

                {/* Desktop Navigation - Pill Container */}
                <div className="hidden lg:flex items-center backdrop-blur-xl bg-gray-100/80 dark:bg-white/5 p-1.5 rounded-full border border-gray-200/50 dark:border-white/10 transition-colors duration-300">
                    {navLinks.map((item) => {
                        const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`;
                        const active = isActive(item);
                        return (
                            <Link
                                key={item}
                                to={path}
                                className={`transition-all duration-300 ease-in-out px-6 py-2.5 rounded-full font-semibold text-sm ${
                                    active
                                        ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-fixed'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed hover:bg-gray-200/50 dark:hover:bg-white/5'
                                }`}
                            >
                                {item}
                            </Link>
                        );
                    })}
                </div>

                {/* Right Side Buttons */}
                <div className="hidden lg:flex items-center justify-end gap-3 flex-1">
                    {/* Theme Toggle Button */}
                    <button onClick={toggleTheme} className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100/80 hover:bg-gray-200 transition-colors dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 border border-gray-200/50 dark:border-white/10">
                        <span className="material-symbols-outlined text-[20px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
                    </button>

                    <button className="bg-primary text-white px-7 py-2.5 rounded-full font-bold shadow-lg shadow-primary/20 hover:bg-primary-container hover:text-on-primary-container transition-all hover:-translate-y-0.5 text-sm">
                        Get a Quote
                    </button>
                </div>

                {/* Hamburger (Mobile) */}
                <button
                    className="lg:hidden p-2 rounded-lg text-slate-900 dark:text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden overflow-hidden bg-surface dark:bg-slate-900 border-t border-outline/10 shadow-xl transition-colors duration-300"
                    >
                        <ul className="flex flex-col px-4 py-6 space-y-4 font-headline text-center">
                            {navLinks.map((item) => {
                                const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`;
                                return (
                                    <li key={item}>
                                        <Link
                                            to={path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`block text-lg font-bold transition-all duration-300 py-2 rounded-xl ${
                                                isActive(item)
                                                    ? 'text-primary bg-primary/5'
                                                    : 'text-slate-600 dark:text-slate-400 hover:text-primary'
                                            }`}
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                );
                            })}
                            <li className="pt-4 flex justify-center gap-4">
                                <button onClick={toggleTheme} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 border border-gray-200/50 dark:border-white/10">
                                    <span className="material-symbols-outlined text-[20px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
                                </button>
                                <button className="flex-1 bg-primary text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-primary/20">
                                    Get a Quote
                                </button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
