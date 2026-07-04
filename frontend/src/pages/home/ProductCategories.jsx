import React from "react";
import { Link } from "react-router-dom";
import RevealOnScroll from "../../components/motion/RevealOnScroll";
import { ArrowRight, Wrench, CheckCircle2, ShieldCheck } from "lucide-react";

const categories = [
  { 
    name: "Sluice & Penstock Gates", 
    division: "S.K. ENTERPRISE • APPLICATION MARKET",
    path: "products",
    imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1594uho43a3cuCVydJzh008X1-g568knhcOZefes_Rd3-DiSbTi-Jl_aJiDTN7iK4VMuABtzyNRXMh-xmQ32TR4C-DOcAHv0SfxE88pcxCceBXsQ5KZYBeS-5yBdgiECUuspNGKlQqvHdiTboe8l6hZ39hLEzNO0wLsdZ7ga5Pn4O_SGxH7yieGuXNKi6eGbpKNxj5G6ReOm83Mh9LpY3KhuMfMokm0fgnzxNOO8sslFOKEK-Lw0aoQseMfyeAMRkCIYKNRFyu3NJ",
    altText: "Heavy duty steel sluice gates in water treatment facility",
    description: "S.K. Enterprise offer many kind of industrial valve utilized in the several application environment against high temperature, high pressure, high corrosive and low temperature or cryogenic application market range from water treatment, power generation, mining, petrochemical, oil and gas with onshore and offshore working condition.",
    specs: [
      "Water treatment",
      "Power generation",
      "Mining",
      "Petrochemical, oil and gas"
    ]
  },
  { 
    name: "Industrial Fasteners (Nuts & Bolts)", 
    division: "S.K. ENTERPRISE • APPLICATION MARKET",
    path: "parts",
    imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbPCyFRH3D1Q5M0N1M1KRPN2tU609t1lITfRe2oP89QxULoeC2btZVjvY9Ckkkt8qXykD7mayKRR1QIxsgfbp-JU629tvcIBmNP07KJqsVrxnfvd3n4PbEU8ezlJvHe2XZnSZTSI0sOUrjeaOxiBpse8SuLzDxpFg0Cd_vZeRHFCfitiTAwcso0Qzt8zqrN7OCyob7mv-CKQ4Csg_zMVyK1jVc-4GkcHhdA9RDxstwCslzvZOVkmYGP_2bZaP7cCT1OS7SmLeQfz5Z",
    altText: "High strength industrial fasteners nuts and bolts",
    description: "S.K. Enterprise offer many kind of industrial valve utilized in the several application environment against high temperature, high pressure, high corrosive and low temperature or cryogenic application market range from water treatment, power generation, mining, petrochemical, oil and gas with onshore and offshore working condition.",
    specs: [
      "Onshore working condition",
      "Offshore working condition",
      "High temperature & pressure",
      "High corrosive & low temperature"
    ]
  },
];

const ProductCategories = () => {
  return (
    <section className="py-24 md:py-32 bg-slate-50 transition-colors duration-300 border-t border-slate-200 relative">
      <div className="max-w-container-max mx-auto px-6 sm:px-8">
        
        {/* Section Header - Cargokite Architectural Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-slate-200 pb-12">
          <RevealOnScroll direction="up" delay={0}>
            <div className="max-w-3xl">
              <span className="text-xs font-mono text-accent font-bold uppercase tracking-widest block mb-3">
                S.K. ENTERPRISE
              </span>
              <h2 className="font-headline text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                APPLICATION <br />
                <span className="text-accent font-light">MARKET.</span>
              </h2>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll direction="up" delay={0.15}>
            <p className="text-slate-600 max-w-sm font-medium text-sm sm:text-base leading-relaxed border-l-2 border-accent pl-4">
              S.K. Enterprise offer many kind of industrial valve utilized in the several application environment against high temperature, high pressure, high corrosive and low temperature or cryogenic application market range from water treatment, power generation, mining, petrochemical, oil and gas with onshore and offshore working condition.
            </p>
          </RevealOnScroll>
        </div>
        
        {/* Solution Cards Grid - Clean Architectural Showcases */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {categories.map((category, idx) => (
            <RevealOnScroll
              key={category.name}
              direction="up"
              delay={0.15 * idx}
            >
              <div className="group bg-white rounded-industrial-lg overflow-hidden border border-slate-200 hover:border-accent transition-all duration-300 flex flex-col justify-between h-full shadow-lg hover:shadow-xl">
                <div>
                  {/* Image Container with High Clarity & Brightness */}
                  <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-100 border-b border-slate-200">
                    <img
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-95 filter contrast-105 saturate-115"
                      alt={category.altText}
                      src={category.imgSrc}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
                    
                    <div className="absolute top-6 left-6">
                      <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-300 text-[11px] font-mono uppercase tracking-wider text-accent font-bold shadow-sm">
                        {category.division}
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 text-slate-900">
                      <h3 className="font-headline text-2xl sm:text-3xl font-black tracking-tight uppercase group-hover:text-accent transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-8">
                    <p className="text-slate-600 text-sm sm:text-base mb-8 leading-relaxed font-normal">
                      {category.description}
                    </p>
                    
                    <div className="bg-slate-50 rounded-industrial-md p-6 mb-8 border border-slate-200 shadow-sm">
                      <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Wrench className="w-3.5 h-3.5 text-accent" />
                        <span>Application Environment</span>
                      </h4>
                      <ul className="space-y-3 text-xs sm:text-sm font-medium text-slate-700">
                        {category.specs.map((spec, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="px-8 pb-8 pt-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase">ISO 9001 : 2015 Co.</span>
                  <Link
                    to={`/${category.path}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent hover:bg-accent-hover text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md group-hover:translate-x-1"
                  >
                    <span>Explore Catalog</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductCategories;
