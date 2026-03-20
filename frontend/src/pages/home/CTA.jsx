import React from 'react';

const CTA = () => {
  return (
    <section className="py-24 bg-surface dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h2 className="font-headline text-4xl font-extrabold mb-8 text-on-surface dark:text-white transition-colors duration-300">Ready to engineer your next success?</h2>
        <p className="text-on-surface-variant dark:text-slate-300 text-xl mb-12 transition-colors duration-300">Connect with our technical specialists for a consultation on your industrial project requirements.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-primary text-on-primary px-10 py-5 rounded-full font-bold text-lg hover:bg-primary-container transition-all shadow-xl shadow-primary/20">
            Request a Quote
          </button>
          <button className="border-2 border-primary text-primary dark:text-primary-fixed dark:border-primary-fixed px-10 py-5 rounded-full font-bold text-lg hover:bg-primary/5 dark:hover:bg-primary/10 transition-all">
            Technical Catalog
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
