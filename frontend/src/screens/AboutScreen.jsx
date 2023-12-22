import React from 'react';
import { useEffect } from 'react';
import "./aboutSceen.css";

const AboutScreen = () => {

    useEffect(() => {
        window.scrollTo(0,0)
       },[]);


  return (
    <div className='about-screen'>
      <h1>About Us</h1>

      <div className='about-section'>
       <p className='int-heading'>Intirious Design & Collection</p>
       <br/>
       <span className='ab-address'><strong>Address: </strong>5/76, Gomtinagar extension, near khargapur tahseel, Lucknow</span>
       <br/>
       <span><strong>Hotline: </strong>09621477999</span>
       <br/>
       <span><strong>Email: </strong>shan.sd10@gmail.com</span>
      </div>
    </div>
  )
}

export default AboutScreen
