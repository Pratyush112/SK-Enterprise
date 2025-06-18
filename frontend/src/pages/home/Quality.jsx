import React from 'react';
import { GiValve } from "react-icons/gi";
import { motion } from 'framer-motion';

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const iconAnimation = {
  initial: { scale: 1 },
  hover: { 
      scale: 1.2,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
          rotate: {
              repeat: Infinity,
              duration: 2,
              ease: "linear"
          },
          scale: {
              duration: 0.3
          }
      }
  }
};

const Quality = () => {
  const items = [
    { icon: "ri-arrow-right-circle-fill", title: "Fast track", desc: "Fast track for special alloy valve" },
    { icon: "ri-settings-5-line", title: "Spare Parts", desc: "Complete spare parts supply" },
    { icon: "ri-thumb-up-fill", title: "Technology", desc: "Professional valve Technology" },
    { icon: "ri-file-fill", title: "Documentation", desc: "All available Documentation" },
    { icon: <GiValve className="text-4xl" />, title: "Tailor Made", desc: "Tailor made valve solution" },
  ];

  return (
    <section className="py-12 px-4">
      <motion.h4
        className="text-center text-2xl sm:text-3xl font-bold mb-10 text-gray-800 dark:text-gray-100"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        Why Choose SK Enterprise
      </motion.h4>

      <motion.div
        className="max-w-7xl mx-auto bg-white/30 dark:bg-gray-800/20 backdrop-blur-lg border border-white/40 dark:border-gray-700/40 rounded-3xl shadow-md p-8 sm:p-14 transition-colors duration-300"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center p-6 bg-white/60 dark:bg-gray-800/70 rounded-xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:bg-blue-50/60 dark:hover:bg-blue-900/40 hover:shadow-2xl cursor-pointer"
              variants={fadeInUp}
              whileHover="hover"
            >
              <motion.span 
                className="text-3xl mb-3 text-blue-600 dark:text-blue-400"
                variants={iconAnimation}
              >
                {typeof item.icon === 'string' ? <i className={item.icon}></i> : item.icon}
              </motion.span>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{item.title}</h4>
              <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Quality;

