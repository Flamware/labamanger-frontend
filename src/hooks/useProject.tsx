// src/hooks/useProjectDetails.ts
import { useEffect, useState } from 'react';
import {BackendProject} from "../models/projects.tsx";

/**
 * Custom hook to fetch a single project's details from the backend.
 * @param projectId The ID of the project to fetch.
 * @returns An object containing the fetched project, loading status, and any error.
 */
export const useProjectDetails = (projectId: string | undefined) => {
    // State to hold the fetched BackendProject data
    const [backendProject, setBackendProject] = useState<BackendProject | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // If no projectId is provided (e.g., URL is /projects/ instead of /projects/123)
        if (!projectId) {
            setError("No project ID provided.");
            setLoading(false);
            return;
        }

        const fetchDetails = async () => {
            setLoading(true);
            setError(null); // Clear any previous errors

            try {
                // IMPORTANT: Use your actual API endpoint for a single project
                // This assumes your API is at https://localhost:8080/LabManager/api/v4/projects/{id}
                const response = await fetch(`https://localhost:8080/LabManager/api/v4/projects/${projectId}`);

                if (!response.ok) {
                    // Handle specific HTTP error codes
                    if (response.status === 404) {
                        throw new Error(`Project with ID '${projectId}' not found.`);
                    }
                    throw new Error(`Failed to fetch project: HTTP status ${response.status}`);
                }

                const data: BackendProject = await response.json();
                setBackendProject(data);
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