// ✅ Déclare le mock `use` avant
const mockUse = jest.fn();
// ✅ Composant simulé qui respecte l'API de DataTable
const mockDataTableComponent = Object.assign(
  ({ data }: { data: any[] }) => (
    <div data-testid="datatable">
      {data.map((row, index) => (
        <div key={index} data-testid="row">{row.title}</div>
      ))}
    </div>
  ),
  { use: mockUse }
);

// ✅ Mock du module avec Object.assign
jest.mock('datatables.net-react', () => ({
  __esModule: true,
  default: mockDataTableComponent,
  use: mockUse,
}));

// ✅ Mock des dépendances CSS de DataTables
jest.mock('datatables.net-dt', () => ({}));
jest.mock('datatables.net-responsive-dt', () => {});
jest.mock('datatables.net-select-dt', () => {});

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Invitation from './Invitation';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Invitation component', () => {
  const mockInviterData = {
    INCOMING_GUEST_PROFESSOR: [
      {
        title: 'Projet A',
        guest: { name: 'Prof. X' },
        guestId: 1,
        university: { name: 'Uni X', country: 'France' },
        dates: { startDate: '2025-01-01', endDate: '2025-06-01' },
      },
    ],
  };

  const mockGuestData = {
    INCOMING_GUEST_PROFESSOR: [
      {
        title: 'Projet B',
        guest: { name: 'Prof. Y' },
        guestId: 2,
        university: { name: 'Uni Y', country: 'Germany' },
        dates: { startDate: '2025-02-01', endDate: '2025-07-01' },
      },
    ],
  };

  it('fetches and displays data correctly', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockInviterData,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockGuestData,
      });

    render(<Invitation userId={123} />);

    await waitFor(() => {
      expect(screen.getByText("Invitations en tant qu'inviteur")).toBeInTheDocument();
      expect(screen.getByText("Invitations en tant qu'invité")).toBeInTheDocument();
      expect(screen.getByText('Projet A')).toBeInTheDocument();
      expect(screen.getByText('Projet B')).toBeInTheDocument();
    });
  });

  it('shows error message if fetch fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<Invitation userId={123} />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });
});
