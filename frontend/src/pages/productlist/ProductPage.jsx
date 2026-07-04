import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import RevealOnScroll from '../../components/motion/RevealOnScroll';
import { 
    Home, ChevronRight, Search, Filter, Grid, Table as TableIcon, FileText, Eye, 
    ShieldCheck, CheckCircle2, Award, Wrench, RefreshCw, ChevronLeft, X, SlidersHorizontal 
} from 'lucide-react';
import { getProducts } from '../../services/api';
import SEO from '../../components/SEO';
import QuoteModal from '../../components/QuoteModal';
import SpecDrawer from '../../components/SpecDrawer';
import { generateCatalogSchema } from '../../utils/schemaGenerators';

const ProductCards = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // UI State
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSeries, setSelectedSeries] = useState('All');
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
        const CACHE_KEY = 'products_cache_v1';
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                setProducts(JSON.parse(cached));
                setIsLoading(false);
            }
        } catch (e) {
            console.warn('Failed reading product cache', e);
        }

        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                if (response && response.data) {
                    const data = Array.isArray(response.data) ? response.data : [];
                    const normalized = data.map(p => ({ ...p, Image: p.Image || p.image || '' }));
                    setProducts(normalized);
                    try {
                        localStorage.setItem(CACHE_KEY, JSON.stringify(normalized));
                    } catch (e) {
                        console.warn('Failed writing product cache', e);
                    }
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (id && products.length > 0) {
            const found = products.find(p => p._id === id || p.id === id);
            if (found) {
                setSelectedSpecItem(found);
            }
        }
    }, [id, products]);

    // Derive unique series for filter pills
    const seriesList = useMemo(() => {
        const list = products.map(p => p.Series).filter(Boolean);
        return ['All', ...new Set(list)];
    }, [products]);

    // Filtered products based on search and series
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchesSeries = selectedSeries === 'All' || p.Series === selectedSeries;
            const query = searchQuery.toLowerCase().trim();
            if (!query) return matchesSeries;
            
            const matchName = (p.Name || '').toLowerCase().includes(query);
            const matchSeries = (p.Series || '').toLowerCase().includes(query);
            const matchStandard = (p.Standard || '').toLowerCase().includes(query);
            const matchApp = (p.Application || '').toLowerCase().includes(query);
            const matchMat = (p.Materials_of_construction || p.Materials || '').toLowerCase().includes(query);
            
            return matchesSeries && (matchName || matchSeries || matchStandard || matchApp || matchMat);
        });
    }, [products, selectedSeries, searchQuery]);

    // Reset pagination when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedSeries, searchQuery]);

    // Scroll pills container left/right
    const scrollFilter = (direction) => {
        if (filterScrollRef.current) {
            const scrollAmount = direction === 'left' ? -250 : 250;
            filterScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Paginated items
    const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredProducts.slice(start, start + pageSize);
    }, [filteredProducts, currentPage]);

    return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-accent selection:text-white">
            <SEO 
                title="Sluice Gates & Valves Catalog | SK Enterprise"
                description="Explore SK Enterprise's production-grade catalog of Cast Iron Sluice Gates, MS/SS Penstocks, Flap Gates, and Industrial Valves manufactured to AWWA, IS, and BS standards."
                name="SK Enterprise"
                type="website"
                url="/products"
                schema={generateCatalogSchema(products, "Sluice Gates & Valves Catalog", "/products")}
            />

            {/* Hero Header & Breadcrumb */}
            <header className="relative bg-slate-50 border-b border-slate-200 pt-24 pb-12 md:pt-32 md:pb-16 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Breadcrumbs */}
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
                        <Link to="/" className="hover:text-accent flex items-center gap-1 transition-colors">
                            <Home className="w-3.5 h-3.5" />
                            <span>Home</span>
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-slate-900 font-bold uppercase">Products Catalog</span>
                    </nav>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div className="max-w-3xl space-y-3">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-300 text-accent text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
                                <Award className="w-3.5 h-3.5" />
                                <span>AWWA & IS CERTIFIED MANUFACTURER</span>
                            </div>
                            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight font-headline uppercase">
                                INDUSTRIAL SLUICE GATES & VALVES CATALOG.
                            </h1>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                                Precision-engineered water control equipment designed for water treatment plants, irrigation works, sewage facilities, and flood control infrastructures.
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
                            <span>Request Custom Quote</span>
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200 font-mono text-xs">
                        <div className="flex items-center gap-2.5">
                            <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                            <span className="font-bold text-slate-700">ISO 9001:2015 Quality</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                            <span className="font-bold text-slate-700">100% Hydrostatic Tested</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <Wrench className="w-4 h-4 text-accent shrink-0" />
                            <span className="font-bold text-slate-700">Custom Dimensions</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <Award className="w-4 h-4 text-accent shrink-0" />
                            <span className="font-bold text-slate-700">IS 3042 / BS 7775 Standard</span>
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
                                placeholder="Search products, series, standards..."
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
                                SHOWING <strong className="text-slate-900 font-tabular">{filteredProducts.length}</strong> OF <strong className="text-slate-700 font-tabular">{products.length}</strong> PRODUCTS
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

                    {/* Row 2: Series Filter Pills */}
                    <div className="flex items-center gap-2 pt-1 border-t border-slate-200">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-accent uppercase tracking-wider shrink-0 mr-1">
                            <SlidersHorizontal className="w-3.5 h-3.5 text-accent" />
                            <span className="hidden xs:inline">SERIES:</span>
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
                            {seriesList.map(series => (
                                <button
                                    key={series}
                                    onClick={() => setSelectedSeries(series)}
                                    title={series}
                                    className={`px-3.5 py-1.5 rounded-industrial-md text-xs font-mono transition-all shrink-0 max-w-[200px] truncate uppercase ${
                                        selectedSeries === series
                                            ? 'bg-accent text-white shadow-md font-bold border border-accent'
                                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-300 shadow-xs'
                                    }`}
                                >
                                    {series}
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
                ) : filteredProducts.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-20 bg-slate-50 border border-slate-200 rounded-2xl max-w-2xl mx-auto p-8 space-y-4 shadow-sm">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                            <Search className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">No products found</h3>
                        <p className="text-slate-600 text-sm max-w-md mx-auto">
                            We couldn't find any sluice gates or valves matching "{searchQuery}" under the selected category.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedSeries('All');
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
                            {paginatedProducts.map((product) => (
                                <RevealOnScroll key={product._id}>
                                            <div className="bg-white border border-slate-200 hover:border-accent rounded-industrial-lg overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col justify-between group h-full">
                                    <div>
                                        {/* Image Box */}
                                        <div className="relative w-full h-56 bg-slate-50 p-6 flex items-center justify-center border-b border-slate-200 overflow-hidden shadow-xs">
                                            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                                                {product.Series && (
                                                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md border border-slate-200 text-accent font-mono font-bold text-[11px] rounded-md shadow-xs">
                                                        {product.Series}
                                                    </span>
                                                )}
                                            </div>
                                            {product.Standard && (
                                                <div className="absolute top-3 right-3 z-10">
                                                    <span className="px-2 py-1 bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 font-mono text-[11px] rounded-md shadow-xs">
                                                        {product.Standard}
                                                    </span>
                                                </div>
                                            )}
                                            {product.Image ? (
                                                <img
                                                    src={product.Image}
                                                    alt={product.Name}
                                                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="text-slate-500 text-xs font-mono">No Image Available</div>
                                            )}
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-5 space-y-3">
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900 group-hover:text-accent transition-colors line-clamp-1 font-headline uppercase">
                                                    <Link to={`/products/${product._id}`}>{product.Name}</Link>
                                                </h3>
                                                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed font-normal">
                                                    {product.Application || 'Precision-engineered water control equipment designed for seating/unseating head pressure isolation in water treatment plants, sewage works, and flood control infrastructures. Cast Iron IS:210 Grade FG 200/260 & SS 316 metallurgy available.'}
                                                </p>
                                            </div>

                                            {/* Quick Specs Grid */}
                                            <div className="grid grid-cols-2 gap-2 pt-2 text-xs bg-slate-50 p-3 rounded-industrial-md border border-slate-200 shadow-2xs">
                                                <div>
                                                    <span className="text-slate-500 block text-[10px] font-mono uppercase font-bold">Water Head</span>
                                                    <span className="text-slate-900 font-bold font-mono truncate block">
                                                        {product.Water || product.Water_Head || '5m - 15m Seating / Unseating'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-slate-500 block text-[10px] font-mono uppercase font-bold">Sealing</span>
                                                    <span className="text-slate-900 font-bold font-mono truncate block">
                                                        {product.Sealing || 'Metallic / EPDM to IS 3042'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Footer Actions */}
                                    <div className="p-5 pt-0 flex items-center gap-2.5">
                                        <button
                                            onClick={() => setSelectedSpecItem(product)}
                                            className="flex-1 px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-bold text-xs uppercase tracking-wider rounded-industrial-md border border-slate-200 transition-all flex items-center justify-center gap-1.5 min-h-[44px] shadow-xs"
                                        >
                                            <Eye className="w-3.5 h-3.5 text-accent" />
                                            <span>View Specs</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setQuoteItem(product.Name);
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
                                        <th className="p-4 whitespace-nowrap">Product Name</th>
                                        <th className="p-4 whitespace-nowrap">Standard</th>
                                        <th className="p-4 whitespace-nowrap">Sizes</th>
                                        <th className="p-4 whitespace-nowrap">Water Head</th>
                                        <th className="p-4 whitespace-nowrap">Sealing</th>
                                        <th className="p-4 whitespace-nowrap">Materials</th>
                                        <th className="p-4 whitespace-nowrap">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 text-sm font-normal">
                                    {paginatedProducts.map(product => (
                                        <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-4 whitespace-nowrap">
                                                <div className="w-16 h-16 bg-slate-50 rounded-md p-1 border border-slate-200 flex items-center justify-center shrink-0">
                                                    <img
                                                        src={product.Image || '/og-image.png'}
                                                        alt={product.Name}
                                                        className="max-w-full max-h-full object-contain rounded"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <div>
                                                    <div className="font-bold text-slate-900 text-sm hover:text-accent transition-colors uppercase font-headline">
                                                        <Link to={`/products/${product._id}`}>{product.Name || '—'}</Link>
                                                    </div>
                                                    <div className="text-xs font-mono text-accent mt-0.5">{product.Series || '—'}</div>
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <span className="text-xs font-mono bg-slate-50 text-slate-700 px-2.5 py-1 rounded border border-slate-200 font-bold">{product.Standard || '—'}</span>
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-xs font-mono text-slate-600 font-medium">{product.Sizes || '—'}</td>
                                            <td className="p-4 whitespace-nowrap text-xs font-mono text-slate-600 font-medium">{product.Water || product.Water_Head || '—'}</td>
                                            <td className="p-4 whitespace-nowrap text-xs text-slate-600 font-medium">{product.Sealing || '—'}</td>
                                            <td className="p-4 whitespace-nowrap text-xs text-slate-600 font-medium max-w-xs truncate">{product.Materials_of_construction || product.Materials || '—'}</td>
                                            <td className="p-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <button 
                                                        onClick={() => setSelectedSpecItem(product)}
                                                        className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-md border border-slate-200 transition-colors text-xs flex items-center gap-1.5 font-bold uppercase shadow-2xs"
                                                        title="View Specifications"
                                                    >
                                                        <Eye className="w-3.5 h-3.5 text-accent" />
                                                        <span className="hidden xl:inline">Specs</span>
                                                    </button>
                                                    <button 
                                                        onClick={() => {
                                                            setQuoteItem(product.Name);
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
                type="product"
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

export default ProductCards;
