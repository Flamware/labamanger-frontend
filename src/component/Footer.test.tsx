import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer Component', () => {
  it('renders without crashing', () => {
    render(<Footer />);
    expect(screen.getByText('CIAD-LAB')).toBeInTheDocument();
  });

  it('displays the correct logos', () => {
    render(<Footer />);
    const utbmLogo = screen.getByAltText('UTBM Logo');
    const ubeLogo = screen.getByAltText('UBE Logo');
    const carnotLogo = screen.getByAltText('Institut Carnot ARTS Logo');

    expect(utbmLogo).toBeInTheDocument();
    expect(ubeLogo).toBeInTheDocument();
    expect(carnotLogo).toBeInTheDocument();
  });

  it('displays social media links', () => {
    render(<Footer />);
    const linkedInLink = screen.getByLabelText('LinkedIn');
    const youtubeLink = screen.getByLabelText('YouTube');

    expect(linkedInLink).toBeInTheDocument();
    expect(youtubeLink).toBeInTheDocument();
  });

  it('applies the correct background class based on props', () => {
    const { rerender } = render(<Footer />);
    expect(screen.getByText('CIAD-LAB').parentElement).toHaveClass('bg-gradient-to-b from-gray-900 to-black');

    rerender(<Footer isBlack />);
    expect(screen.getByText('CIAD-LAB').parentElement).toHaveClass('bg-black');

    rerender(<Footer easeBlack />);
    expect(screen.getByText('CIAD-LAB').parentElement).toHaveClass('bg-gradient-to-b from-transparent to-black');
  });
});
