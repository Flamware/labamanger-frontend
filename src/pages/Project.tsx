import React from 'react';
import { useParams } from 'react-router-dom';
import Footer from "../component/Footer.tsx";
import {useProjectDetails} from "../hooks/useProject.tsx";

const Project: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();

    // Use the custom hook to fetch project data
    const { backendProject, loading, error } = useProjectDetails(projectId);

    // --- Conditional Rendering based on state from the hook ---
    if (loading) {
        return (
            <div className="text-white flex flex-col items-center justify-center min-h-screen bg-gray-900">
                <p>Loading project details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 flex flex-col items-center justify-center min-h-screen bg-gray-900">
                <p>Error: {error}</p>
                <p>Please check the URL or try again later.</p>
            </div>
        );
    }

    if (!backendProject) {
        return (
            <div className="text-white flex flex-col items-center justify-center min-h-screen bg-gray-900">
                <p>Project not found or data is empty.</p>
            </div>
        );
    }

    // --- Data is loaded and available, proceed with rendering ---
    const displayTitle = backendProject.title;
    const displayDescription = backendProject.description || 'No description available.';
    const displayMainImageUrl = backendProject.images && backendProject.images.length > 0
        ? backendProject.images[0]
        : null;

    const displayVideoUrls = backendProject.links?.videoLinks || [];
    const displayStartDate = backendProject.date?.startDate;
    const displayEndDate = backendProject.date?.endDate;
    const displayPartners = backendProject.organizations?.partners || [];
    const displayProjectUrl = backendProject.links?.projectUrl;
    const displayLocalOrganization = backendProject.organizations?.localOrganization;
    const displayParticipants = backendProject.participants || [];

    // Helper function to get the correct embed URL for YouTube
    const getYouTubeEmbedUrl = (url: string): string => {
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/i;
        const match = url.match(youtubeRegex);

        if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}`; // Correct YouTube embed URL
        }
        return url;
    };


    return (
        // Outermost div for overall page centering and max width
        // Using max-w-[75vw] to ensure it's 75% of viewport width, and mx-auto to center
        <div className="text-white flex flex-col bg-gray-900 min-h-screen mx-auto px-4" style={{ maxWidth: '1200px' }}> {/* Max width for overall page content, adjusted */}
            <header className="py-8 px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-lime-400 animate-fade-down animate-delay-100">
                    Le Projet
                </h1>
                <h2 className="text-5xl font-bold mb-4">{displayTitle}</h2>
                <p className="text-gray-400 mt-2 text-xl">{backendProject.acronym}</p>
                {backendProject.logo ? (
                    <img
                        src={backendProject.logo}
                        alt={`${displayTitle} Logo`}
                        className="bg-accent rounded-lg shadow-lg mt-8 mx-auto h-24 w-24 object-contain"
                    />
                ) : (
                    <div className="mt-8 mx-auto h-24 w-24 flex items-center justify-center bg-gray-700 rounded-lg text-gray-400">
                        No Logo
                    </div>
                )}
            </header>

            <main className="flex-grow py-8 max-w-4xl mx-auto w-full"> {/* Centered main content area */}
                {/* Project Description */}
                <section className="my-8 text-center">
                    <h3 className="text-3xl font-semibold mb-4">Description du Projet</h3>
                    <p className="text-lg leading-relaxed text-gray-300 mb-4 max-w-2xl mx-auto"> {/* Added max-w-2xl and mx-auto to paragraph */}
                        {displayDescription}
                    </p>
                </section>

                {/* Detailed Info List */}
                <section className="my-8 text-gray-300 text-center">
                    <h3 className="text-3xl font-semibold mb-4">Détails du Projet</h3>
                    <div className="inline-block text-left px-4 py-3 bg-gray-800 rounded-lg shadow-md max-w-md"> {/* Added max-w-md here */}
                        <div className="space-y-2">
                            {displayStartDate && displayEndDate && (
                                <p><strong>Dates:</strong> {displayStartDate} to {displayEndDate}</p>
                            )}
                            {displayLocalOrganization && (
                                <p><strong>Lead Org:</strong> {displayLocalOrganization}</p>
                            )}
                            {displayPartners.length > 0 && (
                                <p><strong>Partners:</strong> {displayPartners.join(', ')}</p>
                            )}
                            {displayParticipants.length > 0 && (
                                <p><strong>Participants:</strong> {displayParticipants.join(', ')}</p>
                            )}
                            {displayProjectUrl && (
                                <p>
                                    <strong>Project Website:</strong>{" "}
                                    <a
                                        href={displayProjectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        Visit Page
                                    </a>
                                </p>
                            )}
                            {backendProject.openSource && (
                                <p><strong>Open Source:</strong> Yes</p>
                            )}
                            <p><strong>Status:</strong> {backendProject.isDone ? 'Completed' : 'Ongoing'}</p>
                        </div>
                    </div>
                </section>

                {/* Videos Section */}
                {displayVideoUrls.length > 0 && (
                    <section className="my-8 text-center">
                        <h3 className="text-3xl font-semibold mb-4">Vidéos du Projet</h3>
                        {/* Corrected video grid, using max-w-full and mx-auto for the grid container */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center max-w-full mx-auto">
                            {displayVideoUrls.map((videoUrl, index) => (
                                <div key={index} className="aspect-w-16 aspect-h-9 w-full max-w-md">
                                    <iframe
                                        src={getYouTubeEmbedUrl(videoUrl)}
                                        title={`Project Video ${index + 1}`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className="w-full h-full rounded-lg"
                                    ></iframe>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Photos Section */}
                <section className="my-8 text-center">
                    <h3 className="text-3xl font-semibold mb-4">Photos du Projet</h3>
                    {displayMainImageUrl ? (
                        <div className="w-full flex justify-center mb-4">
                            <img
                                src={displayMainImageUrl}
                                alt={displayTitle}
                                className="w-full h-auto object-cover rounded-lg shadow-lg max-w-3xl"
                            />
                        </div>
                    ) : (
                        <div className="w-full flex justify-center mb-4">
                            <div
                                className="w-full h-64 bg-gray-700 flex items-center justify-center rounded-lg text-gray-400 max-w-3xl">
                                Aucune image disponible
                            </div>
                        </div>
                    )}

                    {/* Display additional images if available */}
                    {backendProject.images && backendProject.images.length > 1 && (
                        <div className="flex flex-wrap gap-4 mt-4 justify-center max-w-5xl mx-auto"> {/* Added max-w-5xl mx-auto */}
                            {backendProject.images.slice(1).map((imgUrl, index) => (
                                <img
                                    key={index}
                                    src={imgUrl}
                                    alt={`${displayTitle} - Image ${index + 2}`}
                                    className="w-32 h-24 object-cover rounded-md cursor-pointer shadow-md"
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <Footer/>
        </div>
    );
};

export default Project;