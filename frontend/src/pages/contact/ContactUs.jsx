import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useNavigation } from '../../hooks/useNavigation';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const ContactUs = () => {

    const { goBack, redirectTo } = useNavigation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Add your form submission logic here
        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });


            if (!response.ok) {
                throw new Error('Something went wrong while submitting the form');
            }

            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: ''
            });
        }

        catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        }


        finally {
            // Reset form state after submission    
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: ''
            });
            setSubmitStatus(null);
            // Reset submitting state  
            setIsSubmitting(false);
        }

    };

    const contactInfo = [
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Address",
            content: "Shanpur (South) Dasnagar, Howrah - 711105, West Bengal, India",
            link: "https://www.google.com/maps/place/Shanpur+South+Dasnagar,+Howrah,+West+Bengal,+India"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Phone",
            content: ["+91 82966 31533", "+91 97480 28331"],
            link: "tel:+918296631533"
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email",
            content: ["skenterprise2989@gmail.com", "saha.biswa2013@gmail.com"],
            link: "mailto:skenterprise2989@gmail.com"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Business Hours",
            content: ["Monday - Saturday: 9:00 AM - 6:00 PM", "lunch from 2:00 PM to 3:00 PM"],
        }
    ];


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">

            {/*Go back button and redirect button*/}
            <div className='absolute top-24 right-8 z-50 flex flex-row gap-4'>
                <button
                    onClick={goBack}
                    className="px-4 py-2 bg-indigo-600 text-white border-2 border-white/20 backdrop-blur-md rounded-lg hover:bg-transparent transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-indigo-500/50 dark:hover:shadow-indigo-700/50 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    ← Back
                </button>

                <button
                    onClick={() => redirectTo('/')}
                    className="px-4 py-2 bg-green-600 text-white border-2 border-white/20 backdrop-blur-md rounded-lg hover:bg-transparent transition-all duration-300 shadow-lg hover:shadow-green-500/50 dark:hover:shadow-green-700/50 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Home
                </button>
            </div>

            {/* Hero Section */}
            <div className="relative py-32 mt-16 pb-12 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Contact Us
                    </h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Get in touch with us for any inquiries about our products and services
                    </p>
                </motion.div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-blue-100 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-100 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-100 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your phone number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-100 mb-2">
                                    Message
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                            {submitStatus === 'success' && (
                                <p className="text-green-400 text-sm mt-2">
                                    Message sent successfully!
                                </p>
                            )}
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="text-blue-400">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {info.title}
                                        </h3>
                                        {Array.isArray(info.content) ? (
                                            info.content.map((item, i) => (
                                                <p key={i} className="text-blue-100">
                                                    {info.link ? (
                                                        <a href={info.link} className="hover:text-blue-400 transition-colors">
                                                            {item}
                                                        </a>
                                                    ) : item}
                                                </p>
                                            ))
                                        ) : (
                                            <p className="text-blue-100">
                                                {info.link ? (
                                                    <a href={info.link} className="hover:text-blue-400 transition-colors">
                                                        {info.content}
                                                    </a>
                                                ) : info.content}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
