import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom } from '@fortawesome/free-solid-svg-icons'

function Footer() {
  return (
    <div className='footer-container'>

      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <Link className="footerPageLinks" to='/about'><h2>About Us</h2></Link>
          </div>
          <div className='footer-link-items'>
            <Link className="footerPageLinks" to='/contact'><h2>Contact Us</h2></Link>
          </div>
        </div>
      </div>

      <div className="copyrightDiv">
        <div className="copyright">
            <i className="fa-solid fa-copyright fa-lg">2022 CC Electrical</i>
        </div>
        <div className="developed">
          Website developed by Adrian Crinnigan.
        </div>
      </div>
      <div className='social-media-wrap'>
        <div className="fb"><Link to=''><i className='fa-brands fa-facebook fa-3x' /></Link></div>
        <div className="insta"><Link to=''><i className='fab fa-instagram fa-3x' /></Link></div>
        <div className="linked"><Link to=''><i className='fab fa-linkedin fa-3x' /></Link></div>
        <FontAwesomeIcon icon="fa-brands fa-facebook-f" />
      </div>

    </div>
  );
}
export default Footer;