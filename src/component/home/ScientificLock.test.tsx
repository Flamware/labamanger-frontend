import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScientificLock from './ScientificLock';

describe('ScientificLock Component', () => {
  it('renders without crashing', () => {
    render(<ScientificLock />);
  });

  it('renders the main heading', () => {
    render(<ScientificLock />);
    const heading = screen.getByText(/Nos verrous scientifiques/i);
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-4xl');
    expect(heading).toHaveClass('text-center');
  });

  it('renders all scientific lock cards with correct titles', () => {
    render(<ScientificLock />);
    const titles = [
      /Vérité et valeur/i,
      /Interopérabilité du raisonnement/i,
      /Système prescriptif/i
    ];
    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders the correct number of lock cards', () => {
    render(<ScientificLock />);
    // Each card has a unique h3 with class 'font-semibold'
    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards.length).toBe(3);
  });

  it('renders the main grid container by class', () => {
    render(<ScientificLock />);
    // The grid container has grid-cols-1 and gap-8
    const grid = document.querySelector('.grid.grid-cols-1.gap-8');
    expect(grid).toBeInTheDocument();
  });
});
