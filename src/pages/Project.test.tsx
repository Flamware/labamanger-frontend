// Project.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Project from './Project';
import * as reactRouterDom from 'react-router-dom';
import { useProjectDetails } from '../hooks/useProject';

// Mock the custom hook
jest.mock('../hooks/useProject', () => ({
  useProjectDetails: jest.fn(),
}));

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Project Component', () => {
  const mockProject = {
    title: 'Test Project',
    acronym: 'TP',
    description: 'This is a test project',
    logo: 'logo.jpg',
    date: {
      startDate: '2023-01-01',
      endDate: '2023-12-31',
    },
    isDone: false,
    organizations: {
      localOrganization: 'Test Org',
      partners: ['Partner 1', 'Partner 2'],
    },
    participants: ['Participant 1', 'Participant 2'],
    images: ['image1.jpg', 'image2.jpg'],
    links: {
      projectUrl: 'http://testproject.com',
      videoLinks: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
    },
  };

  beforeEach(() => {
    (reactRouterDom.useParams as jest.Mock).mockReturnValue({ projectId: '1' });
  });

  it('renders loading state initially', () => {
    (useProjectDetails as jest.Mock).mockReturnValue({ loading: true, error: null, backendProject: null });
    render(<Project />);
    expect(screen.getByText('Chargement du projet...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useProjectDetails as jest.Mock).mockReturnValue({ loading: false, error: 'Error loading project', backendProject: null });
    render(<Project />);
    expect(screen.getByText('Erreur de chargement')).toBeInTheDocument();
    expect(screen.getByText('Error loading project')).toBeInTheDocument();
  });

  it('renders "Project not found" when no project data is available', () => {
    (useProjectDetails as jest.Mock).mockReturnValue({ loading: false, error: null, backendProject: null });
    render(<Project />);
    expect(screen.getByText('Projet introuvable.')).toBeInTheDocument();
  });

  it('renders project details correctly', () => {
    (useProjectDetails as jest.Mock).mockReturnValue({ loading: false, error: null, backendProject: mockProject });
    render(<Project />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('TP')).toBeInTheDocument();
    expect(screen.getByText('This is a test project')).toBeInTheDocument();
    expect(screen.getByText('Début : 2023-01-01')).toBeInTheDocument();
    expect(screen.getByText('Fin : 2023-12-31')).toBeInTheDocument();
    expect(screen.getByText('En cours')).toBeInTheDocument();
    expect(screen.getByText('Test Org')).toBeInTheDocument();
    expect(screen.getByText('Partner 1, Partner 2')).toBeInTheDocument();
    expect(screen.getByText('Participant 1, Participant 2')).toBeInTheDocument();
  });

  it('renders project images and videos', () => {
    (useProjectDetails as jest.Mock).mockReturnValue({ loading: false, error: null, backendProject: mockProject });
    render(<Project />);

    expect(screen.getByAltText('Test Project Logo')).toBeInTheDocument();
    expect(screen.getByAltText('Test Project')).toBeInTheDocument();
    expect(screen.getByTitle('Vidéo du projet 1')).toBeInTheDocument();
  });
});
