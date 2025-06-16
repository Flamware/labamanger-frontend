import React, { useState, useEffect } from 'react';
import { useProjects, Project } from '../../hooks/useProjects';
import { Link } from 'react-router-dom'; // Import du composant Link

const ProjetCarousel: React.FC = () => {
    const { projects, loading, error } = useProjects();
    const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
    const [activeFilter, setActiveFilter] = useState<'all' | 'partner' | 'research'>('all');
    const [imageUrls, setImageUrls] = useState<{ [key: string]: string | null }>({});
    const API_BASE_URL = 'https://localhost:8080/LabManager/api/v4/';

    // Met à jour les projets affichés lorsque les données initiales sont chargées
    useEffect(() => {
        setDisplayedProjects(projects);
    }, [projects]);

    // Récupère les URLs des images pour les projets affichés
    useEffect(() => {
        const fetchImages = async () => {
            if (displayedProjects && displayedProjects.length > 0) {
                const newImageUrls: { [key: string]: string | null } = {};
                for (const project of displayedProjects) {
                    if (project.imageUrl) {
                        try {
                            const imageUrl = `${API_BASE_URL}images/${project.imageUrl}`;
                            newImageUrls[project.imageUrl] = imageUrl;
                        } catch (err) {
                            console.error(`Failed to fetch image for ${project.title}:`, err);
                            newImageUrls[project.imageUrl] = null;
                        }
                    }
                }
                setImageUrls(newImageUrls);
            }
        };
        fetchImages();
    }, [displayedProjects, API_BASE_URL]);

    const handleFilterClick = (filter: 'all' | 'partner' | 'research') => {
        setActiveFilter(filter);
        if (filter === 'all') {
            setDisplayedProjects(projects);
        } else {
            setDisplayedProjects(projects.filter(p => p.category === filter));
        }
    };

    const getButtonClass = (filter: 'all' | 'partner' | 'research') => {
        const baseClass = "px-6 py-2 rounded-full transition-all duration-300 font-semibold shadow-lg transform hover:scale-105";
        if (activeFilter === filter) {
            return `${baseClass} bg-lime-400 text-black`;
        }
        return `${baseClass} bg-gray-700 text-gray-200 hover:bg-gray-600`;
    };

    return (
        <div className="w-full flex flex-col items-center">
            {/* Boutons de filtre */}
            <div className="mb-12 flex flex-wrap justify-center gap-4">
                <button onClick={() => handleFilterClick('all')} className={getButtonClass('all')}>
                    Tous les Projets
                </button>
                <button onClick={() => handleFilterClick('research')} className={getButtonClass('research')}>
                    Projets Open Source
                </button>
                <button onClick={() => handleFilterClick('partner')} className={getButtonClass('partner')}>
                    Projets Partenaires
                </button>
            </div>

            {/* Affichage des états de chargement et d'erreur */}
            {loading && <div className="text-lime-400 text-lg">Chargement des projets...</div>}
            {error && <div className="text-red-500 text-lg">Erreur : {error}</div>}

            {/* Grille des projets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
                {displayedProjects.map((project) => (
                    <div
                        key={project.id}
                        className="group bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 border border-gray-700 flex flex-col"
                    >
                        {imageUrls[project.imageUrl || project.id] && (
                            <div className="relative h-48">
                                <img
                                    src={imageUrls[project.imageUrl || project.id] || ''}
                                    alt={`Image pour ${project.title}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40"></div>
                            </div>
                        )}
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-2xl font-bold text-lime-400 mb-3">{project.title}</h3>
                            <p className="text-gray-300 leading-relaxed mb-4 flex-grow">
                                {project.description?.substring(0, 120)}...
                            </p>
                            <div className="mt-auto pt-4 border-t border-gray-700">
                                <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Catégorie: {project.category}</p>
                                <Link
                                    to={`/projets/${project.id}`}
                                    className="block w-full text-center bg-lime-400 text-black font-bold py-2 px-4 rounded-md transition-all duration-300 hover:bg-lime-500"
                                >
                                    En savoir plus
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {displayedProjects.length === 0 && !loading && !error && (
                <div className="col-span-full text-center text-gray-400 py-10 px-6 rounded-lg bg-gray-800 w-full max-w-lg">
                    <p>Aucun projet à afficher dans cette catégorie.</p>
                </div>
            )}
        </div>
    );
};

export default ProjetCarousel;
