import { Link } from 'remix';

export default function NavbarDisplay() {
  return (
    <footer className="footer">
      <div className="social">
        <a href="https://www.instagram.com/" className="social-icon">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a href="https://www.snapchat.com/" className="social-icon">
          <i className="fa-brands fa-snapchat"></i>
        </a>
        <a href="https://www.twitter.com/" className="social-icon">
          <i className="fa-brands fa-twitter"></i>
        </a>
        <a href="https://www.facebook.com/" className="social-icon">
          <i className="fa-brands fa-facebook-f"></i>
        </a>
      </div>
      <ul className="list-inline">
        <li className="list-inline-item">
          <Link to="terms">Terms</Link>
        </li>
        <li className="list-inline-item">
          <Link to="privacy">Privacy Policy</Link>
        </li>
        <li className="list-inline-item">
          <Link to="contact">Contact Us</Link>
        </li>
      </ul>
      <p className="copyright">Jubatus Development © 2022</p>
    </footer>
  );
}
