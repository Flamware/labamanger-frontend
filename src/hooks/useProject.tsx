// src/hooks/useProjectDetails.ts

import { useEffect, useState } from 'react';
import {BackendProject} from "../models/projects";

// Define the base URL for your image API
const IMAGE_API_BASE_URL = 'https://localhost:8080/LabManager/api/v4/images/';

/**
 * Custom hook to fetch a single project's details from the backend,
 * and transform image paths into full URLs.
 * @param projectId The ID of the project to fetch.
 * @returns An object containing the fetched project, loading status, and any error.
 */
export const useProjectDetails = (projectId: string | undefined) => {
    // State to hold the fetched BackendProject data
    const [backendProject, setBackendProject] = useState<BackendProject | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!projectId) {
            setError("No project ID provided.");
            setLoading(false);
            return;
        }

        const fetchDetails = async () => {
            setLoading(true);
            setError(null); // Clear any previous errors

            try {
                // Fetch the project data
                const response = await fetch(`https://localhost:8080/LabManager/api/v4/projects?id=${projectId}`,{});

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error(`Project with ID '${projectId}' not found.`);
                    }
                    throw new Error(`Failed to fetch project: HTTP status ${response.status}`);
                }

                const data: BackendProject = await response.json();

                // --- Image URL Transformation ---
                // Transform image filenames/paths into full URLs
                const transformedImages = data.images.map(imageName => IMAGE_API_BASE_URL + imageName);
                const transformedLogo = data.logo ? IMAGE_API_BASE_URL + data.logo : null;

                // Create a new BackendProject object with the transformed URLs
                const transformedProject: BackendProject = {
                    ...data, // Keep all other properties
                    images: transformedImages, // Override with full image URLs
                    logo: transformedLogo // Override logo with full URL or null
                };

                setBackendProject(transformedProject);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred while fetching project details.");
                }
                console.error("Error in useProjectDetails:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [projectId]); // Dependency array: re-run effect if projectId changes

    return { backendProject, loading, error };
};