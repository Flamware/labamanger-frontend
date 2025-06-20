// PublicationList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PublicationList from './PublicationList';

// Mock data for testing
const mockPublications = [
  {
    id: 1,
    title: 'Publication 1',
    issn: '1234-5678',
    publicationType: 'Article',
    language: 'English',
    abstractText: 'Abstract for Publication 1',
    publicationDate: '2023-01-01',
    pdfUrl: 'http://example.com/pub1.pdf',
    dblpUrl: 'http://dblp.org/pub1',
    awardCertificate: 'Certificate for Publication 1',
    keywords: ['keyword1', 'keyword2'],
    persons: [{ id: 1, name: 'Author 1' }, { id: 2, name: 'Author 2' }],
    doi: '10.1000/pub1',
    extraUrl: 'http://extra.example.com/pub1'
  },
  {
    id: 2,
    title: 'Publication 2',
    issn: '8765-4321',
    publicationType: 'Book',
    language: 'French',
    abstractText: 'Abstract for Publication 2',
    publicationDate: '2022-01-01',
    pdfUrl: 'http://example.com/pub2.pdf',
    dblpUrl: 'http://dblp.org/pub2',
    awardCertificate: '',
    keywords: ['keyword3', 'keyword4'],
    persons: [{ id: 3, name: 'Author 3' }],
    doi: '10.1000/pub2',
    extraUrl: 'http://extra.example.com/pub2'
  },
];

describe('PublicationList Component', () => {
  it('renders a list of publications', () => {
    render(<PublicationList publications={mockPublications} expandedIndex={null} toggleExpand={() => {}} />);

    expect(screen.getByText('Publication 1')).toBeInTheDocument();
    expect(screen.getByText('Publication 2')).toBeInTheDocument();
  });

  it('displays publication details when expanded', () => {
    render(<PublicationList publications={mockPublications} expandedIndex={0} toggleExpand={() => {}} />);

    expect(screen.getByText('Abstract for Publication 1')).toBeInTheDocument();
    expect(screen.getByText('Type : Article | Langue : English')).toBeInTheDocument();
    const keywordsNode = screen.getByText('keyword1, keyword2');
    expect(keywordsNode).toBeInTheDocument();
    expect(keywordsNode.parentElement?.textContent).toContain('Keywords :');
  });

  it('does not display publication details when collapsed', () => {
    render(<PublicationList publications={mockPublications} expandedIndex={null} toggleExpand={() => {}} />);

    expect(screen.queryByText('Abstract for Publication 1')).not.toBeInTheDocument();
  });

  it('calls toggleExpand when a publication is clicked', () => {
    const toggleExpandMock = jest.fn();

    render(<PublicationList publications={mockPublications} expandedIndex={null} toggleExpand={toggleExpandMock} />);

    fireEvent.click(screen.getByText('Publication 1'));
    expect(toggleExpandMock).toHaveBeenCalledWith(0);
  });

  it('renders links for PDF and DBLP', () => {
    render(<PublicationList publications={mockPublications} expandedIndex={0} toggleExpand={() => {}} />);

    expect(screen.getByTitle('PDF')).toHaveAttribute('href', 'http://example.com/pub1.pdf');
    expect(screen.getByTitle('DBLP')).toHaveAttribute('href', 'http://dblp.org/pub1');
  });

  it('renders award certificate information if available', () => {
    render(<PublicationList publications={mockPublications} expandedIndex={0} toggleExpand={() => {}} />);

    expect(screen.getByText('🏆 Certificat de récompense disponible')).toBeInTheDocument();
  });
});
