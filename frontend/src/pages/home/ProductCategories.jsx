import React from "react";
import { Link } from "react-router-dom";

const ProductCategories = () => {
  const categories = [
    { 
      name: "Sluice Gates", 
      path: "products",
      imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1594uho43a3cuCVydJzh008X1-g568knhcOZefes_Rd3-DiSbTi-Jl_aJiDTN7iK4VMuABtzyNRXMh-xmQ32TR4C-DOcAHv0SfxE88pcxCceBXsQ5KZYBeS-5yBdgiECUuspNGKlQqvHdiTboe8l6hZ39hLEzNO0wLsdZ7ga5Pn4O_SGxH7yieGuXNKi6eGbpKNxj5G6ReOm83Mh9LpY3KhuMfMokm0fgnzxNOO8sslFOKEK-Lw0aoQseMfyeAMRkCIYKNRFyu3NJ",
      altText: "Heavy duty steel sluice gates in water treatment facility",
      description: "Robust flow control solutions engineered for longevity in harsh environmental conditions. Available in various mounting configurations and materials.",
    },
    { 
      name: "Nuts & Bolts", 
      path: "parts",
      imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbPCyFRH3D1Q5M0N1M1KRPN2tU609t1lITfRe2oP89QxULoeC2btZVjvY9Ckkkt8qXykD7mayKRR1QIxsgfbp-JU629tvcIBmNP07KJqsVrxnfvd3n4PbEU8ezlJvHe2XZnSZTSI0sOUrjeaOxiBpse8SuLzDxpFg0Cd_vZeRHFCfitiTAwcso0Qzt8zqrN7OCyob7mv-CKQ4Csg_zMVyK1jVc-4GkcHhdA9RDxstwCslzvZOVkmYGP_2bZaP7cCT1OS7SmLeQfz5Z",
      altText: "High strength industrial fasteners nuts and bolts",
      description: "High-tensile fasteners and specialized connectors manufactured to withstand extreme mechanical stress and corrosive industrial atmospheres.",
      bgContent: (
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 flex items-center justify-center transition-colors duration-300">
          <span
            className="material-symbols-outlined text-[10rem] text-primary/10 dark:text-primary/20 transition-colors duration-300"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            hardware
          </span>
        </div>
      )
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
            High-performance hardware designed for heavy industry, water
            management, and energy sectors.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {categories.map((category) => (
            <div key={category.name} className="group bg-surface-container-lowest dark:bg-slate-800 rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-outline-variant/10 dark:border-white/10">
              <div className="relative h-96 overflow-hidden bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
                {category.bgContent && category.bgContent}
                <img
                  className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ${category.bgContent ? 'opacity-90 dark:opacity-75' : 'dark:opacity-90'}`}
                  alt={category.altText}
                  src={category.imgSrc}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-black/80 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="font-headline text-4xl font-extrabold shadow-sm">
                    {category.name}
                  </h3>
                </div>
              </div>
              <div className="p-10">
                <p className="text-on-surface-variant dark:text-slate-300 text-lg mb-8 leading-relaxed transition-colors duration-300">
                  {category.description}
                </p>
                <Link
                  to={`/${category.path}`}
                  className="inline-flex items-center gap-2 text-primary dark:text-primary-fixed font-bold text-lg hover:gap-4 transition-all"
                >
                  Learn More
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
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
