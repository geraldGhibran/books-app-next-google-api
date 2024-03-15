import { useEffect, useState } from 'react';
import { ModalPlanet, rupiah } from '../../../app/functions/utility';
import { ErrorTypes, IDictionaryContent } from '../../../interfaces/main';
import { BookItem } from '../../../interfaces/book';
import { EyeIcon, HeartIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import NotImplementedMenu from './notimplemented';

export default function BookDetail(props: { data: IDictionaryContent }) {
  const [modalInfos, setModalInfos] = useState<boolean>();
  const [bookDetail, setBookDetail] = useState<BookItem[]>();
  const [error, setError] = useState<ErrorTypes>();

  useEffect(() => {
    const { data } = props;
    axios
      .get(data.value)
      .then(function (response) {
        setBookDetail(response.data.items);
      })
      .catch(function (error) {
        toast.error(error.message);
        setError(error);
        console.log(error);
      });
  }, [props]);

  const { data, status } = useSession();

  let token = data?.access_token;

  // console.log(bookDetail)

  async function addFavorite(id: string) {
    const res = await fetch(
      `${process.env.BASE_URL}mylibrary/bookshelves/0/addVolume?volumeId=${id}&key=${process.env.KEY_SECOND}`,
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
      toast.error(data.error.message);
    }

    if (res.ok) {
      setModalInfos(!modalInfos);
      toast.success('Added to favorite');
    }

    return data;
  }

  return (
    <>
      <>
        <Toaster containerClassName="text-xs" />
        {error && error?.message ? (
          <NotImplementedMenu errorData={error} />
        ) : (
          <div>
            {bookDetail &&
              bookDetail.map((book, index) => {
                return (
                  <div
                    className="p-1 grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-0"
                    key={index}
                  >
                    {modalInfos && (
                      <ModalPlanet
                        submitForm={() => addFavorite(book.id)}
                        fSetterInfos={setModalInfos}
                        infos={'Add to favorite?'}
                        remove={false}
                      />
                    )}
                    <Image
                      className=" rounded-lg flex items-center lg:w-2/3 md:w-2/3 w-full  mb-10"
                      src={book.volumeInfo.imageLinks.thumbnail}
                      height={300}
                      width={300}
                      alt="product image"
                    />

                    <div className="max-w-md lg:pt-[100px] md:pt-[100px]">
                      <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {book.volumeInfo.title}
                        </h5>
                      </a>
                      <div className="p-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <span className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
                          Publish By {book.volumeInfo.publisher}
                        </span>
                        <p className="mb-3 line-clamp-6 font-normal text-gray-700 dark:text-gray-400">
                          {book.volumeInfo.description}
                        </p>
                      </div>

                      <div className="px-5 pb-5">
                        <div className="flex items-center mt-2.5 mb-5">
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            Authored By:
                          </div>

                          {book.volumeInfo.authors &&
                            book.volumeInfo.authors.map((author, index) => {
                              return (
                                <span
                                  className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3"
                                  key={index}
                                >
                                  {author}
                                </span>
                              );
                            })}
                        </div>
                        <div className="flex items-center justify-start gap-2">
                          <span className="p-2 text-sm font-bold text-gray-900 dark:text-white">
                            {rupiah(book.saleInfo.listPrice?.amount)}
                          </span>
                          <Link
                            passHref
                            href={book.volumeInfo.previewLink}
                            className="cursor-pointer inline-flex items-center px-3 py-2 text-xs font-medium text-center text-blue-700 bg-blue-700 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-200 dark:hover:bg-blue-300 dark:focus:ring-blue-600"
                          >
                            Free Preview
                            <EyeIcon className="block h-6 w-6" aria-hidden="true" />
                          </Link>

                          {status == 'authenticated' ? (
                            <div
                              onClick={() => setModalInfos(true)}
                              className="cursor-pointer inline-flex items-center px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Add to Favorite
                              <HeartIcon className="block h-6 w-6" aria-hidden="true" />
                            </div>
                          ) : (
                            <Link
                              passHref
                              className="cursor-pointer inline-flex items-center px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              href="/api/auth/signin"
                            >
                              Login Google{' '}
                              <HeartIcon className="block h-6 w-6" aria-hidden="true" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </>
    </>
  );
}
