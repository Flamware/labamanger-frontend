import { useEffect, useState } from 'react';
import {BackendProject} from "../models/projects";

export interface Project {
    id: number; // You might need to generate this on the frontend or have it in the backend response
    title: string;
    description: string;
    imageUrl: string; // Where does this come from in your backend data?
    category: 'all' | 'partner' | 'research'; // How do you determine this from your backend data?
}

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('https://localhost:8080/LabManager/api/v4/projects/all',{});
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const backendData: BackendProject[] = await response.json();

                const mappedProjects = backendData.map((backendProject): Project => {
                    let category: Project['category'] = 'all'; // Explicitly type the category

                    // Example logic (adapt based on your backend data):
                    if (backendProject.openSource) {
                        category = 'partner';
                    }  {
                        category = 'research';
                    }

                    return {
                        id: backendProject.id,
                        title: backendProject.title,
                        description: backendProject.description || '',
                        imageUrl: backendProject.logo || '',
                        category: category,
                    };
                });

                setProjects(mappedProjects);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return { projects, loading, error };
};