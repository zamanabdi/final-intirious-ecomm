import React from 'react';
import { useEffect } from 'react';
import "./contactScreen.css";

const ContactScreen = () => {


    useEffect(() => {
        window.scrollTo(0,0)
       },[]);

  return (
    <div className='contact-wrapper'>
      <h1>Contact Us</h1>

      <form action="https://getform.io/f/8d9f8fd2-c047-416d-8aa9-8fba8ac732be" method='POST' className='contactForm-container'>

          <input type="text" name="name" placeholder="Enter your name" className='input-field'/>

          <input type="email" name="email" placeholder="Enter your email" className='input-field'/>

          <textarea placeholder="Enter your message" name='message' rows='10' className='input-textarea'></textarea>

          <button className="contact-button">Let's Talk</button>


         </form>
    </div>
  )
}

export default ContactScreen
