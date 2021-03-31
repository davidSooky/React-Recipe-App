import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { TimelineLite, Power2, gsap } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";

import headerImg from "../images/header-img.jpg";
import logo from "../images/logo.png";

gsap.registerPlugin(CSSRulePlugin);

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const btnRef = useRef(null);
    const navRef = useRef(null);
    const container = useRef(null);
    const img = useRef(null);
    const overlay = CSSRulePlugin.getRule(".header-img:after");
    const tl = new TimelineLite();
    const homePage = useLocation().pathname === "/";

    const handleNavScroll = () => {
        document.body.scrollTop > 150 || document.documentElement.scrollTop > 150
        ? setScrolled(true)
        : setScrolled(false) 
    };

    // Header reveal animation
    useEffect(() => {
        tl.set(container.current, { css: {visibility: "visible"}});
        tl.to(overlay, {duration: 1, left: "100%", ease: Power2.easeInOut})
            .from(img.current, {scale: 1.4, duration: 1, delay: -0.8, ease: Power2.easeInOut})
            .to([btnRef.current, navRef.current], {duration: 0.5, delay: 0.2, opacity: 1, ease: Power2.easeInOut});
    }, [btnRef, navRef, container, img, overlay]);

    useEffect(() => { 
        window.addEventListener("scroll", handleNavScroll);

        return () => {
            window.removeEventListener(handleNavScroll);
        };
    }, []);

    return (
        <header className="header">
            <nav className={`header-container ${scrolled ? "scrolled" : ""}`} ref={navRef}>
                <div className="logo">
                    <img src={logo} alt={""} />
                </div>
                <CSSTransition in={open} timeout={200} classNames="nav-links">
                <ul className="nav-links">
                    <li>
                        <Link to="/" className={homePage ? "active" : ""}>Search</Link>
                    </li>
                    <li>
                        <Link to="/saved" className={homePage ? "" : "active"}>Personal plan</Link>
                    </li>
                </ul>
                </CSSTransition>
                <i className="fas fa-bars fa-2x" onClick={() => setOpen(!open)}></i>
            </nav>
            <div className="header-img" ref={container}>
                <img src={headerImg} ref={img} alt={""} />
                <div className="header-content" ref={btnRef}>
                    <h2>Plan your meal with us</h2>
                    {homePage 
                        ? <a href="#searched-recipes" className="btn btn-header">Search recipes</a> 
                        : <a href="#saved-recipes" className="btn btn-header">Check out your plan</a>
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;