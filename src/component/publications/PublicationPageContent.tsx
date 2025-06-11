import React, { useState, useMemo } from 'react';
import PublicationFilters from './PublicationFilters';
import PublicationList from './PublicationList';

import { PublicationsDTO } from '../../models/publications';

type Props = {
    publications: PublicationsDTO[];
    loading: boolean;
    error: string;
};

const PublicationPageContent: React.FC<Props> = ({ publications, loading, error }) => {
    const [yearFilter, setYearFilter] = useState('Tous');
    const [typeFilter, setTypeFilter] = useState('Tous');
    const [authorFilter, setAuthorFilter] = useState('Tous');
    const [search, setSearch] = useState('');
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(prev => (prev === index ? null : index));
    };

    const resetFilters = () => {
        setYearFilter('Tous');
        setTypeFilter('Tous');
        setAuthorFilter('Tous');
        setSearch('');
    };

    const filteredPublications = useMemo(() => {
        return publications.filter(pub => {
            const year = new Date(pub.publicationDate).getFullYear().toString();
            const authorNames = pub.persons.map(p => p.name);
            const matchYear = yearFilter === 'Tous' || year === yearFilter;
            const matchType = typeFilter === 'Tous' || pub.publicationType === typeFilter;
            const matchAuthor = authorFilter === 'Tous' || authorNames.includes(authorFilter);
            const matchSearch =
                search === '' ||
                pub.title.toLowerCase().includes(search.toLowerCase()) ||
                pub.keywords.some(k => k.toLowerCase().includes(search.toLowerCase()));
            return matchYear && matchType && matchAuthor && matchSearch;
        });
    }, [publications, yearFilter, typeFilter, authorFilter, search]);

    const filterOptions = useMemo(() => {
        const yearCount: Record<string, number> = {};
        const typeCount: Record<string, number> = {};
        const authorCount: Record<string, number> = {};

        publications.forEach(pub => {
            const year = new Date(pub.publicationDate).getFullYear().toString();
            const type = pub.publicationType;
            const authorNames = pub.persons.map(p => p.name);

            const matchSearch =
                search === '' ||
                pub.title.toLowerCase().includes(search.toLowerCase()) ||
                pub.keywords.some(k => k.toLowerCase().includes(search.toLowerCase()));
            const matchYear = yearFilter === 'Tous' || year === yearFilter;
            const matchType = typeFilter === 'Tous' || type === typeFilter;
            const matchAuthor = authorFilter === 'Tous' || authorNames.includes(authorFilter);

            if (matchType && matchAuthor && matchSearch) yearCount[year] = (yearCount[year] || 0) + 1;
            if (matchYear && matchAuthor && matchSearch) typeCount[type] = (typeCount[type] || 0) + 1;
            if (matchYear && matchType && matchSearch)
                authorNames.forEach(name => {
                    authorCount[name] = (authorCount[name] || 0) + 1;
                });
        });

        const toFilterArray = (obj: Record<string, number>) =>
            Object.entries(obj).map(([value, count]) => ({ value, label: value, count }));

        return {
            years: toFilterArray(yearCount).sort((a, b) => parseInt(b.value) - parseInt(a.value)),
            types: toFilterArray(typeCount).sort((a, b) => a.label.localeCompare(b.label)),
            authors: toFilterArray(authorCount).sort((a, b) => a.label.localeCompare(b.label)),
        };
    }, [publications, yearFilter, typeFilter, authorFilter, search]);

    return (
        <>
            <PublicationFilters
                yearFilter={yearFilter}
                typeFilter={typeFilter}
                authorFilter={authorFilter}
                onYearChange={setYearFilter}
                onTypeChange={setTypeFilter}
                onAuthorChange={setAuthorFilter}
                onSearchChange={setSearch}
                onResetFilters={resetFilters}
                search={search}
                years={filterOptions.years}
                types={filterOptions.types}
                authors={filterOptions.authors}
            />

            {loading && <p className="text-gray-300">Chargement...</p>}
            {error && <p className="text-red-400">{error}</p>}
            {!loading && filteredPublications.length === 0 && (
                <p className="text-gray-300">Aucune publication ne correspond aux filtres sélectionnés.</p>
            )}

            <PublicationList
                publications={filteredPublications}
                expandedIndex={expandedIndex}
                toggleExpand={toggleExpand}
            />
        </>
    );
};

export default PublicationPageContent;