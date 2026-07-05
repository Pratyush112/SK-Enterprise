import React from 'react'
import Hero from './Hero'
import StatOverlay from './StatOverlay'
import Features from './Features'
import QualityAssurance from './QualityAssurance'
import ProductCategories from './ProductCategories'
import TrustAndFAQ from './TrustAndFAQ'
import CTA from './CTA'
import { useNavigation } from '../../hooks/useNavigation'
import SEO from '../../components/SEO'

const Home = () => {

  const {goBack, redirectTo} = useNavigation();
  return (
    <div className="min-h-screen relative bg-surface dark:bg-bg-dark font-body text-on-surface dark:text-white antialiased transition-colors duration-300">
      <SEO 
        title="Home | SK Enterprise - Industrial Valves & Gates"
        description="SK Enterprise manufactures high-quality industrial valves and gates including sluice gates, penstock gates, and related components. Contact us for customized solutions."
        name="SK Enterprise"
        type="website"
        url="/"
      />
      <main>
        <Hero />
        <StatOverlay />
        <Features />
        <QualityAssurance />
        <ProductCategories />
        <TrustAndFAQ />
        <CTA />
      </main>
    </div>
  )
}

export default Home