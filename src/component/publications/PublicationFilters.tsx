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
    years,
    types,
    authors,
    search,
}) => (
    <div className="flex flex-wrap gap-4 mb-8">
        <input
            className="bg-gray-800 text-white p-2 rounded w-full md:w-64"
            type="text"
            placeholder="Rechercher par titre ou mot-clé..."
            value={search}
            onChange={e => onSearchChange(e.target.value)}
        />
        <select
            className="bg-gray-800 text-white p-2 rounded"
            value={yearFilter}
            onChange={e => onYearChange(e.target.value)}
        >
            <option value="Tous">Tous les ans</option>
            {years.map(({ value, label, count }) => (
                <option key={value} value={value}>
                    {label} ({count})
                </option>
            ))}
        </select>
        <select
            className="bg-gray-800 text-white p-2 rounded"
            value={typeFilter}
            onChange={e => onTypeChange(e.target.value)}
        >
            <option value="Tous">Tous les types</option>
            {types.map(({ value, label, count }) => (
                <option key={value} value={value}>
                    {label} ({count})
                </option>
            ))}
        </select>
        <select
            className="bg-gray-800 text-white p-2 rounded"
            value={authorFilter}
            onChange={e => onAuthorChange(e.target.value)}
        >
            <option value="Tous">Tous les auteurs</option>
            {authors.map(({ value, label, count }) => (
                <option key={value} value={value}>
                    {label} ({count})
                </option>
            ))}
        </select>
    </div>
);

export default PublicationFilters;
