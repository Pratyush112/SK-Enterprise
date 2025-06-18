    import React, {useState} from 'react'
    import Parts from './Parts'
    import parts from '../../data/parts.json'

    const PartsList = () => {
    const [visibleParts, setVisisbleParts] = useState(4);
    const loadMoreParts = () => {
        setVisisbleParts(prevCount => prevCount + 4)
    }
      return (
        <section className='section__container product__container'>

            {/* Parts */}
            <h2 className='section__header'>Parts Production List</h2>
            <p className='section__subheader mb-12'> S.K. Enterprise specialized in production of Sluice Gate Valves and Penstock Gate Valve with many special alloy and anti-corrosive alloy apply to different markets.</p>
        
            {/* Parts Card */}
            <div className='mt-12'>
                <Parts part={parts.slice(0, visibleParts)}/>
            </div>

            {/* Load more parts button */}
            <div className="product__btn mt-10 ">
                {
                    visibleParts < parts.length && (
                        <button className='btn bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:bg-blue-600 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 ... focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95' onClick={loadMoreParts}> Load More </button>
                    )
                }
            </div>
        </section>
      )
    }

    export default PartsList