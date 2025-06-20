import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectCarousel from './ProjectCarousel';
import { useProjects } from '../../hooks/useProjects';
import { MemoryRouter } from 'react-router-dom';

// Mock the custom hook
jest.mock('../../hooks/useProjects');

// Mock data for testing
const mockProjects = [
  {
    id: '1',
    title: 'Project 1',
    description: 'Description for Project 1',
    category: 'research',
    imageUrl: 'image1.jpg',
  },
  {
    id: '2',
    title: 'Project 2',
    description: 'Description for Project 2',
    category: 'partner',
    imageUrl: 'image2.jpg',
  },
];

describe('ProjectCarousel Component', () => {
  beforeEach(() => {
    (useProjects as jest.Mock).mockReturnValue({
      projects: mockProjects,
      loading: false,
      error: null,
    });
  });

  it('renders loading state', () => {
    (useProjects as jest.Mock).mockReturnValue({
      projects: [],
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <ProjectCarousel />
      </MemoryRouter>
    );
    expect(screen.getByText('Chargement des projets...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const errorMessage = 'Error loading projects';
    (useProjects as jest.Mock).mockReturnValue({
      projects: [],
      loading: false,
      error: errorMessage,
    });

    render(
      <MemoryRouter>
        <ProjectCarousel />
      </MemoryRouter>
    );
    expect(screen.getByText(`Erreur : ${errorMessage}`)).toBeInTheDocument();
  });

  it('renders projects and applies filter', async () => {
    render(
      <MemoryRouter>
        <ProjectCarousel />
      </MemoryRouter>
    );

    // Check if projects are rendered
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();

    // Apply 'research' filter
    fireEvent.click(screen.getByText('Projets Open Source'));
    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument();
      expect(screen.queryByText('Project 2')).not.toBeInTheDocument();
    });

    // Apply 'partner' filter
    fireEvent.click(screen.getByText('Projets Partenaires'));
    await waitFor(() => {
      expect(screen.getByText('Project 2')).toBeInTheDocument();
      expect(screen.queryByText('Project 1')).not.toBeInTheDocument();
    });

    // Reset filter to 'all'
    fireEvent.click(screen.getByText('Tous les Projets'));
    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument();
      expect(screen.getByText('Project 2')).toBeInTheDocument();
    });
  });

  it('shows message when no projects are available in the selected category', () => {
    (useProjects as jest.Mock).mockReturnValue({
      projects: [],
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <ProjectCarousel />
      </MemoryRouter>
    );
    expect(screen.getByText('Aucun projet à afficher dans cette catégorie.')).toBeInTheDocument();
  });
});
