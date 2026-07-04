import React from "react";
import { Cog, Award, HardHat, Truck, Headphones, Factory, ShieldCheck, CheckCircle2, Wrench, Globe } from "lucide-react";
import SEO from "../../components/SEO";
import RevealOnScroll from "../../components/motion/RevealOnScroll";

const features = [
  {
    icon: <Cog className="w-7 h-7 text-accent" />,
    title: "Precision Manufacturing",
    description: "State-of-the-art CNC machining and assembly facilities ensuring zero-defect mechanical tolerances.",
    spec: "TOLERANCE: ±0.05MM"
  },
  {
    icon: <Award className="w-7 h-7 text-accent" />,
    title: "Quality Certification",
    description: "ISO 9001:2015 certified production workflows with rigorous hydrostatic and seat leakage testing.",
    spec: "STANDARD: IS 3042 / BS 7775"
  },
  {
    icon: <HardHat className="w-7 h-7 text-accent" />,
    title: "Valve Engineering Expertise",
    description: "35+ years of specialized hydraulic engineering and fluid isolation control knowledge.",
    spec: "METALLURGY: CI / CAST STEEL / SS316"
  },
  {
    icon: <Truck className="w-7 h-7 text-accent" />,
    title: "Pan-India & Global Delivery",
    description: "Robust logistics network ensuring rapid dispatch of heavy infrastructure equipment and emergency spares.",
    spec: "DISPATCH: 24/7 EMERGENCY SPARES"
  },
  {
    icon: <Headphones className="w-7 h-7 text-accent" />,
    title: "Technical Documentation",
    description: "Complete GAD drawings, QAP test certificates, and tender BOQ compliance support for project engineers.",
    spec: "SUPPORT: FULL QAP / EN 10204 3.1"
  },
  {
    icon: <Factory className="w-7 h-7 text-accent" />,
    title: "Tailor-Made Fabrication",
    description: "Custom head pressure ratings, non-standard dimensions, and motorized/manual actuator adaptations.",
    spec: "CUSTOM: UP TO 3000MM X 3000MM"
  },
];

const stats = [
  { label: "YEARS OF EXCELLENCE", value: "35+" },
  { label: "PROJECTS SUPPLIED", value: "1,200+" },
  { label: "HYDROSTATIC TEST RATING", value: "100%" },
  { label: "INDUSTRIAL STANDARDS", value: "IS / BS / AWWA" }
];

const About = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-accent selection:text-white overflow-x-hidden">
      <SEO
        title="About Us | SK Enterprise - Industrial Valve Engineering"
        description="Learn about SK Enterprise, a leading manufacturer of industrial cast iron sluice gates, penstocks, and heavy-duty water control valves established in 1989."
        name="SK Enterprise"
        type="website"
        url="/about"
      />
      
      {/* Hero Header Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <RevealOnScroll direction="down" duration={0.6}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-300 text-accent font-mono text-xs font-bold tracking-widest uppercase shadow-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>ISO 9001 : 2015 CERTIFIED CO. • IAS ACCREDITED MSCB-119</span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} duration={0.7}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight font-headline uppercase">
              S.K. ENTERPRISE <br className="hidden sm:inline" />
              <span className="text-2xl sm:text-4xl md:text-5xl text-accent">VALVES | COCKS & FITTINGS.</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2} duration={0.7}>
            <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Manufacturers of : C.I. | S.S. | G.M. | Valves | Cocks & Fittings. The company's motto is to deliver the clients with nothing less than best and quality is one such parameter where we make no compromises.
            </p>
          </RevealOnScroll>

          {/* Key Stats Bar */}
          <RevealOnScroll delay={0.3} duration={0.8}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-5xl mx-auto">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-industrial-lg border border-slate-200 text-center hover:border-accent transition-all duration-300 shadow-md hover:shadow-lg">
                  <div className="font-tabular text-2xl sm:text-4xl font-black text-slate-900 font-headline tracking-tight">{stat.value}</div>
                  <div className="text-[11px] font-mono font-bold text-accent uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Core Capabilities Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-mono font-bold text-accent uppercase tracking-widest">
              WHY CHOOSE S.K. ENTERPRISE
            </h2>
            <p className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-headline uppercase">
              OUR MOTTO & QUALITY CONTROL.
            </p>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              S.K. Enterprise's Quality Goal: Continuous improvement & Zero defect, Meeting and even exceeding the quality and service needs of customers.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <div className="bg-white p-8 rounded-industrial-lg border border-slate-200 hover:border-accent transition-all duration-300 flex flex-col justify-between h-full group shadow-lg hover:shadow-xl">
                <div>
                  <div className="w-12 h-12 rounded-industrial-md bg-slate-50 border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-accent transition-all duration-300 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-headline group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                    {feature.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono font-bold text-slate-500">
                  <span className="text-accent">{feature.spec}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Company Journey & Technical Overview */}
      <section className="py-20 bg-slate-50 border-t border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="bg-white rounded-industrial-lg p-8 sm:p-14 border border-slate-200 shadow-xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>QUALITY CONTROL & APPLICATION MARKET</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-headline leading-tight">
                    S.K. Enterprise Quality Assurance and Quality Control Program
                  </h2>
                  <div className="text-slate-600 text-base leading-relaxed space-y-4 font-normal">
                    <p>
                      We own interior quality assurance system, implementing overall quality management in the whole process. Every and each valve has a unique heat number to achieve traceability. All raw materials must carry on the material composition and mechanical performance review before entering the factory, to completely eradicate unqualified materials.
                    </p>
                    <p>
                      Non-destructive testing for valve pipes is necessary before and during raw material processing. Valves should pass valve body strength test, hydraulic pressure seal test and gas seal test one by one before leaving factory. Besides, valves for specific application need more tests, to guarantee all products are all qualified before delivery.
                    </p>
                    <p>
                      Except internal severe work system and workflow, there are also the third-party certification authority and customer approval to ensure quality. S.K. Enterprise offer many kind of industrial valve utilized in the several application environment against high temperature, high pressure, high corrosive and low temperature or cryogenic application market range from water treatment, power generation, mining, petrochemical, oil and gas with onshore and offshore working condition.
                    </p>
                  </div>
                </div>

                {/* Technical Highlights Box */}
                <div className="lg:col-span-5 bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
                  <h3 className="text-sm font-mono font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-accent" />
                    <span>S.K. Enterprise Specifications</span>
                  </h3>
                  
                  <ul className="space-y-4 text-xs sm:text-sm text-slate-700 font-mono">
                    <li className="flex items-start justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-bold">Certification:</span>
                      <span className="text-slate-900 font-bold text-right">ISO 9001 : 2015 Certified Co.</span>
                    </li>
                    <li className="flex items-start justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-bold">Accreditation:</span>
                      <span className="text-slate-900 font-bold text-right">IAS ACCREDITED MSCB-119</span>
                    </li>
                    <li className="flex items-start justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-bold">Manufacturers of:</span>
                      <span className="text-slate-900 font-bold text-right">Valves | Cocks & Fittings</span>
                    </li>
                    <li className="flex items-start justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-bold">Materials:</span>
                      <span className="text-slate-900 font-bold text-right">C.I. | S.S. | G.M.</span>
                    </li>
                    <li className="flex items-start justify-between">
                      <span className="text-slate-500 font-bold">Quality Goal:</span>
                      <span className="text-slate-900 font-bold text-right">Zero Defect & Continuous Improvement</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
};

export default About;
