import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Footer from "../component/Footer.tsx";
import { useProjectDetails } from "../hooks/useProject.tsx"; // Assurez-vous que le chemin est correct

const Project: React.FC = () => {
    // useParams retourne toujours des chaînes de caractères
    const { projectId } = useParams<{ projectId: string }>();

    // Convertit l'ID du projet en nombre, en toute sécurité
    const numericProjectId = useMemo(() => {
        if (!projectId) return undefined;
        const id = parseInt(projectId, 10);
        return isNaN(id) ? undefined : id;
    }, [projectId]);

    const { backendProject, loading, error } = useProjectDetails(numericProjectId);
    const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);

    // Met à jour l'image principale lorsque les données du projet sont chargées
    useEffect(() => {
        if (backendProject?.images && backendProject.images.length > 0) {
            setMainImageUrl(backendProject.images[0]);
        }
    }, [backendProject]);

    // --- Gestion des états de chargement et d'erreur ---
    if (loading) {
        return (
            <div className="text-white flex flex-col items-center justify-center min-h-screen bg-gray-900">
                <p className="text-lime-400 text-xl">Chargement du projet...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 flex flex-col items-center justify-center min-h-screen bg-gray-900 text-center px-4">
                <h1 className="text-3xl font-bold mb-4">Erreur de chargement</h1>
                <p>{error}</p>
                <p>Veuillez vérifier l'URL ou réessayer plus tard.</p>
            </div>
        );
    }

    if (!backendProject) {
        return (
            <div className="text-white flex flex-col items-center justify-center min-h-screen bg-gray-900">
                <p>Projet introuvable.</p>
            </div>
        );
    }

    // --- Rendu du composant avec les données ---
    const getYouTubeEmbedUrl = (url: string): string => {
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})/;
        const match = url.match(youtubeRegex);
        return match && match[1] ? `https://www.youtube.com/embed/${match[1]}` : url;
    };

    const logoUrl = backendProject.logo; // Utilisation directe de l'URL du logo

    return (
        <div className="text-white flex flex-col bg-gray-900 min-h-screen">
            <main className="flex-grow container mx-auto px-4 py-8">
                {/* En-tête du Projet */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-lime-400 mb-2">{backendProject.title}</h1>
                    <p className="text-2xl text-gray-400">{backendProject.acronym}</p>
                    {logoUrl && (
                        <img src={logoUrl} alt={`${backendProject.title} Logo`} className="mt-6 mx-auto h-20 w-auto object-contain"/>
                    )}
                </header>

                {/* Contenu Principal - Grille */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Colonne de gauche : Détails */}
                    <div className="lg:col-span-1 space-y-8">
                        <section>
                            <h3 className="text-2xl font-bold text-lime-400 mb-4 border-b border-gray-700 pb-2">Description</h3>
                            <p className="text-gray-300 leading-relaxed">{backendProject.description || 'Aucune description disponible.'}</p>
                        </section>
                        <section>
                            <h3 className="text-2xl font-bold text-lime-400 mb-4 border-b border-gray-700 pb-2">Détails</h3>
                            <div className="space-y-3 text-gray-300">
                                {backendProject.date?.startDate && <p><strong>Début :</strong> {backendProject.date.startDate}</p>}
                                {backendProject.date?.endDate && <p><strong>Fin :</strong> {backendProject.date.endDate}</p>}
                                <p><strong>Statut :</strong> {backendProject.isDone ? 'Terminé' : 'En cours'}</p>
                                {backendProject.organizations?.localOrganization && <p><strong>Organisation pilote :</strong> {backendProject.organizations.localOrganization}</p>}
                                {backendProject.organizations?.partners?.length > 0 && <p><strong>Partenaires :</strong> {backendProject.organizations.partners.join(', ')}</p>}
                                {backendProject.participants?.length > 0 && <p><strong>Participants :</strong> {backendProject.participants.join(', ')}</p>}
                                {backendProject.links?.projectUrl && (
                                    <a href={backendProject.links.projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                        Visiter le site du projet
                                    </a>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Colonne de droite : Médias */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Galerie Photos */}
                        <section>
                            {mainImageUrl ? (
                                <img src={mainImageUrl} alt={backendProject.title} className="w-full h-auto object-cover rounded-lg shadow-lg mb-4"/>
                            ) : (
                                <div className="w-full h-64 bg-gray-800 flex items-center justify-center rounded-lg text-gray-400">Aucune image disponible</div>
                            )}
                            {backendProject.images && backendProject.images.length > 1 && (
                                <div className="flex flex-wrap gap-3">
                                    {backendProject.images.map((imgUrl, index) => {
                                        // Utilisation directe de l'URL de l'image
                                        return (
                                            <img
                                                key={index}
                                                src={imgUrl}
                                                alt={`Miniature ${index + 1}`}
                                                className={`w-24 h-16 object-cover rounded-md cursor-pointer transition-all duration-200 ${mainImageUrl === imgUrl ? 'ring-2 ring-lime-400' : 'hover:opacity-80'}`}
                                                onClick={() => setMainImageUrl(imgUrl)}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </section>

                        {/* Vidéos */}
                        {backendProject.links?.videoLinks && backendProject.links.videoLinks.length > 0 && (
                            <section>
                                <h3 className="text-2xl font-bold text-lime-400 mb-4">Vidéos</h3>
                                <div className="space-y-6">
                                    {backendProject.links.videoLinks.map((videoUrl, index) => (
                                        <div key={index} className="aspect-w-16 aspect-h-9">
                                            <iframe
                                                src={getYouTubeEmbedUrl(videoUrl)}
                                                title={`Vidéo du projet ${index + 1}`}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="w-full h-full rounded-lg"
                                            ></iframe>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Project;
