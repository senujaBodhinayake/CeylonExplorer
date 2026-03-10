import React from 'react'
import './About.css'
import about_img from '../../about.jpg'

const About = () => {
  return (
    <div className='about'>
      <div className="about-left">
        <img src={about_img} alt="" />
      </div>
      <div className="about-right">
        <h3>About Ceylon Explorer</h3>
        <h2>Let us guide you on your journey to explore Sri Lanka like never before!</h2>
        <p>Ceylon Explorer is your ultimate travel companion for 
          exploring the breathtaking beauty of Sri Lanka. 
          From serene beaches to lush tea plantations, ancient cultural sites to vibrant wildlife,
           we help you discover the hidden gems of this tropical paradise.</p>
           <p>Our mission is to make your travel planning effortless, personalized, and inspiring. 
            Whether you're seeking an adventure-filled journey, a relaxing getaway, 
            or a deep dive into Sri Lanka's rich history, Ceylon Explorer provides the tools and 
            information you need to craft your dream itinerary.</p>
            <p>With features like destination guides, itinerary planning,
               and insights into local culture and experiences, 
               we aim to connect travelers with the heart and soul of Sri Lanka</p>
        
      </div>
    </div>
  )
}

export default About
