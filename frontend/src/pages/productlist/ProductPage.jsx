import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table';
import { useNavigation } from '../../hooks/useNavigation';

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

function createData(name, series, standard, mounting, sizes, sealing, water, leakage_parameter, spacing_between_bars, single_piece_width, single_piece_height, materials_of_construction, application) {
    return { name, series, standard, mounting, sizes, sealing, water, leakage_parameter, spacing_between_bars, single_piece_width, single_piece_height, materials_of_construction, application };
}

const ProductCards = ({ blog = [] }) => {

    const { goBack, redirectTo } = useNavigation();
    const columns = useMemo(() => [
        {
            header: 'Image',
            accessorKey: 'Image',
            cell: info => (
                <div className="min-w-[200px]">  {/* Add minimum width container */}
                    <Link to={`/products/${info.row.original._id}`}>
                        <img
                            src={info.getValue()}
                            alt="Product_Image"
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
        data: blog,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    console.log('Received blog data:', blog); // Debug log

    // Remove this check or modify it to be less strict
    if (!blog) {
        return <div className="text-center py-4">Loading products...</div>;
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
                    className="px-4 py-2 bg-indigo-600 border-white/20 backdrop-blur-md border-2 text-white rounded-lg 
                             hover:bg-transparent transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-indigo-500/50 dark:hover:shadow-indigo-700/50 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <span>←</span> Back
                </motion.button>
                <motion.button
                    onClick={() => redirectTo('/')}
                    className="px-4 py-2 bg-green-600 border-white/20 backdrop-blur-md border-2 text-white rounded-lg 
                             hover:bg-transparent transition-all duration-300 shadow-lg hover:shadow-green-500/50 dark:hover:shadow-green-700/50 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Home
                </motion.button>
            </div>

            {/* Hero Section - Remove existing gradient background */}
            <div className="relative">
                <div className="relative py-24 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 to-transparent"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.h1
                            variants={itemVariants}
                            initial="hidden"
                            animate="show"
                            className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg"
                        >
                            Product List
                        </motion.h1>

                        {/* Remove the old buttons from hero section and keep rest of the code */}
                        <motion.p
                            variants={itemVariants}
                            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed backdrop-blur-sm bg-black/10 p-6 rounded-2xl shadow-lg"
                        >
                            S.K. Enterprise specialized in manufacturing high-quality industrial valves and gates for various applications
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

            {/* Table Section - Update background opacity */}
            <motion.div
                className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-10 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                <motion.div
                    className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-white/30"
                    variants={itemVariants}
                >
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y-2 divide-gray-300">
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id} className="divide-x-2 divide-gray-300">
                                        {headerGroup.headers.map(header => (
                                            <th
                                                key={header.id}
                                                className="px-6 py-4 text-left text-sm font-bold text-gray-900 bg-gray-50/50 backdrop-blur-sm border-b-2 border-gray-300"
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="divide-y-2 divide-gray-300 bg-white/50">
                                {table.getRowModel().rows.map(row => (
                                    <tr key={row.id} className="hover:bg-blue-50/50 transition-colors divide-x-2 divide-gray-300">
                                        {row.getVisibleCells().map(cell => (
                                            <td
                                                key={cell.id}
                                                className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between px-6 py-4 bg-gray-50/50 border-t border-gray-200">
                        <div className="text-sm text-gray-700">
                            Page {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount()}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
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

export default ProductCards;


//Material of construction
//water head
//Sizes (W X H)