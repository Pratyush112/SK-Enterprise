import React from 'react';
import { Link } from 'react-router-dom';
import RevealOnScroll from './motion/RevealOnScroll';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

const Footer = () => {
    return (
        <footer role="contentinfo" aria-label="Site Footer" className="bg-slate-50 text-slate-800 pt-24 pb-12 border-t border-slate-200 font-body transition-colors duration-300 relative overflow-hidden">
            {/* Background subtle industrial pattern / glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-container-max mx-auto px-6 sm:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
                    <RevealOnScroll direction="up" delay={0}>
                        <div className="space-y-6">
                            <div className="flex items-center gap-3.5">
                                <img src="/logo.jpg" alt="SK Enterprise Logo" className="w-14 h-14 rounded-industrial-md object-cover shadow-md bg-white p-1 border border-slate-200" />
                                <div>
                                    <h4 className="font-headline text-xl font-black uppercase tracking-wider text-slate-900">
                                        SK Enterprise
                                    </h4>
                                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest block">Est. 1990s</span>
                                </div>
                            </div>
                            
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider border border-accent/20">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>ISO 9001 : 2015 Certified Co.</span>
                            </div>
                            
                            <p className="text-slate-600 font-normal leading-relaxed max-w-sm text-sm">
                                Manufacturers of : C.I. | S.S. | G.M. | Valves | Cocks & Fittings. The company's motto is to deliver the clients with nothing less than best and quality is one such parameter where we make no compromises.
                            </p>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll direction="up" delay={0.1}>
                        <div>
                            <h5 className="font-headline font-bold text-xs mb-6 text-slate-900 tracking-widest uppercase flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                                <span>Products</span>
                            </h5>
                            <ul className="space-y-3 text-sm">
                                <li><Link to="/products" className="text-slate-600 hover:text-accent transition-colors duration-200 font-bold inline-flex items-center gap-1 group uppercase"><span>Cast Iron Sluice Gates</span><ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                                <li><Link to="/products" className="text-slate-600 hover:text-accent transition-colors duration-200 font-bold inline-flex items-center gap-1 group uppercase"><span>Penstock Gates</span><ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                                <li><Link to="/parts" className="text-slate-600 hover:text-accent transition-colors duration-200 font-bold inline-flex items-center gap-1 group uppercase"><span>Industrial Fasteners</span><ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                                <li><Link to="/parts" className="text-slate-600 hover:text-accent transition-colors duration-200 font-bold inline-flex items-center gap-1 group uppercase"><span>High-Tensile Stud Bolts</span><ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                                <li><Link to="/parts" className="text-slate-600 hover:text-accent transition-colors duration-200 font-bold inline-flex items-center gap-1 group uppercase"><span>SS 316 / B7/2H Nuts</span><ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                            </ul>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll direction="up" delay={0.2}>
                        <div>
                            <h5 className="font-headline font-bold text-xs mb-6 text-slate-900 tracking-widest uppercase flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                                <span>Company</span>
                            </h5>
                            <ul className="space-y-3 text-sm">
                                <li><Link to="/aboutus" className="text-slate-600 hover:text-accent transition-colors duration-200 font-bold inline-flex items-center uppercase">About Us</Link></li>
                                <li><Link to="/quality" className="text-slate-600 hover:text-accent transition-colors duration-200 font-bold inline-flex items-center uppercase">Quality Assurance</Link></li>
                                <li><Link to="/WhyUs" className="text-slate-600 hover:text-accent transition-colors duration-200 font-bold inline-flex items-center uppercase">Why Choose Us</Link></li>
                                <li><Link to="/productcategories" className="text-slate-600 hover:text-accent transition-colors duration-200 font-bold inline-flex items-center uppercase">Solution Categories</Link></li>
                                <li><Link to="/contactus" className="text-slate-600 hover:text-accent transition-colors duration-200 font-bold inline-flex items-center uppercase">Technical Helpdesk</Link></li>
                            </ul>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll direction="up" delay={0.3}>
                        <div>
                            <h5 className="font-headline font-bold text-xs mb-6 text-slate-900 tracking-widest uppercase flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                                <span>Direct Technical Helpdesk</span>
                            </h5>
                            <div className="flex flex-col gap-5 text-sm">
                                {/* Emails */}
                                <div className="flex items-start gap-3.5 group">
                                    <div className="w-10 h-10 bg-white border border-slate-200 group-hover:border-accent text-slate-800 group-hover:text-accent rounded-industrial-md flex items-center justify-center shrink-0 transition-all shadow-sm">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col gap-1 pt-0.5 font-mono text-xs">
                                        <a href="mailto:skenterprise2989@gmail.com" className="text-slate-600 hover:text-accent transition-colors">
                                            skenterprise2989@gmail.com
                                        </a>
                                        <a href="mailto:saha.biswa2013@gmail.com" className="text-slate-600 hover:text-accent transition-colors">
                                            saha.biswa2013@gmail.com
                                        </a>
                                    </div>
                                </div>

                                {/* Phones */}
                                <div className="flex items-start gap-3.5 group">
                                    <div className="w-10 h-10 bg-white border border-slate-200 group-hover:border-accent text-slate-800 group-hover:text-accent rounded-industrial-md flex items-center justify-center shrink-0 transition-all shadow-sm">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col gap-1 pt-0.5 font-mono text-xs">
                                        <a href="tel:+918296631533" className="text-slate-600 hover:text-accent transition-colors">
                                            +91 82966 31533
                                        </a>
                                        <a href="tel:+919748028331" className="text-slate-600 hover:text-accent transition-colors">
                                            +91 97480 28331
                                        </a>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-3.5 group">
                                    <div className="w-10 h-10 bg-white border border-slate-200 group-hover:border-accent text-slate-800 group-hover:text-accent rounded-industrial-md flex items-center justify-center shrink-0 transition-all shadow-sm">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col gap-1 pt-0.5 text-xs text-slate-600">
                                        <span>Howrah Manufacturing Facility</span>
                                        <span className="font-mono text-[11px]">West Bengal, India (GST Reg.)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>

                <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
                    <p>
                        &copy; {new Date().getFullYear()} SK Enterprise. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span>IS 3042 / BS 7775 Compliant</span>
                        <span>•</span>
                        <span>100% Hydrostatic Tested</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
