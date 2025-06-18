import React, { useState } from 'react'
import ProductCards from './ProductCards'
import blog from '../../data/blog.json'

const ProductList = () => {
const [visibleProducts, setVisisbleProducts] = useState(4);
const loadMoreProducts = () => {
    setVisisbleProducts(prevCount => prevCount + 4)
}

  return (
    <section className='section__container product__container'>

        {/* Products */}
        <h2 className='section__header'>Gate Production List</h2>
        <p className='section__subheader mb-12'> S.K. Enterprise specialized in production of Sluice Gate Valves and Penstock Gate Valve with many special alloy and anti-corrosive alloy apply to different markets.</p>

        {/* Products Card */}
        <div className='mt-12'>
        <ProductCards blog={blog.slice(0, visibleProducts)}/>
        </div>

        {/* Load more product button */}
        <div className="product__btn">
            {
                visibleProducts < blog.length && (
                    <button className='btn  bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:bg-blue-600 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 ... focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95' onClick={loadMoreProducts}>Load More</button>
                )
            }
        </div>
    </section>
  )
}

export default ProductList