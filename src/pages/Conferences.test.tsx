// Conferences.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Conferences from './Conferences';
import { useConferences } from '../hooks/useConferences';

// Mock the custom hook
jest.mock('../hooks/useConferences');
const mockedUseConferences = useConferences as jest.Mock;

describe('Conferences Component', () => {
  it('renders loading state', () => {
    mockedUseConferences.mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    render(<Conferences />);

    expect(screen.getByText('Chargement des conférences...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockedUseConferences.mockReturnValue({
      isLoading: false,
      error: 'Failed to fetch',
      data: null,
    });

    render(<Conferences />);

    expect(screen.getByText(/Erreur : Failed to fetch/)).toBeInTheDocument();
  });

  it('renders data state', () => {
    const mockData = [
      { id: 1, title: 'Conference 1', year: [2022] },
      { id: 2, title: 'Conference 2', year: [2021, 2023] },
    ];
    mockedUseConferences.mockReturnValue({
      isLoading: false,
      error: null,
      data: mockData,
    });

    render(<Conferences />);

    expect(screen.getByText('Conférences, Séminaires et Événements')).toBeInTheDocument();
    expect(screen.getByText('Conference 1')).toBeInTheDocument();
    expect(screen.getByText('Conference 2')).toBeInTheDocument();
  });
});
