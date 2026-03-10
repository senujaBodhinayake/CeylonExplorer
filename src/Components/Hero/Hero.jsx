import React from 'react'
import './Hero.css'
import { Link } from 'react-scroll'

const Hero = () => {
  return (
    <div className='hero container'>
        <div className='hero-text'>
            <h1>Explore Sri Lanka Like Never Before</h1>
            <p>Plan your dream trip with ease and discover the best of Sri Lanka.</p>
            <button className='btn2'><Link to='categories' smooth={true} offset={-260} duration={500}>Explore Destinations</Link></button>
        </div>
      
    </div>
  )
}

export default Hero
