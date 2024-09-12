import React from 'react';

const Footer = () => (
  <div className="footer-section">
    <div className="footer-content">
      <div className="footer-column explore">
        <h3>Explore</h3>
        <a href="#">Home</a>
        <a href="#">Articles</a>
        <a href="#">Tutorials</a>
      </div>
      <div className="footer-column support">
        <h3>Support</h3>
        <a href="#">FAQs</a>
        <a href="#">Help</a>
        <a href="#">Contact Us</a>
      </div>
      <div className="footer-column stay-connected">
        <h3>Stay Connected</h3>
        <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
        <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
      </div>
    </div>
    <div className="footer-bottom">
      <p>Dev@Deakin 2024</p>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms</a>
      <a href="#">Code of Conduct</a>
    </div>
  </div>
);

export default Footer;
