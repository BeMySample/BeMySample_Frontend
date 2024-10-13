import React from 'react'
import { Helmet } from 'react-helmet'
import Hero from '../components/LandingPage/Hero'
import WhyBeMySample from '../components/LandingPage/WhyBeMySample'
// import CaseStudy from '../components/LandingPage/CaseStudy'
import Packages from '../components/LandingPage/Packages'
import Footer from '../components/LandingPage/Footer'
import CaseStudyCarousel from '../components/LandingPage/CaseStudy'

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <WhyBeMySample />
      <CaseStudyCarousel />
      <Packages />
      <Footer />

      <Helmet>
        <title>BeMySample: Reliability at Reach</title>
      </Helmet>
    </div>
  )
}

export default LandingPage