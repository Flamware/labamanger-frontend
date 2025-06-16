// Team.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Team from './Team';
import { useTeam } from '../hooks/useTeam';

// Mock the custom hook
jest.mock('../hooks/useTeam');

const mockTeamData = [
  {
    id: 1,
    fullName: 'John Doe',
    civilTitle: 'Dr.',
    Email: 'john.doe@example.com',
    organizationName: 'Organization A',
  },
  {
    id: 2,
    fullName: 'Jane Smith',
    civilTitle: 'Prof.',
    Email: 'jane.smith@example.com',
    organizationName: 'Organization B',
  },
  // Add more mock data as needed
];

describe('Team Component', () => {
  beforeEach(() => {
    (useTeam as jest.Mock).mockReturnValue({
      teamData: mockTeamData,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });
  });

  it('renders loading state', () => {
    (useTeam as jest.Mock).mockReturnValue({
      teamData: [],
      loading: true,
      error: null,
      refetch: jest.fn(),
    });

    render(<Team />);
    expect(screen.getByText('Chargement des données de l\'équipe...')).toBeInTheDocument();
  });

  it('renders error state and allows retry', () => {
    const refetchMock = jest.fn();
    (useTeam as jest.Mock).mockReturnValue({
      teamData: [],
      loading: false,
      error: 'Error loading data',
      refetch: refetchMock,
    });

    render(<Team />);
    expect(screen.getByText('Erreur de chargement des données:')).toBeInTheDocument();
    expect(screen.getByText('Error loading data')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Réessayer'));
    expect(refetchMock).toHaveBeenCalled();
  });

  it('renders team data and handles search', async () => {
    render(<Team />);

    // Check if team data is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    // Simulate search
    fireEvent.change(screen.getByPlaceholderText('Rechercher par nom, titre, email, organisation...'), {
      target: { value: 'John' },
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });
  });

  it('handles pagination', async () => {
    // Mock more data for pagination test
    const largeMockTeamData = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      fullName: `Member ${i + 1}`,
      civilTitle: `Title ${i + 1}`,
      Email: `member${i + 1}@example.com`,
      organizationName: `Org ${i + 1}`,
    }));

    (useTeam as jest.Mock).mockReturnValue({
      teamData: largeMockTeamData,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<Team />);

    // Check if pagination controls are rendered
    expect(screen.getByText('Affichage de 1 à 10 sur 25 éléments.')).toBeInTheDocument();

    // Go to next page
    fireEvent.click(screen.getByLabelText('Suivant'));

    await waitFor(() => {
      expect(screen.getByText('Affichage de 11 à 20 sur 25 éléments.')).toBeInTheDocument();
    });
  });
});
