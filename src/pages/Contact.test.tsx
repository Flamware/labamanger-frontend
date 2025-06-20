// ContactPage.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactPage from './Contact'; // Adjust the import path as necessary

describe('ContactPage Component', () => {
  it('renders the contact page message', () => {
    render(<ContactPage />);

    // Check if the main heading is rendered
    expect(screen.getByText('Nous Contacter')).toBeInTheDocument();

    // Check if the under development message is rendered
    expect(screen.getByText('Nous travaillons actuellement sur cette page.')).toBeInTheDocument();

    // Check if the additional message is rendered
    expect(screen.getByText('Le formulaire de contact nest pas encore opérationnel, mais il le sera bientôt. Merci de votre patience !')).toBeInTheDocument();
  });
});
