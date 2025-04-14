import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/ciad-logo.png'; // Replace with your actual logo path

const Header: React.FC = () => {
    const location = useLocation();

    return (
        <header className="bg-black text-white py-4 sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                <div className="logo_container">
                    <Link to="/" className="inline-block">
                        <img src={logo} alt="CIAD-LAB" className="h-8 md:h-10" />
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

                {/* Mobile Menu (You'll need to add logic for toggling) */}
                <div className="md:hidden">
                    <button className="text-white focus:outline-none">
                        {/* Hamburger Icon */}
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"/>
                        </svg>
                    </button>

                </div>
            </div>
        </header>
    );
};

export default Header;