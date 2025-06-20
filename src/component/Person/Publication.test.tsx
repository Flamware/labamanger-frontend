import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Publication from './Publication';
import { usePublicationsPerson } from '../../hooks/usePublicationsPerson';

jest.mock('../../hooks/usePublicationsPerson');

jest.mock('../publications/PublicationPageContent', () => ({ publications, loading, error }: any) => (
  <div>
    {loading && <div data-testid="loading">Loading...</div>}
    {error && <div data-testid="error">{error}</div>}
    {publications && <div data-testid="publications">{publications.length} publications</div>}
  </div>
));

describe('Publication Component', () => {
  it('renders loading state', () => {
    (usePublicationsPerson as jest.Mock).mockReturnValue({ publications: null, loading: true, error: null });
    render(<Publication userId={1} />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
  it('renders error state', () => {
    (usePublicationsPerson as jest.Mock).mockReturnValue({ publications: null, loading: false, error: 'Error' });
    render(<Publication userId={1} />);
    expect(screen.getByTestId('error')).toHaveTextContent('Error');
  });
  it('renders publications data', () => {
    const mockPublications = [{ id: 1 }, { id: 2 }];
    (usePublicationsPerson as jest.Mock).mockReturnValue({ publications: mockPublications, loading: false, error: null });
    render(<Publication userId={1} />);
    expect(screen.getByTestId('publications')).toHaveTextContent('2 publications');
  });
});
