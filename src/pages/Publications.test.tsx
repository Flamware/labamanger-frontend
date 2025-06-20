// PublicationsPage.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PublicationsPage from './Publications';
import { usePublications } from '../hooks/usePublications';

// Mock the custom hook
jest.mock('../hooks/usePublications');

// Mock child components
jest.mock('../component/publications/PublicationPageContent', () => (
  ({ publications, loading, error }: { publications: any; loading: boolean; error: any }) => (
    <div>
      {loading && <div data-testid="loading">Loading...</div>}
      {error && <div data-testid="error">{error}</div>}
      {publications && <div data-testid="publications">{publications.length} publications</div>}
    </div>
  )
));

jest.mock('../component/Footer', () => () => <div data-testid="footer"></div>);

describe('PublicationsPage Component', () => {
  it('renders loading state', () => {
    (usePublications as jest.Mock).mockReturnValue({ publications: null, loading: true, error: null });
    render(<PublicationsPage />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const errorMessage = 'Error loading publications';
    (usePublications as jest.Mock).mockReturnValue({ publications: null, loading: false, error: errorMessage });
    render(<PublicationsPage />);
    expect(screen.getByTestId('error')).toHaveTextContent(errorMessage);
  });

  it('renders publications data', () => {
    const mockPublications = [{ id: 1, title: 'Publication 1' }, { id: 2, title: 'Publication 2' }];
    (usePublications as jest.Mock).mockReturnValue({ publications: mockPublications, loading: false, error: null });
    render(<PublicationsPage />);
    expect(screen.getByTestId('publications')).toHaveTextContent(`${mockPublications.length} publications`);
  });

  it('renders the Footer component', () => {
    (usePublications as jest.Mock).mockReturnValue({ publications: [], loading: false, error: null });
    render(<PublicationsPage />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
