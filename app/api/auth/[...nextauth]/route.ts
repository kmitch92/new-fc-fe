import NextAuth, { NextAuthOptions, getServerSession } from 'next-auth';
import { MUser } from '../../types/user-model';
import type { Session, Account, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
  NextApiHandler,
} from 'next';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { connectDB } from '../../db';

const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
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
      const userEmail = session.user?.email;
      const dbUser = await MUser.findOne({ email: userEmail });
      if (!dbUser) {
        throw new Error('User not found');
      }
      session.user = {
        id: dbUser._id,
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image,
      };
      session.accessToken = (token.accessToken as string) || undefined;
      return session;
    },

    async signIn(params: { user: User }): Promise<any> {
      const { user } = params;
      console.log('Sign In Callback', user);
      try {
        await connectDB();
        // Check if user exists in DB
        const existingUser = await MUser.findOne({ email: user.email });
        if (existingUser) {
          console.log('User already exists in DB');
          return true;
        }
        // Create new user
        const newUser = await MUser.create({
          name: user.name as string,
          email: user.email as string,
          image: user.image as string,
        });
        console.log('New User Created: ', newUser);
        return true;
      } catch (error) {
        console.error('Error Signing In: ', error);
        return false;
      }
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

const handler: NextApiHandler = NextAuth(options);

export { handler as GET, handler as POST };
