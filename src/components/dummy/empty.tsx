import { EyeSlashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function NotImplementedMenu() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8 w-7/12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <div className="text-purple-700 flex flex-row w-full justify-center">
          <EyeSlashIcon height={60} />
        </div>
        <figure className="mt-10">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p className="text-lg">Oops Nothing to see here</p>
            <p className="text-lg">
              <Link href="/"> Add some favorite books in this link</Link>
            </p>
          </blockquote>
        </figure>
      </div>
    </section>
  );
}
