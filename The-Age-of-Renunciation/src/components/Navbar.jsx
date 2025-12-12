import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

const navItems = ['User Profile', 'About'];

const Navbar = ({ isAuthenticated, onSignOut }) => {
    const navContainerRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const [lastScrollY, setLastScrollY] = useState(0)
    const [isNavVisible, setIsNavVisible] = useState(true)
    const { y: currentScrollY } = useWindowScroll()

    useEffect(() => {
        if (currentScrollY === 0) {
            setIsNavVisible(true)
            navContainerRef.current.classList.remove('floating-nav')
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false)
            navContainerRef.current.classList.add('floating-nav')
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true)
            navContainerRef.current.classList.add('floating-nav')
        }
        setLastScrollY(currentScrollY)
    }, [currentScrollY, lastScrollY])

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.3
        })
    }, [isNavVisible])

    const handleSignOutClick = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        onSignOut();
        navigate("/"); 
    };


    const hideAbout = location.pathname.startsWith("/profile") || location.pathname.startsWith("/hero/");

    return (
        <div
            ref={navContainerRef}
            className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    <div className="flex items-center gap-7">
                        {!isAuthenticated && (
                            <>
                                <Button
                                    id="signin-button"
                                    title="Sign In"
                                    rightIcon={<TiLocationArrow />}
                                    onClick={() => document.getElementById("open-signin").click()}
                                    containerClass="bg-fog-grey text-void-purple md:flex hidden items-center justify-center gap-1 px-4 py-2"
                                />
                                <Button
                                    id="signup-button"
                                    title="Sign Up"
                                    rightIcon={<TiLocationArrow />}
                                    onClick={() => document.getElementById("open-signup").click()}
                                    containerClass="bg-fog-grey text-void-purple md:flex hidden items-center justify-center gap-1 px-4 py-2"
                                />
                            </>
                        )}

                        {isAuthenticated && (
                            <Button
                                id="signout-button"
                                title="Sign Out"
                                onClick={handleSignOutClick}
                                rightIcon={<TiLocationArrow />}
                                containerClass="bg-fog-grey text-void-purple md:flex hidden items-center justify-center gap-1 px-4 py-2"/>
                        )}
                    </div>

                    <div className="flex h-full items-center">
                        <div className="hidden md:flex gap-5">
                            {navItems.map((item) => {
                                if (item === 'User Profile' && !isAuthenticated) return null;
                                if (item === 'About' && hideAbout) return null; // sakrij About

                                const linkTo = item === "User Profile" ? "/profile" : `#${item.toLowerCase()}`;

                                return (
                                    <Link
                                        key={item}
                                        to={linkTo}
                                        className="nav-hover-btn text-fog-grey hover:text-arcane-cyan transition-colors"
                                    >
                                        {item}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;
