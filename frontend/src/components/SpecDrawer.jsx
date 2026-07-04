import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, FileText, ShieldCheck, Check, Layers, Gauge, Maximize2, Wrench, ArrowRight, Info, Download, Award } from 'lucide-react';
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

    const handleDownloadDatasheet = () => {
        const printWindow = window.open('', '_blank', 'width=850,height=950');
        if (!printWindow) {
            alert('Please allow pop-ups in your browser to download or print the technical datasheet.');
            return;
        }
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Technical Datasheet - ${title} | S.K. Enterprise</title>
                <style>
                    body { font-family: 'Arial', sans-serif; color: #1e293b; padding: 40px; line-height: 1.6; }
                    .header { border-bottom: 3px solid #0284c7; padding-bottom: 20px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; }
                    .logo-text { font-size: 24px; font-weight: bold; color: #0f172a; letter-spacing: -0.5px; }
                    .logo-sub { font-size: 12px; color: #64748b; font-weight: 500; }
                    .ref { font-size: 13px; font-weight: bold; color: #0284c7; background: #f0f9ff; padding: 6px 12px; border-radius: 6px; border: 1px solid #bae6fd; }
                    h1 { font-size: 22px; color: #0f172a; margin-bottom: 5px; }
                    .meta { font-size: 13px; color: #475569; margin-bottom: 20px; }
                    .badges { display: flex; gap: 10px; margin-bottom: 25px; flex-wrap: wrap; }
                    .badge { background: #f1f5f9; color: #334155; padding: 5px 12px; border-radius: 4px; font-size: 11px; font-weight: bold; border: 1px solid #cbd5e1; }
                    .badge-primary { background: #e0f2fe; color: #0369a1; border-color: #bae6fd; }
                    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                    th, td { border: 1px solid #cbd5e1; padding: 12px 16px; text-align: left; font-size: 13px; }
                    th { background-color: #f8fafc; font-weight: bold; color: #334155; width: 40%; }
                    td { font-family: monospace; color: #0f172a; font-size: 14px; }
                    .footer { margin-top: 50px; border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 11px; color: #64748b; text-align: center; }
                    @media print {
                        body { padding: 20px; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <div>
                        <div class="logo-text">S.K. ENTERPRISE</div>
                        <div class="logo-sub">Industrial Sluice Gates & Valves Manufacturer | Howrah, West Bengal</div>
                    </div>
                    <div class="ref">REF: SK-REF-${id.slice(-6).toUpperCase() || 'STD'}</div>
                </div>
                
                <h1>${title}</h1>
                <div class="meta">Manufactured at Works: Shanpur (South) Dasnagar, Howrah - 711105 | GST & ISO Compliant Facility</div>
                
                <div class="badges">
                    <span class="badge badge-primary">IS:3042 / BS:5143 Compliant</span>
                    <span class="badge badge-primary">AWWA C501 Standard</span>
                    <span class="badge">100% Hydrostatic Tested</span>
                    <span class="badge">Cast Iron FG 200/260 & SS 316</span>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Technical Parameter</th>
                            <th>Engineering Specification</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${validSpecs.map(s => `<tr><th>${s.label}</th><td>${s.value}</td></tr>`).join('')}
                    </tbody>
                </table>

                <div class="footer">
                    <p>This document is an official engineering specification sheet generated by S.K. Enterprise.</p>
                    <p>For tender BOQ submissions, formal drawings, or custom metallurgy pricing, contact: skenterprise2989@gmail.com | +91 82966 31533</p>
                </div>
                <script>
                    window.onload = () => { setTimeout(() => { window.print(); }, 300); };
                </script>
            </body>
            </html>
        `;
        printWindow.document.write(htmlContent);
        printWindow.document.close();
    };

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
                                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] min-w-[44px] flex items-center justify-center"
                                aria-label="Close panel"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Image Preview */}
                        <div className="p-6 bg-gradient-to-b from-slate-950/80 to-slate-900 border-b border-slate-800/80 flex flex-col items-center justify-center gap-4">
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

                            {/* Compliance Badges */}
                            <div className="flex flex-wrap items-center justify-center gap-2 w-full">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-semibold">
                                    <Award className="w-3 h-3" />
                                    <span>IS:3042 / BS:5143</span>
                                </span>
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-semibold">
                                    <ShieldCheck className="w-3 h-3" />
                                    <span>AWWA C501 Standard</span>
                                </span>
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-semibold">
                                    <Check className="w-3 h-3" />
                                    <span>Hydrostatic Tested</span>
                                </span>
                            </div>
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
                            onClick={handleDownloadDatasheet}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 font-semibold text-sm rounded-xl border border-slate-700 transition-all min-h-[44px]"
                            title="Download PDF Datasheet"
                        >
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Datasheet</span>
                        </button>

                        <button 
                            onClick={() => {
                                onClose();
                                if (onRequestQuote) onRequestQuote(title);
                            }}
                            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all min-h-[44px]"
                        >
                            <FileText className="w-4 h-4" />
                            <span>Request Formal Quote</span>
                        </button>

                        {id && (
                            <Link 
                                to={type === 'product' ? `/products/${id}` : `/parts/${id}`}
                                onClick={onClose}
                                className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm rounded-xl border border-slate-700 transition-colors min-h-[44px]"
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
