// Home.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home'; // Adjust the import path as necessary

// Mock child components
jest.mock('../component/home/ContactCarousel', () => () => <div data-testid="contact-carousel"></div>);
jest.mock('../component/home/AboutUs', () => () => <div data-testid="about-us"></div>);
jest.mock('../component/home/AI', () => () => <div data-testid="ai"></div>);
jest.mock('../component/home/ScientificLock', () => () => <div data-testid="science"></div>);
jest.mock('../component/home/ApplicationField', () => () => <div data-testid="application"></div>);
jest.mock('../component/home/HomeProjectCarousel', () => () => <div data-testid="project-carousel"></div>);
jest.mock('../component/home/KeyNumbers', () => () => <div data-testid="key-numbers"></div>);
jest.mock('../component/home/InnovativeProcessus', () => () => <div data-testid="innov-processus"></div>);
jest.mock('../component/home/PartnerCarousel', () => () => <div data-testid="partner-carousel"></div>);
jest.mock('../component/Footer', () => () => <div data-testid="footer"></div>);

describe('Home Component', () => {
  it('renders the hero section', () => {
    render(<Home />);

    // Check if the hero section heading and paragraph are rendered
    expect(screen.getByText('Bienvenue au CIAD-LAB')).toBeInTheDocument();
    expect(screen.getByText('Votre centre de recherche et d\'innovation en Intelligence Artificielle Distribuée.')).toBeInTheDocument();
  });

  it('renders the ContactCarousel section', () => {
    render(<Home />);

    // Check if the ContactCarousel section heading and component are rendered
    expect(screen.getByText('Découvrez nos Domaines d\'Expertise')).toBeInTheDocument();
    expect(screen.getByTestId('contact-carousel')).toBeInTheDocument();
  });

  it('renders the AboutUs, AI, Science, and Application sections', () => {
    render(<Home />);

    // Check if the AboutUs, AI, Science, and Application components are rendered
    expect(screen.getByTestId('about-us')).toBeInTheDocument();
    expect(screen.getByTestId('ai')).toBeInTheDocument();
    expect(screen.getByTestId('science')).toBeInTheDocument();
    expect(screen.getByTestId('application')).toBeInTheDocument();
  });

  it('renders the ProjectCarousel, KeyNumbers, InnovProcessus, and PartnerCarousel sections', () => {
    render(<Home />);

    // Check if the ProjectCarousel, KeyNumbers, InnovProcessus, and PartnerCarousel components are rendered
    expect(screen.getByTestId('project-carousel')).toBeInTheDocument();
    expect(screen.getByTestId('key-numbers')).toBeInTheDocument();
    expect(screen.getByTestId('innov-processus')).toBeInTheDocument();
    expect(screen.getByTestId('partner-carousel')).toBeInTheDocument();
  });

  it('renders the Footer component', () => {
    render(<Home />);

    // Check if the Footer component is rendered
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
