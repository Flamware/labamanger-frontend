// useConferences.test.js
import { renderHook, waitFor } from '@testing-library/react';
import { useConferences } from './useConferences';

// Mock the global fetch function
global.fetch = jest.fn();

const mockFetch = global.fetch as jest.Mock;

describe('useConferences Hook', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should fetch conference data successfully', async () => {
    const mockData = [
      { id: 1, title: 'Conference 1', year: 2023 },
      { id: 2, title: 'Conference 2', year: 2024 },
    ];

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const { result } = renderHook(() => useConferences());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.data).toEqual(mockData);
  });

  it('should handle fetch errors', async () => {
    const errorMessage = 'Failed to fetch projects data: Not Found';

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Not Found',
      })
    );

    const { result } = renderHook(() => useConferences());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.data).toEqual([]);
  });

  it('should handle network errors', async () => {
    const errorMessage = 'Network error';

    mockFetch.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    const { result } = renderHook(() => useConferences());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.data).toEqual([]);
  });
});
