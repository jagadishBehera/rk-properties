import React from "react";
import RealEstateHero from "../../Components/Home/Hero";
import RealEstateServices from "../../Components/Home/Service";
import WhyChooseUs from "../../Components/Home/WhyChooseUs";
import DreamHome from "../../Components/Home/DreamHome";
import OurAchievements from "../../Components/Home/OurAchievements";
import Testimonials from "../../Components/Home/Testimonial";
import Contact from "../../Components/Home/Contact";

const Home = () => {
  return (
    <div>
      <div id="home">
        <RealEstateHero />
      </div>
      <div id="services">
        <RealEstateServices />
      </div>
      <div id="features">
        <WhyChooseUs />
      </div>
      <div id="about">
        <DreamHome />
      </div>
      <OurAchievements />
      <Testimonials />
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
};

export default Home;
