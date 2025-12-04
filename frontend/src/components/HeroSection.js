import React from 'react';
import '../App.css';
import './HeroSection.css';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div id="heroSectionDiv" className='hero-container'>
      <div className='hero-content'>
        <h1 className="hero-title">Welcome to CC Electrical</h1>
        <p className="hero-subtitle">Quality Electrical Services You Can Trust</p>
        <p className="hero-description">
          CC Electrical provides quality services which meet Safe Electric standards. 
          With a registered Safe Electrical Contractor, you can rest assured that it will 
          be a good investment with CC Electrical. We're licensed, insured, and committed 
          to delivering professional electrical solutions for your home and business.
        </p>
        <div className='hero-buttons'>
          <Link to="/contact" className='hero-btn hero-btn-primary'>
            <i className='fa fa-envelope'></i> Get In Touch
          </Link>
          <Link to="/ServicesPublic" className='hero-btn hero-btn-secondary'>
            <i className='fa fa-wrench'></i> Our Services
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;