import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/ciad-logo.png';

const navItems = [
    { path: '/', label: 'ACCUEIL' },
    { path: '/projets', label: 'PROJETS' },
    { path: '/equipe', label: 'EQUIPE' },
    { path: '/publications', label: 'PUBLICATIONS' },
    { path: '/conferences-seminaires', label: 'CONFÉRENCES & SÉMINAIRES' },
    { path: '/contact', label: 'CONTACT' }
];

const Header: React.FC = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

    return (
        <header className="bg-black text-white py-4 sticky top-0 z-50 shadow-lg w-full">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="logo_container">
                    <Link to="/" className="inline-block">
                        <img src={logo} alt="CIAD-LAB" className="h-16 md:h-16" />
                    </Link>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-6">
                        {navItems.map(({ path, label }) => (
                            <li key={path}>
                                <Link
                                    to={path}
                                    className={`hover:text-lime-400 ${location.pathname === path ? 'text-lime-400' : ''}`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        data-testid="hamburger-button"
                        className="text-white focus:outline-none"
                        aria-label="Toggle mobile menu"
                    >
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
                        </svg>
                    </button>

                    {/* Mobile Menu */}
                    <div
                        data-testid="mobile-menu"
                        className={`absolute top-full left-0 w-full bg-black shadow-md z-20 transition-all duration-200 ${isMobileMenuOpen ? '' : 'hidden'}`}
                    >
                        <ul className="py-2">
                            {navItems.map(({ path, label }) => (
                                <li key={label}>
                                    <Link
                                        to={path}
                                        className={`block px-4 py-2 hover:bg-gray-800 ${location.pathname === path ? 'text-lime-400' : ''}`}
                                        onClick={toggleMobileMenu}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
