import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConferenceList from './ConferenceList';

describe('ConferenceList Component', () => {
  const mockConferences = [
    {
      id: 1,
      acronym: 'ICML',
      name: 'International Conference on Machine Learning',
      publisher: 'ML Society',
      conferenceUrl: 'https://icml.cc/',
      coreId: 101,
      openAccess: true,
      validated: true,
      year: [2024, 2023]
    },
    {
      id: 2,
      acronym: 'NeurIPS',
      name: 'Neural Information Processing Systems',
      publisher: 'NeurIPS Foundation',
      conferenceUrl: 'https://neurips.cc/',
      coreId: 102,
      openAccess: false,
      validated: true,
      year: [2023]
    },
    {
      id: 3,
      acronym: 'CVPR',
      name: 'Computer Vision and Pattern Recognition',
      publisher: 'IEEE',
      conferenceUrl: 'https://cvpr2022.thecvf.com/',
      coreId: 103,
      openAccess: true,
      validated: false,
      year: [2022]
    }
  ];

  it('renders without crashing', () => {
    render(<ConferenceList conferences={mockConferences} />);
  });

  it('renders year headings in descending order', () => {
    render(<ConferenceList conferences={mockConferences} />);
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings[0]).toHaveTextContent('2024');
    expect(headings[1]).toHaveTextContent('2023');
    expect(headings[2]).toHaveTextContent('2022');
  });

  it('renders all conference acronyms as links', () => {
    render(<ConferenceList conferences={mockConferences} />);
    expect(screen.getByText('ICML')).toHaveAttribute('href', 'https://icml.cc/');
    expect(screen.getByText('NeurIPS')).toHaveAttribute('href', 'https://neurips.cc/');
    expect(screen.getByText('CVPR')).toHaveAttribute('href', 'https://cvpr2022.thecvf.com/');
  });

  it('renders conference names', () => {
    render(<ConferenceList conferences={mockConferences} />);
    expect(screen.getByText(/International Conference on Machine Learning/)).toBeInTheDocument();
    expect(screen.getByText(/Neural Information Processing Systems/)).toBeInTheDocument();
    expect(screen.getByText(/Computer Vision and Pattern Recognition/)).toBeInTheDocument();
  });

  it('renders correct number of list items', () => {
    render(<ConferenceList conferences={mockConferences} />);
    // 3 conferences, so 3 list items
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(3);
  });
});
