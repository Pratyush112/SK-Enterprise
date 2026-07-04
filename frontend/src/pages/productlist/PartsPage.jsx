import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Home, ChevronRight, Search, Filter, Grid, Table as TableIcon, FileText, Eye, 
    ShieldCheck, CheckCircle2, Award, Wrench, RefreshCw, ChevronLeft, X, SlidersHorizontal 
} from 'lucide-react';
import { getParts } from '../../services/api';
import SEO from '../../components/SEO';
import QuoteModal from '../../components/QuoteModal';
import SpecDrawer from '../../components/SpecDrawer';

const PartsCards = () => {
    const [parts, setParts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // UI State
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('All');
    const [selectedSpecItem, setSelectedSpecItem] = useState(null);
    const [quoteItem, setQuoteItem] = useState(null);
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    // Refs
    const searchInputRef = useRef(null);
    const filterScrollRef = useRef(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;

    // Keyboard shortcut to focus search bar
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '/' && document.activeElement !== searchInputRef.current) {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        const CACHE_KEY = 'parts_cache_v3';
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].Image) {
                    setParts(parsed);
                    setIsLoading(false);
                }
            }
        } catch (e) {
            console.warn('Failed reading parts cache', e);
        }

        const fetchParts = async () => {
            try {
                const response = await getParts();
                if (response && response.data) {
                    const data = Array.isArray(response.data) ? response.data : [];
                    const normalized = data.map(p => ({ 
                        ...p,
                        Name: p.item || p.Name || 'Industrial Part',
                        Image: p.product_image || p.Image || p.image || '',
                        Grade: p.grade || p.Grade || p.Material_Grade || '',
                        Sizes: p.size || p.Sizes || p.Size_Range || 'Standard'
                    }));
                    setParts(normalized);
                    try {
                        localStorage.setItem(CACHE_KEY, JSON.stringify(normalized));
                    } catch (e) {
                        console.warn('Failed writing parts cache', e);
                    }
                }
            } catch (error) {
                console.error('Error fetching parts:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchParts();
    }, []);

    // Derive unique grades for filter pills
    const gradeList = useMemo(() => {
        const list = parts.map(p => p.Grade).filter(Boolean);
        return ['All', ...new Set(list)];
    }, [parts]);

    // Filtered parts based on search and grade
    const filteredParts = useMemo(() => {
        return parts.filter(p => {
            const matchesGrade = selectedGrade === 'All' || p.Grade === selectedGrade;
            const query = searchQuery.toLowerCase().trim();
            if (!query) return matchesGrade;
            
            const matchName = (p.Name || '').toLowerCase().includes(query);
            const matchGrade = (p.Grade || '').toLowerCase().includes(query);
            const matchStandard = (p.Standard || p.IS || p.BS || p.ASTM || p.DIN || '').toLowerCase().includes(query);
            const matchMat = (p.Material || '').toLowerCase().includes(query);
            
            return matchesGrade && (matchName || matchGrade || matchStandard || matchMat);
        });
    }, [parts, selectedGrade, searchQuery]);

    // Reset pagination when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedGrade, searchQuery]);

    // Scroll pills container left/right
    const scrollFilter = (direction) => {
        if (filterScrollRef.current) {
            const scrollAmount = direction === 'left' ? -250 : 250;
            filterScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Paginated items
    const totalPages = Math.ceil(filteredParts.length / pageSize) || 1;
    const paginatedParts = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredParts.slice(start, start + pageSize);
    }, [filteredParts, currentPage]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
            <SEO 
                title="Industrial Fasteners & Spares Catalog | SK Enterprise"
                description="Explore SK Enterprise's high-tensile fasteners, Anchor Studs, Spindle Rods, and Replacement Spares engineered for heavy infrastructure."
                name="SK Enterprise"
                type="website"
                url="/parts"
            />

            {/* Hero Header & Breadcrumbs */}
            <header className="relative bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800/80 py-8 sm:py-12 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Breadcrumbs */}
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-400">
                        <Link to="/" className="hover:text-blue-400 flex items-center gap-1 transition-colors">
                            <Home className="w-3.5 h-3.5" />
                            <span>Home</span>
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                        <span className="text-slate-200 font-semibold">Parts & Fasteners</span>
                    </nav>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div className="max-w-3xl space-y-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                                <Award className="w-3.5 h-3.5" />
                                <span>High-Tensile Fasteners & Spares</span>
                            </div>
                            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight font-headline">
                                Industrial Fasteners & Gate Components
                            </h1>
                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                                Heavy-duty SS 304, SS 316, and High-Tensile Anchor Bolts, Spindles, Extension Rods, and Replacement Seals manufactured to ASTM & DIN standards.
                            </p>
                        </div>

                        <button 
                            onClick={() => {
                                setQuoteItem('');
                                setIsQuoteOpen(true);
                            }}
                            className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/25 transition-all self-start lg:self-auto"
                        >
                            <FileText className="w-4 h-4" />
                            <span>Request Bulk Quote</span>
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
                        <div className="flex items-center gap-2.5">
                            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                            <span className="text-xs font-medium text-slate-300">Grade 8.8 / SS316 Alloy</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                            <span className="text-xs font-medium text-slate-300">Corrosion Resistant Coating</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <Wrench className="w-4 h-4 text-indigo-400 shrink-0" />
                            <span className="text-xs font-medium text-slate-300">Custom Thread Pitch & Length</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <Award className="w-4 h-4 text-amber-400 shrink-0" />
                            <span className="text-xs font-medium text-slate-300">ASTM A193 / DIN 933</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Production-Grade Responsive Sticky Toolbar */}
            <section className="bg-slate-950/95 border-b border-slate-800/90 px-4 sm:px-8 py-3.5 sticky top-16 sm:top-20 z-30 backdrop-blur-2xl shadow-xl transition-all">
                <div className="max-w-7xl mx-auto space-y-3">
                    {/* Row 1: Search Bar & View Controls */}
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                        {/* Search Input Box */}
                        <div className="relative w-full sm:w-80 md:w-96 shrink-0">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Search className="w-4 h-4 text-blue-400" />
                            </div>
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search fasteners, grades, standards..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-14 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-blue-500 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all shadow-inner"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
                                {searchQuery ? (
                                    <button 
                                        onClick={() => setSearchQuery('')}
                                        className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                                        title="Clear search"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-slate-950 border border-slate-800 rounded">
                                        /
                                    </kbd>
                                )}
                            </div>
                        </div>

                        {/* View Switcher & Counter */}
                        <div className="flex items-center justify-between sm:justify-end gap-3">
                            <div className="text-xs text-slate-400 font-medium">
                                Showing <strong className="text-white font-mono">{filteredParts.length}</strong> of <strong className="text-slate-300 font-mono">{parts.length}</strong> Components
                            </div>
                            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                        viewMode === 'grid' ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30' : 'text-slate-400 hover:text-slate-200'
                                    }`}
                                    title="Grid View"
                                >
                                    <Grid className="w-3.5 h-3.5" />
                                    <span>Grid</span>
                                </button>
                                <button
                                    onClick={() => setViewMode('table')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                        viewMode === 'table' ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30' : 'text-slate-400 hover:text-slate-200'
                                    }`}
                                    title="Table View"
                                >
                                    <TableIcon className="w-3.5 h-3.5" />
                                    <span>Table</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Grade Filter Pills */}
                    <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
                            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                            <span className="hidden xs:inline">Grade:</span>
                        </div>

                        {/* Left Scroll Button */}
                        <button
                            onClick={() => scrollFilter('left')}
                            className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 shrink-0 transition-colors"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {/* Scrollable Pills Row */}
                        <div 
                            ref={filterScrollRef}
                            className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 w-full"
                        >
                            {gradeList.map(grade => (
                                <button
                                    key={grade}
                                    onClick={() => setSelectedGrade(grade)}
                                    title={grade}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 max-w-[200px] truncate ${
                                        selectedGrade === grade
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-semibold border border-blue-500'
                                            : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
                                    }`}
                                >
                                    {grade}
                                </button>
                            ))}
                        </div>

                        {/* Right Scroll Button */}
                        <button
                            onClick={() => scrollFilter('right')}
                            className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 shrink-0 transition-colors"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Main Catalog Content */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12">
                {isLoading ? (
                    /* Loading Skeleton */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 animate-pulse">
                                <div className="w-full h-52 bg-slate-800 rounded-xl" />
                                <div className="h-6 bg-slate-800 rounded w-3/4" />
                                <div className="h-4 bg-slate-800 rounded w-1/2" />
                                <div className="pt-4 border-t border-slate-800 flex justify-between">
                                    <div className="h-9 bg-slate-800 rounded-xl w-24" />
                                    <div className="h-9 bg-slate-800 rounded-xl w-28" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredParts.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-2xl max-w-2xl mx-auto p-8 space-y-4">
                        <div className="w-16 h-16 bg-slate-800/80 rounded-full flex items-center justify-center mx-auto text-slate-500">
                            <Search className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white">No parts found</h3>
                        <p className="text-slate-400 text-sm max-w-md mx-auto">
                            We couldn't find any components or fasteners matching "{searchQuery}" under the selected grade.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedGrade('All');
                            }}
                            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-xl border border-slate-700 transition-colors inline-flex items-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            <span>Reset Filters</span>
                        </button>
                    </div>
                ) : viewMode === 'grid' ? (
                    /* Grid View */
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedParts.map((part) => (
                                <motion.div
                                    key={part._id}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-slate-900 border border-slate-800/80 hover:border-blue-500/40 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        {/* Image Box */}
                                        <div className="relative w-full h-56 bg-slate-950 p-6 flex items-center justify-center border-b border-slate-800/80 overflow-hidden">
                                            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                                                {part.Grade && (
                                                    <span className="px-2.5 py-1 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-blue-400 font-semibold text-[11px] rounded-lg shadow-sm">
                                                        {part.Grade}
                                                    </span>
                                                )}
                                            </div>
                                            {(part.IS || part.BS || part.ASTM || part.DIN || part.ISO || part.Standard) && (
                                                <div className="absolute top-3 right-3 z-10">
                                                    <span className="px-2 py-1 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-slate-300 font-mono text-[11px] rounded-lg shadow-sm">
                                                        {part.IS || part.BS || part.ASTM || part.DIN || part.ISO || part.Standard}
                                                    </span>
                                                </div>
                                            )}
                                            {part.Image ? (
                                                <img
                                                    src={part.Image}
                                                    alt={part.Name}
                                                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'block';
                                                    }}
                                                />
                                            ) : null}
                                            <div 
                                                className="text-slate-600 text-xs font-mono text-center" 
                                                style={{ display: part.Image ? 'none' : 'block' }}
                                            >
                                                No Image Available
                                            </div>
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-5 space-y-3">
                                            <div>
                                                <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                                                    <Link to={`/parts/${part._id}`}>{part.Name}</Link>
                                                </h3>
                                                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                                    {part.Description || part.Material || 'Engineered high-tensile industrial component.'}
                                                </p>
                                            </div>

                                            {/* Quick Specs Grid */}
                                            <div className="grid grid-cols-2 gap-2 pt-2 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                                                <div>
                                                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Material Grade</span>
                                                    <span className="text-slate-200 font-medium truncate block">
                                                        {part.Grade || 'Stainless Steel'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Size Range</span>
                                                    <span className="text-slate-200 font-medium font-mono truncate block">
                                                        {part.Sizes || 'Custom'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Footer Actions */}
                                    <div className="p-5 pt-0 flex items-center gap-2.5">
                                        <button
                                            onClick={() => setSelectedSpecItem(part)}
                                            className="flex-1 px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs rounded-xl border border-slate-700/80 transition-all flex items-center justify-center gap-1.5"
                                        >
                                            <Eye className="w-3.5 h-3.5 text-blue-400" />
                                            <span>View Specs</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setQuoteItem(part.Name);
                                                setIsQuoteOpen(true);
                                            }}
                                            className="flex-1 px-3.5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-md shadow-blue-600/20 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-1.5"
                                        >
                                            <FileText className="w-3.5 h-3.5" />
                                            <span>Request Quote</span>
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Grid Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-8 flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-400">
                                <div>
                                    Page <strong className="text-white">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-1"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        <span>Previous</span>
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-1"
                                    >
                                        <span>Next</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Table View */
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 text-xs uppercase font-semibold tracking-wider">
                                        <th className="p-4 whitespace-nowrap">Image</th>
                                        <th className="p-4 whitespace-nowrap">Part Name</th>
                                        <th className="p-4 whitespace-nowrap">Grade / Alloy</th>
                                        <th className="p-4 whitespace-nowrap">Standard</th>
                                        <th className="p-4 whitespace-nowrap">Material</th>
                                        <th className="p-4 whitespace-nowrap">Size Range</th>
                                        <th className="p-4 whitespace-nowrap">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60 text-sm">
                                    {paginatedParts.map(part => (
                                        <tr key={part._id} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="p-4 whitespace-nowrap">
                                                <div className="w-16 h-16 bg-slate-900 rounded-lg p-1 border border-slate-800 flex items-center justify-center shrink-0">
                                                    <img
                                                        src={part.Image || '/og-image.png'}
                                                        alt={part.Name}
                                                        className="max-w-full max-h-full object-contain rounded"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <div>
                                                    <div className="font-bold text-white text-sm hover:text-blue-400 transition-colors">
                                                        <Link to={`/parts/${part._id}`}>{part.Name || '—'}</Link>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <span className="text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-md">{part.Grade || '—'}</span>
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-xs font-mono text-slate-300">{part.IS || part.BS || part.ASTM || part.DIN || part.ISO || '—'}</td>
                                            <td className="p-4 whitespace-nowrap text-xs text-slate-300">{part.Material || '—'}</td>
                                            <td className="p-4 whitespace-nowrap text-xs text-slate-300">{part.Sizes || '—'}</td>
                                            <td className="p-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <button 
                                                        onClick={() => setSelectedSpecItem(part)}
                                                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors text-xs flex items-center gap-1.5"
                                                        title="View Specifications"
                                                    >
                                                        <Eye className="w-3.5 h-3.5 text-blue-400" />
                                                        <span className="hidden xl:inline">Specs</span>
                                                    </button>
                                                    <button 
                                                        onClick={() => {
                                                            setQuoteItem(part.Name);
                                                            setIsQuoteOpen(true);
                                                        }}
                                                        className="p-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 border border-blue-500/30 rounded-lg transition-colors text-xs flex items-center gap-1.5 font-medium"
                                                        title="Request Quote"
                                                    >
                                                        <FileText className="w-3.5 h-3.5" />
                                                        <span className="hidden xl:inline">Quote</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                            <div>
                                Page <strong className="text-white">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-1"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    <span>Previous</span>
                                </button>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-1"
                                >
                                    <span>Next</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Spec Drawer */}
            <SpecDrawer
                isOpen={!!selectedSpecItem}
                onClose={() => setSelectedSpecItem(null)}
                item={selectedSpecItem}
                type="part"
                onRequestQuote={(itemName) => {
                    setQuoteItem(itemName);
                    setIsQuoteOpen(true);
                }}
            />

            {/* Quote Inquiry Modal */}
            <QuoteModal
                isOpen={isQuoteOpen}
                onClose={() => setIsQuoteOpen(false)}
                initialItem={quoteItem}
            />
        </div>
    );
};

export default PartsCards;