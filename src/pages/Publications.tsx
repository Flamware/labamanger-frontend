import React, { useState, useMemo } from 'react';
import Footer from '../component/Footer.tsx';
import { usePublications } from '../hooks/usePublications.tsx';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';
import { SiDblp } from 'react-icons/si';

const Publications: React.FC = () => {
    const { publications, loading, error } = usePublications();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    // Filter states
    const [yearFilter, setYearFilter] = useState<string>('Tous');
    const [typeFilter, setTypeFilter] = useState<string>('Tous');
    const [authorFilter, setAuthorFilter] = useState<string>('Tous');

    const toggleExpand = (index: number) => {
        setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
    };

    // Extract unique filter values
    const filterOptions = useMemo(() => {
    const yearCount: Record<string, number> = {};
    const typeCount: Record<string, number> = {};
    const authorCount: Record<string, number> = {};

    // Helper to filter based on selected filters *except* the current one
    publications.forEach(pub => {
        const year = new Date(pub.publicationDate).getFullYear().toString();
        const type = pub.publicationType;
        const authorNames = pub.persons.map(p => p.name);

        // === Year counts (respecting type + author filters)
        const matchType = typeFilter === 'Tous' || pub.publicationType === typeFilter;
        const matchAuthor = authorFilter === 'Tous' || authorNames.includes(authorFilter);
        if (matchType && matchAuthor) {
            yearCount[year] = (yearCount[year] || 0) + 1;
        }

        // === Type counts (respecting year + author filters)
        const matchYear = yearFilter === 'Tous' || year === yearFilter;
        if (matchYear && matchAuthor) {
            typeCount[type] = (typeCount[type] || 0) + 1;
        }

        // === Author counts (respecting year + type filters)
        if (matchYear && matchType) {
            authorNames.forEach(name => {
                authorCount[name] = (authorCount[name] || 0) + 1;
            });
        }
    });

        return {
            years: Object.entries(yearCount).sort(([a], [b]) => parseInt(a) - parseInt(b)),
            types: Object.entries(typeCount).sort(),
            authors: Object.entries(authorCount).sort(),
        };
    }, [publications, yearFilter, typeFilter, authorFilter]);



    // Apply filters
    const filteredPublications = useMemo(() => {
        return publications.filter(pub => {
            const year = new Date(pub.publicationDate).getFullYear().toString();
            const authorNames = pub.persons.map(p => p.name);

            const matchYear = yearFilter === 'Tous' || year === yearFilter;
            const matchType = typeFilter === 'Tous' || pub.publicationType === typeFilter;
            const matchAuthor = authorFilter === 'Tous' || authorNames.includes(authorFilter);

            return matchYear && matchType && matchAuthor;
        });
    }, [publications, yearFilter, typeFilter, authorFilter]);

    // TODO modify the pulications look (justifier le paragraph, ...)

    return (
        <div className="text-white flex flex-col bg-gray-900 min-h-screen">
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex flex-wrap gap-4 mb-8">
                    <select
                        className="bg-gray-800 text-white p-2 rounded"
                        value={yearFilter}
                        onChange={e => setYearFilter(e.target.value)}
                    >
                        <option value="Tous">Tous les ans</option>
                        {filterOptions.years.map(([year, count]) => (
                            <option key={year} value={year}>
                                {year} ({count})
                            </option>
                        ))}
                    </select>


                    <select
                        className="bg-gray-800 text-white p-2 rounded"
                        value={typeFilter}
                        onChange={e => setTypeFilter(e.target.value)}
                    >
                        <option value="Tous">Tous les types</option>
                        {filterOptions.types.map(([type, count]) => (
                            <option key={type} value={type}>
                                {type} ({count})
                            </option>
                        ))}
                    </select>


                    <select
                        className="bg-gray-800 text-white p-2 rounded"
                        value={authorFilter}
                        onChange={e => setAuthorFilter(e.target.value)}
                    >
                        <option value="Tous">Tous les auteurs</option>
                        {filterOptions.authors.map(([author, count]) => (
                            <option key={author} value={author}>
                                {author} ({count})
                            </option>
                        ))}
                    </select>
                </div>

                {loading && <p className="text-gray-300">Chargement...</p>}
                {error && <p className="text-red-400">{error}</p>}
                {!loading && filteredPublications.length === 0 && (
                    <p className="text-gray-300">Aucune publication ne correspond aux filtres sélectionnés.</p>
                )}

                {filteredPublications.map((pub, index) => {
                    const isExpanded = expandedIndex === index;

                    return (
                        <div
                            key={index}
                            className="bg-gray-800 rounded-xl shadow-md p-6 mb-6 cursor-pointer"
                            onClick={() => toggleExpand(index)}
                        >
                            <h2 className="text-xl font-semibold mb-2">{pub.title}</h2>
                            <p className="text-gray-400 text-sm mb-2">ISSN : {pub.issn}</p>
                            <div className="text-gray-300 text-sm">
                                {pub.persons.map(p => p.name).join(', ')}
                            </div>

                            {isExpanded && (
                                <>
                                    <p className="text-gray-400 text-sm mt-2">
                                        Type : {pub.publicationType} | Langue : {pub.language}
                                    </p>
                                    <p className="text-gray-300 mt-2">{pub.abstractText}</p>
                                    <p className="text-gray-400 text-sm mt-2">
                                        Date de publication : {pub.publicationDate}
                                    </p>

                                    <div className="flex items-center space-x-4 mt-3 text-xl text-blue-400">
                                        {pub.pdfUrl && (
                                            <a
                                                href={pub.pdfUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Télécharger le PDF"
                                            >
                                                <AiOutlineFilePdf />
                                            </a>
                                        )}
                                        {pub.extraUrl && (
                                            <a
                                                href={pub.extraUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Lien supplémentaire"
                                            >
                                                <FiExternalLink />
                                            </a>
                                        )}
                                        {pub.dblpUrl && (
                                            <a
                                                href={pub.dblpUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Voir sur DBLP"
                                            >
                                                <SiDblp />
                                            </a>
                                        )}
                                    </div>

                                    {pub.awardCertificate && (
                                        <div className="text-yellow-400 text-sm mt-2">
                                            🏆 Certificat de récompense disponible
                                        </div>
                                    )}

                                    {pub.keywords.length > 0 && (
                                        <div className="mt-2 text-sm text-gray-400">
                                            <span>Mots-clés : </span>
                                            {pub.keywords.join(', ')}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    );
                })}
            </main>
            <Footer />
        </div>
    );
};

export default Publications;
