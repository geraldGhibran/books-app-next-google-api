'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MenuDisplayer from '../../../components/book/book-displayer';
import BookMenus from '../../../components/book/book-menu';
import { IDictionaryContent } from '../../../interfaces/main';
import Image from 'next/image';
import Navbar from '@/components/general/navbar';

/**
 * Renders a detailed information about a specific item.
 * @returns {JSX.Element} The rendered React component.
 */
export default function Detail() {
  const { detailId } = useParams();
  const [menusHome, setMenusHome] = useState<IDictionaryContent[] | undefined>();

  useEffect(() => {
    const fetchMenus = () => {
      const menusHome = [
        {
          key: `Detail`,
          value: `${process.env.BASE_URL}volumes?q=${detailId}&key=${process.env.KEY_SECOND}`
        }
      ];

      setMenusHome(menusHome);
    };

    fetchMenus();
  }, [detailId]);

  return (
    <>
      <Navbar />
      {menusHome ? (
        <main className="flex min-h-screen flex-col items-center p-6">
          {/* Background styling */}
          <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 -z-10">
            {/* Background gradient elements */}
            <div className="blur-[106px] h-80 bg-gradient-to-br from-blue-400 to-purple-400 dark:from-blue-700"></div>
            <div className="blur-[106px] h-64 bg-gradient-to-r from-purple-400 to-cyan-300 dark:to-indigo-600"></div>
          </div>
          {/* Display menus and details */}
          <BookMenus menus={menusHome} />
          <MenuDisplayer menu={menusHome[0]} />
        </main>
      ) : (
        // Loading state
        <main className="flex min-h-screen flex-col items-center bg-gray-800 justify-center">
          <div id="loading-state" className="flex flex-row animate-ping">
            <Image className="ml-5" height={300} width={300} src="/XVo6.gif" alt="Star Wars Logo" />
          </div>
        </main>
      )}
    </>
  );
}
