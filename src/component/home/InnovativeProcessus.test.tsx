import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import InnovativeProcessus from './InnovativeProcessus';

describe('InnovativeProcessus Component', () => {
  it('renders without crashing', () => {
    render(<InnovativeProcessus />);
  });

  it('renders the heading', async () => {
    await act(async () => {
      render(<InnovativeProcessus />);
    });
    const heading = screen.getByText("Notre processus de soutien à l'innovation");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-4xl');
    expect(heading).toHaveClass('text-lime-400');
    expect(heading).toHaveClass('text-center');
  });

  it('renders the image with correct alt text', async () => {
    await act(async () => {
      render(<InnovativeProcessus />);
    });
    const img = screen.getByAltText('Présentation CIAD');
    expect(img).toBeInTheDocument();
    expect(img).toHaveClass('w-full');
    expect(img).toHaveClass('object-contain');
  });

  it('renders the image inside a rounded container', async () => {
    await act(async () => {
      render(<InnovativeProcessus />);
    });
    const img = screen.getByAltText('Présentation CIAD');
    const container = img.closest('.rounded-3xl');
    expect(container).not.toBeNull();
  });
});
