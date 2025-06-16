import React from 'react';
import logo from "../assets/uploads/2021/08/LOGOS-CIAD-SEUL-FOND-NOIR-500-px.png"; // Assurez-vous que le chemin est correct
import ProjectCarousel from "../component/projets/ProjectCarousel.tsx";
import Footer from "../component/Footer.tsx";

/**
 * La page des Projets.
 * Présente les projets du laboratoire avec une section héro audacieuse et un carrousel dynamique.
 */
const Projects: React.FC = () => {
    return (
        <div className="text-white flex flex-col bg-gray-900 min-h-screen">
            {/* Section Héro */}
            <section className="relative text-center overflow-hidden py-12 md:py-20 bg-black">
                {/* Effet de dégradé subtil en arrière-plan */}
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-gray-900/50 to-gray-900"></div>

                <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-lime-400 animate-fade-down">
                        Les Projets du CIAD
                    </h1>
                    <div className="max-w-lg w-full">
                        <img
                            src={logo}
                            alt="Logo du CIAD"
                            className="w-full h-auto rounded-lg shadow-2xl animate-fade-up animate-delay-200"
                        />
                    </div>
                </div>
            </section>

            {/* Section du Carrousel des Projets */}
            <section className="w-full py-12 md:py-16 bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">
                        Découvrez nos travaux
                    </h2>
                    <ProjectCarousel />
                </div>
            </section>

            {/* Pied de page */}
            <Footer
                isBlack={true} // Prop pour un fond noir
                easeBlack={true} // Prop pour un effet de dégradé
            />
        </div>
    );
};

export default Projects;
