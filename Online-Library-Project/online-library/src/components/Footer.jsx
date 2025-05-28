import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3 className="footer-heading">About Our Library</h3>
          <p className="footer-text">
            Our digital library provides access to thousands of books across various genres. 
            We're committed to promoting literacy and making knowledge accessible to everyone.
          </p>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/browse">Browse Books</a></li>
            <li><a href="/add-book">Add Book</a></li>
            <li><a href="/browse/Fiction">Fiction</a></li>
            <li><a href="/browse/Non-Fiction">Non-Fiction</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <ul className="footer-contact">
            <li>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="footer-icon" />
              123 Library Street, Bookville
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} className="footer-icon" />
              (123) 456-7890
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} className="footer-icon" />
              info@digitallibrary.com
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} className="social-icon" />
            </a>
            <a href="#" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} className="social-icon" />
            </a>
            <a href="#" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} className="social-icon" />
            </a>
          </div>
          <p className="footer-subscribe">Subscribe to our newsletter</p>
          <form className="footer-form">
            <input type="email" placeholder="Your email" className="footer-input" />
            <button type="submit" className="footer-button">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Digital Library. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer