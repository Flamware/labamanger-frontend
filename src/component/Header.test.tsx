import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

// Helper to render Header with route and optional window width
const renderHeader = (initialRoute: string = '/') => {
    // Set viewport size to emulate desktop or mobile
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
    window.dispatchEvent(new Event('resize'));

    return render(
        <MemoryRouter initialEntries={[initialRoute]}>
            <Header />
        </MemoryRouter>
    );
};

describe('Header Component', () => {
    test('renders logo and desktop navigation links', () => {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 }); // Desktop
        window.dispatchEvent(new Event('resize'));

        renderHeader();

        const logo = screen.getByAltText('CIAD-LAB');
        expect(logo).toBeInTheDocument();

        // Desktop links should be present
        expect(screen.getByRole('link', { name: /accueil/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /projets/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /equipe/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /publications/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /conférences & séminaires/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
    });

    test('highlights the active link based on the current route', () => {
        renderHeader('/projets');

        const projetsLink = screen.getAllByRole('link', { name: /projets/i })[0]; // Desktop link
        const accueilLink = screen.getAllByRole('link', { name: /accueil/i })[0];

        expect(projetsLink).toHaveClass('text-lime-400');
        expect(accueilLink).not.toHaveClass('text-lime-400');
    });

    test('toggles the mobile menu when hamburger button is clicked', () => {
        renderHeader();

        const mobileMenu = screen.getByTestId('mobile-menu');
        const toggleButton = screen.getByTestId('hamburger-button');

        // Initially hidden
        expect(mobileMenu).toHaveClass('hidden');

        // Open menu
        fireEvent.click(toggleButton);
        expect(mobileMenu).not.toHaveClass('hidden');

        // Close menu
        fireEvent.click(toggleButton);
        expect(mobileMenu).toHaveClass('hidden');
    });

    test('shows and hides mobile menu links on toggle', () => {
        renderHeader();

        const toggleButton = screen.getByTestId('hamburger-button');
        fireEvent.click(toggleButton); // Open menu

        const mobileAccueilLink = screen.getByText('ACCUEIL');
        expect(mobileAccueilLink).toBeVisible();

        fireEvent.click(toggleButton); // Close menu
        expect(screen.getByTestId('mobile-menu')).toHaveClass('hidden');
    });

    test('closes the mobile menu when a navigation link is clicked', () => {
        renderHeader();

        const toggleButton = screen.getByTestId('hamburger-button');
        fireEvent.click(toggleButton); // Open menu

        const mobileProjetsLink = screen.getByText('PROJETS');
        expect(mobileProjetsLink).toBeVisible();

        fireEvent.click(mobileProjetsLink); // Click link
        expect(screen.getByTestId('mobile-menu')).toHaveClass('hidden');
    });
});
