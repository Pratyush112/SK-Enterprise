import React from 'react'
import { Link } from 'react-router-dom'

const Parts = ({part}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {
            part.map((parts, index)=>(
                <div key={index} className='object-cover hover:scale-105 transition-all duration-300'>
                    <div className='relative'>
                            <Link to={`/parts/${parts._id}`}>
                                <img src={parts.Image} alt='Product_Image' className='max-h-96 md:h-64 w-full object-cover hover: scale-110 transition-all duration-300' />
                            </Link>
                        </div>

                         {/* Product description */}
                         <div className='product__card__content'>
                            <h3 className='font-bold'>{parts.item} </h3>
                            {parts.size && (
                                <p>
                                    <span className="font-semibold">Size - </span>
                                    {parts.size}
                                </p>
                            )}
                            {parts.grade && (
                                <p>
                                    <span className="font-semibold">Grade - </span>
                                    {parts.grade}
                                </p>
                            )}
                            {parts.IS && (
                                <p>
                                    <span className="font-semibold">IS - </span>
                                    {parts.IS}
                                </p>
                            )}
                            {parts.BS && (
                                <p>
                                    <span className='font-semibold'>BS - </span>
                                    {parts.BS}
                                </p>
                            )}
                            {parts.ISO && (
                                <p>
                                    <span className="font-semibold">ISO - </span>
                                    {parts.ISO}
                                </p>
                            )}
                            {parts.DIN && (
                                <p>
                                    <span className="font-semibold">DIN - </span>
                                    {parts.DIN}
                                </p>
                            )}
                            {parts.ASTM && (
                                <p>
                                    <span className="font-semibold">ASTM - </span>
                                    {parts.ASTM}
                                </p>
                            )}
                            {parts.ANSI && (
                                <p>
                                    <span className="font-semibold">ANSI - </span>
                                    {parts.ANSI}
                                </p>
                            )}
                            {parts.JIS && (
                                <p>
                                    <span className="font-semibold">JIS - </span>
                                    {parts.JIS}
                                </p>
                            )}
                        </div>
                </div>
            ))
        }
    </div>
  )
}

export default Parts