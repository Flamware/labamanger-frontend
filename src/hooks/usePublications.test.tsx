// usePublications.test.js
import { renderHook, waitFor } from '@testing-library/react';
import { usePublications } from './usePublications';

// Mock the global fetch function
global.fetch = jest.fn() as jest.Mock;
const mockFetch = global.fetch as jest.Mock;

describe('usePublications Hook', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should fetch publications data successfully', async () => {
    const mockData = [
      { id: 1, title: 'Publication 1', author: 'Author 1' },
      { id: 2, title: 'Publication 2', author: 'Author 2' },
    ];

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );
    const { result } = renderHook(() => usePublications());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe('');

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('');
    expect(result.current.publications).toEqual(mockData);
  });

  it('should handle fetch errors', async () => {
    const errorMessage = 'Failed to fetch publications';

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );
    const { result } = renderHook(() => usePublications());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe('');

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Error: 500');
    expect(result.current.publications).toEqual([]);

  it('should handle network errors', async () => {
    const errorMessage = 'Network error';

    mockFetch.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe('');

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.publications).toEqual([]);
    })
})
})
