import NextAuth, { NextAuthOptions, getServerSession } from 'next-auth';
import type { Session, Account } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email:', type: 'email' },
        password: { label: 'Password:', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        //retrieve user data here to verify with credentials
        const user = {
          id: 1,
          name: 'Kiel Mitchell',
          email: 'kielmitchell8@gmail.com',
          password: '1Painter',
        };
        if (
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt(params: { token: JWT; account: Account | null }): Promise<any> {
      let { token, account } = params;
      if (account) {
        token.accessToken = account.access_token;
        token.id = account.id;
      }
      return token;
    },

    async session(params: { session: Session; token: JWT }): Promise<any> {
      let { session, token } = params;
      session.accessToken = (token.accessToken as string) || undefined;
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
};
export async function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, options);
}

const handler = NextAuth(options);

export { handler as GET, handler as POST };
