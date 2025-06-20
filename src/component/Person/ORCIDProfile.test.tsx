import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './ORCIDProfile';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('App component (ORCID bio)', () => {
  const orcid = '0000-0002-1825-0097';
  const mockBio = 'This is a mock biography.';

  it('fetches and displays biography from ORCID data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        biography: { content: mockBio },
      }),
    });

    render(<App lien={`https://orcid.org/${orcid}`} />);

    await waitFor(() => {
      expect(screen.getByText(mockBio)).toBeInTheDocument();
    });
  });

  it('renders an empty <p> when biography content is empty', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        biography: { content: '' },
      }),
    });

    render(<App lien={`https://orcid.org/${orcid}`} />);

    await waitFor(() => {
      // The <p> should be in the document, but empty
      const p = screen.getByText('', { selector: 'p' });
      expect(p).toBeInTheDocument();
      expect(p).toBeEmptyDOMElement();
    });
  });

  it('does not render <p> if fetch fails (error case)', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<App lien={`https://orcid.org/${orcid}`} />);

    // Wait for the fetch and state update
    await waitFor(() => {
      // The <p> should not be present since orcidData is never set
      expect(screen.queryByText('', { selector: 'p' })).not.toBeInTheDocument();
    });
  });
});
