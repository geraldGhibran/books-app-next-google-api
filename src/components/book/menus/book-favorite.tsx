import { useEffect, useState } from 'react';

import { ConvertDateFormat, ModalPlanet } from '@/app/functions/utility';
import { TableHeader } from '@/app/functions/table';
import { BookItem } from '@/interfaces/book';
import { TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast';
import { ErrorTypes, IDictionaryContent } from '@/interfaces/main';
import NotImplementedMenu from './notimplemented';

export default function BookFavorite(props: { data: IDictionaryContent }) {
  const [booksFavorite, setBookFavorite] = useState<BookItem[]>();
  const [modalInfos, setModalInfos] = useState<boolean>();
  const [success, isSuccess] = useState<boolean>();
  const [bookId, setBookId] = useState<string>('');
  const [bookTitle, setBookTitle] = useState<string>('');
  const [error, setError] = useState<ErrorTypes>();

  const { data } = useSession();

  const token = data?.access_token;

  useEffect(() => {
    const { data } = props;

    async function fetchBooks() {
      const res = await fetch(data.value, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const response = await res.json();
      if (!response.ok) {
        setError(response);
      }

      return response;
    }
    if (!success) {
      fetchBooks().then((books) => {
        setBookFavorite(books.items);
      });
    } else
      fetchBooks().then((books) => {
        setBookFavorite(books.items);
      });
  }, [props, success]);

  async function removeFavorite(id: string) {
    const res = await fetch(
      `${process.env.BASE_URL}mylibrary/bookshelves/0/removeVolume?volumeId=${id}&key=${process.env.KEY_SECOND}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ time: new Date().toISOString() })
      }
    );
    const data = await res.json();
    if (!res.ok) {
      setModalInfos(!modalInfos);
      isSuccess(!success);
      toast.error(data.error.message);
    }

    if (res.ok) {
      setModalInfos(!modalInfos);
      isSuccess(!success);

      toast.success('Removed from favorite');
    }

    return data;
  }

  const modalRemove = (book: BookItem) => {
    setModalInfos(true);
    setBookId(book.id);
    setBookTitle(book.volumeInfo.title);
  };

  return (
    <>
      <>
        <Toaster containerClassName="text-xs" />

        {error && error?.error?.code ? (
          <NotImplementedMenu errorData={error} />
        ) : (
          <table className="lg:w-7/12 sm:w-auto xs:w-auto border-collapse rounded-t-lg bg-white text-left text-sm text-gray-500 overflow-x-auto">
            <TableHeader headers={['Name', 'Created Date', 'Cover', 'Edit']} />
            <tbody
              id="tableId"
              className="divide-y divide-gray-100 border-t border-gray-100 overflow-x-auto"
            >
              {booksFavorite
                ? booksFavorite &&
                  booksFavorite.map((book, index) => {
                    return (
                      <tr className="hover:bg-gray-50" key={index}>
                        {modalInfos && (
                          <ModalPlanet
                            submitForm={() => removeFavorite(bookId)}
                            fSetterInfos={setModalInfos}
                            remove={true}
                            infos={`Remove ''${bookTitle}'' from favorite?`}
                          />
                        )}
                        <th className="flex gap-3 px-6 py-4 font-normal text-xs text-gray-900">
                          <span className="line-clamp-1 inline-flex items-center gap-1 rounded-sm bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600">
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
                        <td className="px-4 py-2">
                          <div
                            onClick={() => modalRemove(book)}
                            className="flex justify-start ml-2 gap-1"
                          >
                            <TrashIcon className="block h-6 w-6 text-red-600" aria-hidden="true" />
                          </div>
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
                            <TrashIcon className="block h-6 w-6" aria-hidden="true" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        )}
      </>
    </>
  );
}
