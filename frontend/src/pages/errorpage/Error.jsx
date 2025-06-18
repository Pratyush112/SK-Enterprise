import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <motion.div
            className="min-h-screen flex flex-col justify-center items-center px-6 text-center relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Animated Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100">
                <motion.div
                    className="absolute top-20 -left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 10, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 -right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, -10, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10">
                {/* Icon with enhanced animation */}
                <motion.div
                    className="flex justify-center items-center bg-gradient-to-br from-red-100 to-red-50 p-4 rounded-xl mb-6 shadow-md"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                    <AlertTriangle className=" text-red-500 w-12 items-center h-12 animate-pulse" />
                </motion.div>

                {/* Enhanced Heading */}
                <motion.h1
                    className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                >
                    {error?.status === 404 ? '404' : 'Oops!'}
                </motion.h1>

                {/* Error Message */}
                <motion.p
                    className="text-xl text-gray-600 max-w-xl mb-12 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {error?.status === 404
                        ? "We couldn't find the page you're looking for"
                        : error?.message || error?.statusText || 'An unexpected error occurred'}
                </motion.p>

                {/* Enhanced Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Link
                        to="/"
                        className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                    >
                        <span>Back to Home</span>
                        <motion.svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </motion.svg>
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ErrorPage;
