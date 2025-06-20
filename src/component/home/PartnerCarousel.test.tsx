import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import PartnerCarousel from './PartnerCarousel';

describe('PartnerCarousel Component', () => {
  it('renders without crashing', () => {
    render(<PartnerCarousel />);
  });

  it('renders the heading', async () => {
    await act(async () => {
      render(<PartnerCarousel />);
    });
    const heading = screen.getByText('Nos partenaires');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-4xl');
    expect(heading).toHaveClass('text-lime-400');
    expect(heading).toHaveClass('text-center');
  });

  it('renders at least one partner image with correct alt', async () => {
    await act(async () => {
      render(<PartnerCarousel />);
    });
    const images = screen.getAllByAltText(/Partenaire/);
    expect(images.length).toBeGreaterThan(0);
    expect(images[0]).toHaveClass('object-contain');
  });

  it('renders partner links with correct href and target', async () => {
    await act(async () => {
      render(<PartnerCarousel />);
    });
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute('href');
    expect(links[0]).toHaveAttribute('target', '_blank');
    expect(links[0]).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders custom arrow buttons', async () => {
    await act(async () => {
      render(<PartnerCarousel />);
    });
    expect(screen.getAllByText('❮').length).toBeGreaterThan(0);
    expect(screen.getAllByText('❯').length).toBeGreaterThan(0);
  });
});
