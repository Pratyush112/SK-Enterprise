import React, { useEffect } from 'react';
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
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
            {/* Backdrop */}
            <div 
                onClick={onClose}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
                aria-hidden="true"
            />

            {/* Slide-over panel */}
            <div 
                className="relative w-full max-w-xl bg-white border-l border-slate-200 shadow-2xl overflow-y-auto z-10 text-slate-900 flex flex-col justify-between transition-transform duration-300 transform translate-x-0 animate-slideLeft"
                role="dialog"
                aria-modal="true"
                aria-labelledby="spec-drawer-title"
            >
                {/* Header */}
                <div>
                    <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-5 bg-slate-50/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
                        <div className="flex items-center gap-3">
                            <span className="px-2.5 py-1 bg-white text-accent text-[11px] font-mono font-bold rounded-full border border-slate-200 uppercase tracking-wider shadow-2xs">
                                {type === 'product' ? 'Sluice Gate Spec' : 'Valve Part Spec'}
                            </span>
                            <h3 id="spec-drawer-title" className="text-lg font-headline font-black text-slate-900 truncate max-w-[240px] sm:max-w-xs uppercase">
                                {title}
                            </h3>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-industrial-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent min-h-[44px] min-w-[44px] flex items-center justify-center"
                            aria-label="Close panel"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Image Preview */}
                    <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col items-center justify-center gap-4">
                        {image ? (
                            <div className="relative group max-w-sm w-full h-56 bg-white rounded-industrial-md p-4 border border-slate-200 flex items-center justify-center overflow-hidden shadow-xs">
                                <img 
                                    src={image} 
                                    alt={title} 
                                    className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300" 
                                />
                            </div>
                        ) : (
                            <div className="w-full h-40 bg-white rounded-industrial-md border border-slate-200 flex items-center justify-center text-slate-400 font-mono text-xs shadow-xs">
                                No image preview available
                            </div>
                        )}

                        {/* Compliance Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-2 w-full">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-accent font-mono text-[11px] font-bold shadow-2xs">
                                <Award className="w-3 h-3" />
                                <span>IS:3042 / BS:5143</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-mono text-[11px] font-bold shadow-2xs">
                                <ShieldCheck className="w-3 h-3 text-accent" />
                                <span>AWWA C501 Standard</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-mono text-[11px] font-bold shadow-2xs">
                                <Check className="w-3 h-3 text-accent" />
                                <span>Hydrostatic Tested</span>
                            </span>
                        </div>
                    </div>

                    {/* Specs List */}
                    <div className="p-6 sm:p-8 space-y-4 bg-white">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                                Technical Data Sheet
                            </h4>
                            <span className="text-xs text-accent font-mono font-bold">
                                SK-REF-{id.slice(-6).toUpperCase() || 'STD'}
                            </span>
                        </div>

                        <div className="bg-slate-50 rounded-industrial-md border border-slate-200 divide-y divide-slate-200 overflow-hidden shadow-xs">
                            {validSpecs.length > 0 ? (
                                validSpecs.map((spec, index) => {
                                    const Icon = spec.icon || Info;
                                    return (
                                        <div key={index} className="p-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 hover:bg-white transition-colors">
                                            <div className="flex items-center gap-2.5 text-slate-600 text-xs sm:text-sm font-mono shrink-0 font-medium">
                                                <Icon className="w-4 h-4 text-accent shrink-0" />
                                                <span>{spec.label}</span>
                                            </div>
                                            <div className="text-sm font-bold text-slate-900 sm:text-right font-mono break-words pl-6 sm:pl-0">
                                                {spec.value}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="p-8 text-center text-slate-500 font-mono text-xs">
                                    No detailed technical parameters listed for this item. Please contact engineering for full drawings.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="sticky bottom-0 z-20 p-6 sm:p-8 bg-slate-50/95 backdrop-blur-md border-t border-slate-200 flex flex-col sm:flex-row gap-3 shadow-lg">
                    <button 
                        onClick={handleDownloadDatasheet}
                        className="flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-bold text-xs uppercase tracking-wider rounded-full border border-slate-200 transition-all min-h-[44px] shadow-xs"
                        title="Download PDF Datasheet"
                    >
                        <Download className="w-4 h-4 text-accent" />
                        <span className="hidden sm:inline">Datasheet</span>
                    </button>

                    <button 
                        onClick={() => {
                            onClose();
                            if (onRequestQuote) onRequestQuote(title);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-accent/25 transition-all min-h-[44px]"
                    >
                        <FileText className="w-4 h-4" />
                        <span>Request Formal Quote</span>
                    </button>

                    {id && (
                        <Link 
                            to={type === 'product' ? `/products/${id}` : `/parts/${id}`}
                            onClick={onClose}
                            className="flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-bold text-xs uppercase tracking-wider rounded-full border border-slate-200 transition-colors min-h-[44px] shadow-xs"
                        >
                            <span>Full Details</span>
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpecDrawer;
