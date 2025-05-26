import React from 'react';
import logo from "../assets/uploads/2021/08/LOGOS-CIAD-SEUL-FOND-NOIR-500-px.png"
import ProjectCarousel from "../component/projets/ProjectCarousel.tsx";
import Footer from "../component/Footer.tsx";
const Projects: React.FC = () => {
    return (
        <div className="text-white  flex flex-col bg-gray-900">
            {/* Hero Section */}
            <section className="relative text-center overflow-hidden py-16 md:py-24 bg-black">
                <div className="absolute inset-0 z-0 bg-black"></div>
                <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-lime-400 animate-fade-down animate-delay-100">
                        Les projets du
                    </h1>
                    <div className="flex justify-center w-full"> {/* Added this div for centering */}
                        <img
                            src={logo}
                            alt="CIAD-LAB"
                            className="rounded-lg shadow-lg animate-fade-up animate-delay-200"
                            style={{maxWidth: '100%', height: 'auto'}} // Added inline styles for responsiveness
                        />
                    </div>
                </div>
            </section>


            {/* Contact Information Carousel */}
            <section className="w-full flex justify-center py-8 md:py-12 bg-gradient-to-b from-black">
                <div className="container">
                    <ProjectCarousel/>
                </div>
            </section>
                <Footer/>
        </div>
    );
};

export default Projects;