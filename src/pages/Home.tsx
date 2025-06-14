import React from 'react';
import background from "../assets/FOND-FILAIRE-LUEUR-GAUCHE.jpg";
import background2 from "../assets/uploads/2021/04/FOND-1600-x-1200_2.jpg";
import ContactCarousel from '../component/home/ContactCarousel.tsx';
import AboutUs from "../component/home/AboutUs.tsx";
import Footer from "../component/Footer.tsx";
import AI from "../component/home/AI.tsx"
import Science from '../component/home/ScientificLock.tsx';
import Application from "../component/home/ApplicationField.tsx"
import ProjectCarousel from '../component/home/HomeProjectCarousel.tsx';
import KeyNumbers from "../component/home/KeyNumbers.tsx"
import InnovProcessus from "../component/home/InnovativeProcessus.tsx"
import PartnerCarousel from "../component/home/PartnerCarousel.tsx"


const Home: React.FC = () => {
    return (
        <div 
            className="text-white min-h-screen flex flex-col bg-gray-900"
            style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}
        >
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
            {/* About Us, IA, Science and Application parts */}
            <section className="relative text-center overflow-hidden py-16 md:py-24">
                <div className="container mx-auto text-center">
                    <div className="mb-12 flex justify-center">
                        <div className="w-full md:w-3/4"> {/* Limit width to half on medium screens and above */}
                            <AboutUs />
                        </div>
                    </div>
                    <div className="mb-12 flex justify-center">
                        <div className="w-full md:w-3/4 flex flex-wrap"> {/* Limit width to three quarters on medium screens and above */}
                            <AI />
                        </div>
                    </div>
                    <section 
                        className="relative text-center overflow-hidden py-16 md:py-24"
                        style={{ backgroundImage: `url(${background2})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}
                    >
                        <div className="mb-12 flex justify-center">
                            <div className="w-full md:w-3/4"> {/* Limit width to three quarters on medium screens and above */}
                                <Science />
                            </div>
                        </div>
                    </section>
                    <div className="mb-12 flex justify-center">
                        <div className="w-full md:w-3/4"> {/* Limit width to half on medium screens and above */}
                            <Application />
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative text-center overflow-hidden py-16 md:py-2 bg-black">
                <div className="mb-12 flex justify-center">
                    <div className="w-full"> {/* Limit width to half on medium screens and above */}
                        <ProjectCarousel />
                    </div>
                </div>
            </section>
            <section className="relative text-center overflow-hidden py-16 md:py-2 bg-black">
                <div className="mb-12 flex justify-center">
                    <div className="w-full"> {/* Limit width to half on medium screens and above */}
                        <KeyNumbers />
                    </div>
                </div>
            </section>
            <section className="relative text-center overflow-hidden py-16 md:py-2 bg-black">
                <div className="mb-12 flex justify-center">
                    <div className="w-full"> {/* Limit width to half on medium screens and above */}
                        <InnovProcessus />
                    </div>
                </div>
            </section>
            <section className="relative text-center overflow-hidden py-16 md:py-2 bg-black">
                <div className="mb-12 flex justify-center">
                    <div className="w-full"> {/* Limit width to half on medium screens and above */}
                        <PartnerCarousel />
                    </div>
                </div>
            </section>
            <section className="relative text-center overflow-hidden py-16 md:py-2 bg-black">
                <Footer isBlack />
            </section>
        </div>
    );
};
export default Home;