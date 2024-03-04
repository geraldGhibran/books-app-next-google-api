import { render, screen, waitFor } from '@testing-library/react';
import Favorite from '../page';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({ detailId: '1' })) // Mock detailId for testing
}));

// Mock the fetch function
jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        /* Mock your API response data here */
      })
  })
);

describe('Favorite Component', () => {
  it('renders the component with loading state', async () => {
    render(<Favorite />);

    // Check if menus and details are displayed after data is fetched
    expect(screen.getByText('Favorite')).toBeInTheDocument();
  });

  // Add more test cases as needed
});
