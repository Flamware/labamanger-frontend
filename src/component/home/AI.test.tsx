import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AI from './AI';

describe('AI Component', () => {
  it('renders without crashing', () => {
    render(<AI />);
  });

  it('renders the correct heading', () => {
    render(<AI />);
    expect(screen.getByText("qu'est-ce qu'une Intelligence Artificielle ?")).toBeInTheDocument();
  });

  it('renders the main paragraph texts', () => {
    render(<AI />);
    const textContainer = screen.getByText("qu'est-ce qu'une Intelligence Artificielle ?").parentElement?.querySelector('.text-lg');
    const paragraphs = textContainer ? Array.from(textContainer.querySelectorAll('p')) : [];
    expect(paragraphs.length).toBeGreaterThanOrEqual(7);
    expect(paragraphs[0]?.textContent).toContain("L'intelligence artificielle, c'est l'ensemble de théories");
    expect(paragraphs[1]?.textContent).toContain("C'est l'un des rêves le plus ambitieux");
    expect(paragraphs[2]?.textContent).toContain("L'intelligence artificielle ne s'incarne pas uniquement");
    expect(paragraphs[3]?.textContent).toContain("Il est difficile d'expliquer le concept");
    expect(paragraphs[4]?.textContent).toContain("De plus, elle doit être en capacité");
    expect(paragraphs[5]?.textContent).toContain("Pour expliquer facilement l'IA");
    expect(paragraphs[6]?.textContent).toContain("Notre préférée est celle de la recette de cuisine");
  });

  it('renders the YouTube video iframe with the correct URL', () => {
    render(<AI />);
    const iframe = screen.getByTitle('CIAD Presentation Video');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://youtube.com/embed/AVJoTcCX9qw');
  });

  it('renders all accordions and toggles them', () => {
    render(<AI />);
    const accordionData = [
      {
        title: 'Les Ingrédients',
        content: "On peut considérer le frigo comme un vaste environnement de stockage de données."
      },
      {
        title: 'La Préparation',
        content: "Si on sélectionne un poulet, il faut parfois le découper, juste pour récupérer les blancs en vue de les cuisiner."
      },
      {
        title: 'La Recette',
        content: "Quand on cuisine, on coordonne souvent un ensemble d'actions pour réaliser un plat particulier, par exemple un poulet aux olives."
      }
    ];
    accordionData.forEach(({ title, content }) => {
      const button = screen.getByText(title);
      expect(button).toBeInTheDocument();
      // Content should not be in the document initially
      expect(screen.queryByText((text, node) => node?.textContent?.includes(content) ?? false)).not.toBeInTheDocument();
      // Open accordion
      fireEvent.click(button);
      const matches = screen.getAllByText(
        (text, node) => node?.textContent?.includes(content) ?? false
      );
      expect(matches.length).toBeGreaterThan(0);
      expect(matches[0]).toBeVisible(); // check the first match is visible
      // Close accordion
      fireEvent.click(button);
      expect(screen.queryByText((text, node) => node?.textContent?.includes(content) ?? false)).not.toBeInTheDocument();
    });
  });

  it('applies the correct styling classes', () => {
    render(<AI />);
    const heading = screen.getByText("qu'est-ce qu'une Intelligence Artificielle ?");
    expect(heading).toHaveClass('text-4xl');
    expect(heading).toHaveClass('text-lime-400');
    const textContainer = heading.parentElement?.querySelector('.text-lg');
    expect(textContainer).toHaveClass('text-lg');
    expect(textContainer).toHaveClass('text-gray-300');
  });
});
