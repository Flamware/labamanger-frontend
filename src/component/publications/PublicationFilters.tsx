import React from 'react';

interface FilterOption {
    value: string;
    label: string;
    count: number;
}

interface Props {
    yearFilter: string;
    typeFilter: string;
    authorFilter: string;
    onYearChange: (value: string) => void;
    onTypeChange: (value: string) => void;
    onAuthorChange: (value: string) => void;
    onSearchChange: (value: string) => void;
    onResetFilters: () => void;
    years: FilterOption[];
    types: FilterOption[];
    authors: FilterOption[];
    search: string;
}

const PublicationFilters: React.FC<Props> = ({
    yearFilter,
    typeFilter,
    authorFilter,
    onYearChange,
    onTypeChange,
    onAuthorChange,
    onSearchChange,
    onResetFilters,
    years,
    types,
    authors,
    search,
}) => (
    <div className="flex flex-wrap gap-4 mb-8 items-center">
        <input
            className="bg-gray-800 text-white p-2 rounded w-full md:w-64"
            type="text"
            placeholder="Rechercher par titre ou mot-clé..."
            value={search}
            onChange={e => onSearchChange(e.target.value)}
        />
        <label htmlFor="year-filter" className="sr-only">Filtrer par année</label>
        <select
            id="year-filter"
            className="bg-gray-800 text-white p-2 rounded"
            value={yearFilter}
            onChange={e => onYearChange(e.target.value)}
            aria-label="Filtrer par année"
        >
            <option value="Tous">Tous les ans</option>
            {years.map(({ value, label, count }) => (
                <option key={value} value={value}>
                    {label} ({count})
                </option>
            ))}
        </select>
        <label htmlFor="type-filter" className="sr-only">Filtrer par type</label>
        <select
            id="type-filter"
            className="bg-gray-800 text-white p-2 rounded"
            value={typeFilter}
            onChange={e => onTypeChange(e.target.value)}
            aria-label="Filtrer par type"
        >
            <option value="Tous">Tous les types</option>
            {types.map(({ value, label, count }) => (
                <option key={value} value={value}>
                    {label} ({count})
                </option>
            ))}
        </select>
        <label htmlFor="author-filter" className="sr-only">Filtrer par auteur</label>
        <select
            id="author-filter"
            className="bg-gray-800 text-white p-2 rounded"
            value={authorFilter}
            onChange={e => onAuthorChange(e.target.value)}
            aria-label="Filtrer par auteur"
        >
            <option value="Tous">Tous les auteurs</option>
            {authors.map(({ value, label, count }) => (
                <option key={value} value={value}>
                    {label} ({count})
                </option>
            ))}
        </select>

        <button
            onClick={onResetFilters}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
        >
            Réinitialiser les filtres
        </button>
    </div>
);  

export default PublicationFilters;
