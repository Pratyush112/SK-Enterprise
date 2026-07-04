import React, { useState } from 'react';
import RevealOnScroll from '../../components/motion/RevealOnScroll';
import Marquee from '../../components/motion/Marquee';
import { Award, ShieldCheck, CheckCircle2, HelpCircle, Plus, X } from 'lucide-react';

const faqs = [
  {
    index: "Q.01",
    question: "What is S.K. Enterprise's motto?",
    answer: "The company's motto is to deliver the clients with nothing less than best and quality is one such parameter where we make no compromises."
  },
  {
    index: "Q.02",
    question: "Why choose S.K. Enterprise?",
    answer: "We offer: 1. Fast track for special alloy valve, 2. Complete spare parts supply, 3. Professional valve technology, 4. All available documentation, 5. Tailor made valve solution."
  },
  {
    index: "Q.03",
    question: "What is S.K. Enterprise's Quality Goal?",
    answer: "Continuous improvement & Zero defect, Meeting and even exceeding the quality and service needs of customers."
  },
  {
    index: "Q.04",
    question: "How does S.K. Enterprise ensure quality control?",
    answer: "We own interior quality assurance system, implementing overall quality management in the whole process. Every and each valve has a unique heat number to achieve traceability. All raw materials must carry on the material composition and mechanical performance review before entering the factory."
  },
  {
    index: "Q.05",
    question: "What testing is performed before valves leave the factory?",
    answer: "Non-destructive testing for valve pipes is necessary before and during raw material processing. Valves should pass valve body strength test, hydraulic pressure seal test and gas seal test one by one before leaving factory."
  },
  {
    index: "Q.06",
    question: "What application markets does S.K. Enterprise serve?",
    answer: "S.K. Enterprise offer many kind of industrial valve utilized in the several application environment against high temperature, high pressure, high corrosive and low temperature or cryogenic application market range from water treatment, power generation, mining, petrochemical, oil and gas with onshore and offshore working condition."
  }
];

const TrustAndFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  // JSON-LD FAQ Schema for Google AI Overviews & Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-24 md:py-32 bg-white transition-colors duration-300 border-t border-slate-200 relative overflow-hidden">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      {/* Infinite Trust Strip Marquee - Clean Architectural Typography */}
      <div className="mb-24 pb-12 border-b border-slate-200">
        <p className="text-center text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-8">
          S.K. ENTERPRISE • ISO 9001 : 2015 CERTIFIED CO. • IAS ACCREDITED MSCB-119
        </p>
        <Marquee speed={35}>
          <span className="font-headline font-black text-xl md:text-2xl text-slate-700 tracking-wider">ISO 9001 : 2015 CERTIFIED CO.</span>
          <span className="text-accent font-bold">•</span>
          <span className="font-headline font-black text-xl md:text-2xl text-slate-700 tracking-wider">IAS ACCREDITED MSCB-119</span>
          <span className="text-accent font-bold">•</span>
          <span className="font-headline font-black text-xl md:text-2xl text-slate-700 tracking-wider">OUR MOTTO</span>
          <span className="text-accent font-bold">•</span>
          <span className="font-headline font-black text-xl md:text-2xl text-slate-700 tracking-wider">WHY CHOOSE S.K. ENTERPRISE</span>
          <span className="text-accent font-bold">•</span>
          <span className="font-headline font-black text-xl md:text-2xl text-slate-700 tracking-wider">QUALITY CONTROL</span>
          <span className="text-accent font-bold">•</span>
          <span className="font-headline font-black text-xl md:text-2xl text-slate-700 tracking-wider">APPLICATION MARKET</span>
          <span className="text-accent font-bold">•</span>
        </Marquee>
      </div>

      <div className="max-w-container-max mx-auto px-6 sm:px-8">
        
        {/* Certifications & Trust Showcase */}
        <RevealOnScroll direction="up" delay={0}>
          <div className="bg-white rounded-industrial-lg p-8 sm:p-12 md:p-16 border border-slate-200 mb-24 shadow-xl hover:shadow-2xl transition-all">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-300 text-accent font-mono text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
                <Award className="w-3.5 h-3.5" />
                <span>ISO 9001 : 2015 CERTIFIED CO.</span>
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase mb-4">
                S.K. ENTERPRISE.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                The company's motto is to deliver the clients with nothing less than best and quality is one such parameter where we make no compromises.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-slate-50 p-6 sm:p-8 rounded-industrial-md border border-slate-200 flex items-start gap-4 shadow-md hover:border-accent transition-colors">
                <div className="w-12 h-12 rounded-industrial-md bg-white border border-slate-200 text-accent flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-slate-900 mb-2">ISO 9001 : 2015 Certified Co.</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">ISO 9001 : 2015 Certified Co.</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 sm:p-8 rounded-industrial-md border border-slate-200 flex items-start gap-4 shadow-md hover:border-accent transition-colors">
                <div className="w-12 h-12 rounded-industrial-md bg-white border border-slate-200 text-accent flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-slate-900 mb-2">IAS ACCREDITED MSCB-119</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">IAS ACCREDITED Management Systems Certification Body MSCB-119.</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 sm:p-8 rounded-industrial-md border border-slate-200 flex items-start gap-4 shadow-md hover:border-accent transition-colors">
                <div className="w-12 h-12 rounded-industrial-md bg-white border border-slate-200 text-accent flex items-center justify-center shrink-0 shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-slate-900 mb-2">Manufacturers of :</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">C.I. | S.S. | G.M. | Valves | Cocks & Fittings.</p>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Cargokite FAQ Accordion (+ to × rotation, monospace numbering) */}
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll direction="up" delay={0.1}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-300 text-accent font-mono text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>S.K. ENTERPRISE</span>
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase mb-4">
                FREQUENTLY ASKED QUESTIONS.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-medium">
                Manufacturers of : C.I. | S.S. | G.M. | Valves | Cocks & Fittings.
              </p>
            </div>
          </RevealOnScroll>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <RevealOnScroll key={faq.index} direction="up" delay={0.05 * index}>
                  <div className={`bg-white rounded-industrial-md border transition-all duration-300 overflow-hidden shadow-md hover:shadow-lg ${isOpen ? 'border-accent ring-1 ring-accent/20' : 'border-slate-200 hover:border-slate-300'}`}>
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full px-6 sm:px-8 py-6 text-left font-headline font-bold text-base sm:text-lg text-slate-900 flex justify-between items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent group"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-tabular font-mono text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded border border-accent/20 shrink-0">
                          {faq.index}
                        </span>
                        <span className="group-hover:text-accent transition-colors">{faq.question}</span>
                      </div>
                      <div className={`w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-accent text-white border-accent rotate-90 shadow-sm' : 'text-slate-500 group-hover:text-slate-900'}`}>
                        {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-6 sm:px-8 pb-6 pt-2 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pl-16 font-normal">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrustAndFAQ;
