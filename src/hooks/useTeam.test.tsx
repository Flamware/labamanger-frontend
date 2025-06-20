// useTeam.test.js
import { renderHook, act, waitFor } from '@testing-library/react';
import { useTeam } from './useTeam';

// Mock the global fetch function
let fetchMock: jest.SpyInstance;

beforeAll(() => {
  // @ts-ignore
  global.fetch = jest.fn();
  fetchMock = jest.spyOn(global, 'fetch');
});

beforeEach(() => {
  fetchMock.mockClear();
});

afterAll(() => {
  fetchMock.mockRestore();
  // @ts-ignore
  global.fetch = undefined;
});

describe('useTeam Hook', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should fetch team data successfully', async () => {
    const mockData = [
      { id: '1', fullName: 'John Doe', civilTitle: 'Dr.', Email: 'john.doe@example.com', organizationName: 'Organization A' },
      { id: '2', fullName: 'Jane Smith', civilTitle: 'Prof.', Email: 'jane.smith@example.com', organizationName: 'Organization B' },
    ];

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const { result } = renderHook(() => useTeam());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.teamData).toEqual(mockData);
  });

  it('should handle fetch errors', async () => {
    const errorMessage = 'Failed to fetch team data';

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: errorMessage,
        text: () => Promise.resolve(errorMessage), // Add this line to mock .text()
      })
    );

    const { result } = renderHook(() => useTeam());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(`Failed to fetch team data: ${errorMessage}`);
    expect(result.current.teamData).toEqual([]);
  });

  it('should handle network errors', async () => {
    const errorMessage = 'Network error';

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    const { result } = renderHook(() => useTeam());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.teamData).toEqual([]);
  });

  it('should refetch data when refetch is called', async () => {
    const mockData = [
      { id: '1', fullName: 'John Doe', civilTitle: 'Dr.', Email: 'john.doe@example.com', organizationName: 'Organization A' },
    ];

    (fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const { result } = renderHook(() => useTeam());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(fetch).toHaveBeenCalledTimes(1);

    await act(async () => {
      result.current.refetch();
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

      expect(fetch).toHaveBeenCalledTimes(2);
      expect(result.current.teamData).toEqual(mockData);
    });
  });
