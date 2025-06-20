import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectCarousel from './HomeProjectCarousel';

const mockProjects = [
  { id: 1, title: 'Projet Alpha' },
  { id: 2, title: 'Projet Beta' },
  { id: 3, title: 'Projet Gamma' },
  { id: 4, title: 'Projet Delta' },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockProjects),
  })
) as jest.Mock;

describe('ProjectCarousel Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the heading', async () => {
    render(<ProjectCarousel />);
    expect(screen.getByText('Nos projets')).toBeInTheDocument();
  });

  it('fetches and displays project titles', async () => {
    render(<ProjectCarousel />);
    for (const project of mockProjects) {
      await waitFor(() => {
        expect(screen.getAllByText(project.title)[0]).toBeInTheDocument();
      });
    }
  });

  it('renders project links with correct href', async () => {
    render(<ProjectCarousel />);
    // Wait for at least one correct link to appear
    await waitFor(() => {
      const links = screen.getAllByRole('link', { name: `Voir la page du projet ${mockProjects[0].title}` });
      expect(links.length).toBeGreaterThan(0);
      expect(links.some(link => link.getAttribute('href') === `/project/${encodeURIComponent(mockProjects[0].title)}`)).toBe(true);
    });
  });
  it('renders at least one project logo image', async () => {
    render(<ProjectCarousel />);
    await waitFor(() => {
      expect(screen.getAllByAltText(/Logo projet/).length).toBeGreaterThan(0);
    });
  });

  it('renders custom arrow buttons', async () => {
    render(<ProjectCarousel />);
    expect(screen.getAllByText('❮').length).toBeGreaterThan(0);
    expect(screen.getAllByText('❯').length).toBeGreaterThan(0);
  });

  it('renders carousel dots', async () => {
    render(<ProjectCarousel />);
    await waitFor(() => {
      const dots = screen.getAllByRole('listitem');
      expect(dots.length).toBeGreaterThan(0);
    });
  });

  it('shows error message if fetch fails', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false })
    );
    render(<ProjectCarousel />);
    await waitFor(() => {
      expect(screen.getByText('Aucun projet trouvé')).toBeInTheDocument();
    });
  });
});
