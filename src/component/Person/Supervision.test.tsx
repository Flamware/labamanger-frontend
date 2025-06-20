jest.mock('datatables.net-responsive-dt', () => {});
jest.mock('datatables.net-select-dt', () => {});
jest.mock('datatables.net-dt', () => ({}));


// ✅ Déclare tes mocks AVANT les imports et jest.mock
const mockUse = jest.fn();
const mockDataTableComponent = Object.assign(
  jest.fn(({ data, columns }) => (
    <div data-testid="datatable">
      <table>
        <thead>
          <tr>
            {columns.map((col: any, i: number) => (
              <th key={i}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, i: number) => (
            <tr key={i}>
              {columns.map((col: any, j: number) => {
                const value = col.data.split('.').reduce((acc: any, curr: string) => acc?.[curr], row);
                return <td key={j}>{value}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )),
  {
    use: mockUse, 
  }
);


// ✅ Mock AVANT les imports de modules qui les utilisent
jest.mock('datatables.net-react', () => ({
  __esModule: true,
  default: mockDataTableComponent
}));

jest.mock('datatables.net-dt', () => ({}));

// ✅ Puis les imports de React et du composant
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Supervisions from './Supervision';

// ✅ Données simulées
const mockData = [
  {
    supervisedPerson: { name: 'John Doe' },
    supervisedPersonId: 1,
    name: 'Project Alpha',
    year: '2023',
    researchOrganization: {
      directResearchOrganization: { name: 'Research Org' },
    },
  },
];

describe('Supervisions component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays supervision data', async () => {
    render(<Supervisions userId={1} />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://localhost:8080/LabManager/api/v4/persons/supervisions?id=1'
      );
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Project Alpha')).toBeInTheDocument();
      expect(screen.getByText('2023')).toBeInTheDocument();
      expect(screen.getByText('Research Org')).toBeInTheDocument();
    });
  });

  it('shows an error when fetch fails', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch'))
    );

    render(<Supervisions userId={1} />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Failed to fetch/)).toBeInTheDocument();
    });
  });
});
