// useProjects.test.js
import { renderHook, waitFor } from '@testing-library/react';
import { useProjects } from './useProjects';

// Mock the global fetch function
global.fetch = jest.fn();

const mockFetch = global.fetch as jest.Mock;

describe('useProjects Hook', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should fetch and map projects data successfully', async () => {
    const mockBackendData = [
      {
        id: 1,
        title: 'Project 1',
        description: 'Description for Project 1',
        logo: 'logo1.png',
        openSource: true,
      },
      {
        id: 2,
        title: 'Project 2',
        description: 'Description for Project 2',
        logo: 'logo2.png',
        openSource: false,
      },
    ];

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockBackendData),
      })
    );

    const { result: result1 } = renderHook(() => useProjects());

    expect(result1.current.loading).toBe(true);
    expect(result1.current.error).toBeNull();

    await waitFor(() => {
      expect(result1.current.loading).toBe(false);
    });

    expect(result1.current.error).toBeNull();
    expect(result1.current.projects).toEqual([
      {
        id: 1,
        title: 'Project 1',
        description: 'Description for Project 1',
        imageUrl: 'logo1.png',
        category: 'research',
      },
      {
        id: 2,
        title: 'Project 2',
        description: 'Description for Project 2',
        imageUrl: 'logo2.png',
        category: 'research',
      },
    ]);
  });

  it('should handle fetch errors', async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );

    const { result } = renderHook(() => useProjects());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Error: 500');
    expect(result.current.projects).toEqual([]);
  });

  it('should handle network errors', async () => {
    const errorMessage = 'Network error';
    mockFetch.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    const { result } = renderHook(() => useProjects());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.projects).toEqual([]);
  });
});
