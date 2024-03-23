import React from 'react';
import { render, screen } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import { ActionsContext } from '../context/ActionsContext';
import Dashboard from './Dashboard';

// Mock the useAuth0 hook
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: jest.fn(),
}));

describe('Dashboard', () => {
  test('renders loading spinner when isLoading is true', () => {
    // Mock the useAuth0 hook to return isLoading as true
    useAuth0.mockReturnValue({ isLoading: true });

    // Render the Dashboard component
    render(<Dashboard />);

    // Assert that the loading spinner is rendered
    const loadingSpinner = screen.getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });

  test('renders user tasks when isLoading is false', () => {
    // Mock the useAuth0 hook to return isLoading as false
    useAuth0.mockReturnValue({ isLoading: false });

    // Mock the ActionsContext values
    const mockTasks = [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }];
    const mockContextValue = {
      tasks: mockTasks,
      loading: false,
      navigate: jest.fn(),
      setLoading: jest.fn(),
      fetchUserTodos: jest.fn(),
    };

    // Render the Dashboard component with the mocked context value
    render(
      <ActionsContext.Provider value={mockContextValue}>
        <Dashboard />
      </ActionsContext.Provider>
    );

    // Assert that the user tasks are rendered
    const taskCards = screen.getAllByTestId('task-card');
    expect(taskCards).toHaveLength(2);
  });
});