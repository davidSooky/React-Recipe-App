import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import decode from "jwt-decode";

import { TimelineLite, Power2, gsap } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";

import { logout, clearData } from "../../state/actions";
import headerImg from "../../images/header-img.jpg";
import logo from "../../images/logo.png";

gsap.registerPlugin(CSSRulePlugin);

export const Header = ({ openModal }) => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    const btnRef = useRef(null);
    const navRef = useRef(null);
    const container = useRef(null);
    const img = useRef(null);
    const overlay = CSSRulePlugin.getRule(".header-img:after");
    
    const currentPage = useLocation().pathname;
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const route = useHistory();

    const tl = useMemo(() => new TimelineLite(), []);

    const closeNav = useCallback((e) => {
        if(open) {
            if(!navRef.current.contains(e.target)) {
                setOpen(false);
            }
        }  
    }, [open]);
    
    // Header reveal animation
    useEffect(() => {
        tl.set(container.current, {css: {visibility: "visible"}});
        tl.to(overlay, {duration: 1, left: "100%", ease: Power2.easeInOut})
            .from(img.current, {scale: 1.4, duration: 1, delay: -0.8, ease: Power2.easeInOut})
            .to([btnRef.current, navRef.current], {duration: 0.5, delay: 0.2, opacity: 1, ease: Power2.easeInOut});
    }, [btnRef, navRef, container, img, overlay, tl]);

    useEffect(() => { 
        window.addEventListener("scroll", handleNavScroll);
        document.body.addEventListener("click", closeNav);

        if(localStorage.getItem("token")) {
            if(decode(JSON.parse(localStorage.getItem("token"))).exp * 1000 < new Date().getTime()) {
                dispatch(logout(route));
            }
        }

        return () => {
            window.removeEventListener("scroll", handleNavScroll);
            document.body.removeEventListener("click", closeNav);
        };
    }, [open, closeNav, currentPage, dispatch, route]);

    const handleNavScroll = () => {
        document.body.scrollTop > 150 || document.documentElement.scrollTop > 150
        ? setScrolled(true)
        : setScrolled(false) 
    };

    const handleLogout = (e) => {
        e.preventDefault();
        
        dispatch(clearData());
        dispatch(logout(route));
    };

    return (
        <header className="header">
            <nav className={`header-container ${scrolled ? "scrolled" : ""}`} ref={navRef}>
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <CSSTransition in={open} timeout={200} classNames="nav-links">
                <ul className="nav-links">
                    <li>
                        <Link to="/" className={currentPage === "/" ? "active" : ""}>Search</Link>
                    </li>
                    <li>
                        <Link to="/saved" className={currentPage === "/saved" ? "active" : ""}>Personal plan</Link>
                    </li>
                    <li>
                        {!user
                            ? <a href="" onClick={(e) => {
                                e.preventDefault();
                                openModal(true);
                            }
                            }>Login</a>
                            : <a href="" onClick={handleLogout}>Logout</a>
                        }
                    </li>
                </ul>
                </CSSTransition>
                <i className="fas fa-bars fa-2x" onClick={() => setOpen(!open)}></i>
            </nav>
            <div className="header-img" ref={container}>
                <img src={headerImg} ref={img} alt={""} />
                <div className="header-content" ref={btnRef}>
                    {user && <h3>Hello {user}</h3>}
                    <h2>Plan your meal with us</h2>
                    {currentPage === "/"
                        ? <a href="#searched-recipes" className="btn btn-header">Search recipes</a> 
                        : <a href="#saved-recipes" className="btn btn-header">Check out your plan</a>
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;