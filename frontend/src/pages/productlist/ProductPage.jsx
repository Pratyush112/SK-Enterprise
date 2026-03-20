import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../hooks/useNavigation';
import { getProducts } from '../../routers/APIs';
import SEO from '../../components/SEO';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// function createData(name, series, standard, mounting, sizes, sealing, water, leakage_parameter, spacing_between_bars, single_piece_width, single_piece_height, materials_of_construction, application) {
//     return { name, series, standard, mounting, sizes, sealing, water, leakage_parameter, spacing_between_bars, single_piece_width, single_piece_height, materials_of_construction, application };
// }

const ProductCards = () => {

    const { goBack, redirectTo } = useNavigation();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const CACHE_KEY = 'products_cache_v1';

        // Try render from cache first (stale-while-revalidate)
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
                    // Ensure each product has `Image` (server uses `Image`) and consistent keys
                    const normalized = data.map(p => ({ ...p, Image: p.Image || p.image || '' }));
                    setProducts(normalized);
                    try {
                        localStorage.setItem(CACHE_KEY, JSON.stringify(normalized));
                    } catch (e) {
                        console.warn('Failed writing product cache', e);
                    }
                } else {
                    console.warn('getProducts returned no data or unexpected shape', response);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const columns = useMemo(() => [
        {
            header: 'Image',
            accessorKey: 'Image',
            cell: info => (
                <div className="min-w-[200px]">  {/* Add minimum width container */}
                    <Link to={`/products/${info.row.original._id}`}>
                        <img
                            src={info.getValue()}
                            alt={info.row.original?.Name || 'Product image'}
                            width={256}
                            height={256}
                            decoding="async"
                            className="w-64 h-64 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                        />
                    </Link>
                </div>
            ),
        },
        {
            header: 'Name',
            accessorKey: 'Name',
        },
        {
            header: 'Series',
            accessorKey: 'Series',
        },
        {
            header: 'Standard',
            accessorKey: 'Standard',
        },
        {
            header: 'Mounting',
            accessorKey: 'Mounting',
        },
        {
            header: 'Sizes',
            accessorKey: 'Sizes',
        },
        {
            header: 'Sealing',
            accessorKey: 'Sealing',
        },
        {
            header: 'Water Head',
            accessorKey: 'Water',
        },
        {
            header: 'Leakage Parameter',
            accessorKey: 'Leakage_Parameter',
        },
        {
            header: 'Spacing Between Bars',
            accessorKey: 'Spacing_Between_Bars',
        },
        {
            header: 'Single Piece Width',
            accessorKey: 'Single_Piece_Width',
        },
        {
            header: 'Single Piece Height',
            accessorKey: 'Single_Piece_Height',
        },
        {
            header: 'Materials',
            accessorKey: 'Materials_of_construction',
        },
        {
            header: 'Application',
            accessorKey: 'Application',
        },
    ], []);

    const table = useReactTable({
        data: products,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    // Sub-component: per-product animated hero section
    const ProductHero = ({ product, index, total }) => {
        const ref = React.useRef(null);
        const shouldReduceMotion = useReducedMotion();
        // Use scroller progress for this product block
        const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center', 'end start'] });

        // Smoother transforms for hero/shrink effect
        // More gradual value changes and explicit transition props
        const scale = shouldReduceMotion ? 1 : useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [0.96, 1, 1.12, 1, 0.96]);
        const y = shouldReduceMotion ? 0 : useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [-20, 0, 24, 0, -20]);
        const overlayOpacity = shouldReduceMotion ? 0.4 : useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [0.7, 0.4, 0.12, 0.4, 0.7]);
        const detailsY = shouldReduceMotion ? 4 : useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [-8, 8, 64, 8, -8]);

        return (
            <section ref={ref} className="min-h-[60vh] sm:min-h-[75vh] md:min-h-screen relative flex items-center justify-center overflow-hidden bg-fixed px-2 sm:px-4 md:px-8" style={{ touchAction: 'pan-y' }}>
                {/* background image */}
                <motion.div
                    style={{ scale, y, willChange: 'transform, opacity' }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    transition={{ duration: 1.1, ease: 'easeInOut' }}
                >
                    {/* reduced border-radius & blur on small devices for performance */}
                    <div className="w-full h-full bg-cover bg-center sm:rounded-[2rem] rounded-none" style={{ backgroundImage: `url(${product.Image || '/public/og-image.png'})` }} />
                    <div style={{ opacity: overlayOpacity, transition: 'opacity 1.1s cubic-bezier(0.77,0,0.18,1)', willChange: 'opacity' }} className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/20 to-black/30 sm:rounded-[2rem] rounded-none" />
                </motion.div>

                {/* floating product index (sticky) */}
                <div className="absolute top-6 right-6 z-30 rounded-[2.5rem] hidden md:block">
                    <div className="inline-flex items-center gap-3 px-3 py-2 rounded-full bg-white/5 border border-white/10 shadow-md backdrop-blur-md text-sm text-white/90">
                        <div className="font-semibold">{index + 1}</div>
                        <div className="text-xs text-white/60">/</div>
                        <div className="text-xs text-white/60">{total}</div>
                    </div>
                </div>

                {/* content */}
                <motion.div style={{ y: detailsY, willChange: 'transform' }} className="relative z-20 max-w-6xl px-2 sm:px-4 md:px-8 rounded-[2.5rem] text-center py-8 sm:py-14 md:py-20" transition={{ duration: 1.1, ease: 'easeInOut' }}>
                    <div className="inline-block bg-gradient-to-tr from-black/30 to-black/25 backdrop-blur-md rounded-[2.5rem] px-2 sm:px-6 md:px-12 py-6 sm:py-10 md:py-12 shadow-2xl border border-white/10 max-w-full w-full md:w-auto overflow-hidden">
                        {/* two-column layout: left image, right details (responsive) */}
                        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
                            {/* left: image */}
                            <div className="col-span-12 md:col-span-5 flex items-center justify-center">
                                {product.Image ? (
                                    <img
                                        src={product.Image}
                                        alt={product.Name || 'product image'}
                                        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain rounded-[1.25rem] shadow-inner"
                                        loading="lazy"
                                        decoding="async"
                                        style={{ willChange: 'transform' }}
                                    />
                                ) : (
                                    <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl h-40 bg-white/5 rounded-[2rem] flex items-center justify-center text-xs text-white/60">No image</div>
                                )}
                            </div>

                            {/* right: product info labels */}
                            <div className="col-span-12 md:col-span-7 text-left px-2 sm:px-6 md:px-10 lg:px-14 md:border-l-2 md:border-white/30 md:pl-12 lg:pl-16 xl:pl-20">
                                <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg" style={{ fontSize: 'clamp(1rem, 2.2vw, 2rem)' }}>{product.Name || 'Product'}</h2>
                                <div className="flex gap-2 sm:gap-3 items-start py-2 sm:py-3">
                                    <div className="font-semibold w-32 sm:w-44 text-white">Application:</div>
                                    <div className="flex-1 text-xs sm:text-base md:text-lg text-blue-100/85 leading-relaxed">{product.Application || '—'}</div>
                                </div>
                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2  gap-3 sm:gap-6 text-xs sm:text-sm md:text-sm lg:text-base text-white/90">
                                    {/* Use wrapping values (no truncate) and better contrast for readability */}
                                    <div className="flex gap-2 sm:gap-3 items-start py-2 sm:py-3">
                                        <div className="font-semibold w-32 sm:w-44 text-white">Series:</div>
                                        <div className="break-words text-white/95">{product.Series || '—'}</div>
                                    </div>

                                    <div className="flex gap-2 sm:gap-3 items-start py-2 sm:py-3">
                                        <div className="font-semibold w-32 sm:w-44 text-white">Standard:</div>
                                        <div className="break-words text-white/95">{product.Standard || '—'}</div>
                                    </div>

                                    <div className="flex gap-2 sm:gap-3 items-start py-2 sm:py-3">
                                        <div className="font-semibold w-32 sm:w-44 text-white">Mounting:</div>
                                        <div className="break-words text-white/95">{product.Mounting || '—'}</div>
                                    </div>

                                    <div className="flex gap-2 sm:gap-3 items-start py-2 sm:py-3">
                                        <div className="font-semibold w-32 sm:w-44 text-white">Sizes:</div>
                                        <div className="break-words text-white/95">{product.Sizes || '—'}</div>
                                    </div>

                                    <div className="flex gap-2 sm:gap-3 items-start py-2 sm:py-3">
                                        <div className="font-semibold w-32 sm:w-44 text-white">Sealing:</div>
                                        <div className="break-words text-white/95">{product.Sealing || '—'}</div>
                                    </div>

                                    <div className="flex gap-2 sm:gap-3 items-start py-2 sm:py-3">
                                        <div className="font-semibold w-32 sm:w-44 text-white">Water Head:</div>
                                        <div className="break-words text-white/95">{product.Water || product.Water_Head || '—'}</div>
                                    </div>

                                    <div className="flex gap-2 sm:gap-3 items-start py-2 sm:py-3">
                                        <div className="font-semibold w-32 sm:w-44 text-white">Leakage Parameter:</div>
                                        <div className="break-words text-white/95">{product.Leakage_Parameter || product.Leakage || '—'}</div>
                                    </div>

                                    <div className="flex gap-2 sm:gap-3 items-start py-2 sm:py-3">
                                        <div className="font-semibold w-32 sm:w-44 text-white">Spacing between Bars:</div>
                                        <div className="break-words text-white/95">{product.Spacing_Between_Bars || '—'}</div>
                                    </div>

                                    <div className="flex gap-2 sm:gap-3 items-start py-2 sm:py-3">
                                        <div className="font-semibold w-32 sm:w-44 text-white">Single Piece Width:</div>
                                        <div className="break-words text-white/95">{product.Single_Piece_Width || '—'}</div>
                                    </div>

                                    <div className="flex gap-2 sm:gap-3 items-start py-2 sm:py-3">
                                        <div className="font-semibold w-32 sm:w-44 text-white">Single Piece Height:</div>
                                        <div className="break-words text-white/95">{product.Single_Piece_Height || '—'}</div>
                                    </div>

                                    <div className="flex gap-2 sm:gap-3 items-start py-2 sm:py-3">
                                        <div className="font-semibold w-32 sm:w-44 text-white">Materials:</div>
                                        <div className="break-words text-white/95">{product.Materials_of_construction || product.Materials || '—'}</div>
                                    </div>
                                </div>

                                <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2 sm:gap-4">
                                    <button onClick={() => redirectTo(`/products/${product._id}`)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm md:text-base">View</button>
                                    <a href={product.Image || '#'} className="px-3 sm:px-4 py-2 border border-white/20 rounded-lg text-white/90 text-xs sm:text-sm md:text-base">Image</a>
                                </div>
                            </div>
                        </div>
                        {/* badges removed — details are shown on the right-hand column */}
                    </div>
                    {/* keep bottom area clean - optional extra metadata could be added here */}
                    <div className="mt-4 sm:mt-6 text-xs text-white/50 opacity-80"></div>
                </motion.div>

                {/* small product card on the side for context (only visible on larger screens) */}
                <div className="absolute bottom-6 left-6 hidden lg:block z-30">
                    <div className="w-72 bg-white/5 p-5 rounded-xl border border-white/10 sm:backdrop-blur-md">
                        <img src={product.Image || '/public/og-image.png'} alt={product.Name || 'product'} className="w-full h-44 object-contain rounded-lg" />
                        <div className="mt-3 text-base font-semibold text-white">{product.Name}</div>
                        <div className="text-sm text-white/60">{product.Series}</div>
                    </div>
                </div>
            </section>
        );
    };

    /**
     * Top hero that shrinks on scroll — used for the page title/intro
     */
    const HeroSection = ({ title, subtitle }) => {
        const ref = React.useRef(null);
        const shouldReduceMotion = useReducedMotion();
        const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

        // transform values — fallback to static values when motion is reduced
        const scale = shouldReduceMotion ? 1 : useTransform(scrollYProgress, [0, 0.25, 0.6], [1.06, 1, 0.92]);
        const titleY = shouldReduceMotion ? 6 : useTransform(scrollYProgress, [0, 0.25, 0.6], [28, 6, -20]);
        const subtitleY = shouldReduceMotion ? 0 : useTransform(scrollYProgress, [0, 0.4], [22, -8]);
        const bgOpacity = shouldReduceMotion ? 0.5 : useTransform(scrollYProgress, [0, 0.6], [0.28, 0.8]);

        return (
            <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* blobs and decorative background removed for flat effect */}
                <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 text-center">
                    <motion.h1 style={{ y: titleY, fontSize: 'clamp(2.75rem, 9vw, 7.5rem)', willChange: 'transform' }} className="font-extrabold text-white tracking-tight leading-tight">
                        {title}
                    </motion.h1>
                    <motion.p style={{ y: subtitleY, fontSize: 'clamp(.95rem, 2.6vw, 1.6rem)', willChange: 'transform, opacity' }} className="mt-10 text-base sm:text-base md:text-lg lg:text-xl text-blue-100/90 max-w-4xl mx-auto font-medium leading-relaxed">
                        {subtitle}
                    </motion.p>
                </div>
            </section>
        );
    };


    // If we have nothing in memory and still loading, show loading state.
    if (!products.length) {
        return <div className="text-center py-4">{isLoading ? 'Loading...' : 'No data available'}</div>;
    }


    return (
        <motion.div
            className="min-h-screen relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <SEO 
                title="Sluice Gates & Products | SK Enterprise"
                description="Explore our wide range of high-quality sluice gates and industrial valves manufactured by SK Enterprise."
                name="SK Enterprise"
                type="website"
                url="/products"
            />
            {/* Navigation: Home (left) and Back (right) - responsive */}
            <div className="absolute top-24 left-4 right-4 z-10 sm:z-50 flex items-center justify-between sm:top-24 sm:left-8 sm:right-8">
                    <motion.button
                        onClick={() => redirectTo('/')}
                        aria-label="Home"
                        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-600 border-white/20 backdrop-blur-md border-2 text-white rounded-full sm:rounded-lg hover:bg-transparent transition-all duration-300 shadow-sm sm:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Home className="w-5 h-5" />
                        <span className="hidden sm:inline">Home</span>
                    </motion.button>

                    <motion.button
                        onClick={goBack}
                        aria-label="Back"
                        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-indigo-600 border-white/20 backdrop-blur-md border-2 text-white rounded-full sm:rounded-lg hover:bg-transparent transition-all duration-300 shadow-sm sm:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">Back</span>
                    </motion.button>
            </div>

            {/* Animated hero section (large -> shrink on scroll) */}
            <HeroSection title="Sluice Gates" subtitle="S.K. Enterprise specializes in manufacturing high-quality sluice gates and industrial valves for a wide range of water-control applications" />

            {/* decorative background blobs were moved into the hero component; nothing to close here */}

            {/* Animated product hero list: each product is its own large hero section */}
            {/* overlap the first product hero slightly to hide any seam with the hero card */}
            <div className="-mt-12 md:-mt-16 lg:-mt-24">
                {products.map((product, idx) => (
                    <ProductHero key={product._id || idx} product={product} index={idx} total={products.length} />
                ))}
            </div>
        </motion.div>
    );
};

export default ProductCards;

