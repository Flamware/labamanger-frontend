// Person.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Person from './Person';
import { useParams } from 'react-router-dom';

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

// Mock the API call
global.fetch = jest.fn(() =>
  Promise.resolve(
    new Response(
      JSON.stringify({
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
      {
        status: 200,
        headers: { 'Content-type': 'application/json' },
      }
    )
  )
);

describe('Person Component', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
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
