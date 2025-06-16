import React from 'react';
import ConferenceList from "../component/Conference/ConferenceList";
import { useConferences } from '../hooks/useConferences'; // Import the hook
import Footer from '../component/Footer'; // Assuming Footer component exists

/**
 * The Conferences page component.
 * It fetches conference data using the useConferences hook and displays it
 * with a dark theme layout.
 */
const Conferences: React.FC = () => {
  // Use the custom hook to get data and component state
  const { data, isLoading, error } = useConferences();

  // Main container with dark theme and flex column layout
  return (
      <div className="text-white flex flex-col bg-gray-900 min-h-screen">
        <main className="flex-grow container mx-auto px-4 py-8">
          {/* Conditional rendering based on fetch state */}
          {isLoading && <p className="text-center text-xl">Chargement des conférences...</p>}
          {error && <p className="text-center text-xl text-red-400">Erreur : {error}</p>}
          {data && (
              <div>
                <h1 className="text-4xl font-bold mb-4 text-center text-lime-400">Conférences, Séminaires et Événements</h1>
                <h2 className="text-2xl font-semibold mb-8 text-center text-gray-300">Conférences et Ateliers en lien avec le CIAD</h2>
                <ConferenceList conferences={data} />
              </div>
          )}
        </main>
        <Footer />
      </div>
  );
};

export default Conferences;
