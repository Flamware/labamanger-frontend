// src/hooks/useTeam.ts (No changes needed)
import { useState, useEffect, useCallback } from 'react';

export interface Person {
    id: string;
    fullName: string;
    civilTitle: string;
    Email?: string;
    organizationName: string;
}

export const useTeam = () => {
    const [teamData, setTeamData] = useState<Person[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTeamData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            console.log("Fetching team data from API...");
            const response = await fetch(`https://localhost:8080/LabManager/api/v4/persons/getAllPerson`);

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`API Error: ${response.status} - ${response.statusText}`, errorText);
                throw new Error(`Failed to fetch team data: ${response.statusText || 'Unknown error'}`);
            }

            const dataFetched: Person[] = await response.json();
            console.log("Team data fetched successfully:", dataFetched);
            setTeamData(dataFetched);
        } catch (err) {
            if (err instanceof Error) {
                console.error("Error fetching team data:", err.message);
                setError(err.message);
            } else {
                console.error("An unknown error occurred while fetching team data:", err);
                setError("An unknown error occurred while fetching team data.");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTeamData();
    }, [fetchTeamData]);

    return { teamData, loading, error, refetch: fetchTeamData };
};