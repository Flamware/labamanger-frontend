import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Numbers from './KeyNumbers';

const mockStats = [
  70, // members
  30, // permanent members
  200, // articles
  150, // conferences
  2.5, // avg ranked
  40, // finished projects
  10, // continuing projects
  5, // started this year
];

global.fetch = jest.fn((url) => {
  const endpoints = [
    'persons/count',
    'persons/permanent/count',
    'publications/count',
    'conferences/count',
    'journals/scimago-journals/average-per-fte',
    'projects/stats/finished',
    'projects/stats/ongoing',
    'projects/stats/started-this-year',
  ];
  const idx = endpoints.findIndex(e => url.includes(e));
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockStats[idx]),
  });
}) as jest.Mock;

describe('Numbers Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the heading', async () => {
    await act(async () => {
      render(<Numbers />);
    });
    expect(screen.getByText('Nos chiffres clés')).toBeInTheDocument();
  });

  it('shows loading then displays all key numbers and labels', async () => {
    await act(async () => {
      render(<Numbers />);
    });
    
    await waitFor(() => {
      expect(screen.queryByText('Chargement des chiffres...')).not.toBeInTheDocument();
    });
    // Check all numbers and labels
    const labels = [
      'Number of members',
      'Number of permanent members',
      'articles between',
      'conference between',
      'Average number of journals ranked by Scimago / FTE / year (2020-2024)',
      'total finished projects',
      'continuing projects',
      'started this year',
    ];
    mockStats.forEach((num, idx) => {
      expect(screen.getByText(num.toLocaleString())).toBeInTheDocument();
      expect(screen.getByText(labels[idx])).toBeInTheDocument();
    });
  });

  it('shows error message if fetch fails', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve({ ok: false }));
    await act(async () => {
      render(<Numbers />);
    });
    await waitFor(() => {
      expect(screen.getByText(/Erreur/)).toBeInTheDocument();
    });
  });
});
