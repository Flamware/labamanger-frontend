import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutUs from './AboutUs';

// Define the function to match text content more flexibly
const getTextContent = (text: string) => (content: string, element: Element | null) => {
  if (!element) return false;

  const hasText = (node: Node): boolean => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent?.includes(text) || false;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      return Array.from(node.childNodes).some(hasText);
    }
    return false;
  };

  return hasText(element);
};

describe('AboutUs Component', () => {
  it('renders the correct heading', () => {
    render(<AboutUs />);
    expect(screen.getByText('QUI SOMMES NOUS ?')).toBeInTheDocument();
  });

  it('renders the correct paragraph texts', () => {
    render(<AboutUs />);

    // Find all <p> elements inside the main text container
    const textContainer = screen.getByText('QUI SOMMES NOUS ?').parentElement?.querySelector('.text-lg');
    const paragraphs = textContainer ? Array.from(textContainer.querySelectorAll('p')) : [];
    expect(paragraphs.length).toBeGreaterThanOrEqual(5);
    // Check the first paragraph contains the expected text
    expect(paragraphs[0]?.textContent).toContain('Le laboratoire CIAD');
    expect(paragraphs[1]?.textContent).toContain('Le raisonnement est parfois une articulation');
    expect(paragraphs[2]?.textContent).toContain('Notre laboratoire est spécialisé');
    expect(paragraphs[3]?.textContent).toContain('Université de Technologie Belfort-Montbéliard');
    expect(paragraphs[4]?.textContent).toContain('Environ 70 personnes');
    // The last <p> (without mb-4) is the 6th
    const lastParagraph = textContainer ? textContainer.querySelector('p:not(.mb-4)') : null;
    expect(lastParagraph?.textContent).toContain('Depuis 2020, le laboratoire est membre');
  });

  it('renders the YouTube video iframe with the correct URL', () => {
    render(<AboutUs />);
    const iframe = screen.getByTitle('CIAD Presentation Video');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/SH6WxV_7k8A');
  });

  it('applies the correct styling classes', () => {
    render(<AboutUs />);

    // Check for specific classes on the heading
    const heading = screen.getByText('QUI SOMMES NOUS ?');
    expect(heading).toHaveClass('text-4xl');
    expect(heading).toHaveClass('text-lime-400');

    // Check for specific classes on the text container
    const textContainer = heading.parentElement?.querySelector('.text-lg');
    expect(textContainer).toHaveClass('text-lg');
    expect(textContainer).toHaveClass('text-gray-300');
  });
});
