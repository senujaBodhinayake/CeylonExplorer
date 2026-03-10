import React from 'react'
import './Contact.css'
import message_icon from '../../contactus.png'
import location_icon from '../../location.png'
import phone_icon from '../../phone_icon.png'
import mail_icon from '../../mail.png'

const Contact = () => {

    const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "26374986-1de6-48dc-8892-39d9bb59bff5");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
}
  return (
    <div className='contact'>
        <div className="contact-col">
            <h3>Send us a message <img src={message_icon} alt="" />
            </h3>
        <p>We're here to make your journey unforgettable! 
            Whether you need help planning your dream vacation, 
            have questions about your itinerary, or want to customize 
            your travel experience, our team of travel experts is ready to assist you.</p>
            <ul>
               <li><img src={mail_icon} alt="" />Contact@CeylonExplorer.dev</li>
               <li><img src={phone_icon} alt="" />+94 112345778</li>
               <li><img src={location_icon} alt="" />No.32,stafford Lane,Nugegoda,Sri Lanka</li>
            </ul>
        </div>
        <div className="contact-col">
        <form onSubmit={onSubmit}>
            <label>Your name</label>
            <input type='text' name='name'placeholder='Enter your name'required/>
            <label>Phone number</label>
            <input type='tel' name='phone'placeholder='Enter your
            mobile number' required/>
            <label>write your messages here</label>
            <textarea name='message' rows="6"placeholder='Enter your
            message'required></textarea>
            <button type='submit' className='save-button'>Submit</button>
        </form>
        <span>{result}</span>
        </div> 
      
    </div>
  )
}

export default Contact
