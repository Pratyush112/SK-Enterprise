import React from 'react';
import { motion } from 'framer-motion';
import { GrCertificate } from "react-icons/gr";
import { MdEngineering, MdPrecisionManufacturing } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaIndustry } from "react-icons/fa";
import { useNavigation } from '../../hooks/useNavigation';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const features = [
    {
        icon: <MdPrecisionManufacturing className="w-8 h-8" />,
        title: "Precision Manufacturing",
        description: "State-of-the-art manufacturing facilities ensuring highest quality standards"
    },
    {
        icon: <GrCertificate className="w-8 h-8" />,
        title: "Quality Certification",
        description: "ISO certified processes and international standard compliance"
    },
    {
        icon: <MdEngineering className="w-8 h-8" />,
        title: "Expert Engineering",
        description: "Skilled engineering team with decades of industry experience"
    },
    {
        icon: <TbTruckDelivery className="w-8 h-8" />,
        title: "Reliable Delivery",
        description: "On-time delivery with careful handling and packaging"
    },
    {
        icon: <RiCustomerService2Line className="w-8 h-8" />,
        title: "Customer Support",
        description: "24/7 technical support and after-sales service"
    },
    {
        icon: <FaIndustry className="w-8 h-8" />,
        title: "Industry Experience",
        description: "Over 20 years of experience in valve manufacturing"
    }
];

const About = () => {
    const { goBack, redirectTo } = useNavigation();
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">

            {/*Go back button and redirect button*/}
            <div className='absolute top-24 right-8 z-50 flex flex-row gap-4'> 
                <button
                    onClick={goBack}
                    className="px-4 py-2 bg-indigo-600 border-2 border-white/20 text-white backdrop-blur-md rounded-lg 
                               hover:bg-transparent transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-indigo-500/50 dark:hover:shadow-indigo-700/50 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    ← Back
                </button>

                <button
                    onClick={() => redirectTo('/')}
                    className="px-4 py-2 bg-green-600 border-2 border-white/20 text-white backdrop-blur-md rounded-lg 
                               hover:bg-transparent transition-all duration-300 shadow-lg hover:shadow-green-500/50 dark:hover:shadow-green-700/50 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Home
                </button>
            </div>
            {/* Hero Section - Reduced bottom padding */}
            <div className="relative py-32 mt-16 pb-12 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        About SK Enterprise
                    </h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Leading manufacturer of industrial valves and gates, committed to excellence and innovation since establishment
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
                            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                        >
                            <div className="text-blue-400 mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-blue-100">
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
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
                    <h2 className="text-3xl font-bold text-white mb-6">Our Journey</h2>
                    <div className="prose prose-lg text-blue-100">
                        <p className="mb-4">
                            SK Enterprise has been at the forefront of industrial valve manufacturing,
                            specializing in Sluice Gate Valves and Penstock Gate Valves. Our commitment
                            to quality and innovation has made us a trusted partner for industries worldwide.
                        </p>
                        <p>
                            With state-of-the-art manufacturing facilities and a team of experienced
                            engineers, we continue to deliver products that meet the highest standards
                            of quality and reliability. Our focus on research and development ensures
                            that we stay ahead of industry trends and requirements.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default About;
