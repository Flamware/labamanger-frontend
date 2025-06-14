import React from 'react';
import Image from '../../assets/PROCESSUS-DE-SOUTIEN-A-LINNOVATION-1600-x-1200.jpg'; // Remplace ce chemin par le tien

const InnoProcessus: React.FC = () => {
    return (
        <section className="py-16 text-white">
            <div className="w-full md:w-2/3 mx-auto">
                <h2 className="text-4xl text-lime-400 text-center mb-8 animate-fade-down">
                    Notre processus de soutien à l'innovation
                </h2>
            </div>
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-md">
                    <img
                        src={Image}
                        alt="Présentation CIAD"
                        className="w-full h-auto object-contain"
                        style={{ aspectRatio: "4 / 3" }}
                    />
                </div>
            </div>
        </section>
    );
};

export default InnoProcessus;