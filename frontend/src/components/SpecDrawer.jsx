import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, FileText, ShieldCheck, Check, Layers, Gauge, Maximize2, Wrench, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const SpecDrawer = ({ isOpen, onClose, item, type = 'product', onRequestQuote }) => {
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

    if (!isOpen || !item) return null;

    const title = item.Name || item.item || 'Technical Specification';
    const image = item.Image || item.image || item.product_image || '';
    const id = item._id || '';

    // Extract specs depending on type
    const productSpecs = type === 'product' ? [
        { label: 'Series', value: item.Series, icon: Layers },
        { label: 'Standard', value: item.Standard, icon: ShieldCheck },
        { label: 'Mounting Type', value: item.Mounting, icon: Wrench },
        { label: 'Available Sizes', value: item.Sizes, icon: Maximize2 },
        { label: 'Sealing Mechanism', value: item.Sealing, icon: Check },
        { label: 'Water Head Pressure', value: item.Water || item.Water_Head, icon: Gauge },
        { label: 'Leakage Parameter', value: item.Leakage_Parameter || item.Leakage, icon: Info },
        { label: 'Spacing Between Bars', value: item.Spacing_Between_Bars, icon: Layers },
        { label: 'Single Piece Width', value: item.Single_Piece_Width, icon: Maximize2 },
        { label: 'Single Piece Height', value: item.Single_Piece_Height, icon: Maximize2 },
        { label: 'Materials of Construction', value: item.Materials_of_construction || item.Materials, icon: Wrench },
        { label: 'Primary Application', value: item.Application, icon: Info }
    ] : [
        { label: 'Item Name', value: item.item, icon: Layers },
        { label: 'Size Dimensions', value: item.size, icon: Maximize2 },
        { label: 'Material Grade', value: item.grade, icon: Wrench },
        { label: 'IS Standard', value: item.IS, icon: ShieldCheck },
        { label: 'BS Standard', value: item.BS, icon: ShieldCheck },
        { label: 'ISO Specification', value: item.ISO, icon: ShieldCheck },
        { label: 'DIN Specification', value: item.DIN, icon: ShieldCheck },
        { label: 'ASTM Specification', value: item.ASTM, icon: ShieldCheck },
        { label: 'ANSI Specification', value: item.ANSI, icon: ShieldCheck },
        { label: 'JIS Specification', value: item.JIS, icon: ShieldCheck }
    ];

    const validSpecs = productSpecs.filter(s => s.value && s.value !== '—' && s.value !== 'N/A');

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
                    aria-hidden="true"
                />

                {/* Slide-over panel */}
                <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="relative w-full max-w-xl bg-slate-900 border-l border-slate-800 shadow-2xl overflow-y-auto z-10 text-slate-100 flex flex-col justify-between"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="spec-drawer-title"
                >
                    {/* Header */}
                    <div>
                        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-5 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
                            <div className="flex items-center gap-3">
                                <span className="px-2.5 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-md border border-blue-500/30 uppercase tracking-wider">
                                    {type === 'product' ? 'Sluice Gate Spec' : 'Valve Part Spec'}
                                </span>
                                <h3 id="spec-drawer-title" className="text-lg font-bold text-white truncate max-w-[240px] sm:max-w-xs">
                                    {title}
                                </h3>
                            </div>
                            <button 
                                onClick={onClose}
                                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Close panel"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Image Preview */}
                        <div className="p-6 bg-gradient-to-b from-slate-950/80 to-slate-900 border-b border-slate-800/80 flex items-center justify-center">
                            {image ? (
                                <div className="relative group max-w-sm w-full h-56 bg-slate-950/50 rounded-xl p-4 border border-slate-800 flex items-center justify-center overflow-hidden">
                                    <img 
                                        src={image} 
                                        alt={title} 
                                        className="max-h-full max-w-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300" 
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-40 bg-slate-950/50 rounded-xl border border-slate-800 flex items-center justify-center text-slate-500 text-sm">
                                    No image preview available
                                </div>
                            )}
                        </div>

                        {/* Specs List */}
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    Technical Data Sheet
                                </h4>
                                <span className="text-xs text-blue-400 font-mono">
                                    SK-REF-{id.slice(-6).toUpperCase() || 'STD'}
                                </span>
                            </div>

                            <div className="bg-slate-950/60 rounded-xl border border-slate-800/80 divide-y divide-slate-800/60 overflow-hidden">
                                {validSpecs.length > 0 ? (
                                    validSpecs.map((spec, index) => {
                                        const Icon = spec.icon || Info;
                                        return (
                                            <div key={index} className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 hover:bg-slate-800/30 transition-colors">
                                                <div className="flex items-center gap-2.5 text-slate-400 text-xs sm:text-sm font-medium shrink-0">
                                                    <Icon className="w-4 h-4 text-blue-400/80 shrink-0" />
                                                    <span>{spec.label}</span>
                                                </div>
                                                <div className="text-sm font-semibold text-slate-100 sm:text-right font-mono break-words pl-6 sm:pl-0">
                                                    {spec.value}
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="p-8 text-center text-slate-500 text-sm">
                                        No detailed technical parameters listed for this item. Please contact engineering for full drawings.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="sticky bottom-0 z-20 p-6 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                        <button 
                            onClick={() => {
                                onClose();
                                if (onRequestQuote) onRequestQuote(title);
                            }}
                            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all"
                        >
                            <FileText className="w-4 h-4" />
                            <span>Request Formal Quote</span>
                        </button>

                        {id && (
                            <Link 
                                to={type === 'product' ? `/products/${id}` : `/parts/${id}`}
                                onClick={onClose}
                                className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm rounded-xl border border-slate-700 transition-colors"
                            >
                                <span>Full Details</span>
                                <ExternalLink className="w-4 h-4" />
                            </Link>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default SpecDrawer;
