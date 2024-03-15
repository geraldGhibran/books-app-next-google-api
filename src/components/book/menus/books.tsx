import { useEffect, useState } from 'react';
import { BookItem } from '@/interfaces/book';
import Image from 'next/image';
import { TableFooter } from '@/app/functions/table';
import NotImplementedMenu from './notimplemented';
import { ErrorTypes } from '@/interfaces/main';

export default function Books() {
  const [books, setBooks] = useState<BookItem[]>();
  const [searchInput, setSearchInput] = useState('');
  const [orderInput, setOrderInput] = useState<string[]>(['relevance', 'newest']);
  const [selectedOrderInput, setSelectedOrderInput] = useState<string>('relevance');
  const [filterInput, setFilterInput] = useState<string[]>([
    'partial',
    'full',
    'free-ebooks',
    'paid-ebooks',
    'ebooks'
  ]);
  const [selectedFilterInput, setSelectedFilterInput] = useState<string>('partial');
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<ErrorTypes>();

  const fetchBooksReact = async (): Promise<BookItem[]> => {
    let allBooks: BookItem[] = [];

    const response = await fetch(
      `${process.env.BASE_URL}volumes?q=react&orderBy=${selectedOrderInput}&filter=${selectedFilterInput}&maxResults=10&startIndex=${currentPageNumber}&key=${process.env.KEY_SECOND}`
    );
    const res = await response.json();

    if (!res.ok) {
      setError(res);
    }

    allBooks = res.items;

    return allBooks;
  };

  useEffect(() => {
    const fetchBooks = async (): Promise<BookItem[]> => {
      let allBooks: BookItem[] = [];

      const response = await fetch(
        `${process.env.BASE_URL}volumes?q=${searchInput}&orderBy=${selectedOrderInput}&filter=${selectedFilterInput}&maxResults=10&startIndex=${currentPageNumber}&key=${process.env.KEY_SECOND}`
      );
      const res = await response.json();

      if (!res.ok) {
        setError(res);
      }

      allBooks = res.items;

      return allBooks;
    };
    if (!searchInput) {
      fetchBooksReact().then((books) => {
        setBooks(books);
      });
    } else
      fetchBooks().then((books) => {
        setBooks(books);
      });
  }, [searchInput, currentPageNumber, selectedFilterInput, selectedOrderInput]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(event.target.value);
  };

  const prevPage = () => {
    if (books && currentPageNumber > 1) {
      setBooks(undefined);
      setCurrentPageNumber((prevNumber) => prevNumber - 10);
      setCurrentPage((prevNumber) => prevNumber - 1);
    }
  };

  const nextPage = () => {
    if (books) {
      setBooks(undefined);
      setCurrentPageNumber((prevNumber) => prevNumber + 10);
      setCurrentPage((prevNumber) => prevNumber + 1);
    }
  };

  const handleOrderInputChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedOrderInput(orderInput[parseInt(e.target.value, 10)]);
  };

  const handleFilterInputChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedFilterInput(filterInput[parseInt(e.target.value, 10)]);
  };

  return (
    <>
      <>
        <div className="relative w-7/12 mb-4" data-testid="loading-state">
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
        <div className="relative w-7/12 mb-2" data-testid="loading-state">
          <div className="flex items-end">
            <div className="max-w-sm ">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Order by:
              </label>
              <select
                onChange={handleOrderInputChange}
                className="bg-gray-800 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {orderInput.map((order, key) => (
                  <option key={key} value={key}>
                    {order}
                  </option>
                ))}
              </select>
            </div>
            <div className="max-w-sm mx-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Filter by:
              </label>

              <select
                onChange={handleFilterInputChange}
                className="bg-gray-800 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {filterInput.map((filter, key) => (
                  <option key={key} value={key}>
                    {filter}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && error?.error?.code ? (
          <NotImplementedMenu errorData={error} />
        ) : (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5">
            {books
              ? books &&
                books.map((book, index) => {
                  if (book.volumeInfo.industryIdentifiers)
                    return (
                      <div
                        data-testid="loading-state"
                        className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                        key={index}
                      >
                        <a href={`/detail/${book.volumeInfo.industryIdentifiers[0].identifier}`}>
                          <Image
                            className="p-6 rounded-t-lg flex items-center"
                            width={210}
                            height={210}
                            src={book.volumeInfo.imageLinks?.thumbnail}
                            alt="product image"
                          />
                        </a>
                        <div className="w-full px-5 pb-5 max-w-[200px]">
                          <h5 className="text-sm font-semibold tracking-tight line-clamp-3 text-gray-900 dark:text-white">
                            {book.volumeInfo.title}
                          </h5>
                        </div>
                      </div>
                    );
                })
              : Array.from({ length: 8 }, (_, index) => (
                  <div
                    className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <div className="animate-pulse bg-gray-200 h-[210px] w-[160px] p-6 m-6"></div>

                    <div className="w-full px-5 pb-5 max-w-[200px]">
                      <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
                    </div>
                  </div>
                ))}
          </div>
        )}
        <TableFooter
          fPrevPage={() => prevPage()}
          fNextPage={() => nextPage()}
          currentPage={currentPage}
          numberPages={'100'}
        />
      </>
    </>
  );
}
