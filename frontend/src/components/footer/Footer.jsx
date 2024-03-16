import React from "react";
import "./footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {


  const navigate = useNavigate();
  return (
    <div className="footer-wrapper">
      <h1 className="f-heading">IDC (Intirious Design & Collection)</h1>

      <div className="f-links">
      <span onClick={() => navigate('/about')}>About Us</span>
      <span onClick={() => navigate('/services')}>Services</span>
      <span onClick={() => navigate('/contactus')}>Contact</span>
      <span onClick={() => navigate('/privacypolicy')}>Privacy Policy</span>
      <span onClick={() => navigate('/returnpolicy')}>Return Policy</span>
      </div>
      
      <p className="f-para">©2023 IDC | Intirious Design & Collection - www.intirious.com</p>
    </div>
  );
};

export default Footer;
