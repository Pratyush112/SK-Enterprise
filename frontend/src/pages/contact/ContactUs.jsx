import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Home, ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../hooks/useNavigation';
import SEO from '../../components/SEO';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const ContactUs = () => {

    const { goBack, redirectTo } = useNavigation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Add your form submission logic here
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/contact`, {
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
            setTimeout(() => setSubmitStatus(null), 3000);
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
        <div className="min-h-screen transition-colors duration-300">
            <SEO 
                title="Contact Us | SK Enterprise"
                description="Get in touch with SK Enterprise for inquiries about our industrial valves, sluice gates, and services."
                name="SK Enterprise"
                type="website"
                url="/contactus"
            />
            {/* Navigation: Home (left) and Back (right) - responsive */}
            {/* <div className="absolute top-24 left-4 right-4 z-10 sm:z-50 flex items-center justify-between sm:top-24 sm:left-8 sm:right-8" aria-hidden="false">
                <button
                    onClick={() => redirectTo('/')}
                    aria-label="Home"
                    className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 text-white border-2 border-white/20 backdrop-blur-md rounded-full sm:rounded-lg hover:bg-transparent transition-all duration-300 shadow-sm sm:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    <Home className="w-5 h-5" />
                    <span className="hidden sm:inline">Home</span>
                </button>

                <button
                    onClick={goBack}
                    aria-label="Back"
                    className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 text-white border-2 border-white/20 backdrop-blur-md rounded-full sm:rounded-lg hover:bg-transparent transition-all duration-300 shadow-sm sm:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="hidden sm:inline">Back</span>
                </button>
            </div> */}

            {/* Hero Section */}
            <div className="relative py-32 mt-16 pb-12 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 transition-colors duration-300 tracking-tight">
                        Contact Us
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto transition-colors duration-300 leading-relaxed font-medium">
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
                        className="bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-outline/10 dark:border-white/10 shadow-sm transition-colors duration-300"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-300">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-outline/20 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-outline/20 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-outline/20 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300"
                                    placeholder="Your phone number"
                                    value={formData.number}
                                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                                    Message
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-outline/20 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300"
                                    placeholder="Your message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-6 py-3 bg-primary hover:bg-primary-fixed dark:hover:bg-primary/90 text-white font-bold rounded-lg transition-colors duration-300 disabled:opacity-50 shadow-md"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                            {submitStatus === 'success' && (
                                <p className="text-green-600 dark:text-green-400 font-medium text-sm mt-2 transition-colors duration-300">
                                    Message sent successfully!
                                </p>
                            )}
                            {submitStatus === 'error' && (
                                <p className="text-red-500 font-medium text-sm mt-2 transition-colors duration-300">
                                    Error sending message. Please try again.
                                </p>
                            )}
                        </form>
                    </motion.div>

                    {/* Contact Information Cards */}
                    <div className="space-y-6">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-outline/10 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="text-primary dark:text-blue-400 transform group-hover:scale-110 transition-transform duration-300">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">
                                            {info.title}
                                        </h3>
                                        {Array.isArray(info.content) ? (
                                            info.content.map((item, i) => (
                                                <p key={i} className="text-slate-600 dark:text-slate-300 transition-colors duration-300">
                                                    {info.link ? (
                                                        <a href={info.link} className="hover:text-primary dark:hover:text-blue-400 transition-colors">
                                                            {item}
                                                        </a>
                                                    ) : item}
                                                </p>
                                            ))
                                        ) : (
                                            <p className="text-slate-600 dark:text-slate-300 transition-colors duration-300">
                                                {info.link ? (
                                                    <a href={info.link} className="hover:text-primary dark:hover:text-blue-400 transition-colors">
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
