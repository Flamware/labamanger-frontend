import { useEffect, useState } from 'react';
import { PublicationsDTO } from '../models/publications.tsx';

export const usePublications = () => {
    const [publications, setPublications] = useState<PublicationsDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await fetch('https://localhost:8080/LabManager/api/v4/publications/all');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data: PublicationsDTO[] = await response.json();
                setPublications(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchPublications();
    }, []);
      return { publications, loading, error };
};