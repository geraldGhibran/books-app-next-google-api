import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookFavorite from '../book-favorite';

// Mock the fetch function to simulate the API call
jest.mock('node-fetch');

describe('BookFavorite Component', () => {
  beforeEach(() => {
    // Set up any necessary mock functions or data
    localStorage.setItem('dataTable', JSON.stringify([])); // Set an empty array initially
  });

  it('renders BookFavorite component with pagination controls', async () => {
    render(<BookFavorite />);

    // Check if the pagination controls are initially rendered
    expect(screen.getByTestId('prev')).toBeInTheDocument();
    expect(screen.getByTestId('next')).toBeInTheDocument();

    // Click next page
    fireEvent.click(screen.getByTestId('next'));

    // Wait for the component to update after the click
    await waitFor(() => expect(screen.getByText('1 | 0')).toBeInTheDocument());
  });

  // Add more test cases as needed
});
