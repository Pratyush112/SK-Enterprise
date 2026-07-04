import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, AlertCircle, ShieldCheck, Building2, User, Mail, Phone, FileText } from 'lucide-react';
import { submitContactForm } from '../services/api';

const QuoteModal = ({ isOpen, onClose, initialItem = '' }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        honeypot: '' // Anti-spam field
    });
    
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: null
    });

    useEffect(() => {
        if (isOpen && initialItem) {
            setFormData(prev => ({
                ...prev,
                subject: `Quote Request: ${initialItem}`,
                message: `I would like to request a formal quotation and delivery timeframe for the following item:\n\nItem: ${initialItem}\nQuantity Needed: [Please specify]\nTarget Delivery / Project Location: [Please specify]\n\nTechnical Parameters:\n- Seating vs Unseating Head Pressure: [e.g., 5m / 10m]\n- Spindle Type: [Rising / Non-Rising Spindle]\n- Metallurgy / Casting Grade: [e.g., Cast Iron IS:210 FG 200/260 or SS 316]\n- Sealing Type: [EPDM / Metallic / Neoprene]\n\nAttached Tender BOQ / Notes:\n`
            }));
            setStatus({ loading: false, success: false, error: null });
        } else if (isOpen && !initialItem) {
            setFormData(prev => ({
                ...prev,
                subject: 'General Quote Request',
                message: `I would like to request a quotation for industrial sluice gates / valve components.\n\nProject Details & Technical Parameters:\n- Gate Type / SKU: [e.g., Cast Iron Sluice Gate / MS Penstock / Flap Gate]\n- Quantity & Dimensions: [Please specify width x height]\n- Seating vs Unseating Head Pressure: [e.g., 5m / 10m]\n- Spindle Type: [Rising / Non-Rising Spindle]\n- Metallurgy / Casting Grade: [e.g., Cast Iron IS:210 FG 200/260 or SS 316]\n- Sealing Type: [EPDM / Metallic / Neoprene]\n\nAttached Tender BOQ / Notes:\n`
            }));
            setStatus({ loading: false, success: false, error: null });
        }
    }, [isOpen, initialItem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Spam check: if honeypot is filled, silently reject or abort
        if (formData.honeypot) {
            console.warn('Spam submission detected.');
            onClose();
            return;
        }

        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setStatus({ loading: false, success: false, error: 'Please fill in all required fields (Name, Email, Requirements).' });
            return;
        }

        setStatus({ loading: true, success: false, error: null });

        try {
            // Format payload to match backend /contact route expectations
            // Send both `phone` and `number` for backward compatibility with deployed backend
            const phoneValue = formData.phone.trim() || 'Not provided';
            const payload = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: phoneValue,
                number: phoneValue, // Deployed backend expects `number`, not `phone`
                company: formData.company.trim() || 'Not specified',
                subject: formData.subject.trim() || `Quote Inquiry from ${formData.name.trim()}`,
                message: formData.message.trim(),
                honeypot: formData.honeypot
            };

            await submitContactForm(payload);
            setStatus({ loading: false, success: true, error: null });
        } catch (err) {
            console.error('Quote submission error:', err);
            const backendError = err.response?.data?.error || err.response?.data?.message;
            
            const errMsg = backendError || (err.code === 'ECONNABORTED' || err.message?.includes('timeout') ? 'Server is waking up from sleep mode (Render cold start). Please click Submit again in a few seconds.' : 'Failed to submit quote request. Please try again or contact us directly at skenterprise2989@gmail.com.');
            setStatus({ loading: false, success: false, error: errMsg });
        }
    };

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
                    aria-hidden="true"
                />

                {/* Modal Dialog */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                    className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 text-slate-100 my-8"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="quote-modal-title"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border-b border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-500/20 rounded-xl border border-blue-500/30 text-blue-400">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 id="quote-modal-title" className="text-lg sm:text-xl font-bold text-white tracking-tight">
                                    Request B2B Quotation
                                </h3>
                                <p className="text-xs text-blue-200/80">
                                    Direct inquiry to SK Enterprise engineering & procurement team
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
                        {status.success ? (
                            <div className="py-8 text-center space-y-4">
                                <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
                                    <CheckCircle className="w-10 h-10" />
                                </div>
                                <h4 className="text-2xl font-bold text-white">Quotation Request Sent!</h4>
                                <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
                                    Thank you for your inquiry regarding <span className="font-semibold text-white">{initialItem || 'our products'}</span>. Our technical sales team has received your specifications and will respond within <span className="text-blue-400 font-semibold">24 hours</span> with pricing and lead times.
                                </p>
                                <div className="pt-4">
                                    <button 
                                        onClick={onClose}
                                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/20"
                                    >
                                        Return to Catalog
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Honeypot spam trap */}
                                <div className="hidden" aria-hidden="true">
                                    <label htmlFor="quote-honeypot">Leave this blank</label>
                                    <input 
                                        type="text" 
                                        id="quote-honeypot" 
                                        name="honeypot" 
                                        value={formData.honeypot} 
                                        onChange={handleChange} 
                                        tabIndex="-1" 
                                        autoComplete="off" 
                                    />
                                </div>

                                {status.error && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm">
                                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                        <span>{status.error}</span>
                                    </div>
                                )}

                                {/* Subject / Item Summary */}
                                <div className="p-3.5 bg-slate-800/60 border border-slate-700/60 rounded-xl flex items-center justify-between text-sm">
                                    <span className="text-slate-400 font-medium">Inquiry Subject:</span>
                                    <span className="font-semibold text-blue-300 truncate max-w-[280px] sm:max-w-md">
                                        {formData.subject || 'Industrial Products Inquiry'}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Name */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="quote-name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                            Full Name <span className="text-red-400">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <input 
                                                type="text" 
                                                id="quote-name" 
                                                name="name" 
                                                required 
                                                value={formData.name} 
                                                onChange={handleChange} 
                                                placeholder="John Doe" 
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="quote-email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                            Business Email <span className="text-red-400">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <input 
                                                type="email" 
                                                id="quote-email" 
                                                name="email" 
                                                required 
                                                value={formData.email} 
                                                onChange={handleChange} 
                                                placeholder="john@company.com" 
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Company */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="quote-company" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                            Company / Organization
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <Building2 className="w-4 h-4" />
                                            </div>
                                            <input 
                                                type="text" 
                                                id="quote-company" 
                                                name="company" 
                                                value={formData.company} 
                                                onChange={handleChange} 
                                                placeholder="ABC Water Infra Ltd." 
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="quote-phone" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <Phone className="w-4 h-4" />
                                            </div>
                                            <input 
                                                type="tel" 
                                                id="quote-phone" 
                                                name="phone" 
                                                value={formData.phone} 
                                                onChange={handleChange} 
                                                placeholder="+91 98765 43210" 
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Requirements / Message */}
                                <div className="space-y-1.5">
                                    <label htmlFor="quote-message" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider justify-between items-center">
                                        <span>Technical Requirements & Quantities <span className="text-red-400">*</span></span>
                                        <span className="text-slate-500 font-normal text-[11px]">Include dimensions, head pressure, or standards</span>
                                    </label>
                                    <textarea 
                                        id="quote-message" 
                                        name="message" 
                                        required 
                                        rows={5} 
                                        value={formData.message} 
                                        onChange={handleChange} 
                                        className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono leading-relaxed"
                                    />
                                </div>

                                {/* Trust footer */}
                                <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                                    <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
                                    <span>Your inquiry is transmitted securely to our engineering team. We guarantee 100% data confidentiality.</span>
                                </div>

                                {/* Submit button */}
                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <button 
                                        type="button" 
                                        onClick={onClose} 
                                        className="px-5 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl font-medium text-sm transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        disabled={status.loading}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {status.loading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                <span>Submit Quote Request</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default QuoteModal;
