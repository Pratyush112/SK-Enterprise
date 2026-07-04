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
        phone: '',
        message: '',
        botcheck: '' // Honeypot field
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');
        setSubmitStatus(null);

        try {
            // Send both `phone` and `number` for backward compatibility with deployed backend
            const submitData = {
                ...formData,
                number: formData.phone || 'Not provided' // Deployed backend expects `number`
            };
            const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL || "https://sk-enterprise.onrender.com"}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong while submitting the form');
            }

            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
                botcheck: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
            setErrorMessage(error.message || 'Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Works Address",
            content: "Shanpur (South) Dasnagar, Howrah - 711105, West Bengal, India",
            link: "https://www.google.com/maps/place/Shanpur+South+Dasnagar,+Howrah,+West+Bengal,+India"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Contact Helpdesk",
            content: ["+91 82966 31533", "+91 97480 28331"],
            link: "tel:+918296631533"
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email For Inquiries",
            content: ["skenterprise2989@gmail.com", "saha.biswa2013@gmail.com"],
            link: "mailto:skenterprise2989@gmail.com"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Business Hours",
            content: ["Monday - Saturday: 9:00 AM - 6:00 PM", "Emergency Spares Dispatch: 24/7 Support"],
        }
    ];

    return (
        <div className="min-h-screen transition-colors duration-300">
            <SEO 
                title="Contact Us | SK Enterprise - Request Technical Quote"
                description="Get in touch with SK Enterprise for technical inquiries, BOQ tender support, and custom quotations for industrial sluice gates and fasteners."
                name="SK Enterprise"
                type="website"
                url="/contactus"
            />

            {/* Hero Section */}
            <div className="relative py-12 mt-12 pb-12 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                >
                    {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-4">
                        Direct Technical Support & Sales
                    </div> */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 transition-colors duration-300 tracking-tight">
                        Contact Us 
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto transition-colors duration-300 leading-relaxed font-medium">
                        Request a customized quotation, submit tender BOQs, or speak directly with our industrial valve specialists.
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
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">Send an Inquiry</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Fill out the form below and our Team will respond within 24 hours.</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Honeypot field (hidden from real users) */}
                            <div className="hidden" aria-hidden="true">
                                <label htmlFor="botcheck">Do not fill this out if you are human</label>
                                <input
                                    type="text"
                                    id="botcheck"
                                    name="botcheck"
                                    value={formData.botcheck}
                                    onChange={(e) => setFormData({ ...formData, botcheck: e.target.value })}
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                                    Full Name with Company <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                                    placeholder="Your Name (Company Name)"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                                    placeholder="name@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                                    Phone / WhatsApp Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                                    placeholder="+91 1234567890"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                                    Technical Specifications & Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                                    placeholder="Please specify valve type, size, seating water head, alloy metallurgy, or attach tender BOQ details..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-6 py-4 bg-primary hover:bg-primary-container text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                                {isSubmitting ? 'Sending...' : 'Submit Technical Inquiry'}
                            </button>
                            {submitStatus === 'success' && (
                                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 font-medium text-sm transition-all duration-300">
                                    Inquiry sent successfully! Our Team will contact you shortly.
                                </div>
                            )}
                            {submitStatus === 'error' && (
                                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 font-medium text-sm transition-all duration-300">
                                     {errorMessage || 'Error sending inquiry. Please call us directly.'}
                                </div>
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
