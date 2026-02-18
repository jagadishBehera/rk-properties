import React from 'react'
import RealEstateHero from '../../Components/Home/Hero'
import RealEstateServices from '../../Components/Home/Service'
import WhyChooseUs from '../../Components/Home/WhyChooseUs'
import DreamHome from '../../Components/Home/DreamHome'
import OurAchievements from '../../Components/Home/OurAchievements'
import Testimonials from '../../Components/Home/Testimonial'

const Home = () => {
  return (
    <div>
      <RealEstateHero />
      <RealEstateServices/>
      <WhyChooseUs />
      <DreamHome />
      <OurAchievements />
      <Testimonials />
    </div>
  )
}

export default Home
