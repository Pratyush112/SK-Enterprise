import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { useNavigation } from '../../hooks/useNavigation';
import { getParts } from '../../routers/APIs';

const PartsPage = () => {

    const { goBack, redirectTo } = useNavigation();

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const [parts, setParts] = useState([]);

   useEffect(() => {
    const fetchParts = async () => {
        try {
            const response = await getParts();  // use imported getParts function
            setParts(response.data);            // axios returns data under `.data`
        } catch (error) {
            console.error('Error fetching parts:', error);
        }
    };
        fetchParts();
    }, []);

    // Memoize columns definition
    const columns = useMemo(() => [{
        header: 'Image',
        accessorKey: 'image',
        cell: info => (
            <Link to={`/parts/${info.row.original._id}`}>
                <div className="relative w-24 h-16 group">
                    <img
                        src={info.getValue()}
                        alt="Parts_image"
                        className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-sm
                                 transform transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 
                                  rounded-lg transition-opacity duration-300"></div>
                </div>
            </Link>
        ),
        enableColumnFilter: false,
    },
    { header: 'Item', accessorKey: 'item' },
    { header: 'Size', accessorKey: 'size' },
    { header: 'Grade', accessorKey: 'grade' },
    { header: 'IS', accessorKey: 'IS' },
    { header: 'BS', accessorKey: 'BS' },
    { header: 'ISO', accessorKey: 'ISO' },
    { header: 'DIN', accessorKey: 'DIN' },
    { header: 'ASTM', accessorKey: 'ASTM' },
    { header: 'ANSI', accessorKey: 'ANSI' },
    { header: 'JIS', accessorKey: 'JIS' },
    ],
        []
    );

    // Simplified table instance
    const table = useReactTable({
        data: parts,
        columns,
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

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

    const titleVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        show: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.43, 0.13, 0.23, 0.96]
            }
        }
    };

    if (!parts.length) {
    return <div className="text-center py-4">Loading or No data available</div>;
    }

    return (
        <motion.div
            className="min-h-screen relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Navigation Buttons */}
            <div className="absolute top-24 right-8 z-50 flex flex-row gap-4">
                <motion.button
                    onClick={goBack}
                    className="px-4 py-2 bg-indigo-600 backdrop-blur-md border-2 border-white/20 text-white rounded-lg 
                             hover:bg-transparent transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-indigo-500/50 dark:hover:shadow-indigo-700/50 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <span>←</span> Back
                </motion.button>
                <motion.button
                    onClick={() => redirectTo('/')}
                    className="px-4 py-2 bg-green-600 backdrop-blur-md border-2 border-white/20 text-white rounded-lg 
                             hover:bg-transparent transition-all duration-300 shadow-lg hover:shadow-green-500/50 dark:hover:shadow-green-700/50 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Home
                </motion.button>
            </div>

            {/* Hero Section */}
            <div className="relative">
                <div className="relative py-24 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 to-transparent"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Centered title */}
                        <motion.h1
                            variants={titleVariants}
                            initial="hidden"
                            animate="show"
                            className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg text-center mb-6"
                        >
                            Parts List
                        </motion.h1>

                        {/* Remove the old buttons from hero section and keep rest of the code */}

                        <motion.p
                            variants={itemVariants}
                            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed backdrop-blur-sm bg-black/10 p-6 rounded-2xl shadow-lg"
                        >
                            S.K. Enterprise specialized in production of
                            <span className="font-medium text-indigo-200"> Sluice Gate Valves </span>
                            and
                            <span className="font-medium text-indigo-200"> Penstock Gate Valve </span>
                            with many special alloy and anti-corrosive alloy apply to different markets.
                        </motion.p>
                    </div>

                    {/* Animated decorative elements */}
                    <motion.div
                        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, -90, 0],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </div>
            </div>

            {/* Main Content */}
            <motion.div
                className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-10 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                <motion.div
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-white/20"
                    variants={itemVariants}
                >
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <th key={header.id}
                                                className="sticky top-0 px-6 py-4 text-left text-sm font-semibold 
                                                     bg-gray-50 text-gray-900 border-b border-r border-gray-200">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {table.getRowModel().rows.map(row => (
                                    <tr key={row.id} className="hover:bg-gray-50 transition-colors duration-150">
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id}
                                                className="px-6 py-4 text-sm text-gray-900 border-r border-gray-200 whitespace-nowrap">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination Controls */}
                    <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-gray-200 bg-gray-50">
                        <div className="text-sm text-gray-700 mb-4 sm:mb-0">
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default React.memo(PartsPage);