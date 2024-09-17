import React from 'react';

const Footer = () => (
  <div className="footer-section">
    <div className="footer-content">
      <div className="footer-column explore">
        <h3>Explore</h3>
        <button onClick={() => console.log('Navigate to Home')}>Home</button>
        <button onClick={() => console.log('Navigate to Articles')}>Articles</button>
        <button onClick={() => console.log('Navigate to Tutorials')}>Tutorials</button>
      </div>
      <div className="footer-column support">
        <h3>Support</h3>
        <button onClick={() => console.log('Navigate to FAQs')}>FAQs</button>
        <button onClick={() => console.log('Navigate to Help')}>Help</button>
        <button onClick={() => console.log('Navigate to Contact Us')}>Contact Us</button>
      </div>
      <div className="footer-column stay-connected">
        <h3>Stay Connected</h3>
        <button onClick={() => console.log('Visit Facebook')} className="social-icon"><i className="fab fa-facebook-f"></i></button>
        <button onClick={() => console.log('Visit Twitter')} className="social-icon"><i className="fab fa-twitter"></i></button>
        <button onClick={() => console.log('Visit Instagram')} className="social-icon"><i className="fab fa-instagram"></i></button>
      </div>
    </div>
    <div className="footer-bottom">
      <p>Dev@Deakin 2024</p>
      <button onClick={() => console.log('Navigate to Privacy Policy')}>Privacy Policy</button>
      <button onClick={() => console.log('Navigate to Terms')}>Terms</button>
      <button onClick={() => console.log('Navigate to Code of Conduct')}>Code of Conduct</button>
    </div>
  </div>
);

export default Footer;
