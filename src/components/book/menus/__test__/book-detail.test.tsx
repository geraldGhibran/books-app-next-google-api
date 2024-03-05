import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import BookDetail from '../book-detail';

// Mocking axios get function
jest.mock('axios');

describe('BookDetail component', () => {
  const mockBookData = {
    data: {
      items: [
        {
          volumeInfo: {
            title: 'Test Book',
            publisher: 'Test Publisher',
            description: 'Test Description',
            imageLinks: {
              thumbnail: 'test-image.jpg'
            }
          },
          saleInfo: {
            listPrice: {
              amount: 10
            }
          }
        }
      ]
    }
  };

  beforeEach(() => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(mockBookData);
  });

  test('renders book details correctly', async () => {
    const { getByText, getByAltText } = render(<BookDetail data={{ value: 'test-url' }} />);

    // Wait for the data to be fetched and rendered
    await waitFor(() => {
      expect(getByText('Test Book')).toBeInTheDocument();
      expect(getByText('Test Description')).toBeInTheDocument();
      expect(getByText('Rp 10,00')).toBeInTheDocument(); // Assuming rupiah function converts amount to 'Rp'
      expect(getByAltText('product image')).toBeInTheDocument();
    });
  });
});
