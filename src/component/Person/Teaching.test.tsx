// ✅ Mocks AVANT les imports
const mockUse = jest.fn();

// ✅ Crée un faux composant React avec .use attachée via Object.assign
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
  { use: mockUse }
);

// ✅ Mocks
jest.mock('datatables.net-react', () => ({
  __esModule: true,
  default: mockDataTableComponent,
}));

jest.mock('datatables.net-dt', () => ({}));
jest.mock('datatables.net-responsive-dt', () => {});
jest.mock('datatables.net-select-dt', () => {});

// ✅ Imports après mocks
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Teaching from './Teaching';

// ✅ Données simulées
const mockData = [
  {
    code: 'CS101',
    title: 'Introduction to Computer Science',
    degree: 'Bachelor',
    university: { name: 'Harvard University' },
  },
];

describe('Teaching Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays teaching data', async () => {
    render(<Teaching userId={1} />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText('CS101')).toBeInTheDocument();
      expect(screen.getByText('Introduction to Computer Science')).toBeInTheDocument();
      expect(screen.getByText('Bachelor')).toBeInTheDocument();
      expect(screen.getByText('Harvard University')).toBeInTheDocument();
    });
  });

  it('handles fetch errors', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch'))
    );

    render(<Teaching userId={1} />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Failed to fetch/)).toBeInTheDocument();
    });
  });
});
