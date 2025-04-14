import React from 'react';
import ContactCarousel from '../component/home/ContactCarousel.tsx'; // Assuming ContactCarousel.tsx is in the same directory

const Home: React.FC = () => {
    return (
        <div className="text-white min-h-screen flex flex-col bg-black">
            {/* Hero Section (You can customize this) */}
            <section className="py-20 md:py-40 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-text-reveal">Bienvenue au CIAD-LAB</h1>
                <p className="text-lg md:text-xl text-gray-400 ">Votre centre de recherche et d'innovation</p>
                {/* You can add more introductory content or buttons here */}
            </section>

            {/* Contact Information Carousel */}
            <section className="w-full py-10 flex justify-center">
                <ContactCarousel />
            </section>

            {/* Optional: Additional Content Sections */}
            <section className="py-20">
                <div className="container mx-auto text-center">
                    <h2 className="text-2xl font-semibold mb-6">Nos Projets Récents</h2>
                    {/* Add a component or content showcasing recent projects */}
                    <p className="text-gray-400">Découvrez nos dernières initiatives et réalisations.</p>
                </div>
            </section>

            <footer className="bg-gray-800 py-4 text-center text-gray-400 text-sm">
                <p>&copy; {new Date().getFullYear()} CIAD-LAB. Tous droits réservés.</p>
            </footer>
        </div>
    );
};

export default Home;