// usePublicationsPerson.test.js
import { renderHook, waitFor } from '@testing-library/react';
import { usePublicationsPerson } from './usePublicationsPerson';

// Mock the global fetch function
global.fetch = jest.fn() as jest.Mock<any, any>;
const fetch = global.fetch as jest.Mock<any, any>;

describe('usePublicationsPerson Hook', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should fetch publications data successfully', async () => {
    const mockData = [
      { id: 1, title: 'Publication 1', author: 'Author 1' },
      { id: 2, title: 'Publication 2', author: 'Author 2' },
    ];

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const { result } = renderHook(() => usePublicationsPerson(1));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe('');

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('');
    expect(result.current.publications).toEqual(mockData);
  });

  it('should handle fetch errors', async () => {
    const errorMessage = 'Failed to fetch publications';

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );

    const { result } = renderHook(() => usePublicationsPerson(1));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe('');

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Error: 500');
    expect(result.current.publications).toEqual([]);
  });

  it('should handle network errors', async () => {
    const errorMessage = 'Network error';

    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    const { result } = renderHook(() => usePublicationsPerson(1));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe('');

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.publications).toEqual([]);
  });

  it('should refetch data when userId changes', async () => {
    const mockData1 = [
      { id: 1, title: 'Publication 1', author: 'Author 1' },
    ];

    const mockData2 = [
      { id: 2, title: 'Publication 2', author: 'Author 2' },
    ];

    fetch.mockImplementation((url) => {
      if (url.includes('id=1')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData1),
        });
      } else if (url.includes('id=2')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData2),
        });
      }
      return Promise.reject(new Error('Invalid URL'));
    });

    const { result, rerender } = renderHook(({ userId }) => usePublicationsPerson(userId), {
      initialProps: { userId: 1 },
    });

    await waitFor(() => expect(result.current.publications).toEqual(mockData1));

    // Change the userId prop
    rerender({ userId: 2 });

    await waitFor(() => expect(result.current.publications).toEqual(mockData2));
  });
});
