import React from 'react';

const Footer = () => (
  <div className="footer-section">
    <div className="footer-content">
      <div className="footer-column explore">
        <h3>Explore</h3>
        {/* Replace href="#" with valid URLs or buttons */}
        <button>Home</button>
        <button>Articles</button>
        <button>Tutorials</button>
      </div>
      <div className="footer-column support">
        <h3>Support</h3>
        <button>FAQs</button>
        <button>Help</button>
        <button>Contact Us</button>
      </div>
      <div className="footer-column stay-connected">
        <h3>Stay Connected</h3>
        <button className="social-icon"><i className="fab fa-facebook-f"></i></button>
        <button className="social-icon"><i className="fab fa-twitter"></i></button>
        <button className="social-icon"><i className="fab fa-instagram"></i></button>
      </div>
    </div>
    <div className="footer-bottom">
      <p>Dev@Deakin 2024</p>
      <button>Privacy Policy</button>
      <button>Terms</button>
      <button>Code of Conduct</button>
    </div>
  </div>
);

export default Footer;
