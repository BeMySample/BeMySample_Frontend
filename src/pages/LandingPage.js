import React from 'react'
import { Helmet } from 'react-helmet'
import Hero from '../components/LandingPage/Hero'
import WhyBeMySample from '../components/LandingPage/WhyBeMySample'
import CaseStudy from '../components/LandingPage/CaseStudy'

const LandingPage = () => {
  return (
    <div className='pt-[100px]'>
      <Hero />
      <WhyBeMySample />
      <CaseStudy />

      <Helmet>
        <title>BeMySample</title>
      </Helmet>
    </div>
  )
}

export default LandingPage