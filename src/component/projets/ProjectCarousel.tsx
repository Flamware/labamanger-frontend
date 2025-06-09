import React, { useState, useEffect } from 'react';
import { useProjects, Project } from '../../hooks/useProjects';

const ProjetCarousel: React.FC = () => {
    const { projects, loading, error } = useProjects();
    const [displayedProjects, setDisplayedProjects] = useState<Project[]>(projects);
    const [imageUrls, setImageUrls] = useState<{ [key: string]: string | null }>({});
    const API_BASE_URL = 'https://localhost:8080/LabManager/api/v4/';

    const handleShowAll = () => {
        setDisplayedProjects(projects);
    };

    const handleShowPartners = () => {
        setDisplayedProjects(projects.filter(project => project.category === 'partner'));
    };

    const handleShowResearch = () => {
        setDisplayedProjects(projects.filter(project => project.category === 'research'));
    };

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
                    } else {
                        newImageUrls[project.id] = null;
                    }
                }
                setImageUrls(newImageUrls);
            }
        };
        fetchImages();
    }, [displayedProjects, API_BASE_URL]);

    useEffect(() => {
        setDisplayedProjects(projects);
    }, [projects]);


    return (
        <div className="w-full flex flex-col items-center">
            <div className="mb-8 flex space-x-4">
                <button
                    onClick={handleShowAll}
                    className="bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-colors duration-300 font-semibold shadow-md"
                >
                    Tous les Projets
                </button>
                <button
                    onClick={handleShowResearch}
                    className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors duration-300 font-semibold shadow-md"
                >
                    Projets Open Source
                </button>
                <button
                    onClick={handleShowPartners}
                    className="bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors duration-300 font-semibold shadow-md"
                >
                    Projets de Partenaires
                </button>
            </div>
            {loading && <div className="text-gray-500">Chargement des projets...</div>}
            {error && <div className="text-red-500">Erreur lors du chargement des projets.</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
                {displayedProjects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-gray-200/50"
                    >
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-green-700 mb-3">{project.title}</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                {project.description?.substring(0, 100)}...
                            </p>
                            <p className="text-xs text-gray-500 mt-2">Catégorie: {project.category}</p>
                        </div>
                        {imageUrls[project.imageUrl || project.id] && (
                            <div className="relative">
                                <img
                                    src={imageUrls[project.imageUrl || project.id] || ''}
                                    alt={project.title}
                                    className="w-full h-64 object-cover rounded-b-xl transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">

                                </div>
                            </div>
                        )}
                    </div>
                ))}
                {displayedProjects.length === 0 && !loading && !error && (
                    <div className="col-span-full text-center text-gray-500 py-8 rounded-lg bg-white">
                        Aucun projet à afficher dans cette catégorie.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjetCarousel;