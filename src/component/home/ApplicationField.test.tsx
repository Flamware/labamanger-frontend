import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ApplicationField from './ApplicationField';

describe('ApplicationField Component', () => {
  it('renders without crashing', () => {
    render(<ApplicationField />);
  });

  it('renders the correct heading', () => {
    render(React.createElement(ApplicationField));
    expect(screen.getByText("Nos champs d'applications")).toBeInTheDocument();
  });

  it('renders all three application cards', () => {
    render(React.createElement(ApplicationField));
    expect(screen.getByText('E-santé')).toBeInTheDocument();
    expect(screen.getByText('Smart City')).toBeInTheDocument();
    expect(screen.getByText('Industrie 4.0')).toBeInTheDocument();
  });

  it('renders the correct images with alt text', () => {
    render(React.createElement(ApplicationField));
    expect(screen.getByAltText('E-santé')).toBeInTheDocument();
    expect(screen.getByAltText('Smart city')).toBeInTheDocument();
    expect(screen.getByAltText('Industrie 4.0')).toBeInTheDocument();
  });

  it('renders some key list items for each card', () => {
    render(React.createElement(ApplicationField));
    // E-santé
    const esanteMatches = screen.getAllByText(
      (_, node) => node?.textContent?.includes('Développement de méthodes de perception active basées sur plusieurs capteurs') ?? false
    );
    expect(esanteMatches.some(el => el.tagName === 'LI')).toBe(true);
    // Smart City
    const smartCityMatches = screen.getAllByText(
      (_, node) => node?.textContent?.includes('Amélioration de la sécurité des passages à niveau') ?? false
    );
    expect(smartCityMatches.some(el => el.tagName === 'LI')).toBe(true);
    // Industrie 4.0
    const industrieMatches = screen.getAllByText(
      (_, node) => node?.textContent?.includes('Amélioration de la vision informatique classique') ?? false
    );
    expect(industrieMatches.some(el => el.tagName === 'LI')).toBe(true);
  });

  it('applies the correct styling classes to the heading', () => {
    render(React.createElement(ApplicationField));
    const heading = screen.getByText("Nos champs d'applications");
    expect(heading).toHaveClass('text-4xl');
    expect(heading).toHaveClass('text-lime-400');
    expect(heading).toHaveClass('text-center');
  });
});
