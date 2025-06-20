// usePerson.tsx
import { useState, useEffect } from 'react';
import { ProfileData } from './component/model/PersonData'; // Adjust the path as per your project structure

interface UsePersonHook {
    profileData: ProfileData | null;
    loading: boolean;
    error: Error | null;
}

const usePerson = (personId: string | undefined): UsePersonHook => {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!personId) {
                setLoading(false);
                setError(new Error('Person ID is undefined.'));
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(`https://localhost:8080/LabManager/api/v4/persons/card?id=${personId}`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                setProfileData(data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err instanceof Error ? err : new Error('An unknown error occurred'));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [personId]);

    return { profileData, loading, error };
};

export default usePerson;