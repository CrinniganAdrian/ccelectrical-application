import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

function Footer() {
  return (
    <footer className='modern-footer'>
      <div className='footer-content'>
        <div className='footer-section footer-brand'>
          <h3 className='footer-logo'>CC Electrical</h3>
          <p className='footer-tagline'>Quality Electrical Services</p>
          <p className='footer-description'>
            Professional electrical solutions for residential and commercial needs.
          </p>
        </div>

        <div className='footer-section footer-links-section'>
          <h4 className='footer-heading'>Quick Links</h4>
          <div className='footer-links-grid'>
            <Link className='footer-link' to='/about'>
              <i className='fa fa-info-circle'></i> About Us
            </Link>
            <Link className='footer-link' to='/contact'>
              <i className='fa fa-envelope'></i> Contact Us
            </Link>
            <Link className='footer-link' to='/faqs'>
              <i className='fa fa-question-circle'></i> FAQs
            </Link>
          </div>
        </div>

        <div className='footer-section footer-contact'>
          <h4 className='footer-heading'>Contact Info</h4>
          <div className='footer-contact-item'>
            <i className='fa fa-envelope'></i>
            <span>ciaran@ccelectrical.ie</span>
          </div>
          <div className='footer-contact-item'>
            <i className='fa fa-phone'></i>
            <span>0871234567</span>
          </div>
        </div>

        <div className='footer-section footer-social'>
          <h4 className='footer-heading'>Follow Us</h4>
          <div className='footer-social-links'>
            <a href='#' className='social-link' aria-label='Facebook'>
              <i className='fa fa-facebook'></i>
            </a>
            <a href='#' className='social-link' aria-label='Instagram'>
              <i className='fa fa-instagram'></i>
            </a>
            <a href='#' className='social-link' aria-label='LinkedIn'>
              <i className='fa fa-linkedin'></i>
            </a>
          </div>
        </div>
      </div>

      <div className='footer-bottom'>
        <div className='footer-copyright'>
          <i className='fa fa-copyright'></i> {new Date().getFullYear()} CC Electrical. All rights reserved.
        </div>
        <div className='footer-credit'>
          Website developed by Adrian Crinnigan
        </div>
      </div>
    </footer>
  );
}

export default Footer;