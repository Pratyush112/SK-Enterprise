import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import RevealOnScroll from '../../components/motion/RevealOnScroll';
import { 
    Home, ChevronRight, Search, Filter, Grid, Table as TableIcon, FileText, Eye, 
    ShieldCheck, CheckCircle2, Award, Wrench, RefreshCw, ChevronLeft, X, SlidersHorizontal 
} from 'lucide-react';
import { getParts } from '../../services/api';
import SEO from '../../components/SEO';
import QuoteModal from '../../components/QuoteModal';
import SpecDrawer from '../../components/SpecDrawer';
import { generateCatalogSchema } from '../../utils/schemaGenerators';

const PartsCards = () => {
    const { id } = useParams();
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

    useEffect(() => {
        if (id && parts.length > 0) {
            const found = parts.find(p => p._id === id || p.id === id);
            if (found) {
                setSelectedSpecItem(found);
            }
        }
    }, [id, parts]);

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
        <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-accent selection:text-white">
            <SEO 
                title={selectedSpecItem ? `${selectedSpecItem.Name || 'Industrial Fastener'} — Grade ${selectedSpecItem.Grade || 'Standard'} | SK Enterprise` : "Industrial Fasteners & Spares Catalog | SK Enterprise"}
                description={selectedSpecItem ? `Technical specification for ${selectedSpecItem.Name || 'Industrial Fastener'} in material grade ${selectedSpecItem.Grade || 'SS/MS'} manufactured by SK Enterprise.` : "Explore SK Enterprise's high-tensile fasteners, Anchor Studs, Spindle Rods, and Replacement Spares engineered for heavy infrastructure."}
                name="SK Enterprise"
                type="website"
                url={selectedSpecItem ? `/parts/${selectedSpecItem._id || selectedSpecItem.id || id}` : "/parts"}
                schema={generateCatalogSchema(parts, "Industrial Fasteners & Spares Catalog", "/parts")}
            />

            {/* Hero Header & Breadcrumbs */}
            <header className="relative bg-slate-50 border-b border-slate-200 pt-24 pb-12 md:pt-32 md:pb-16 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Breadcrumbs */}
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
                        <Link to="/" className="hover:text-accent flex items-center gap-1 transition-colors">
                            <Home className="w-3.5 h-3.5" />
                            <span>Home</span>
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-slate-900 font-bold uppercase">Parts & Fasteners</span>
                    </nav>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div className="max-w-3xl space-y-3">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-300 text-accent text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
                                <Award className="w-3.5 h-3.5" />
                                <span>HIGH-TENSILE FASTENERS & SPARES</span>
                            </div>
                            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight font-headline uppercase">
                                INDUSTRIAL FASTENERS & GATE COMPONENTS.
                            </h1>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                                Heavy-duty SS 304, SS 316, and High-Tensile Anchor Bolts, Spindles, Extension Rods, and Replacement Seals manufactured to ASTM & DIN standards.
                            </p>
                        </div>

                        <button 
                            onClick={() => {
                                setQuoteItem('');
                                setIsQuoteOpen(true);
                            }}
                            className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider rounded-industrial-md shadow-lg shadow-accent/25 transition-all self-start lg:self-auto hover:-translate-y-0.5"
                        >
                            <FileText className="w-4 h-4" />
                            <span>Request Bulk Quote</span>
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200 font-mono text-xs">
                        <div className="flex items-center gap-2.5">
                            <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                            <span className="font-bold text-slate-700">Grade 8.8 / SS316 Alloy</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                            <span className="font-bold text-slate-700">Corrosion Resistant Coating</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <Wrench className="w-4 h-4 text-accent shrink-0" />
                            <span className="font-bold text-slate-700">Custom Thread Pitch & Length</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <Award className="w-4 h-4 text-accent shrink-0" />
                            <span className="font-bold text-slate-700">ASTM A193 / DIN 933</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Production-Grade Responsive Sticky Toolbar */}
            <section className="bg-white/95 border-b border-slate-200 px-4 sm:px-8 py-3.5 sticky top-[60px] sm:top-16 z-30 backdrop-blur-2xl shadow-md transition-all">
                <div className="max-w-7xl mx-auto space-y-3">
                    {/* Row 1: Search Bar & View Controls */}
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                        {/* Search Input Box */}
                        <div className="relative w-full sm:w-80 md:w-96 shrink-0">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Search className="w-4 h-4 text-accent" />
                            </div>
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search fasteners, grades, standards..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-14 py-2.5 bg-slate-50 border border-slate-300 hover:border-slate-400 focus:border-accent focus:bg-white rounded-industrial-md text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all shadow-sm"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
                                {searchQuery ? (
                                    <button 
                                        onClick={() => setSearchQuery('')}
                                        className="p-1 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                                        title="Clear search"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-500 bg-white border border-slate-300 rounded shadow-2xs">
                                        /
                                    </kbd>
                                )}
                            </div>
                        </div>

                        {/* View Switcher & Counter */}
                        <div className="flex items-center justify-between sm:justify-end gap-3">
                            <div className="text-xs text-slate-500 font-mono font-bold">
                                SHOWING <strong className="text-slate-900 font-tabular">{filteredParts.length}</strong> OF <strong className="text-slate-700 font-tabular">{parts.length}</strong> COMPONENTS
                            </div>
                            <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-industrial-md border border-slate-200 shadow-xs">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 uppercase ${
                                        viewMode === 'grid' ? 'bg-accent text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
                                    }`}
                                    title="Grid View"
                                >
                                    <Grid className="w-3.5 h-3.5" />
                                    <span>Grid</span>
                                </button>
                                <button
                                    onClick={() => setViewMode('table')}
                                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 uppercase ${
                                        viewMode === 'table' ? 'bg-accent text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
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
                    <div className="flex items-center gap-2 pt-1 border-t border-slate-200">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-accent uppercase tracking-wider shrink-0 mr-1">
                            <SlidersHorizontal className="w-3.5 h-3.5 text-accent" />
                            <span className="hidden xs:inline">GRADE:</span>
                        </div>

                        {/* Left Scroll Button */}
                        <button
                            onClick={() => scrollFilter('left')}
                            className="hidden md:flex items-center justify-center w-7 h-7 rounded-md bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 shrink-0 transition-colors shadow-xs"
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
                                    className={`px-3.5 py-1.5 rounded-industrial-md text-xs font-mono transition-all shrink-0 max-w-[200px] truncate uppercase ${
                                        selectedGrade === grade
                                            ? 'bg-accent text-white shadow-md font-bold border border-accent'
                                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-300 shadow-xs'
                                    }`}
                                >
                                    {grade}
                                </button>
                            ))}
                        </div>

                        {/* Right Scroll Button */}
                        <button
                            onClick={() => scrollFilter('right')}
                            className="hidden md:flex items-center justify-center w-7 h-7 rounded-md bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 shrink-0 transition-colors shadow-xs"
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
                            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 animate-pulse shadow-sm">
                                <div className="w-full h-52 bg-slate-100 rounded-xl" />
                                <div className="h-6 bg-slate-100 rounded w-3/4" />
                                <div className="h-4 bg-slate-100 rounded w-1/2" />
                                <div className="pt-4 border-t border-slate-200 flex justify-between">
                                    <div className="h-9 bg-slate-100 rounded-xl w-24" />
                                    <div className="h-9 bg-slate-100 rounded-xl w-28" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredParts.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-20 bg-slate-50 border border-slate-200 rounded-2xl max-w-2xl mx-auto p-8 space-y-4 shadow-sm">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                            <Search className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">No parts found</h3>
                        <p className="text-slate-600 text-sm max-w-md mx-auto">
                            We couldn't find any components or fasteners matching "{searchQuery}" under the selected grade.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedGrade('All');
                            }}
                            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl border border-slate-900 transition-colors inline-flex items-center gap-2 shadow-sm"
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
                                <RevealOnScroll key={part._id}>
                                    <div className="bg-white border border-slate-200 hover:border-accent rounded-industrial-lg overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col justify-between group h-full">
                                    <div>
                                        {/* Image Box */}
                                        <div className="relative w-full h-56 bg-slate-50 p-6 flex items-center justify-center border-b border-slate-200 overflow-hidden shadow-xs">
                                            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                                                {part.Grade && (
                                                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md border border-slate-200 text-accent font-mono font-bold text-[11px] rounded-md shadow-xs">
                                                        {part.Grade}
                                                    </span>
                                                )}
                                            </div>
                                            {(part.IS || part.BS || part.ASTM || part.DIN || part.ISO || part.Standard) && (
                                                <div className="absolute top-3 right-3 z-10">
                                                    <span className="px-2 py-1 bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 font-mono text-[11px] rounded-md shadow-xs">
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
                                                className="text-slate-500 text-xs font-mono text-center" 
                                                style={{ display: part.Image ? 'none' : 'block' }}
                                            >
                                                No Image Available
                                            </div>
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-5 space-y-3">
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900 group-hover:text-accent transition-colors line-clamp-1 font-headline uppercase">
                                                    <Link to={`/parts/${part._id}`}>{part.Name}</Link>
                                                </h3>
                                                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed font-normal">
                                                    {part.Description || part.Material || 'Heavy-duty SS 304, SS 316, and Grade 8.8 High-Tensile Anchor Bolts, Spindles, Extension Rods, and Replacement Seals manufactured to ASTM A193 & DIN 933 standards.'}
                                                </p>
                                            </div>

                                            {/* Quick Specs Grid */}
                                            <div className="grid grid-cols-2 gap-2 pt-2 text-xs bg-slate-50 p-3 rounded-industrial-md border border-slate-200 shadow-2xs">
                                                <div>
                                                    <span className="text-slate-500 block text-[10px] font-mono uppercase font-bold">Material Grade</span>
                                                    <span className="text-slate-900 font-bold font-mono truncate block">
                                                        {part.Grade || 'SS 316 / Grade 8.8'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-slate-500 block text-[10px] font-mono uppercase font-bold">Size Range</span>
                                                    <span className="text-slate-900 font-bold font-mono truncate block">
                                                        {part.Sizes || 'M12 - M48 Custom'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Footer Actions */}
                                    <div className="p-5 pt-0 flex items-center gap-2.5">
                                        <button
                                            onClick={() => setSelectedSpecItem(part)}
                                            className="flex-1 px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-bold text-xs uppercase tracking-wider rounded-industrial-md border border-slate-200 transition-all flex items-center justify-center gap-1.5 min-h-[44px] shadow-xs"
                                        >
                                            <Eye className="w-3.5 h-3.5 text-accent" />
                                            <span>View Specs</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setQuoteItem(part.Name);
                                                setIsQuoteOpen(true);
                                            }}
                                            className="flex-1 px-3.5 py-2.5 bg-accent hover:bg-accent-hover text-white font-bold text-xs uppercase tracking-wider rounded-industrial-md shadow-md shadow-accent/20 transition-all flex items-center justify-center gap-1.5 min-h-[44px]"
                                        >
                                            <FileText className="w-3.5 h-3.5" />
                                            <span>Request Quote</span>
                                        </button>
                                    </div>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>

                        {/* Grid Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-8 flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 shadow-sm">
                                <div>
                                    Page <strong className="text-slate-900">{currentPage}</strong> of <strong className="text-slate-900">{totalPages}</strong>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-900 rounded-lg border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-1 shadow-xs"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        <span>Previous</span>
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-900 rounded-lg border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-1 shadow-xs"
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
                    <div className="bg-white border border-slate-200 rounded-industrial-lg overflow-hidden shadow-lg">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 text-xs font-mono uppercase font-bold tracking-wider">
                                        <th className="p-4 whitespace-nowrap">Image</th>
                                        <th className="p-4 whitespace-nowrap">Part Name</th>
                                        <th className="p-4 whitespace-nowrap">Grade / Alloy</th>
                                        <th className="p-4 whitespace-nowrap">Standard</th>
                                        <th className="p-4 whitespace-nowrap">Material</th>
                                        <th className="p-4 whitespace-nowrap">Size Range</th>
                                        <th className="p-4 whitespace-nowrap">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 text-sm font-normal">
                                    {paginatedParts.map(part => (
                                        <tr key={part._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-4 whitespace-nowrap">
                                                <div className="w-16 h-16 bg-slate-50 rounded-md p-1 border border-slate-200 flex items-center justify-center shrink-0">
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
                                                    <div className="font-bold text-slate-900 text-sm hover:text-accent transition-colors uppercase font-headline">
                                                        <Link to={`/parts/${part._id}`}>{part.Name || '—'}</Link>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <span className="text-xs font-mono font-bold bg-slate-50 text-slate-700 border border-slate-200 px-2.5 py-1 rounded">{part.Grade || '—'}</span>
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-xs font-mono text-slate-600 font-medium">{part.IS || part.BS || part.ASTM || part.DIN || part.ISO || '—'}</td>
                                            <td className="p-4 whitespace-nowrap text-xs text-slate-600 font-medium">{part.Material || '—'}</td>
                                            <td className="p-4 whitespace-nowrap text-xs font-mono text-slate-600 font-medium">{part.Sizes || '—'}</td>
                                            <td className="p-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <button 
                                                        onClick={() => setSelectedSpecItem(part)}
                                                        className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-md border border-slate-200 transition-colors text-xs flex items-center gap-1.5 font-bold uppercase shadow-2xs"
                                                        title="View Specifications"
                                                    >
                                                        <Eye className="w-3.5 h-3.5 text-accent" />
                                                        <span className="hidden xl:inline">Specs</span>
                                                    </button>
                                                    <button 
                                                        onClick={() => {
                                                            setQuoteItem(part.Name);
                                                            setIsQuoteOpen(true);
                                                        }}
                                                        className="p-2 bg-accent hover:bg-accent-hover text-white rounded-md transition-colors text-xs flex items-center gap-1.5 font-bold uppercase shadow-sm"
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
                        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
                            <div>
                                Page <strong className="text-slate-900">{currentPage}</strong> of <strong className="text-slate-900">{totalPages}</strong>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-900 rounded-lg border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-1 shadow-xs"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    <span>Previous</span>
                                </button>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-900 rounded-lg border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-1 shadow-xs"
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