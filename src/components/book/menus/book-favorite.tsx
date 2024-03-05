import { useEffect, useState } from 'react';

import {
  ConvertDateFormat,
  paginateData,
  calculateTotalPages
} from '../../../app/functions/utility';
import { TableFooter, TableHeader } from '../../../app/functions/table';
import { BookItem } from '../../../interfaces/swapi';
import { HeartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function BookFavorite() {
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<string>('1');
  const [maxPageNumber, setMaxPageNumber] = useState<number>(1);
  const [booksFavorite, setBookFavorite] = useState<BookItem[]>();

  useEffect(() => {
    if (booksFavorite) {
      const result = localStorage.getItem('dataTable');
      const storageData: BookItem[] = result ? JSON.parse(result) : [];
      const itemsPerPage = 5;
      const totalPages: number = calculateTotalPages(storageData.length, itemsPerPage);

      const totalPagesString: string = totalPages.toString();
      const totalPagesNumber: number = parseInt(totalPagesString, 10);

      setMaxPage(totalPagesString);
      setMaxPageNumber(totalPagesNumber);
    }
  }, [booksFavorite]);

  const prevPage = () => {
    if (booksFavorite && currentPageNumber > 1) {
      setBookFavorite(undefined);
      setCurrentPageNumber((prevNumber) => prevNumber - 1);
      renderPage(currentPageNumber - 1);
    }
  };

  const nextPage = () => {
    if (booksFavorite && currentPageNumber <= maxPageNumber - 1) {
      setBookFavorite([]);
      setCurrentPageNumber((prevNumber) => prevNumber + 1);
      renderPage(currentPageNumber + 1);
    }
  };

  const renderPage = (page: number): void => {
    const result = localStorage.getItem('dataTable');
    const storageData: BookItem[] = result ? JSON.parse(result) : [];
    const pageSize: number = 5;

    const paginatedData = paginateData(storageData, page, pageSize);

    setBookFavorite(paginatedData);
  };

  if (!booksFavorite) {
    renderPage(currentPageNumber);
  }
  return (
    <>
      <>
        <table className="lg:w-full sm:w-auto xs:w-auto border-collapse rounded-t-lg bg-white text-left text-sm text-gray-500 overflow-x-auto">
          <TableHeader headers={['Name', 'Created Date', 'Cover']} />
          <tbody
            id="tableId"
            className="divide-y divide-gray-100 border-t border-gray-100 overflow-x-auto"
          >
            {booksFavorite
              ? booksFavorite &&
                booksFavorite.map((book, index) => {
                  return (
                    <tr className="hover:bg-gray-50" key={index}>
                      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600">
                          {book.volumeInfo.title}
                        </span>
                      </th>
                      <td className="px-4 py-4 text-xs">
                        {ConvertDateFormat(book.volumeInfo.publishedDate)}
                      </td>
                      <td className="px-4 py-2">
                        <Image
                          className="ml-5"
                          height={40}
                          width={40}
                          src={book.volumeInfo.imageLinks.thumbnail}
                          alt="My Image"
                        />
                      </td>
                    </tr>
                  );
                })
              : Array.from({ length: 10 }, (_, index) => (
                  <tr className="hover:bg-gray-50" key={index}>
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
                    </th>
                    <td className="px-6 py-4">
                      <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-4">
                        <a className="cursor-wait">
                          <HeartIcon className="block h-6 w-6" aria-hidden="true" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        <TableFooter
          fPrevPage={() => prevPage()}
          fNextPage={() => nextPage()}
          currentPage={currentPageNumber}
          numberPages={maxPage}
        />
      </>
    </>
  );
}
