import React from 'react'
import Hero from './Hero'
import Categories from './Categories'
import Quality from './Quality'
import Qualitycontrol from './Qualitycontrol'
import { useNavigation } from '../../hooks/useNavigation'


const Home = () => {

  const {goBack, redirectTo} = useNavigation();
  return (
    <div className="min-h-screen relative bg-[#f7fafd]">
      {/*Go back button and redirect button*/}
      {/* <div className='absolute top-24 right-8 z-50 flex flex-row gap-4'>
        <button
          onClick={goBack}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 border-2 border-white/20 text-white backdrop-blur-md rounded-lg 
                    hover:bg-transparent transition-all hover:text-white duration-300 flex items-center gap-2 shadow-lg hover:shadow-blue-500/50 
                    dark:hover:shadow-blue-700/50 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                    dark:focus:ring-offset-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          ← Back
        </button>

        <button
          onClick={() => redirectTo('/')}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 border-2 border-white/20 text-white backdrop-blur-md rounded-lg 
                    hover:bg-transparent hover:text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/50 dark:hover:shadow-blue-700/50 
                    transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Home
        </button>
      </div> */}
      {/* Base radial gradient background for soft blue glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_left,#e3effd_0%,transparent_60%)] z-0 pointer-events-none"></div>
      {/* Subtle warm radial gradient at bottom right for orange/yellow glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-[radial-gradient(ellipse_at_bottom_right,#ffe9c7_0%,transparent_80%)] blur-2xl"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(227,239,253,0.12),transparent_80%)] blur-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/30 via-transparent to-yellow-50/20 mix-blend-soft-light"></div>
      </div>
      {/* Content container */}
      <div className="relative z-10">
        <Hero />
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 lg:space-y-24">
          <Categories />
          <Quality />
          <Qualitycontrol />
        </div>
      </div>
    </div>
  )
}

export default Home