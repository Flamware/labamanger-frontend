import React from 'react';

const AboutUs: React.FC = () => {
    const youtubeVideoUrl = "https://www.youtube.com/embed/SH6WxV_7k8A"; // Replace with your actual YouTube embed URL

    return (
        <section className="py-16 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-lime-400 text-center mb-8 animate-fade-down">
                    QUI SOMMES NOUS ?
                </h2>
                <div className="leading-relaxed text-lg text-gray-300 animate-fade-up mb-8"> {/* Added mb-8 for space below text */}
                    <p className="mb-4">
                        Le laboratoire <span className="font-semibold text-lime-400">CIAD</span> (Connaissances et Intelligence Artificielle Distribuées)
                        est un laboratoire public de recherche en intelligence artificielle qui s'intéresse aux stratégies de raisonnement artificiel.
                    </p>
                    <p className="mb-4">
                        Le raisonnement est parfois une articulation de plusieurs mécanismes "d'intelligences". On parle alors de raisonnement complexe ou d'hybridation
                        d'intelligences artificielles.
                    </p>
                    <p className="mb-4">
                        Notre laboratoire est spécialisé dans la construction de systèmes cyber-physiques complexes combinant de manière distribuée différentes
                        approches d'<span className="italic">IA</span>.
                    </p>
                    <p className="mb-4">
                        Le laboratoire est une unité de recherche sous la tutelle de l'<span className="font-semibold text-lime-400">Université de
                        Technologie Belfort-Montbéliard (UTBM)</span> et de l'<span className="font-semibold text-lime-400">Université
                        Bourgogne Europe (UBE)</span>.
                    </p>
                    <p className="mb-4">
                        Environ 70 personnes (enseignants-chercheurs, doctorants, ingénieurs, post-doctorants, personnel administratif) travaillent ensemble pour
                        concevoir des Intelligences Artificielles Hybrides, Distribuées et Explicables. Partenaires de nombreux projets de collaboration scientifique avec des
                        institutions ou des entreprises, nous avons développé une méthode de travail nous permettant de produire des systèmes de raisonnement
                        artificiel d'un niveau de maturité technologie de 7 (TRL7).
                    </p>
                    <p>
                        Depuis 2020, le laboratoire est membre du réseau d'excellence français <span className="font-semibold text-lime-400">« Institut Carnot ARTS »</span>,
                        pour accélérer l'innovation et relever les défis de l'industrie du futur.
                    </p>
                </div>

                {/* Placeholder for YouTube Video */}
                <div className="w-full rounded-3xl overflow-hidden shadow-md">
                    <iframe
                        className="w-full aspect-video"
                        src={youtubeVideoUrl}
                        title="CIAD Presentation Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;