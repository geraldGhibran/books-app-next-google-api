import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  calculateTotalPages,
  ConvertDateFormat,
  paginateData,
  AddToWishlistData,
  ModalPlanet
} from '../utility';

// Mock axios for API calls
jest.mock('axios');

// Mock local storage for AddToWishlistData function
let localStorageMock: Record<string, string> = {};
beforeEach(() => {
  localStorageMock = {};
  jest
    .spyOn(window.localStorage.__proto__, 'getItem')
    .mockImplementation((key) => localStorageMock[key]);
  jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation((key, value) => {
    localStorageMock[key] = value;
  });
});

// Tests for calculateTotalPages function
describe('calculateTotalPages function', () => {
  it('calculates total pages correctly', () => {
    const totalItems = 15;
    const itemsPerPage = 5;
    expect(calculateTotalPages(totalItems, itemsPerPage)).toBe(3);
  });
});

// Tests for ConvertDateFormat function
describe('ConvertDateFormat function', () => {
  it('converts date format correctly', () => {
    const inputDate = '2022-01-01T12:34:56Z';
    expect(ConvertDateFormat(inputDate)).toMatch('Jan 1, 2022, 07:34:56 PM GMT+7');
  });

  it('handles invalid date format', () => {
    const inputDate = 'invalid-date';
    expect(ConvertDateFormat(inputDate)).toBe('Invalid Date');
  });
});

// Tests for AddToWishlistData function
describe('AddToWishlistData function', () => {
  it('adds item to local storage', () => {
    const newItem = { name: 'Test Planet', population: '1000000' };
    AddToWishlistData(newItem);
    const storedData = JSON.parse(localStorageMock['dataTable']);
    expect(storedData).toHaveLength(1);
    expect(storedData[0]).toEqual(newItem);
  });
});

// Tests for paginateData function
describe('paginateData function', () => {
  it('paginates data correctly', () => {
    const data = Array.from({ length: 10 }, (_, index) => ({ id: index }));
    const pageSize = 5;
    const page = 2;
    const paginatedData = paginateData(data, page, pageSize);
    expect(paginatedData).toHaveLength(pageSize);
    expect(paginatedData[0]).toEqual({ id: 5 });
  });
});

// Tests for ModalPlanet component
describe('ModalPlanet component', () => {
  it('renders and closes modal', () => {
    const fSetterInfosMock = jest.fn();
    render(<ModalPlanet infos={true} fSetterInfos={fSetterInfosMock} />);

    // Assert that the modal is rendered
    expect(screen.getByText('Message :')).toBeInTheDocument();

    // Close modal
    fireEvent.click(screen.getByText('Close modal'));

    // Assert that fSetterInfosMock is called with undefined
    expect(fSetterInfosMock).toHaveBeenCalledWith(undefined);
  });
});
