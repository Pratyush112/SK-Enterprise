import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, AlertCircle, CheckCircle2, Wrench } from 'lucide-react';
import SEO from '../../components/SEO';
import RevealOnScroll from '../../components/motion/RevealOnScroll';

const ContactUs = () => {
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
        setErrorMessage('');
        setSubmitStatus(null);

        // Strict validation: check if any required field is empty or just whitespace
        if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
            setSubmitStatus('error');
            setErrorMessage('All fields are required. Please provide your name, email, phone number, and technical specifications.');
            return;
        }

        // Honeypot check
        if (formData.botcheck) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Send both `phone` and `number` for backward compatibility with deployed backend
            const submitData = {
                ...formData,
                phone: formData.phone.trim() || 'Not provided',
                number: formData.phone.trim() || 'Not provided'
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
            setErrorMessage(error.message || 'Failed to send message. Please try again or call us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: <MapPin className="w-6 h-6 text-accent" />,
            title: "Office Address",
            content: "Shanpur (South) Dasnagar, Howrah - 711105, West Bengal, India",
            link: "https://www.google.com/maps/place/Shanpur+South+Dasnagar,+Howrah,+West+Bengal,+India"
        },
        {
            icon: <Phone className="w-6 h-6 text-accent" />,
            title: "Contact Helpdesk",
            content: ["+91 82966 31533", "+91 97480 28331"],
            link: "tel:+918296631533"
        },
        {
            icon: <Mail className="w-6 h-6 text-accent" />,
            title: "Email For Inquiries",
            content: ["skenterprise2989@gmail.com", "saha.biswa2013@gmail.com"],
            link: "mailto:skenterprise2989@gmail.com"
        },
        {
            icon: <Clock className="w-6 h-6 text-accent" />,
            title: "Office Hours",
            content: ["Monday - Saturday: 9:00 AM - 6:00 PM (IST)"],
        }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-accent selection:text-white overflow-x-hidden">
            <SEO 
                title="Contact Us | SK Enterprise - Request Technical Quote"
                description="Get in touch with SK Enterprise for technical inquiries, BOQ tender support, and custom quotations for industrial sluice gates and fasteners."
                name="SK Enterprise"
                type="website"
                url="/contactus"
            />

            {/* Hero Header Section */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
                    {/* <RevealOnScroll direction="down" duration={0.6}>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-300 text-accent text-xs font-mono font-bold tracking-widest uppercase shadow-sm">
                            <Wrench className="w-4 h-4" />
                            <span>DIRECT TECHNICAL SUPPORT & SALES</span>
                        </div>
                    </RevealOnScroll> */}

                    <RevealOnScroll delay={0.1} duration={0.7}>
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight font-headline uppercase">
                            CONNECT <br className="hidden sm:inline" />
                            <span className="text-accent">WITH US.</span>
                        </h1>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.2} duration={0.7}>
                        <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
                            Request customized quotations, submit tender BOQ specifications, or speak directly with our team in Howrah for immediate technical guidance.
                        </p>
                    </RevealOnScroll>
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Contact Form Area (7 Cols) */}
                    <div className="lg:col-span-7">
                        <RevealOnScroll>
                            <div className="bg-white rounded-industrial-lg p-6 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
                                <div className="mb-8 border-b border-slate-200 pb-6">
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight font-headline uppercase">
                                        <span className="text-accent">CONTACT</span> US.
                                    </h2>
                                    <p className="text-sm text-slate-600 mt-1">
                                        Fill out the specifications below. Our Team will respond within 24 hours.
                                    </p>
                                </div>
                                
                                <form onSubmit={handleSubmit} className="space-y-6 relative z-10" noValidate>
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
                                        <label htmlFor="name" className="block text-xs font-mono font-bold tracking-wider text-slate-700 uppercase mb-2">
                                            Full Name & Company <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            required
                                            className="w-full px-4 py-3.5 rounded-industrial-md bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent focus:bg-white transition-all duration-200 shadow-sm"
                                            placeholder="e.g. Your Name (Your Company Name)"
                                            value={formData.name}
                                            onChange={(e) => {
                                                setFormData({ ...formData, name: e.target.value });
                                                if (submitStatus === 'error') setSubmitStatus(null);
                                            }}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="email" className="block text-xs font-mono font-bold tracking-wider text-slate-700 uppercase mb-2">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                required
                                                className="w-full px-4 py-3.5 rounded-industrial-md bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent focus:bg-white transition-all duration-200 shadow-sm"
                                                placeholder="name@company.com"
                                                value={formData.email}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, email: e.target.value });
                                                    if (submitStatus === 'error') setSubmitStatus(null);
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-xs font-mono font-bold tracking-wider text-slate-700 uppercase mb-2">
                                                Phone / WhatsApp <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="phone"
                                                type="tel"
                                                required
                                                className="w-full px-4 py-3.5 rounded-industrial-md bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent focus:bg-white transition-all duration-200 shadow-sm"
                                                placeholder=""
                                                value={formData.phone}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, phone: e.target.value });
                                                    if (submitStatus === 'error') setSubmitStatus(null);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-xs font-mono font-bold tracking-wider text-slate-700 uppercase mb-2">
                                            Technical Specifications & BOQ Details <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3.5 rounded-industrial-md bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent focus:bg-white transition-all duration-200 resize-none shadow-sm"
                                            placeholder="Please specify valve type, aperture size (e.g., 1000x1000mm), seating/unseating water head pressure, metallurgy (CI FG 200/SS316), or attach tender BOQ notes..."
                                            value={formData.message}
                                            onChange={(e) => {
                                                setFormData({ ...formData, message: e.target.value });
                                                if (submitStatus === 'error') setSubmitStatus(null);
                                            }}
                                        />
                                    </div>

                                    {/* Status Feedback Banners */}
                                    {submitStatus === 'success' && (
                                        <div className="p-4 rounded-industrial-md bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-start gap-3 text-sm animate-in fade-in duration-300 shadow-sm">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                            <div>
                                                <strong className="font-bold block text-emerald-900">Inquiry Sent Successfully!</strong>
                                                <span>Our team has received your inquiry and will contact you shortly.</span>
                                            </div>
                                        </div>
                                    )}

                                    {submitStatus === 'error' && (
                                        <div className="p-4 rounded-industrial-md bg-red-50 border border-red-300 text-red-800 flex items-start gap-3 text-sm animate-in fade-in duration-300 shadow-sm">
                                            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                            <div>
                                                <strong className="font-bold block text-red-900">Submission Notice</strong>
                                                <span>{errorMessage || 'Error sending inquiry. Please call our technical helpline directly.'}</span>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 px-6 bg-accent hover:bg-accent-hover text-white font-bold text-sm uppercase tracking-wider rounded-industrial-md shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:-translate-y-0.5"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                <span>Submit</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Contact Information Cards (5 Cols) */}
                    <div className="lg:col-span-5 space-y-6">
                        <RevealOnScroll delay={0.1}>
                            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-lg space-y-6">
                                <h3 className="text-xs font-mono font-bold text-accent uppercase tracking-widest border-b border-slate-200 pb-4">
                                    DIRECT COMMUNICATION CHANNELS
                                </h3>

                                <div className="space-y-6">
                                    {contactInfo.map((info, index) => (
                                        <div key={index} className="flex items-start gap-4 group">
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 group-hover:border-accent/40 group-hover:scale-105 transition-all duration-300 shadow-sm">
                                                {info.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-base font-bold text-slate-900 font-headline group-hover:text-accent transition-colors">
                                                    {info.title}
                                                </h4>
                                                <div className="mt-1 text-sm text-slate-600 space-y-1 font-medium">
                                                    {Array.isArray(info.content) ? (
                                                        info.content.map((item, i) => (
                                                            <p key={i}>
                                                                {info.link && i === 0 ? (
                                                                    <a href={info.link} className="hover:text-accent transition-colors underline decoration-slate-300 underline-offset-4 font-mono">
                                                                        {item}
                                                                    </a>
                                                                ) : item}
                                                            </p>
                                                        ))
                                                    ) : (
                                                        <p>
                                                            {info.link ? (
                                                                <a href={info.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors underline decoration-slate-300 underline-offset-4">
                                                                    {info.content}
                                                                </a>
                                                            ) : info.content}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* Assurance Box */}
                        {/* <RevealOnScroll delay={0.2}>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-md space-y-3">
                                <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Tender BOQ & QAP Guarantee</span>
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                    We assist municipal contractors and EPC firms with formal General Arrangement Drawings (GAD), Quality Assurance Plans (QAP), and rapid price quotations for tender submissions.
                                </p>
                            </div>
                        </RevealOnScroll> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
