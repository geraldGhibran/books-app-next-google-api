'use client';
import Navbar from '../components/general/navbar';
import BookDisplayer from '../components/book/book-displayer';
import BookMenus from '../components/book/book-menu';
import { IDictionaryContent } from '../interfaces/main';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [bookMenus, setBookMenus] = useState<IDictionaryContent[] | undefined>();
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    axios
      .get<Record<string, string>>(
        `https://www.googleapis.com/books/v1/volumes?q=react&Akey=AIzaSyAbOfWGZmCQnh6V9mX10lxenPR_MCo4sjc`
      )
      .then(function (response) {
        var mappedDictionary: IDictionaryContent[] = Object.entries(response.data).map(
          ([key, value]) => {
            return {
              key,
              value
            };
          }
        );
        setBookMenus(mappedDictionary);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const changeIndex = (number: number) => {
    if (number >= 0 && number < bookMenus!.length) {
      setIndex(number);
    }
  };

  let menusHome = [
    {
      key: 'Books',
      value: ''
    }
  ];

  return (
    <>
      <Navbar />
      {bookMenus ? (
        <main data-testid="loading-state" className="flex min-h-screen flex-col items-center p-6">
          <div
            aria-hidden="true"
            className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 -z-10"
          >
            <div className="blur-[106px] h-80 bg-gradient-to-br from-blue-400 to-purple-400 dark:from-blue-700"></div>
            <div className="blur-[106px] h-64 bg-gradient-to-r from-purple-400 to-cyan-300 dark:to-indigo-600"></div>
          </div>
          <BookMenus menus={menusHome} indexChanger={changeIndex} selectedIndex={index} />
          <BookDisplayer menu={menusHome[index]} detailPage={false} />
        </main>
      ) : (
        <main
          data-testid="loading-state"
          className="flex min-h-screen flex-col items-center bg-gray-800 justify-center"
        >
          <div className="flex flex-row animate-ping">
            <Image className="ml-5" height={300} width={300} src="/XVo6.gif" alt="My Image" />
          </div>
        </main>
      )}
    </>
  );
}
