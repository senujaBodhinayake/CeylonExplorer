import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Hero from '../Components/Hero/Hero'
import Categories from '../Components/Categories/Categories'
import Title from '../Components/Title/Title'
import About from '../Components/About/About'
import Destinations from '../Components/Destinations/Destinations'
import Itineraries from '../Components/MyItineraris/Itineraries'
import Contact from '../Components/contact/Contact'
import Footer from '../Components/Footer/Footer'






const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      
      <div className="container">
        <Title subTitle='Sri Lanka' title='What You Can Explore'/>
        <Categories/>
        <About/>
        <Title subTitle=' Discover the most amazing places Sri Lanka has to offer' title='Explore Destinations'/>
        <Destinations/>
        <Title subTitle='Itinerary Builder' title='Easiest way to plan your trip'/>
        <Itineraries/>
        <Title subTitle='Contact Us' title='Get in Touch'/>
        <Contact/>
        <Footer/>
        
        
      
        
        
      
      </div>
      
    </div>
  )
}

export default Home
