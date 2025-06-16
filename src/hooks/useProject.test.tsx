// useProjectDetails.test.js
import { renderHook, waitFor } from '@testing-library/react';
import { useProjectDetails } from './useProject';

// Mock the global fetch function
global.fetch = jest.fn();

describe('useProjectDetails Hook', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should handle missing project ID', async () => {
    const { result } = renderHook(() => useProjectDetails(undefined));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("No project ID provided.");
      expect(result.current.backendProject).toBeNull();
    });
  });

  it('should fetch and transform project details successfully', async () => {
    const mockBackendData = {
      id: 1,
      title: 'Project 1',
      description: 'Description for Project 1',
      images: ['image1.jpg', 'image2.jpg'],
      logo: 'logo1.jpg',
    };

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockBackendData),
      })
    );

    const { result } = renderHook(() => useProjectDetails('1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.backendProject).toEqual({
      ...mockBackendData,
      images: [
        'https://localhost:8080/LabManager/api/v4/images/image1.jpg',
        'https://localhost:8080/LabManager/api/v4/images/image2.jpg',
      ],
      logo: 'https://localhost:8080/LabManager/api/v4/images/logo1.jpg',
    });
  });

  it('should handle fetch errors', async () => {
    const errorMessage = 'Project not found';

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    );

    const { result } = renderHook(() => useProjectDetails('1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Project with ID '1' not found.");
    expect(result.current.backendProject).toBeNull();
  });

  it('should handle network errors', async () => {
    const errorMessage = 'Network error';

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    const { result } = renderHook(() => useProjectDetails('1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("An unknown error occurred while fetching project details.");
    expect(result.current.backendProject).toBeNull();
  });
});
