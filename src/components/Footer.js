import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <p className="copyright">2021 &copy; David Sooky</p>
            <a 
                href="https://github.com/davidSooky/React-Recipe-App"
                target="_blank"className="social-media"
            >
                <i className="fab fa-github fa-2x"></i>
            </a>
        </footer>
    );
};

export default Footer;