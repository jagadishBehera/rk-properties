import React from 'react'
import RealEstateHero from '../../Components/Home/Hero'
import RealEstateServices from '../../Components/Home/Service'
import WhyChooseUs from '../../Components/Home/WhyChooseUs'

const Home = () => {
  return (
    <div>
      <RealEstateHero />
      <RealEstateServices/>
      <WhyChooseUs />
    </div>
  )
}

export default Home
