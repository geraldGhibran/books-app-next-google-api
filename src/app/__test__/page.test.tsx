import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Home from '../page';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Home Component', () => {


  it('changes index when bookMenus is clicked', async () => {
    const mockedData = {
      planets: 'https://book.dev/api/planets/'
      // Add more mock data if needed based on your API response
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockedData });

    render(<Home />);

    // Wait for data to be loaded
    await waitFor(() => {
      const bookMenus = screen.getByTestId('book-menus');

      // Check if bookMenus is initially rendered
      expect(bookMenus).toBeInTheDocument();

      // Simulate a click on the bookMenus item
      userEvent.click(bookMenus);

      // Check if the index is updated
      expect(screen.getByTestId('book-displayer')).toBeInTheDocument();
    });
  });
});
