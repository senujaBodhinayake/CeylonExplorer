import React from 'react'
import './Categories.css'
import upcountry from '../../Upcountry.jpg'
import wildlife from '../../wild life.jpg'
import beaches from '../../beaches.jpg'
import upcountry_icon from '../../upcountry-icon.png'
import wildlife_icon from '../../wildlife-icon.png'
import beach_icon from '../../beach-icon.jpg'
import { Link } from 'react-scroll'






const Categories = () => {
  return (
    <div className='categories'>
        <div className='category'>
          
            <img src={upcountry} alt="" />
            <div className="caption">
            <Link to='upcountry' smooth={true} offset={-260} duration={500}>
                <img src={upcountry_icon} alt="" /></Link>
                <p>Upcountry</p>
                </div>
        </div>
        <div className='category'>
            <img src={wildlife} alt="" />
            <div className="caption">
            <Link to='wildLife' smooth={true} offset={-260} duration={500}>
                <img src={wildlife_icon} alt="" /></Link>
                <p>Wild Life</p>
                </div>
            
        </div>
        <div className='category'>
            <img src={beaches} alt="" />
            <div className="caption">
            <Link to='beaches' smooth={true} offset={-260} duration={500}>
                <img src={beach_icon} alt="" /></Link>
                <p>Beaches</p>
                </div>
        </div>
       
    </div>
  )
}

export default Categories
