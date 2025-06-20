// PublicationFilters.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PublicationFilters from './PublicationFilters';

// Mock data for testing
const mockFilterOptions = {
  years: [
    { value: '2023', label: '2023', count: 10 },
    { value: '2022', label: '2022', count: 5 },
  ],
  types: [
    { value: 'Article', label: 'Article', count: 8 },
    { value: 'Book', label: 'Book', count: 7 },
  ],
  authors: [
    { value: 'Author 1', label: 'Author 1', count: 5 },
    { value: 'Author 2', label: 'Author 2', count: 3 },
  ],
};

describe('PublicationFilters Component', () => {
  const mockOnYearChange = jest.fn();
  const mockOnTypeChange = jest.fn();
  const mockOnAuthorChange = jest.fn();
  const mockOnSearchChange = jest.fn();
  const mockOnResetFilters = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the filter inputs and reset button', () => {
    render(
      <PublicationFilters
        yearFilter="Tous"
        typeFilter="Tous"
        authorFilter="Tous"
        onYearChange={mockOnYearChange}
        onTypeChange={mockOnTypeChange}
        onAuthorChange={mockOnAuthorChange}
        onSearchChange={mockOnSearchChange}
        onResetFilters={mockOnResetFilters}
        years={mockFilterOptions.years}
        types={mockFilterOptions.types}
        authors={mockFilterOptions.authors}
        search=""
      />
    );

    expect(screen.getByPlaceholderText('Rechercher par titre ou mot-clé...')).toBeInTheDocument();
    expect(screen.getByLabelText('Filtrer par année')).toBeInTheDocument();
    expect(screen.getByLabelText('Filtrer par type')).toBeInTheDocument();
    expect(screen.getByLabelText('Filtrer par auteur')).toBeInTheDocument();
    expect(screen.getByText('Réinitialiser les filtres')).toBeInTheDocument();
  });

  it('calls onSearchChange when the search input changes', () => {
    render(
      <PublicationFilters
        yearFilter="Tous"
        typeFilter="Tous"
        authorFilter="Tous"
        onYearChange={mockOnYearChange}
        onTypeChange={mockOnTypeChange}
        onAuthorChange={mockOnAuthorChange}
        onSearchChange={mockOnSearchChange}
        onResetFilters={mockOnResetFilters}
        years={mockFilterOptions.years}
        types={mockFilterOptions.types}
        authors={mockFilterOptions.authors}
        search=""
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Rechercher par titre ou mot-clé...'), {
      target: { value: 'search term' },
    });

    expect(mockOnSearchChange).toHaveBeenCalledWith('search term');
  });

  it('calls onYearChange when the year filter changes', () => {
    render(
      <PublicationFilters
        yearFilter="Tous"
        typeFilter="Tous"
        authorFilter="Tous"
        onYearChange={mockOnYearChange}
        onTypeChange={mockOnTypeChange}
        onAuthorChange={mockOnAuthorChange}
        onSearchChange={mockOnSearchChange}
        onResetFilters={mockOnResetFilters}
        years={mockFilterOptions.years}
        types={mockFilterOptions.types}
        authors={mockFilterOptions.authors}
        search=""
      />
    );

    fireEvent.change(screen.getByLabelText('Filtrer par année'), {
      target: { value: '2023' },
    });

    expect(mockOnYearChange).toHaveBeenCalledWith('2023');
  });

  it('calls onTypeChange when the type filter changes', () => {
    render(
      <PublicationFilters
        yearFilter="Tous"
        typeFilter="Tous"
        authorFilter="Tous"
        onYearChange={mockOnYearChange}
        onTypeChange={mockOnTypeChange}
        onAuthorChange={mockOnAuthorChange}
        onSearchChange={mockOnSearchChange}
        onResetFilters={mockOnResetFilters}
        years={mockFilterOptions.years}
        types={mockFilterOptions.types}
        authors={mockFilterOptions.authors}
        search=""
      />
    );

    fireEvent.change(screen.getByLabelText('Filtrer par type'), {
      target: { value: 'Article' },
    });

    expect(mockOnTypeChange).toHaveBeenCalledWith('Article');
  });

  it('calls onAuthorChange when the author filter changes', () => {
    render(
      <PublicationFilters
        yearFilter="Tous"
        typeFilter="Tous"
        authorFilter="Tous"
        onYearChange={mockOnYearChange}
        onTypeChange={mockOnTypeChange}
        onAuthorChange={mockOnAuthorChange}
        onSearchChange={mockOnSearchChange}
        onResetFilters={mockOnResetFilters}
        years={mockFilterOptions.years}
        types={mockFilterOptions.types}
        authors={mockFilterOptions.authors}
        search=""
      />
    );

    fireEvent.change(screen.getByLabelText('Filtrer par auteur'), {
      target: { value: 'Author 1' },
    });

    expect(mockOnAuthorChange).toHaveBeenCalledWith('Author 1');
  });

  it('calls onResetFilters when the reset button is clicked', () => {
    render(
      <PublicationFilters
        yearFilter="Tous"
        typeFilter="Tous"
        authorFilter="Tous"
        onYearChange={mockOnYearChange}
        onTypeChange={mockOnTypeChange}
        onAuthorChange={mockOnAuthorChange}
        onSearchChange={mockOnSearchChange}
        onResetFilters={mockOnResetFilters}
        years={mockFilterOptions.years}
        types={mockFilterOptions.types}
        authors={mockFilterOptions.authors}
        search=""
      />
    );

    fireEvent.click(screen.getByText('Réinitialiser les filtres'));

    expect(mockOnResetFilters).toHaveBeenCalled();
  });
});
