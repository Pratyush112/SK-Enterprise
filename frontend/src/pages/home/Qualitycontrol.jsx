// import React from 'react';
// import { motion } from 'framer-motion';

// const fadeInUp = {
//   hidden: { opacity: 0, y: 40 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
// };

// const slideUp = {
//   hidden: { opacity: 0, y: 60 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
// };

// const Qualitycontrol = () => {
//   return (
//     <div className="flex flex-col items-center justify-center px-4 py-10 sm:py-20 relative z-10">
//       {/* Header */}
//       <motion.header
//         className="text-black w-full text-center"
//         variants={slideUp}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.3 }}
//       >
//         <div className="inline-block relative">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 mb-2 drop-shadow-sm tracking-tight">Quality Assurance</h1>
//           <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full"></div>
//         </div>
//         <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
//           Ensuring excellence through rigorous quality assurance processes.
//         </p>
//       </motion.header>

//       {/* Main Content */}
//       <motion.main
//         className="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-2xl rounded-[2rem] p-8 sm:p-12 md:p-16 max-w-5xl mt-12 w-full text-gray-800 dark:text-gray-100 overflow-hidden group hover:shadow-blue-500/10 transition-shadow duration-700"
//         variants={fadeInUp}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.3 }}
//       >
//         {/* Decorative corner blur */}
//         <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-1000"></div>
//         <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-1000"></div>
        
//         <p className="md:text-xl font-medium leading-relaxed sm:text-base relative z-10">
//           <strong>Certified Quality Assurance:</strong> We maintain a fully implemented certified quality
//           assurance system, ensuring traceability and compliance with industry standards.
//         </p>

//         <motion.div
//           className="border-l-4 border-blue-500 pl-4 my-6"
//           variants={fadeInUp}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//         >
//           <p className="text-gray-700 dark:text-gray-300 italic">
//             "S.K. Enterprise's goal is continuous improvement and zero defects,
//             exceeding customer expectations."
//           </p>
//         </motion.div>

//         <motion.p
//           className="md:text-lg leading-relaxed mt-8 sm:text-base text-gray-700 dark:text-gray-300 relative z-10"
//           variants={fadeInUp}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//         >
//           We own an interior quality assurance system, implementing overall quality management in the whole process.
//           Every single valve has a unique heat number to achieve full traceability. All raw materials must carry on the material composition and mechanical performance review before entering the factory, to completely eradicate unqualified materials. Non-destructive testing for valve pipes is necessary before and during raw material processing. Valves must pass body strength tests, hydraulic pressure seal tests, and gas seal tests before leaving the factory. Additionally, valves for specific applications undergo further testing to ensure qualification. Along with our internal systems, third-party certification reinforces our commitment to excellence.
//         </motion.p>
//       </motion.main>
//     </div>
//   );
// };

// export default Qualitycontrol;
