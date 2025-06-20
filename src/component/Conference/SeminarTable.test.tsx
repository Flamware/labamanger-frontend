import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeminarTable from './SeminarTable';

describe('SeminarTable Component', () => {
  it('renders without crashing', () => {
    render(<SeminarTable />);
  });

  it('renders the table headers', () => {
    render(<SeminarTable />);
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Room')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
  });

  it('renders at least one row of seminar data', () => {
    render(<SeminarTable />);
    // Check for a known name in the data
    expect(screen.getByText('Creola Katherine Johnson')).toBeInTheDocument();
    expect(screen.getByText('mathematician')).toBeInTheDocument();
    expect(screen.getByText('spaceflight calculations')).toBeInTheDocument();
  });

  it('renders all seminar names', () => {
    render(<SeminarTable />);
    const names = [
      'Creola Katherine Johnson',
      'Mario José Molina-Pasquel Henríquez',
      'Mohammad Abdus Salam',
      'Percy Lavon Julian',
      'Subrahmanyan Chandrasekhar'
    ];
    names.forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});
