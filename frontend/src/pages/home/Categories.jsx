// import React from 'react'
// import product_icon from '../../assets/logo/product.png'
// import part_icon from '../../assets/logo/spare-parts.png'
// import { Link } from 'react-router-dom'


// const Categories = () => {
//     const categories = [
//         {name:'Sluice Gates', path:'products', image: product_icon},
//         {name:'Nuts & Bolts', path:'parts', image: part_icon},
//     ]
//     return (
//         <>
//             <style jsx>{`
//                 @keyframes nounce {
//                     0%, 100% { transform: translateY(0) rotate(0); }
//                     50% { transform: translateY(-10px) rotate(3deg); }
//                 }
//             `}</style>
//             <div className='flex flex-row justify-center gap-10 md:gap-16 lg:gap-24 flex-wrap p-6 md:p-12 relative z-10'>
//                 {
//                     categories.map((category) => (
//                         <Link 
//                             key={category.name} 
//                             to={`/${category.path}`} 
//                             className='group flex flex-col items-center p-10 md:p-16 rounded-[2.5rem] bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-700 ease-out hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] relative overflow-hidden'
//                         >
//                             {/* Animated background glow on hover */}
//                             <div className='absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out'></div>
                            
//                             <div className='w-28 h-28 md:w-36 md:h-36 mb-6 transition-all duration-700 ease-in-out group-hover:[animation:nounce_1.5s_ease-in-out_infinite] group-hover:filter group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] relative z-10'>
//                                 <img 
//                                     src={category.image} 
//                                     alt={category.name}
//                                     className='w-full h-full object-contain transition-transform duration-700 group-hover:scale-110'
//                                     loading='lazy'
//                                 />
//                             </div>
//                             <h4 className='text-xl md:text-2xl font-bold tracking-tight text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 relative z-10'>
//                                 {category.name}
//                             </h4>
//                             <div className='mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm'>
//                                 Explore Range <span className='group-hover:translate-x-1 transition-transform'>→</span>
//                             </div>
//                         </Link>
//                     ))
//                 }
//             </div>
//         </>
//     )
// }

// export default Categories


// // <a href="https://www.freepik.com/animated-icon/delivery_18485011#fromView=search&page=1&position=3&uuid=bcc2e9c5-d86b-4bed-b297-d9f8922885c6">Icon by Freepik</a>
// //<a href="https://www.freepik.com/search">Icon by Freepik</a>
// //<a href="https://www.flaticon.com/free-icons/spare-parts" title="spare parts icons">Spare parts icons created by tifaeksa - Flaticon</a>
// //<a href="https://www.flaticon.com/free-animated-icons/chain" title="chain animated icons">Chain animated icons created by Freepik - Flaticon</a>