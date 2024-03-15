import './globals.css';
import { Inter } from 'next/font/google';
import AuthProvider from '@/components/auth/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'books app',
  description:
    'Created with next js and Google Books API by Gerald Ghibran : https://github.com/geraldGhibran/books-app-next-google-api'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
