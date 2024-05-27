import NextAuth, { NextAuthOptions, getServerSession } from 'next-auth';
import type { Session, Account } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
  NextApiHandler,
} from 'next';
import { getUserByEmail } from '../../utils/user.controller';
import { IUserFE } from '../../models/user';
import { MySession, MyUser, Credentials } from '../../types/auth-types';
import bcrypt from 'bcryptjs';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { UserX } from '../../utils/user.controller';

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
        const { email, password } = credentials as Credentials;
        const user: UserX | null = await getUserByEmail(email);
        //retrieve user data here to verify with credentials

        if (!user) {
          throw new Error('No User Found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error('Password doesnt Match');
        }
        return {
          id: user._id,
          name: user.name,
          email: user.email,
        };
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
