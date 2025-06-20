// Projects.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Projects from './Projects';

// Mock child components
jest.mock('../component/projets/ProjectCarousel', () => () => <div data-testid="project-carousel"></div>);
jest.mock('../component/Footer', () => () => <div data-testid="footer"></div>);

describe('Projects Component', () => {
  it('renders the hero section with a heading and logo', () => {
    render(<Projects />);

    // Check if the hero section heading is rendered
    expect(screen.getByText('Les Projets du CIAD')).toBeInTheDocument();

    // Check if the logo image is rendered with the correct alt text
    expect(screen.getByAltText('Logo du CIAD')).toBeInTheDocument();
  });

  it('renders the project carousel section with a heading', () => {
    render(<Projects />);

    // Check if the project carousel section heading is rendered
    expect(screen.getByText('Découvrez nos travaux')).toBeInTheDocument();

    // Check if the ProjectCarousel component is rendered
    expect(screen.getByTestId('project-carousel')).toBeInTheDocument();
  });

  it('renders the Footer component', () => {
    render(<Projects />);

    // Check if the Footer component is rendered
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
