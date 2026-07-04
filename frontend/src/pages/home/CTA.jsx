import React from 'react';
import { Link } from 'react-router-dom';
import RevealOnScroll from '../../components/motion/RevealOnScroll';
import { ArrowRight, ShieldCheck, PhoneCall, Mail } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-24 md:py-32 bg-white text-slate-900 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-container-max mx-auto px-6 sm:px-8 relative z-10">
        
        <RevealOnScroll direction="up" delay={0}>
          <div className="bg-slate-50 rounded-industrial-lg p-8 sm:p-14 md:p-20 border border-slate-200 relative overflow-hidden shadow-xl hover:shadow-2xl transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Heading & Gravitas */}
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-300 text-accent font-mono text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ISO 9001 : 2015 CERTIFIED CO.</span>
                </div>

                <h2 className="font-headline text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-[1.08] text-slate-900">
                  OUR <br />
                  <span className="text-accent">MOTTO.</span>
                </h2>

                <p className="text-slate-600 text-base sm:text-lg max-w-2xl font-medium leading-relaxed">
                  The company's motto is to deliver the clients with nothing less than best and quality is one such parameter where we make no compromises. Manufacturers of : C.I. | S.S. | G.M. | Valves | Cocks & Fittings.
                </p>

                <div className="flex flex-wrap gap-6 pt-4 text-xs font-mono font-bold text-slate-700">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    <span>ISO 9001 : 2015 Certified Co.</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    <span>IAS ACCREDITED MSCB-119</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    <span>Valves | Cocks & Fittings</span>
                  </span>
                </div>
              </div>

              {/* Right Column: CTA Buttons & Direct Contact */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <Link 
                  to="/contactus"
                  className="w-full py-4 px-8 rounded-full bg-accent hover:bg-accent-hover text-white font-bold text-sm tracking-wide uppercase shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all flex items-center justify-center gap-3 group min-h-[52px]"
                >
                  <span>Request Custom Quote</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link 
                  to="/products"
                  className="w-full py-4 px-8 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 font-bold text-sm tracking-wide uppercase transition-all flex items-center justify-center min-h-[52px] shadow-sm"
                >
                  <span>Explore Catalog</span>
                </Link>

                <div className="mt-6 pt-6 border-t border-slate-200 flex flex-col gap-3 font-mono text-xs text-slate-600 text-center lg:text-left font-medium">
                  <span className="text-slate-500 font-bold">DIRECT ENGINEERING HELPDESK:</span>
                  <a href="tel:+918296631533" className="text-slate-900 hover:text-accent transition-colors font-bold flex items-center justify-center lg:justify-start gap-2.5">
                    <PhoneCall className="w-4 h-4 text-accent shrink-0" />
                    <span>+91 82966 31533 / +91 97480 28331</span>
                  </a>
                  <a href="mailto:skenterprise2989@gmail.com" className="text-slate-900 hover:text-accent transition-colors font-bold flex items-center justify-center lg:justify-start gap-2.5">
                    <Mail className="w-4 h-4 text-accent shrink-0" />
                    <span>skenterprise2989@gmail.com</span><br/>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
};

export default CTA;
