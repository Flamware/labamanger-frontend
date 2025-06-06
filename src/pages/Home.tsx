import React from 'react';
import ContactCarousel from '../component/home/ContactCarousel.tsx';
import AboutUs from "../component/home/AboutUs.tsx";
import Footer from "../component/Footer.tsx"; // Assuming ContactCarousel.tsx is in the same directory
import IA from "../component/home/IA.tsx"

const Home: React.FC = () => {
    return (
        <div className="text-white min-h-screen flex flex-col bg-gray-900">
            {/* Hero Section */}
            <section className="relative text-center overflow-hidden py-16 md:py-24 bg-black">
                <div className="absolute inset-0 z-0 bg-black"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-lime-400 animate-fade-down animate-delay-100">
                        Bienvenue au CIAD-LAB
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 animate-fade-up animate-delay-200">
                        Votre centre de recherche et d'innovation en Intelligence Artificielle Distribuée.
                    </p>
                    {/* Optional: Call to Action Button */}
                    {/* <button className="bg-lime-500 hover:bg-lime-600 text-black font-semibold py-3 px-6 rounded-full transition duration-300 animate-pulse">
                        En savoir plus
                    </button> */}
                </div>
            </section>

            {/* Contact Information Carousel */}
            <section className="w-full flex justify-center py-8 md:py-12 bg-gradient-to-b from-black">
                <div className="container">
                    <h2 className="text-2xl font-semibold text-lime-400 text-center mb-6 animate-slide-in-left">
                        Découvrez nos Domaines d'Expertise
                    </h2>
                    <ContactCarousel />
                </div>
            </section>

            {/* About Us and Recent Projects */}
            <section className="py-16 bg-gray-900">
                <div className="container mx-auto text-center">
                    <div className="mb-12 flex justify-center">
                        <div className="w-full md:w-1/2"> {/* Limit width to half on medium screens and above */}
                            <AboutUs />
                        </div>
                    </div>
                    <div className="mb-12 flex justify-center">
                        <div className="w-full md:w-1/2"> {/* Limit width to half on medium screens and above */}
                            <IA />
                        </div>
                    </div>
                    <h2 className="text-2xl font-semibold mb-8 text-lime-400 animate-slide-in-right">
                        Nos Projets Récents
                    </h2>
                    {/* Add a component or content showcasing recent projects */}
                    <p className="text-gray-300 mb-8 animate-fade-in">
                        Explorez nos dernières initiatives et réalisations qui repoussent les limites de l'IA distribuée.
                    </p>
                    {/* Example Project Cards (Replace with your actual data/components) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-gray-800 rounded-lg shadow-md p-6 animate-slide-up delay-100">
                            <h3 className="font-semibold text-lg text-white mb-2">Projet IoT Intelligent</h3>
                            <p className="text-gray-400 text-sm">Développement d'une plateforme IoT pour la gestion intelligente des ressources urbaines.</p>
                        </div>
                        <div className="bg-gray-800 rounded-lg shadow-md p-6 animate-slide-up delay-200">
                            <h3 className="font-semibold text-lg text-white mb-2">Food Tech Innovation</h3>
                            <p className="text-gray-400 text-sm">Application de l'IA pour optimiser la production et la distribution alimentaire.</p>
                        </div>
                        <div className="bg-gray-800 rounded-lg shadow-md p-6 animate-slide-up delay-300">
                            <h3 className="font-semibold text-lg text-white mb-2">eHealth System Distribué</h3>
                            <p className="text-gray-400 text-sm">Conception d'un système de santé distribué pour un suivi patient personnalisé.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>

        </div>
    );
};

export default Home;