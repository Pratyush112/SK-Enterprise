import React from 'react'
import { Link } from 'react-router-dom'

function createData(name, series, standard, mounting, sizes, sealing, water, leakage_parameter, spacing_between_bars, single_piece_width, single_piece_height, materials_of_construction, application) {
    return { name, series, standard, mounting, sizes, sealing, water, leakage_parameter, spacing_between_bars, single_piece_width, single_piece_height, materials_of_construction, application };
}

const ProductCards = ({ blog }) => {

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {
                blog.map((products, index) => (
                    <div key={index} className='product__card object-cover hover:scale-105 transition-all duration-300'>
                        <div className='relative'>
                            <Link to={`/products/${products._id}`}>
                                <img src={products.Image} alt='Product_Image' className='max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300' />
                            </Link>
                        </div>

                        {/* Product description */}
                        <div className='product__card__content'>
                            <h3 className='font-bold'>{products.Name} </h3>
                            <h5>
                                <span className="font-semibold">Series - </span>
                                {products.Series}
                            </h5>
                            {products.Standard && (
                                <p>
                                    <span className="font-semibold">Standard - </span>
                                    {products.Standard}
                                </p>
                            )}
                            {products.Mounting && (
                                <p>
                                    <span className="font-semibold">Mounting - </span>
                                    {products.Mounting}
                                </p>
                            )}
                            {products.Sizes && (
                                <p>
                                    <span className="font-semibold">Sizes - </span>
                                    {products.Sizes}
                                </p>
                            )}
                            {products.Sealing && (
                                <p>
                                    <span className="font-semibold">Sealing - </span>
                                    {products.Sealing}
                                </p>
                            )}
                            {products.Water && (
                                <p>
                                    <span className="font-semibold">Water Head - </span>
                                    {products.Water}
                                </p>
                            )}
                            {products.Leakage_Parameter && (
                                <p>
                                    <span className='font-semibold'> Leakage Parameter - </span>
                                    {products.Leakage_Parameter}
                                </p>
                            )}
                            {products.Spacing_Between_Bars && (
                                <p>
                                    <span className="font-semibold">Spacing Between Bars - </span>
                                    {products.Spacing_Between_Bars}
                                </p>
                            )}
                            {products.Single_Piece_Width && (
                                <p>
                                    <span className="font-semibold">Single Piece Width - </span>
                                    {products.Single_Piece_Width}
                                </p>
                            )}
                            {products.Single_Piece_Height && (
                                <p>
                                    <span className="font-semibold">Single Piece Height - </span>
                                    {products.Single_Piece_Height}
                                </p>
                            )}
                            {products.Materials_of_construction && (
                                <p>
                                    <span className="font-semibold">Materials of Construction - </span>
                                    {products.Materials_of_construction}
                                </p>
                            )}
                            {products.Application && (
                                <p>
                                    <span className="font-semibold">Application - </span>
                                    {products.Application}
                                </p>
                            )}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ProductCards


//Material of construction
//water head
//Sizes (W X H)