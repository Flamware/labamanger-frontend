import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactCarousel from './ContactCarousel';

describe('ContactCarousel Component', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      render(<ContactCarousel />);
    });
  });

  it('renders the CIAD logo and main title in the first slide', async () => {
    await act(async () => {
      render(<ContactCarousel />);
    });
    const logoMatches = screen.getAllByAltText('CIAD Logo');
    expect(logoMatches.length).toBeGreaterThan(0);
    expect(logoMatches[0]).toBeVisible();
    const titleMatches = screen.getAllByText('Connaissance & Intelligence Artificielle Distribuées');
    expect(titleMatches.length).toBeGreaterThan(0);
    expect(titleMatches[0]).toBeVisible();
  });

  it('renders a slide with the text about intelligence artificielle', async () => {
    await act(async () => {
      render(<ContactCarousel />);
    });
    const matches = screen.getAllByText("L'intelligence Artificielle est partout autour de nous !");
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0]).toBeVisible();
  });

  it('renders at least one Contactez-nous button', async () => {
    await act(async () => {
      render(<ContactCarousel />);
    });
    expect(screen.getAllByText('Contactez-nous').length).toBeGreaterThan(0);
  });

  it('renders a slide with "Systèmes intelligents" and related lines', async () => {
    await act(async () => {
      render(<ContactCarousel />);
    });
    const sysMatches = screen.getAllByText((_, node) => node?.textContent?.includes('Systèmes intelligents') ?? false);
    expect(sysMatches.length).toBeGreaterThan(0);
    expect(sysMatches[0]).toBeVisible();

    const villesMatches = screen.getAllByText((_, node) => node?.textContent?.includes('Villes intelligentes') ?? false);
    expect(villesMatches.length).toBeGreaterThan(0);
    expect(villesMatches[0]).toBeVisible();

    const transportMatches = screen.getAllByText((_, node) => node?.textContent?.includes('Transport intelligents') ?? false);
    expect(transportMatches.length).toBeGreaterThan(0);
    expect(transportMatches[0]).toBeVisible();
  });

  it('renders a slide with "Internet of Things" and related lines', async () => {
    await act(async () => {
      render(<ContactCarousel />);
    });
    const iotMatches = screen.getAllByText((_, node) => node?.textContent?.includes('Internet of Things') ?? false);
    expect(iotMatches.length).toBeGreaterThan(0);
    expect(iotMatches[0]).toBeVisible();

    const foodTechMatches = screen.getAllByText((_, node) => node?.textContent?.includes('Food Tech, Industrie 4.0') ?? false);
    expect(foodTechMatches.length).toBeGreaterThan(0);
    expect(foodTechMatches[0]).toBeVisible();

    const eHealthMatches = screen.getAllByText((_, node) => node?.textContent?.includes('eHealth et Services') ?? false);
    expect(eHealthMatches.length).toBeGreaterThan(0);
    expect(eHealthMatches[0]).toBeVisible();
  });

  it('renders at least one background image for a slide', async () => {
    await act(async () => {
      render(<ContactCarousel />);
    });
    expect(screen.getAllByAltText(/Slide/).length).toBeGreaterThan(0);
  });

  it('renders custom arrow buttons', async () => {
    await act(async () => {
      render(<ContactCarousel />);
    });
    expect(screen.getAllByText('❮').length).toBeGreaterThan(0);
    expect(screen.getAllByText('❯').length).toBeGreaterThan(0);
  });

  it('renders carousel dots', async () => {
    await act(async () => {
      render(<ContactCarousel />);
    });
    const dots = screen.getAllByRole('listitem');
    expect(dots.length).toBeGreaterThan(0);
  });
});
