import React from 'react';
import { MapPin, Phone, Mail, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Footer = () => {
  return (
    <motion.footer
      className="w-full mt-auto bg-gradient-to-tl from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-4 md:py-12 shadow-2xl border-t border-blue-200 dark:border-gray-700 transition-colors duration-300"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div variants={fadeUp}>
            <h4 className="text-2xl font-extrabold text-blue-900 dark:text-white mb-6 tracking-tight">
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </span>
                <a
                  href="https://www.google.com/maps/place/Shanpur+South+Dasnagar,+Howrah,+West+Bengal,+India"
                  className="text-base text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shanpur (South) Dasnagar, Howrah - 711105, West Bengal, India
                </a>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </span>
                <div className="flex flex-col space-y-1">
                  <a href="tel:+918296631533" className="text-base text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                    +91 82966 31533
                  </a>
                  <a href="tel:+919748028331" className="text-base text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                    +91 97480 28331
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </span>
                <div className="flex flex-col space-y-1">
                  <a href="mailto:skenterprise2989@gmail.com" className="text-base text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium break-all">
                    skenterprise2989@gmail.com
                  </a>
                  <a href="mailto:saha.biswa2013@gmail.com" className="text-base text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium break-all">
                    saha.biswa2013@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Company Links and Social Media */}
          <motion.div className="flex flex-col justify-between h-full" variants={fadeUp}>
            <div className="mb-8">
              <h4 className="text-2xl font-extrabold text-blue-900 dark:text-white mb-6 tracking-tight">
                Company
              </h4>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: 'Home', to: '/' },
                  { name: 'About Us', to: '/about' },
                  { name: 'Contact Us', to: '/contact' },
                  { name: 'Products', to: '/products' },
                  { name: 'Parts', to: '/parts' },
                  { name: 'Privacy Policy', to: '/privacy-policy' },
                ].map(link => (
                  <Link
                    key={link.name}
                    to={link.to}
                    className="px-4 py-2 rounded-lg bg-white/70 dark:bg-gray-800/70 shadow hover:bg-blue-100 dark:hover:bg-blue-900/40 text-base font-medium text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="text-2xl font-extrabold text-blue-900 dark:text-white mb-6 tracking-tight">
                Social Media
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/share/18efdXByPy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/70 dark:bg-gray-800/70 shadow hover:bg-blue-100 dark:hover:bg-blue-900/40 text-base font-medium text-gray-700 dark:text-gray-200 transition-colors"
                >
                  <Facebook size={20} strokeWidth={2} /> Facebook
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div className="border-t border-blue-200 dark:border-gray-700 my-8" variants={fadeUp}></motion.div>

        {/* Copyright */}
        <motion.div
          className="text-center text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide"
          variants={fadeUp}
        >
          &copy; {new Date().getFullYear()} SK Enterprise. All rights reserved.
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
