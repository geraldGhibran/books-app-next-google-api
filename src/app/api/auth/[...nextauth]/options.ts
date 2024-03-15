import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    access_token?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      profile(profile: any) {
        let userRole: string = 'Google User';
        return {
          ...profile,
          id: profile.sub,
          role: userRole
        };
      },
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          scope: [
            'openid',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/books'
            // and more scope urls
          ].join(' ')
        }
      }
    })
  ],
  callbacks: {
    jwt: ({ token, account }) => {
      if (account?.access_token) {
        token.access_token = account.access_token;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session) {
        session = Object.assign({}, session, { access_token: token.access_token });
      }
      return session;
    }
  }
};

export default authOptions;
