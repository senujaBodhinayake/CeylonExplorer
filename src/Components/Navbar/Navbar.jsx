import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../logo.png'
import { Link } from 'react-scroll'
import { Link as RouterLink } from 'react-router-dom'



const Navbar = () => {
  const [sticky,setSticky] = useState(false)

  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      window.scrollY>500 ? setSticky(true):setSticky(false);
    })
  },[]);
  return (
    <nav className={`container ${sticky? 'dark-nav':''}`}>
      <img src={logo} alt="" className='logo' />
      <ul>
        <li><Link to="hero" smooth={true} offset={-260} duration={500}><RouterLink to="/">HOME</RouterLink></Link></li>
        <li><Link to="about" smooth={true} offset={-150} duration={500}>ABOUT US</Link></li>
        <li><Link to="explore" smooth={true} offset={-260} duration={500}>EXPLORE</Link></li>
        <li><Link to="itinerary-container" smooth={true} offset={-260} duration={500}>MY ITINERARIES</Link></li>
        <li><Link to="contact" smooth={true} offset={-260} duration={500}>CONTACT</Link></li>
        
        <li>
         <RouterLink to="/login"> <button className='btn'>LOGIN</button></RouterLink></li>
        
      </ul>
    </nav>
  )
}

export default Navbar
