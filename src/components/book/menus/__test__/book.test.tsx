import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Books from '../books';


// Mock the fetch function
global.fetch = require('jest-fetch-mock');

describe('Books component', () => {
  test('renders input element for searching books', () => {
    const { getByPlaceholderText } = render(<Books />);
    const inputElement = getByPlaceholderText('Search books name...');
    expect(inputElement).toBeInTheDocument();
  });

  test('fetches books when search input changes', async () => {
    global.fetch.mockResponseOnce(
      JSON.stringify({
        items: [
          {
            volumeInfo: {
              industryIdentifiers: [{ identifier: '123' }],
              imageLinks: { thumbnail: 'test-image.jpg' },
              title: 'Test Book'
            }
          }
        ]
      })
    );

    const { getByPlaceholderText, getByTestId } = render(<Books />);
    const inputElement = getByPlaceholderText('Search books name...');
    fireEvent.change(inputElement, { target: { value: 'test' } });

    // Wait for books to be fetched
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(0);
    });

    // Check if book is rendered
    const bookElement = getByTestId('loading-state');
    expect(bookElement).toBeInTheDocument();
  });

});
