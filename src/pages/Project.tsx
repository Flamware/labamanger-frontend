import React from 'react';
import { useParams } from 'react-router-dom';
import logo from "../assets/uploads/2021/08/LOGOS-CIAD-SEUL-FOND-NOIR-500-px.png";
import Footer from "../component/Footer.tsx";
import {useProjectDetails} from "../hooks/useProject.tsx";

// Import your custom hook

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
        // This case implies no error but also no project was found/set (e.g., if API returned null for non-404)
        return (
            <div className="text-white flex flex-col items-center justify-center min-h-screen bg-gray-900">
                <p>Project not found or data is empty.</p>
            </div>
        );
    }

    // --- Data is loaded and available, proceed with rendering ---
    const displayTitle = backendProject.title;
    const displayDescription = backendProject.description || 'No description available.';
    const displayImageUrl = backendProject.images && backendProject.images.length > 0
        ? backendProject.images[0] // Use the first image as the main image
        : logo; // Fallback to your default logo if no images are provided
    const displayVideoUrls = backendProject.links?.videoLinks || [];
    const displayStartDate = backendProject.date?.startDate;
    const displayEndDate = backendProject.date?.endDate;
    const displayPartners = backendProject.organizations?.partners || [];
    const displayProjectUrl = backendProject.links?.projectUrl;

    return (
        <div className="text-white flex flex-col bg-gray-900 min-h-screen">
            <header className="py-8 px-4 text-center">
                <img src={logo} alt="Company Logo" className="mx-auto h-20 mb-4" />
                <h1 className="text-5xl font-bold">{displayTitle}</h1>
                <p className="text-gray-400 mt-2">{backendProject.acronym}</p>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Project Image */}
                    <div className="md:w-1/2">
                        <img
                            src={displayImageUrl}
                            alt={displayTitle}
                            className="w-full h-auto object-cover rounded-lg shadow-lg mb-4"
                        />
                        {/* Display additional images if available */}
                        {backendProject.images && backendProject.images.length > 1 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {backendProject.images.slice(1).map((imgUrl, index) => (
                                    <img
                                        key={index}
                                        src={imgUrl}
                                        alt={`${displayTitle} - Image ${index + 2}`}
                                        className="w-24 h-auto object-cover rounded-md cursor-pointer"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Project Details */}
                    <div className="md:w-1/2 flex flex-col justify-center">
                        <h2 className="text-3xl font-semibold mb-4">Project Overview</h2>
                        <p className="text-lg leading-relaxed text-gray-300 mb-4">
                            {displayDescription}
                        </p>

                        <div className="space-y-2 text-gray-300">
                            {displayStartDate && displayEndDate && (
                                <p><strong>Dates:</strong> {displayStartDate} to {displayEndDate}</p>
                            )}
                            {backendProject.organizations.localOrganization && (
                                <p><strong>Lead Org:</strong> {backendProject.organizations.localOrganization}</p>
                            )}
                            {displayPartners.length > 0 && (
                                <p><strong>Partners:</strong> {displayPartners.join(', ')}</p>
                            )}
                            {backendProject.participants.length > 0 && (
                                <p><strong>Participants:</strong> {backendProject.participants.join(', ')}</p>
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

                        {displayVideoUrls.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-2xl font-semibold mb-3">Videos</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {displayVideoUrls.map((videoUrl, index) => (
                                        <div key={index} className="aspect-w-16 aspect-h-9">
                                            <iframe
                                                src={videoUrl.includes('youtube.com') ? videoUrl.replace('watch?v=', 'embed/') : videoUrl}
                                                title={`Project Video ${index + 1}`}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="w-full h-full rounded-lg"
                                            ></iframe>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Project;