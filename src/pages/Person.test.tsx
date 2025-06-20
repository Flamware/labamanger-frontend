// Person.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Person from './Person';
import { useParams } from 'react-router-dom';

// Add this at the very top of your test file to ensure global.fetch exists
if (!(global as any).fetch) {
  (global as any).fetch = jest.fn();
}

// Mock the child components
jest.mock('../component/Person/ORCIDProfile', () => () => <div data-testid="orcid-profile"></div>);
jest.mock('../component/Person/Publication', () => () => <div data-testid="publication"></div>);
jest.mock('../component/Person/Projet', () => () => <div data-testid="project"></div>);
jest.mock('../component/Person/Supervision', () => () => <div data-testid="supervision"></div>);
jest.mock('../component/Person/Jury', () => () => <div data-testid="jury"></div>);
jest.mock('../component/Person/Invitation', () => () => <div data-testid="invitation"></div>);
jest.mock('../component/Person/Teaching', () => () => <div data-testid="teaching"></div>);

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Person Component', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    jest.clearAllMocks();
    ((global as any).fetch as jest.Mock).mockImplementation((url) => {
      // Debug log to see what URL is being fetched
      // eslint-disable-next-line no-console
      console.log('FETCH CALLED WITH URL:', url);
      if (typeof url === 'string' && url.startsWith('https://localhost:8080/LabManager/api/v4/persons/card')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            officePhone: { prefix: '123', country: 'US', localNumber: '4567890' },
            room: '101',
            ranking: { wosHindex: '10', scopusHindex: '12', googleScholarHindex: '15' },
            links: {
              orcidURL: 'http://orcid.org/john-doe',
              gravatarURL: 'http://gravatar.com/john-doe',
              halURL: 'http://hal.org/john-doe',
              facebookURL: 'http://facebook.com/john-doe',
              googleScholarURL: 'http://scholar.google.com/john-doe',
              academiaURL: 'http://academia.edu/john-doe',
              researcherIdURL: 'http://researcherid.com/john-doe',
              cordisURL: 'http://cordis.europa.eu/john-doe',
              researchGateURL: 'http://researchgate.net/john-doe',
              dblpURL: 'http://dblp.org/john-doe',
              linkedInURL: 'http://linkedin.com/in/john-doe',
              adScientificIndexURL: 'http://adscientificindex.com/john-doe',
              githubURL: 'http://github.com/john-doe',
            },
            photo: 'profile.jpg',
          }),
        });
      }
      // Default mock for any other fetch
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({}),
      });
    });
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders loading state initially', async () => {
    render(<Person />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the person profile after data is fetched', async () => {
    render(<Person />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('+123 (US) 4567890')).toBeInTheDocument();
    });
  });

  it('switches tabs correctly', async () => {
    render(<Person />);

    await waitFor(() => {
      expect(screen.getByTestId('orcid-profile')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Publications & Talks'));
    expect(screen.getByTestId('publication')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Projects'));
    expect(screen.getByTestId('project')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Supervisions'));
    expect(screen.getByTestId('supervision')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Jurys'));
    expect(screen.getByTestId('jury')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Invitations'));
    expect(screen.getByTestId('invitation')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Teaching'));
    expect(screen.getByTestId('teaching')).toBeInTheDocument();
  });
});
