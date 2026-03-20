// import React from 'react';
// import { GiValve } from "react-icons/gi";
// import { motion } from 'framer-motion';

// const staggerContainer = {
//   hidden: {},
//   show: {
//     transition: {
//       staggerChildren: 0.15,
//     },
//   },
// };

// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
// };

// const iconAnimation = {
//   initial: { scale: 1 },
//   hover: { 
//       scale: 1.2,
//       rotate: [0, -10, 10, -5, 5, 0],
//       transition: {
//           rotate: {
//               repeat: Infinity,
//               duration: 2,
//               ease: "linear"
//           },
//           scale: {
//               duration: 0.3
//           }
//       }
//   }
// };

// const Quality = () => {
//   const items = [
//     { icon: "ri-arrow-right-circle-fill", title: "Fast track", desc: "Fast track for special alloy valve" },
//     { icon: "ri-settings-5-line", title: "Spare Parts", desc: "Complete spare parts supply" },
//     { icon: "ri-thumb-up-fill", title: "Technology", desc: "Professional valve Technology" },
//     { icon: "ri-file-fill", title: "Documentation", desc: "All available Documentation" },
//     { icon: <GiValve className="text-4xl" />, title: "Tailor Made", desc: "Tailor made valve solution" },
//   ];

//   return (
//     <section className="py-12 px-4">
//       <motion.div
//         className="text-center mb-16"
//         variants={fadeInUp}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.3 }}
//       >
//         <div className="inline-block relative">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 tracking-tight drop-shadow-sm">Why Choose SK Enterprise</h2>
//           <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-2/3 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full"></div>
//         </div>
//       </motion.div>

//       <motion.div
//         className="max-w-7xl mx-auto bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-[2.5rem] shadow-2xl p-8 sm:p-14 relative overflow-hidden"
//         variants={staggerContainer}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         {/* Decorative corner blur */}
//         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-300/20 dark:bg-blue-900/40 rounded-full blur-3xl pointer-events-none"></div>
//         <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-300/20 dark:bg-indigo-900/40 rounded-full blur-3xl pointer-events-none"></div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//           {items.map((item, i) => (
//             <motion.div
//               key={i}
//               className="group relative flex flex-col items-center text-center p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl border border-white/40 dark:border-gray-600/40 transition-all duration-500 ease-out hover:-translate-y-3 hover:bg-white dark:hover:bg-gray-700/80 shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)] dark:hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)] overflow-hidden cursor-pointer z-10"
//               variants={fadeInUp}
//               whileHover="hover"
//             >
//               <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
//               <motion.span 
//                 className="text-4xl mb-4 text-blue-600 dark:text-blue-400 drop-shadow-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 relative z-10"
//                 variants={iconAnimation}
//               >
//                 {typeof item.icon === 'string' ? <i className={item.icon}></i> : item.icon}
//               </motion.span>
//               <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 relative z-10">{item.title}</h4>
//               <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed relative z-10">{item.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default Quality;

