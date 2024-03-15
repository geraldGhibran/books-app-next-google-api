import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export function TableHeader(props: { headers: Array<string> }) {
  const { headers } = props;
  return (
    <thead className="bg-transparent">
      <tr>
        {headers.map((header, index) => {
          return (
            <th scope="col" className="px-6 py-4 font-medium text-gray-900" key={index}>
              {header}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export function TableFooter(props: {
  fPrevPage: () => void;
  fNextPage: () => void;
  currentPage: number;
  numberPages: string;
}) {
  const { fPrevPage, fNextPage, currentPage, numberPages } = props;

  return (
    <div className="flex flex-row text-gray-900 lg:w-1/2 sm:w-auto xs:w-auto justify-between rounded-b-lg">
      <div data-testid="prev" className="flex justify-center px-6 py-4 w-1/6">
        <button
          aria-label="button previous"
          className=" flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => fPrevPage()}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="flex justify-center px-6 py-4 w-4/6 items-center text-white">
        {<p>{`${currentPage} `}</p>}
        {/* uncomment tag <p> below if you have proper pagination data */}
        {/* {<p>{`${currentPage} | ${numberPages}`}</p>} */}
      </div>
      <div className="flex justify-center px-6 py-4 w-1/6">
        {' '}
        <button
          data-testid="next"
          aria-label="button next"
          className=" flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => fNextPage()}
          type="button"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
