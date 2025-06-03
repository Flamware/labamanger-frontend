import React from 'react';
import Footer from '../component/Footer.tsx';
import { usePublications } from '../hooks/usePublications.tsx';

const Publications: React.FC = () => {
    const { publications, loading, error } = usePublications();

    return (
        <div className="text-white flex flex-col bg-gray-900 min-h-screen">
            <main className="flex-grow container mx-auto px-4 py-8">
                <form>
                    {loading && <p className="text-gray-300">Chargement...</p>}
                    {error && <p className="text-red-400">{error}</p>}
                    {!loading && publications.length === 0 && (
                        <p className="text-gray-300">Aucune publication n'est disponible pour le moment.</p>
                    )}
                    {publications.map((pub, index) => (
                        <div key={index} className="bg-gray-800 rounded-xl shadow-md p-6 mb-6">
                            <h2 className="text-xl font-semibold mb-2">{pub.title}</h2>
                            <p className="text-gray-400 text-sm mb-2">
                                Type: {pub.publicationType} | Langue: {pub.language}
                            </p>
                            <p className="text-gray-300 mb-2">{pub.abstractText}</p>
                            <p className="text-gray-400 text-sm">
                                Date de publication : {pub.publicationDate}
                            </p>
                            {pub.pdfUrl && (
                                <a
                                    href={pub.pdfUrl}
                                    className="text-blue-400 underline text-sm mt-2 block"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Voir le PDF
                                </a>
                            )}
                            <div className="mt-2">
                                <p className="text-gray-300 font-medium">Auteurs :</p>
                                <ul className="list-disc list-inside text-gray-300 text-sm">
                                    {pub.persons.map((person, idx) => (
                                        <li key={idx}>
                                            {person.name} {person.webPageId}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {pub.keywords.length > 0 && (
                                <div className="mt-2 text-sm text-gray-400">
                                    <span>Mots-clés : </span>
                                    {pub.keywords.join(', ')}
                                </div>
                            )}
                        </div>
                    ))}
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default Publications;