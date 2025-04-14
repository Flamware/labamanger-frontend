import React from 'react';
import ContactCarousel from '../component/home/ContactCarousel.tsx'; // Assuming ContactCarousel.tsx is in the same directory

const Home: React.FC = () => {
    return (
        <div className="text-white min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="relative py-16 md:py-24 text-center  overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 bg-gray-800  z-0"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-lime-400 animate-fade-down animate-delay-100">
                        Bienvenue au CIAD-LAB
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-up animate-delay-200">
                        Votre centre de recherche et d'innovation en Intelligence Artificielle Distribuée.
                    </p>
                    {/* Optional: Call to Action Button */}
                    {/* <button className="bg-lime-500 hover:bg-lime-600 text-black font-semibold py-3 px-6 rounded-full transition duration-300 animate-pulse">
                        En savoir plus
                    </button> */}
                </div>
            </section>

            {/* Contact Information Carousel */}
            <section className="w-full flex justify-center  py-8 md:py-12 bg-gray-800">
                <div className="container">
                    <h2 className="text-2xl font-semibold text-lime-400 text-center mb-6 animate-slide-in-left">
                        Découvrez nos Domaines d'Expertise
                    </h2>
                    <ContactCarousel />
                </div>
            </section>

            {/* Optional: Additional Content Sections */}
            <section className="py-16 bg-gray-900">
                <div className="container mx-auto text-center">
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

            <footer className="bg-gray-800 py-6 text-center text-gray-400 text-sm">
                <p>&copy; {new Date().getFullYear()} CIAD-LAB. Tous droits réservés.</p>
                <p className="mt-2">Belfort, Bourgogne-Franche-Comté, France</p>
            </footer>
        </div>
    );
};

export default Home;