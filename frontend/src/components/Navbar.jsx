import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();

    const navLinks = ['Home', 'About', 'Sluice Gates', 'Nuts & Bolts', 'Contact Us'];

    const isActive = (path) => {
        const target = path === 'Home' ? '/' : `/${path.toLowerCase().replace(/\s+/g, '')}`;
        return pathname === target;
    };

    return (
        <header className="w-full absolute top-0 z-50 bg-white/75 backdrop-blur-xl border-b border-blue-100/50 shadow-sm shadow-blue-100/20">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6 relative">
                <div className="flex flex-wrap justify-between items-center gap-x-8">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 bg-[length:200%] bg-clip-text text-transparent hover:animate-shimmer drop-shadow-sm transition-all duration-500 order-1"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                        SK Enterprise
                    </Link>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden md:flex justify-center flex-grow order-2">
                        <ul className="flex gap-6 font-medium text-base items-center text-gray-600">
                            {navLinks.map((item) => {
                                const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`;
                                return (
                                    <li key={item}>
                                        <Link
                                            to={path}
                                            className={`px-4 py-2.5 rounded-lg transition-all duration-300 ${
                                                isActive(item)
                                                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50/50 text-blue-600 font-semibold shadow-sm'
                                                    : 'hover:bg-blue-50/50 hover:text-blue-600 hover:scale-105'
                                            }`}
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Hamburger */}
                    <button
                        className="md:hidden p-2.5 rounded-lg hover:bg-blue-50/50 text-gray-700 order-3 transition-all duration-300"
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
                </div>

                {/* Mobile Menu with enhanced styling */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-lg mt-4 rounded-xl border border-blue-100/50 shadow-lg"
                        >
                            <ul className="flex flex-col px-4 py-3 space-y-1.5">
                                {navLinks.map((item) => {
                                    const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`;
                                    return (
                                        <li key={item}>
                                            <Link
                                                to={path}
                                                onClick={() => setIsMenuOpen(false)}
                                                className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                                                    isActive(item)
                                                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50/50 text-blue-600 font-semibold'
                                                        : 'hover:bg-blue-50/50 hover:text-blue-600'
                                                }`}
                                            >
                                                {item}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};

export default Navbar;

