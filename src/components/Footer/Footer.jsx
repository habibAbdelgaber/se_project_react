import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__text footer__author">
          Developed by Habib Abdelgaber
        </p>
        <p className="footer__text footer__copyright">
          &copy; {currentYear} All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
