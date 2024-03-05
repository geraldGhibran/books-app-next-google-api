import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'books app',
  description:
    'Created with next js and Google Books API by Gerald Ghibran : https://github.com/geraldGhibran/books-app-next-google-api'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
      <script
        dangerouslySetInnerHTML={{
          __html: `</script><link rel='preload' href='style.css' as='style' onload="this.onload=null;this.rel='stylesheet'"/><script>`
        }}
      />
    </>
  );
}
