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
  default: mockDataTableComponent
}));
jest.mock('datatables.net-dt', () => ({}));
jest.mock('datatables.net-responsive-dt', () => {});
jest.mock('datatables.net-select-dt', () => {});

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Project from './Projet';

// Mock data for testing
const mockData = {
  body: [
    {
      acronym: 'ABC',
      title: 'Project Alpha',
      organizations: { learOrganization: 'Org A' },
      date: { startDate: '2023-01-01', endDate: '2023-12-31' },
    },
  ],
};

describe('Project Component', () => {
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

  it('renders loading state initially', () => {
    render(<Project userId={1} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('fetches and displays project data', async () => {
    render(<Project userId={1} />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText('ABC')).toBeInTheDocument();
      expect(screen.getByText('Project Alpha')).toBeInTheDocument();
    });
  });

  it('handles fetch errors', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch'))
    );

    render(<Project userId={1} />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Failed to fetch/)).toBeInTheDocument();
    });
  });
});
