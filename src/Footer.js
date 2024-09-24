import React from 'react';

const Footer = () => (
  <div className="footer-section">
    <div className="footer-content">
      <div className="footer-column explore">
        <h3>Explore</h3>
        <button onClick={() => window.location.href = '/home'}>Home</button>
        <button onClick={() => window.location.href = '/articles'}>Articles</button>
        <button onClick={() => window.location.href = '/tutorials'}>Tutorials</button>
      </div>
      <div className="footer-column support">
        <h3>Support</h3>
        <button onClick={() => window.location.href = '/faqs'}>FAQs</button>
        <button onClick={() => window.location.href = '/help'}>Help</button>
        <button onClick={() => window.location.href = '/contact'}>Contact Us</button>
      </div>
      <div className="footer-column stay-connected">
        <h3>Stay Connected</h3>
        <a href="https://facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
    <div className="footer-bottom">
      <p>Dev@Deakin 2024</p>
      <button onClick={() => window.location.href = '/privacy'}>Privacy Policy</button>
      <button onClick={() => window.location.href = '/terms'}>Terms</button>
      <button onClick={() => window.location.href = '/conduct'}>Code of Conduct</button>
    </div>
  </div>
);

export default Footer;
