import { useEffect, useState } from 'react';
import { BookItem } from '../../../interfaces/swapi';
import fetch from 'node-fetch';

export default function SwapiPlanets() {
  const [books, setBooks] = useState<BookItem[]>();
  const [searchInput, setSearchInput] = useState('');

  const fetchBooks = async (): Promise<BookItem[]> => {
    let allBooks: BookItem[] = [];

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=AIzaSyBfWiQzHbNp2hIGBf151m2pKRDMR6lrhh8`
    );
    const data = await response.json();

    allBooks = data.items;

    return allBooks;
  };

  const fetchBooksReact = async (): Promise<BookItem[]> => {
    let allBooks: BookItem[] = [];

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=react&key=AIzaSyBfWiQzHbNp2hIGBf151m2pKRDMR6lrhh8`
    );
    const data = await response.json();

    allBooks = data.items;

    return allBooks;
  };

  useEffect(() => {
    if (!searchInput) {
      fetchBooksReact().then((books) => {
        setBooks(books);
      });
    } else
      fetchBooks().then((books) => {
        setBooks(books);
      });
  }, [searchInput]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(event.target.value);
  };

  return (
    <>
      <>
        <div className="relative w-7/12 mb-2" data-testid="loading-state">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search books name..."
            onChange={handleChange}
            value={searchInput}
            required
          />
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5">
          {books &&
            books.map((book, index) => {
              if (book.volumeInfo.industryIdentifiers)
                return (
                  <div
                    data-testid="loading-state"
                    className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    
                  >
                    <a href={`/detail/${book.volumeInfo.industryIdentifiers[0].identifier}`}>
                      <img
                        className="p-6 rounded-t-lg flex items-center"
                        src={book.volumeInfo.imageLinks.thumbnail}
                        alt="product image"
                      />
                    </a>
                    <div className="w-full px-5 pb-5 max-w-[200px]">
                      <h5 className="text-lg font-semibold tracking-tight line-clamp-3 text-gray-900 dark:text-white">
                        {book.volumeInfo.title}
                      </h5>
                    </div>
                  </div>
                );
            })}
        </div>
      </>
    </>
  );
}
