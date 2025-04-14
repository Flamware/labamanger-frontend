import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/ciad-logo.png'; // Replace with your actual logo path

const Header: React.FC = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-black text-white py-4 sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                <div className="logo_container">
                    <Link to="/" className="inline-block">
                        <img src={logo} alt="CIAD-LAB" className="h-16 md:h-16" />
                    </Link>
                </div>
                <nav className="hidden md:block">
                    <ul className="flex space-x-6">
                        <li>
                            <Link
                                to="/"
                                className={`hover:text-lime-400 ${location.pathname === '/' ? 'text-lime-400' : ''}`}
                            >
                                ACCUEIL
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/projets"
                                className={`hover:text-lime-400 ${location.pathname === '/projets' ? 'text-lime-400' : ''}`}
                            >
                                PROJETS
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/equipe"
                                className={`hover:text-lime-400 ${location.pathname === '/equipe' ? 'text-lime-400' : ''}`}
                            >
                                EQUIPE
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/publications"
                                className={`hover:text-lime-400 ${location.pathname === '/publications' ? 'text-lime-400' : ''}`}
                            >
                                PUBLICATIONS
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/conferences-seminaires"
                                className={`hover:text-lime-400 ${location.pathname === '/conferences-seminaires' ? 'text-lime-400' : ''}`}
                            >
                                CONFÉRENCES & SÉMINAIRES
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className={`hover:text-lime-400 ${location.pathname === '/contact' ? 'text-lime-400' : ''}`}
                            >
                                CONTACT
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
                        {/* Hamburger Icon */}
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"/>
                        </svg>
                    </button>

                    {/* Mobile Menu Items */}
                    {isMobileMenuOpen && (
                        <div className="absolute top-full left-0 w-full bg-black shadow-md z-20">
                            <ul className="py-2">
                                <li><Link to="/" className="block px-4 py-2 hover:bg-gray-800" onClick={toggleMobileMenu}>ACCUEIL</Link></li>
                                <li><Link to="/projets" className="block px-4 py-2 hover:bg-gray-800" onClick={toggleMobileMenu}>PROJETS</Link></li>
                                <li><Link to="/equipe" className="block px-4 py-2 hover:bg-gray-800" onClick={toggleMobileMenu}>EQUIPE</Link></li>
                                <li><Link to="/publications" className="block px-4 py-2 hover:bg-gray-800" onClick={toggleMobileMenu}>PUBLICATIONS</Link></li>
                                <li><Link to="/conferences-seminaires" className="block px-4 py-2 hover:bg-gray-800" onClick={toggleMobileMenu}>CONFÉRENCES & SÉMINAIRES</Link></li>
                                <li><Link to="/contact" className="block px-4 py-2 hover:bg-gray-800" onClick={toggleMobileMenu}>CONTACT</Link></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;