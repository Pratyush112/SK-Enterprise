import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Shield, CheckCircle2 } from "lucide-react";

const ProductCategories = () => {
  const categories = [
    { 
      name: "Sluice & Penstock Gates", 
      path: "products",
      imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1594uho43a3cuCVydJzh008X1-g568knhcOZefes_Rd3-DiSbTi-Jl_aJiDTN7iK4VMuABtzyNRXMh-xmQ32TR4C-DOcAHv0SfxE88pcxCceBXsQ5KZYBeS-5yBdgiECUuspNGKlQqvHdiTboe8l6hZ39hLEzNO0wLsdZ7ga5Pn4O_SGxH7yieGuXNKi6eGbpKNxj5G6ReOm83Mh9LpY3KhuMfMokm0fgnzxNOO8sslFOKEK-Lw0aoQseMfyeAMRkCIYKNRFyu3NJ",
      altText: "Heavy duty steel sluice gates in water treatment facility",
      description: "Robust flow control solutions engineered for longevity in harsh municipal and industrial environments. Available in cast iron, ductile iron, and stainless steel.",
      specs: [
        "Water Head: Up to 30 meters seating/unseating",
        "Mounting: Wall mounted, thimble mounted, channel",
        "Standards: IS 3042, BS 7775, AWWA C560 compliant"
      ]
    },
    { 
      name: "Industrial Fasteners (Nuts & Bolts)", 
      path: "parts",
      imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbPCyFRH3D1Q5M0N1M1KRPN2tU609t1lITfRe2oP89QxULoeC2btZVjvY9Ckkkt8qXykD7mayKRR1QIxsgfbp-JU629tvcIBmNP07KJqsVrxnfvd3n4PbEU8ezlJvHe2XZnSZTSI0sOUrjeaOxiBpse8SuLzDxpFg0Cd_vZeRHFCfitiTAwcso0Qzt8zqrN7OCyob7mv-CKQ4Csg_zMVyK1jVc-4GkcHhdA9RDxstwCslzvZOVkmYGP_2bZaP7cCT1OS7SmLeQfz5Z",
      altText: "High strength industrial fasteners nuts and bolts",
      description: "High-tensile fasteners, stud bolts, and specialized connectors manufactured to withstand extreme mechanical stress, vibration, and corrosive atmospheres.",
      specs: [
        "Grades: 8.8, 10.9, 12.9, SS 304, SS 316, B7/2H",
        "Coatings: Hot-Dip Galvanized, PTFE/Xylan, Zinc",
        "Applications: Heavy valves, flanges, structural piping"
      ]
    },
  ];

  return (
    <section className="py-24 bg-surface-container-low dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface dark:text-white mb-6 transition-colors duration-300">
            Core Product Categories
          </h2>
          <p className="text-on-surface-variant dark:text-slate-300 max-w-2xl mx-auto text-lg transition-colors duration-300">
            Precision-engineered hardware designed for heavy industry, water treatment plants, municipal water boards, and energy sectors.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {categories.map((category) => (
            <div key={category.name} className="group bg-surface-container-lowest dark:bg-slate-800 rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-outline-variant/10 dark:border-white/10 flex flex-col justify-between">
              <div>
                <div className="relative h-80 overflow-hidden bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
                  <img
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 dark:opacity-90"
                    alt={category.altText}
                    src={category.imgSrc}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-6 left-8 text-white">
                    <h3 className="font-headline text-3xl font-extrabold shadow-sm">
                      {category.name}
                    </h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-on-surface-variant dark:text-slate-300 text-base mb-6 leading-relaxed transition-colors duration-300">
                    {category.description}
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-4 mb-8 border border-slate-200/60 dark:border-slate-700/60">
                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-primary" /> Key Specifications
                    </h4>
                    <ul className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {category.specs.map((spec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="px-8 pb-8">
                <Link
                  to={`/${category.path}`}
                  className="inline-flex items-center gap-2 text-primary dark:text-primary-fixed font-bold text-lg hover:gap-4 transition-all"
                >
                  Explore Catalog
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
