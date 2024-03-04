'use client';

import { IDictionaryContent } from '../../interfaces/main';

export default function SwapiMenus(props: {
  menus: IDictionaryContent[] | undefined;
  indexChanger: any;
  selectedIndex: number;
}) {
  const { menus, indexChanger, selectedIndex } = props;

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="flex items-center px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div className="rounded-lg">
            <nav
              className="isolate inline-flex -space-x-px  shadow-sm bg-transparent"
              aria-label="Pagination"
            >
              {menus &&
                menus.map((menu, index) => {
                  return index == selectedIndex ? (
                    <a
                      aria-current="page"
                      className="relative z-10 inline-flex items-center bg-transparent px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 capitalize cursor-pointer"
                      onClick={() => indexChanger(index)}
                      key={index + 2}
                    >
                      {menu.key}
                    </a>
                  ) : (
                    <a
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 capitalize cursor-pointer"
                      onClick={() => indexChanger(index) + 2}
                    >
                      {menu.key}
                    </a>
                  );
                })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
