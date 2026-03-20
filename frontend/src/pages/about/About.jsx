import React from "react";
import { motion } from "framer-motion";
import { GrCertificate } from "react-icons/gr";
import { MdEngineering, MdPrecisionManufacturing } from "react-icons/md";
import { Home, ArrowLeft } from "lucide-react";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaIndustry } from "react-icons/fa";
import { useNavigation } from "../../hooks/useNavigation";
import SEO from "../../components/SEO";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const features = [
  {
    icon: <MdPrecisionManufacturing className="w-8 h-8" />,
    title: "Precision Manufacturing",
    description:
      "State-of-the-art manufacturing facilities ensuring highest quality standards",
  },
  {
    icon: <GrCertificate className="w-8 h-8" />,
    title: "Quality Certification",
    description:
      "ISO certified processes and international standard compliance",
  },
  {
    icon: <MdEngineering className="w-8 h-8" />,
    title: "Technology & Expertise",
    description: "Professional Valve Engineers with deep industry knowledge",
  },
  {
    icon: <TbTruckDelivery className="w-8 h-8" />,
    title: "Reliable Delivery",
    description: "On-time delivery with careful handling and packaging",
  },
  {
    icon: <RiCustomerService2Line className="w-8 h-8" />,
    title: "Documentation & Support",
    description: "All available documentation and excellent customer support",
  },
  {
    icon: <FaIndustry className="w-8 h-8" />,
    title: "Tailor Made",
    description: "Tailor made solutions to meet specific industry needs",
  },
];

const About = () => {
  const { goBack, redirectTo } = useNavigation();
  return (
    <div className="min-h-screen transition-colors duration-300">
      <SEO
        title="About Us | SK Enterprise"
        description="Learn about SK Enterprise, a leading manufacturer of industrial valves and gates with a commitment to quality and innovation."
        name="SK Enterprise"
        type="website"
        url="/about"
      />
      {/* Navigation: Home (left) and Back (right) - responsive */}
      {/* <div className="absolute top-24 left-4 right-4 z-10 sm:z-50 flex items-center justify-between sm:top-24 sm:left-8 sm:right-8">
        <button
          onClick={() => redirectTo("/")}
          aria-label="Home"
          className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white/80 dark:bg-white/10 border border-outline/10 dark:border-white/20 text-slate-700 dark:text-white backdrop-blur-md rounded-full sm:rounded-lg hover:bg-gray-100 dark:hover:bg-white/20 transition-all duration-300 shadow-sm focus:outline-none"
        >
          <Home className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">Home</span>
        </button>

        <button
          onClick={goBack}
          aria-label="Back"
          className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white/80 dark:bg-white/10 border border-outline/10 dark:border-white/20 text-slate-700 dark:text-white backdrop-blur-md rounded-full sm:rounded-lg hover:bg-gray-100 dark:hover:bg-white/20 transition-all duration-300 shadow-sm focus:outline-none"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">Back</span>
        </button>
      </div> */}
      
      {/* Hero Section - Reduced bottom padding */}
      <div className="relative py-32 mt-16 pb-12 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 transition-colors duration-300 tracking-tight">
            About SK Enterprise
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto transition-colors duration-300 leading-relaxed font-medium">
            Leading manufacturer of industrial valves and gates, committed to
            excellence and innovation since establishment
          </p>
        </motion.div>
      </div>

      {/* Features Grid - Reduced top padding */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-outline/10 dark:border-white/10 hover:shadow-xl dark:hover:bg-white/10 transition-all duration-300 shadow-sm group"
            >
              <div className="text-primary dark:text-blue-400 mb-6 transform group-hover:scale-110 transition-transform duration-300 origin-left">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 transition-colors duration-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Company Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-14 border border-outline/10 dark:border-white/10 shadow-sm transition-colors duration-300">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-8 transition-colors duration-300 tracking-tight">
            Our Journey
          </h2>
          <div className="text-lg text-slate-600 dark:text-slate-300 transition-colors duration-300 leading-relaxed space-y-6 font-medium">
            <p>
              SK Enterprise has been at the forefront of industrial valve
              manufacturing, specializing in Sluice Gate Valves and Penstock
              Gate Valves. Our commitment to quality and innovation has made us
              a trusted partner for industries worldwide.
            </p>
            <p>
              With state-of-the-art manufacturing facilities and a team of
              experienced engineers, we continue to deliver products that meet
              the highest standards of quality and reliability. Our focus on
              research and development ensures that we stay ahead of industry
              trends and requirements.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
