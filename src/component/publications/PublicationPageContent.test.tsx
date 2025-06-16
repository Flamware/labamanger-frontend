// PublicationPageContent.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PublicationPageContent from './PublicationPageContent';

// Mock child components
jest.mock('./PublicationFilters', () => ({
  yearFilter,
  typeFilter,
  authorFilter,
  onYearChange,
  onTypeChange,
  onAuthorChange,
  onSearchChange,
  onResetFilters,
  search,
  years,
  types,
  authors,
}: {
  yearFilter: string;
  typeFilter: string;
  authorFilter: string;
  onYearChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onAuthorChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onResetFilters: () => void;
  search: string;
  years: { value: string; label: string }[];
  types: { value: string; label: string }[];
  authors: { value: string; label: string }[];
}) => (
  <div>
    <input
      data-testid="search-input"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search publications"
    />
    <select
      data-testid="year-filter"
      value={yearFilter}
      onChange={(e) => onYearChange(e.target.value)}
      aria-label="Year Filter"
    >
      <option value="Tous">Tous</option>
      {years.map((year) => (
        <option key={year.value} value={year.value}>
          {year.label}
        </option>
      ))}
    </select>
    <select
      data-testid="type-filter"
      value={typeFilter}
      onChange={(e) => onTypeChange(e.target.value)}
      aria-label="Type Filter"
    >
      <option value="Tous">Tous</option>
      {types.map((type) => (
        <option key={type.value} value={type.value}>
          {type.label}
        </option>
      ))}
    </select>
    <select
      data-testid="author-filter"
      value={authorFilter}
      onChange={(e) => onAuthorChange(e.target.value)}
      aria-label="Author Filter"
    >
      <option value="Tous">Tous</option>
      {authors.map((author) => (
        <option key={author.value} value={author.value}>
          {author.label}
        </option>
      ))}
    </select>
    <button onClick={onResetFilters}>Reset Filters</button>
  </div>
));

jest.mock('./PublicationList', () => (
  {
    publications,
    expandedIndex,
    toggleExpand,
  }: {
    publications: Array<{ id: number; title: string }>;
    expandedIndex: number;
    toggleExpand: (index: number) => void;
  }
) => (
  <div>
    {publications.map((pub, index) => (
      <div key={pub.id} data-testid={`publication-${index}`} onClick={() => toggleExpand(index)}>
        {pub.title}
      </div>
    ))}
  </div>
));

describe('PublicationPageContent Component', () => {
  const mockPublications = [
    {
      id: 1,
      title: 'Publication 1',
      publicationDate: '2023-01-01',
      publicationType: 'Article',
      persons: [{ name: 'Author 1', id: 1 }],
      keywords: ['keyword1', 'keyword2'],
      doi: '10.1000/xyz123',
      issn: '1234-5678',
      abstractText: 'Abstract for publication 1',
      extraUrl: 'https://example.com/pub1',
      publisher: 'Publisher 1',
      volume: '1',
      issue: '1',
      pages: '1-10',
      dblpUrl: 'https://dblp.org/rec/pub1',
      pdfUrl: 'https://example.com/pub1.pdf',
      awardCertificate: '',
      language: 'en',
    },
    {
      id: 2,
      title: 'Publication 2',
      publicationDate: '2022-01-01',
      publicationType: 'Book',
      persons: [{ name: 'Author 2', id: 2 }],
      keywords: ['keyword3', 'keyword4'],
      doi: '10.1000/xyz456',
      issn: '8765-4321',
      abstractText: 'Abstract for publication 2',
      extraUrl: 'https://example.com/pub2',
      publisher: 'Publisher 2',
      volume: '2',
      issue: '2',
      pages: '11-20',
      dblpUrl: 'https://dblp.org/rec/pub2',
      pdfUrl: 'https://example.com/pub2.pdf',
      awardCertificate: '',
      language: 'en',
    },
  ];

  it('renders loading state', () => {
    render(<PublicationPageContent publications={[]} loading={true} error="" />);
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(<PublicationPageContent publications={[]} loading={false} error="Error loading publications" />);
    expect(screen.getByText('Error loading publications')).toBeInTheDocument();
  });

  it('renders filtered publications', () => {
    render(<PublicationPageContent publications={mockPublications} loading={false} error="" />);
    expect(screen.getByText('Publication 1')).toBeInTheDocument();
    expect(screen.getByText('Publication 2')).toBeInTheDocument();
  });

  it('filters publications by year', () => {
    render(<PublicationPageContent publications={mockPublications} loading={false} error="" />);
    fireEvent.change(screen.getByTestId('year-filter'), { target: { value: '2023' } });
    expect(screen.getByText('Publication 1')).toBeInTheDocument();
    expect(screen.queryByText('Publication 2')).not.toBeInTheDocument();
  });

  it('filters publications by type', () => {
    render(<PublicationPageContent publications={mockPublications} loading={false} error="" />);
    fireEvent.change(screen.getByTestId('type-filter'), { target: { value: 'Article' } });
    expect(screen.getByText('Publication 1')).toBeInTheDocument();
    expect(screen.queryByText('Publication 2')).not.toBeInTheDocument();
  });

  it('filters publications by author', () => {
    render(<PublicationPageContent publications={mockPublications} loading={false} error="" />);
    fireEvent.change(screen.getByTestId('author-filter'), { target: { value: 'Author 1' } });
    expect(screen.getByText('Publication 1')).toBeInTheDocument();
    expect(screen.queryByText('Publication 2')).not.toBeInTheDocument();
  });

  it('filters publications by search term', () => {
    render(<PublicationPageContent publications={mockPublications} loading={false} error="" />);
    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'Publication 1' } });
    expect(screen.getByText('Publication 1')).toBeInTheDocument();
    expect(screen.queryByText('Publication 2')).not.toBeInTheDocument();
  });

  it('resets filters', () => {
    render(<PublicationPageContent publications={mockPublications} loading={false} error="" />);
    fireEvent.change(screen.getByTestId('year-filter'), { target: { value: '2023' } });
    fireEvent.click(screen.getByText('Reset Filters'));
    expect(screen.getByText('Publication 1')).toBeInTheDocument();
    expect(screen.getByText('Publication 2')).toBeInTheDocument();
  });
});
