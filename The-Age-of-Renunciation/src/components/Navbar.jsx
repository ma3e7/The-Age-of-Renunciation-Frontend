import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

const navItems = ['User Profile', 'About'];

const Navbar = ({ isAuthenticated, onSignOut }) => {
    const navContainerRef = useRef(null);

    const [lastScrollY, setLastScrollY] = useState(0)
    const [isNavVisible, setIsNavVisible] = useState(true)

    const { y: currentScrollY} = useWindowScroll()

    useEffect(() => {
        if(currentScrollY === 0) {
            setIsNavVisible(true)
            navContainerRef.current.classList.remove('floating-nav')
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false)
            navContainerRef.current.classList.add('floating-nav')
        } else if(currentScrollY < lastScrollY) {
            setIsNavVisible(true)
            navContainerRef.current.classList.add('floating-nav')
        }
        setLastScrollY(currentScrollY)
    }, [currentScrollY, lastScrollY])

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : - 100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.3
        })
    }, [isNavVisible])

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
                                    containerClass="bg-fog-grey! text-void-purple! md:flex hidden items-center justify-center gap-1 px-4 py-2"
                                />
                                <Button
                                    id="signup-button"
                                    title="Sign Up"
                                    rightIcon={<TiLocationArrow />}
                                    containerClass="bg-fog-grey! text-void-purple! md:flex hidden items-center justify-center gap-1 px-4 py-2"
                                />
                            </>
                        )}

                        {isAuthenticated && (
                            <Button
                                id="signout-button"
                                title="Sign Out"
                                onClick={onSignOut}
                                rightIcon={<TiLocationArrow />}
                                containerClass="bg-fog-grey! text-void-purple! md:flex hidden items-center justify-center gap-1 px-4 py-2"
                            />
                        )}
                    </div>

                    <div className="flex h-full items-center">
                        <div className="hidden md:block">
                            {navItems.map((item) => {
                                if (item === 'User Profile') {
                                    // HIDE OR DISABLE PROFILE IF USER NOT LOGGED IN
                                    if (!isAuthenticated) return null;
                                }

                                return (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        className="nav-hover-btn"
                                    >
                                        {item}
                                    </a>
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