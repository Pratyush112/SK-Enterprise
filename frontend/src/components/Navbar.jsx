import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { gsap } from '../lib/gsap';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { pathname } = useLocation();
    const mobileMenuRef = useRef(null);

    // Ensure dark theme is permanently removed and cleared from localStorage
    useEffect(() => {
        document.documentElement.classList.remove('dark');
        if (localStorage.theme === 'dark') {
            localStorage.setItem('theme', 'light');
        }
    }, []);

    // Handle scroll background change
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open & animate menu with GSAP
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            if (mobileMenuRef.current) {
                gsap.fromTo(
                    mobileMenuRef.current,
                    { height: 0, opacity: 0 },
                    { height: 'auto', opacity: 1, duration: 0.35, ease: 'power3.out' }
                );
                gsap.fromTo(
                    mobileMenuRef.current.querySelectorAll('.mobile-nav-item'),
                    { y: 15, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, delay: 0.1, ease: 'power2.out' }
                );
            }
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    // Cargokite trailing period typographic quirk
    const navLinks = [
        { label: 'Home.', path: '/' },
        { label: 'About.', path: '/aboutus' },
        { label: 'Products.', path: '/products' },
        { label: 'Parts.', path: '/parts' },
        { label: 'Contact.', path: '/contactus' }
    ];

    const isActive = (path) => pathname === path;

    return (
        <header 
            role="banner" 
            className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 pt-[env(safe-area-inset-top)] ${
                isScrolled 
                    ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-2.5 shadow-sm' 
                    : 'bg-transparent py-4 sm:py-6'
            }`}
        >
            <nav role="navigation" aria-label="Main Navigation" className="max-w-container-max mx-auto px-6 sm:px-8 flex items-center justify-between font-body">
                {/* Logo & Brand Title */}
                <Link
                    to="/"
                    className="flex items-center gap-3.5 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl py-1 px-1.5 transition-all"
                    aria-label="SK Enterprise Home"
                >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-industrial-md bg-white border border-slate-200 p-1.5 flex items-center justify-center shadow-sm group-hover:border-accent transition-colors">
                        <img 
                            src="/logo.jpg" 
                            alt="SK Enterprise" 
                            className="w-full h-full object-contain rounded-industrial-sm" 
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base sm:text-lg font-black text-accent tracking-wider uppercase font-headline group-hover:text-accent transition-colors leading-tight">
                            SK Enterprise
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-bold text-accent font-mono tracking-normal hidden xs:block">
                            Valves | Cocks & Fittings
                        </span>
                    </div>
                </Link>

                {/* Desktop Center Pill Navigation - Cargokite Editorial Style */}
                <div className="hidden lg:flex items-center bg-slate-100/90 border border-slate-200/80 p-1.5 rounded-full shadow-sm backdrop-blur-md">
                    {navLinks.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={`px-5 py-2 rounded-full font-bold text-xs tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[40px] inline-flex items-center justify-center uppercase ${
                                    active
                                        ? 'bg-accent text-white shadow-md shadow-accent/25'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Right Actions: Quote CTA */}
                <div className="hidden lg:flex items-center gap-3">
                    <Link
                        to="/contactus"
                        className="px-6 py-2.5 rounded-full bg-accent hover:bg-accent-hover text-white font-bold text-xs uppercase tracking-wide shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[40px]"
                    >
                        <span>Get a Quote</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                {/* Mobile Controls (Hamburger) */}
                <div className="flex items-center gap-2 lg:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu-drawer"
                        className="p-2 rounded-industrial-md bg-white border border-slate-200 text-slate-900 hover:border-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent min-w-[40px] min-h-[40px] flex items-center justify-center shadow-sm"
                    >
                        {isMenuOpen ? <X className="w-5 h-5 text-accent" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Drawer with GSAP Animation */}
            {isMenuOpen && (
                <div
                    id="mobile-menu-drawer"
                    ref={mobileMenuRef}
                    className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-2xl overflow-hidden shadow-2xl"
                >
                    <div className="px-6 pt-6 pb-8 space-y-4 max-w-lg mx-auto">
                        <div className="grid grid-cols-1 gap-2">
                            {navLinks.map((item) => {
                                const active = isActive(item.path);
                                return (
                                    <Link
                                        key={item.label}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`mobile-nav-item px-5 py-3.5 rounded-industrial-md font-bold text-sm tracking-wide transition-all flex items-center justify-between uppercase ${
                                            active
                                                ? 'bg-accent/15 text-accent border border-accent/30'
                                                : 'text-slate-800 hover:bg-slate-50 border border-transparent'
                                        }`}
                                    >
                                        <span>{item.label}</span>
                                        {active && <span className="w-2 h-2 rounded-full bg-accent" />}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="mobile-nav-item pt-4 border-t border-slate-200 flex flex-col gap-3">
                            <Link
                                to="/contactus"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full py-3.5 px-5 rounded-full bg-accent hover:bg-accent-hover text-white font-bold text-sm uppercase shadow-lg shadow-accent/25 flex items-center justify-center gap-2"
                            >
                                <ShieldCheck className="w-4 h-4" />
                                <span>Request Custom Quote</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
