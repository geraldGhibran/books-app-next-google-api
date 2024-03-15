'use client';
import { useEffect, useState } from 'react';
import Navbar from '../../components/general/navbar';
import BookDisplayer from '../../components/book/book-displayer';
import BookMenus from '../../components/book/book-menu';
import { IDictionaryContent } from '../../interfaces/main';
import Image from 'next/image';

export default function Favorite() {
  const [menusHome, setMenusHome] = useState<IDictionaryContent[] | undefined>(undefined);

  useEffect(() => {
    const fetchMenus = () => {
      const menusHome = [
        {
          key: 'Favorites',
          value: `${process.env.BASE_URL}mylibrary/bookshelves/0/volumes?key=${process.env.KEY_SECOND}`
        }
      ];

      setMenusHome(menusHome);
    };

    fetchMenus();
  }, []);

  return (
    <>
      <Navbar />
      {menusHome ? (
        <main className="flex min-h-screen flex-col items-center p-6 overflow-x-auto">
          <div
            aria-hidden="true"
            className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 -z-10"
          >
            <div className="blur-[106px] h-80 bg-gradient-to-br from-blue-400 to-purple-400 dark:from-blue-700"></div>
            <div className="blur-[106px] h-64 bg-gradient-to-r from-purple-400 to-cyan-300 dark:to-indigo-600"></div>
          </div>
          <BookMenus menus={menusHome} />
          <BookDisplayer menu={menusHome[0]} />
        </main>
      ) : (
        <main className="flex min-h-screen flex-col items-center bg-gray-800 justify-center">
          <div className="flex flex-row animate-ping">
            <Image className="ml-5" height={300} width={300} src="/XVo6.gif" alt="My Image" />
          </div>
        </main>
      )}
    </>
  );
}
