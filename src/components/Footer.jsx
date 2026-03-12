import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>BlogHub</h3>
            <p>Share your stories, inspire the world.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/create">Create Blog</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#facebook" className="social-link">f</a>
              <a href="#twitter" className="social-link">𝕏</a>
              <a href="#instagram" className="social-link">📷</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} BlogHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;