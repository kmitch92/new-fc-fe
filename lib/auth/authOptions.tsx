import { NextAuthOptions } from 'next-auth';
import { User } from '../api/models/user-model';
import type { Session, Account, User as TUser } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { connectDB } from '../api/db';
import { signOut } from 'next-auth/react';

export const authOptions: NextAuthOptions = {
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
      let dbJSONUser;
      try {
        dbJSONUser = await User.findOne({ email: userEmail }).maxTimeMS(
          1000
        );
      } catch (err) {
        console.log(err)
        throw new Error('User not found');
      }
      if (!dbJSONUser) {
        throw new Error('User not found');
      }
      const dbUser = JSON.parse(JSON.stringify(dbJSONUser));
      session.user = {
        id: dbUser._id,
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image,
        decks: dbUser.decks,
        tagsUsed: dbUser.tagsUsed,
      };
      session.accessToken = (token.accessToken as string) || undefined;
      return session;
    },

    async signIn(params: { user: TUser }): Promise<any> {
      const { user } = params;
      console.log('Sign In Callback', user);
      try {
        await connectDB();
        // Check if user exists in DB
        const existingUser = await User.findOne({
          email: user.email,
        }).maxTimeMS(1000);
        if (existingUser) {
          console.log('User already exists in DB');
          return true;
        }
        // Create new user
        const newUser = await User.create({
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
