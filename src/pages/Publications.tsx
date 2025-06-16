import React from 'react';
import Footer from '../component/Footer';
import { usePublications } from '../hooks/usePublications';
import PublicationPageContent from '../component/publications/PublicationPageContent';

const PublicationsPage: React.FC = () => {
    const { publications, loading, error } = usePublications();

   return (
        <div className="text-white flex flex-col bg-gray-900 min-h-screen">
            <main className="flex-grow container mx-auto px-4 py-8">
                <PublicationPageContent publications={publications} loading={loading} error={error} />
            </main>
            <Footer />
        </div>
    );
};

export default PublicationsPage;
