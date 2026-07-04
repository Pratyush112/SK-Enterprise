import React, { useState } from 'react';
import { Award, ShieldCheck, CheckCircle, ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "What manufacturing standards do SK Enterprise Sluice Gates comply with?",
    answer: "All our Sluice Gates and Penstock Gates are engineered and manufactured in strict compliance with IS 3042, BS 7775, and AWWA C560 standards. We provide complete Quality Assurance Plan (QAP) compliance logs and hydrostatic test certificates with every order."
  },
  {
    question: "Can you provide custom metallurgy or non-standard dimensions for specific projects?",
    answer: "Yes. We specialize in custom-engineered flow control solutions. We fabricate gates in Cast Iron (IS 210 Grade FG 200/260), Ductile Iron (SG Iron), Ni-Resist, Stainless Steel (SS 304 / SS 316 / SS 316L), and Super Duplex alloys depending on water corrosivity and project requirements."
  },
  {
    question: "What is your standard delivery timeline and spare parts availability?",
    answer: "Standard catalog sluice gates and fasteners are dispatched within 2 to 3 weeks. Custom-tailored valve assemblies typically require 4 to 6 weeks. We maintain a 100% spares interchangeability inventory, ensuring replacement stems, wedges, and resilient seals can be dispatched within 48 hours for emergency maintenance."
  },
  {
    question: "What documentation is provided with industrial valve and fastener shipments?",
    answer: "We supply comprehensive Material Test Certificates (MTC 3.1 / 3.2), Hydrostatic Pressure Inspection Reports, Raw Material Chemical & Physical Analysis Reports, and Warranty Documentation with every shipment."
  },
  {
    question: "How do I request a formal technical quotation or tender support?",
    answer: "You can click the 'Request Technical Quote' button on any product page or visit our Contact Us page. For municipal tenders and EPC contractor bidding support, please attach your BOQ and technical specification sheets directly via email at skenterprise2989@gmail.com."
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
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300 border-t border-slate-200/60 dark:border-slate-800">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <div className="max-w-screen-2xl mx-auto px-8">
        
        {/* Certifications & Trust Showcase */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 md:p-14 border border-slate-200/80 dark:border-slate-800 mb-20 shadow-sm">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-4">
              <Award className="w-4 h-4" /> Uncompromising Quality Standards
            </div>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Certified Engineering Excellence
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Every sluice gate and industrial fastener leaving our Howrah manufacturing facility undergoes rigorous metallography and hydrostatic pressure testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">ISO 9001:2015 Certified</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">International quality management systems ensuring consistent fabrication and zero-defect tolerances.</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">IS 3042 & BS 7775</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Full compliance with Indian and British standard specifications for single-faced sluice gates.</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Full MTC & QAP Records</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Complete Material Test Certificates (MTC 3.1) and third-party inspection readiness for EPC tenders.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-4">
              <HelpCircle className="w-4 h-4" /> Procurement FAQ
            </div>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Key technical and commercial information for engineers, procurement officers, and contractors.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-5 text-left font-headline font-bold text-lg md:text-xl text-slate-900 dark:text-white flex justify-between items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0 ${isOpen ? 'transform rotate-180 text-primary' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-slate-600 dark:text-slate-300 text-base leading-relaxed border-t border-slate-200/40 dark:border-slate-800/60">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrustAndFAQ;
