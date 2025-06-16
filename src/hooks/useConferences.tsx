import { useState, useEffect } from 'react';
import { ConferenceData } from '../component/model/ConferenceData';

/**
 * Custom hook to fetch conference data.
 *
 * @returns An object containing the fetched data, a loading state, and any error message.
 */
export const useConferences = () => {
    const [data, setData] = useState<ConferenceData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Defines an async function inside the effect to fetch data
        const fetchData = async () => {
            // Set loading to true and reset previous errors
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://localhost:8080/LabManager/api/v4/conferences/conferenceWithYear`);

                // Check if the network response is successful
                if (!response.ok) {
                    throw new Error(`Failed to fetch projects data: ${response.statusText}`);
                }

                // Parse the JSON data from the response
                const dataFetched: ConferenceData[] = await response.json();
                setData(dataFetched);
            } catch (err) {
                // Handle any errors during the fetch operation
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(String(err));
                }
            } finally {
                // Set loading to false once the fetch is complete (either success or fail)
                setIsLoading(false);
            }
        };

        fetchData();
    }, []); // The empty dependency array ensures this effect runs only once on mount

    // Return the state variables for the component to use
    return { data, isLoading, error };
};
