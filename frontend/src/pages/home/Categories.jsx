import React from 'react'
import product_icon from '../../assets/logo/product.png'
import part_icon from '../../assets/logo/spare-parts.png'
import { Link } from 'react-router-dom'


const Categories = () => {
    const categories = [
        {name:'Product List', path:'products', image: product_icon},
        {name:'Spare Parts', path:'parts', image: part_icon},
    ]
    return (
        <>
            <style jsx>{`
                @keyframes nounce {
                    0%, 100% { transform: translateY(0) rotate(0); }
                    50% { transform: translateY(-10px) rotate(3deg); }
                }
            `}</style>
            <div className='flex flex-row justify-center gap-20 md:gap-32 lg:gap-40 flex-wrap p-6 md:p-10'>
                {
                    categories.map((category) => (
                        <Link 
                            key={category.name} 
                            to={`/${category.path}`} 
                            className='group flex flex-col items-center p-10 m-4 rounded-xl bg-white/50 backdrop-blur-sm border border-blue-100/50 hover:bg-blue-50/50 transition-all duration-700 ease-in-out hover:scale-105 hover:shadow-lg'
                        >
                            <div className='w-24 h-24 mb-4 transition-all duration-700 ease-in-out group-hover:[animation:nounce_1.5s_ease-in-out_infinite] group-hover:filter group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]'>
                                <img 
                                    src={category.image} 
                                    alt={category.name}
                                    className='w-full h-full object-contain transition-transform'
                                />
                            </div>
                            <h4 className='text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300'>
                                {category.name}
                            </h4>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}

export default Categories


// <a href="https://www.freepik.com/animated-icon/delivery_18485011#fromView=search&page=1&position=3&uuid=bcc2e9c5-d86b-4bed-b297-d9f8922885c6">Icon by Freepik</a>
//<a href="https://www.freepik.com/search">Icon by Freepik</a>
//<a href="https://www.flaticon.com/free-icons/spare-parts" title="spare parts icons">Spare parts icons created by tifaeksa - Flaticon</a>
//<a href="https://www.flaticon.com/free-animated-icons/chain" title="chain animated icons">Chain animated icons created by Freepik - Flaticon</a>