import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const Qualitycontrol = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 sm:py-20">
      {/* Header */}
      <motion.header
        className="text-black w-full text-center"
        variants={slideUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold dark:text-white">Quality Control</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
          Ensuring excellence through rigorous quality assurance processes.
        </p>
      </motion.header>

      {/* Main Content */}
      <motion.main
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 md:p-12 max-w-4xl mt-10 w-full text-gray-800 dark:text-gray-100"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="md:text-lg leading-relaxed sm:text-sm">
          <strong>Certified Quality Assurance:</strong> We maintain a fully implemented certified quality
          assurance system, ensuring traceability and compliance with industry standards.
        </p>

        <motion.div
          className="border-l-4 border-blue-500 pl-4 my-6"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <p className="text-gray-700 dark:text-gray-300 italic">
            "S.K. Enterprise's goal is continuous improvement and zero defects,
            exceeding customer expectations."
          </p>
        </motion.div>

        <motion.p
          className="md:text-lg leading-relaxed mt-4 sm:text-sm text-gray-800 dark:text-gray-200"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          We own interior quality assurance system, implementing overall quality management in the whole process.
          Every and each valve has a unique heat number to achieve traceability. All raw materials must carry on the material composition and mechanical performance review before entering the factory, to completely eradicate unqualified materials. Non-destructive testing for valve pipes is necessary before and during raw material processing. Valves must pass body strength tests, hydraulic pressure seal tests, and gas seal tests before leaving the factory. Additionally, valves for specific applications undergo further testing to ensure qualification. Along with our internal systems, third-party certification reinforces our commitment to excellence.
        </motion.p>
      </motion.main>
    </div>
  );
};

export default Qualitycontrol;
