import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import { motion } from 'framer-motion';

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Hero = () => {
  return (
    <>
      <div className="h-16 xs:h-20 sm:h-24 md:h-32 lg:h-40"></div>
      <motion.section
        className="relative mx-3 xs:mx-4 sm:mx-6 lg:mx-12 xl:mx-auto max-w-7xl bg-white/30 dark:bg-gray-900/20 backdrop-blur-lg border border-white/40 dark:border-gray-700/40 rounded-2xl xs:rounded-3xl px-3 xs:px-4 sm:px-6 lg:px-12 py-12 xs:py-16 sm:py-20 lg:py-32 flex flex-col md:flex-row items-center gap-6 xs:gap-8 lg:gap-24 overflow-hidden"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Animated Background Bubbles */}
        <motion.div
          className="absolute -top-16 -left-16 w-32 xs:w-40 sm:w-64 h-32 xs:h-40 sm:h-64 bg-gradient-to-br from-blue-300 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-full blur-3xl opacity-30 dark:opacity-20"
          animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-16 -right-16 w-36 xs:w-48 sm:w-72 h-36 xs:h-48 sm:h-72 bg-gradient-to-tr from-orange-300 to-yellow-200 dark:from-orange-900 dark:to-yellow-800 rounded-full blur-3xl opacity-30 dark:opacity-20"
          animate={{ y: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Logo Section */}
        <motion.div
          className="flex flex-col items-center md:items-start z-10 w-full md:w-auto md:ml-12"
          variants={fadeInUp}
        >
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-orange-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative">
              <div className="absolute -top-3 xs:-top-4 -left-3 xs:-left-4 w-12 xs:w-16 sm:w-24 h-12 xs:h-16 sm:h-24 bg-gradient-to-r from-orange-400 to-yellow-300 rounded-full blur-xl opacity-60 animate-pulse"></div>
              <img
                src={logo}
                alt="SK Enterprise Logo"
                className="w-36 xs:w-44 sm:w-56 lg:w-64 h-36 xs:h-44 sm:h-56 lg:h-64 rounded-xl xs:rounded-2xl shadow-2xl border-2 xs:border-4 border-white dark:border-gray-800 object-cover relative z-10 transform transition-all duration-500 hover:shadow-orange-500/25 dark:hover:shadow-blue-500/25"
              />
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div className="z-20 flex-1 text-center md:text-left" variants={staggerContainer}>
          <motion.h1
            className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-600 dark:from-white dark:to-blue-300 mb-4 xs:mb-6 tracking-tight leading-tight"
            variants={slideLeft}
          >
            Our Motto
          </motion.h1>
          <motion.p
            className="text-sm xs:text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-200 font-medium mb-6 xs:mb-8 sm:mb-10 max-w-xs xs:max-w-sm sm:max-w-2xl mx-auto md:mx-0 leading-relaxed"
            variants={fadeInUp}
          >
            The company's motto is to deliver the clients with nothing less than{' '}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-0 h-3 bg-blue-200 dark:bg-blue-900 opacity-30"></span>
              <span className="relative text-blue-900 dark:text-blue-300 font-bold">best</span>
            </span>{' '}
            and{' '}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-0 h-3 bg-orange-200 dark:bg-orange-900 opacity-30"></span>
              <span className="relative text-blue-900 dark:text-blue-300 font-bold">quality</span>
            </span>{' '}
            is one such parameter when we make no compromises.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-row xs:flex-row gap-4 xs:gap-6">
            <Link
              to="/products"
              className="group relative inline-flex items-center justify-center gap-1 xs:gap-2 px-6 xs:px-8 py-3 xs:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base xs:text-lg font-semibold rounded-lg xs:rounded-xl shadow-lg transition-all duration-300 hover:shadow-blue-500/50 dark:hover:shadow-blue-700/50 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              See Products
              <svg className="w-4 h-4 xs:w-5 xs:h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/parts"
              className="group relative inline-flex items-center justify-center gap-3 xs:gap-4 px-6 xs:px-8 py-3 xs:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base xs:text-lg font-semibold rounded-lg xs:rounded-xl shadow-lg transition-all duration-300 hover:shadow-blue-500/50 dark:hover:shadow-blue-700/50 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              See Spare Parts
              <svg className="w-4 h-4 xs:w-5 xs:h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default Hero;
