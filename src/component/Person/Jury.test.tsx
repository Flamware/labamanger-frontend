// Mock DataTable and .use like Supervision, Teaching, and Invitation examples
const mockUse = jest.fn();
const mockDataTableComponent = Object.assign(
  jest.fn(({ data, columns }) => (
    <div data-testid="datatable">
      <table>
        <thead>
          <tr>
            {columns && columns.map((col: any, i: number) => (
              <th key={i}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.map((row: any, i: number) => (
            <tr key={i}>
              {columns && columns.map((col: any, j: number) => {
                const value = col.data?.split('.').reduce((acc: any, curr: string) => acc?.[curr], row);
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

jest.mock('datatables.net-react', () => ({
  __esModule: true,
  default: mockDataTableComponent,
  use: mockUse,
}));

jest.mock('datatables.net-dt', () => ({}));
jest.mock('datatables.net-responsive-dt', () => {});
jest.mock('datatables.net-select-dt', () => {});

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Jury from './Jury';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Jury component', () => {
  const mockData = [
    {
      candidate: { name: 'Alice Smith' },
      candidateId: 42,
      title: 'Thesis on Quantum Computing',
      university: { name: 'MIT', country: 'USA' },
      year: 2023,
    },
    {
      candidate: { name: 'Bob Johnson' },
      candidateId: 43,
      title: 'AI and Ethics',
      university: { name: 'Oxford', country: 'UK' },
      year: 2022,
    },
  ];

  it('fetches and displays jury data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<Jury userId={123} />);

    await waitFor(() => {
      expect(screen.getByTestId('datatable')).toBeInTheDocument();
      expect(screen.getByText('Thesis on Quantum Computing')).toBeInTheDocument();
      expect(screen.getByText('AI and Ethics')).toBeInTheDocument();
    });
  });

  it('displays an error message on fetch failure', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<Jury userId={123} />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });
});
