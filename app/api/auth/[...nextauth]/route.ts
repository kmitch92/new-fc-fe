import NextAuth, { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';

import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
  NextApiHandler,
} from 'next';

export async function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}

const handler: NextApiHandler = NextAuth(authOptions);

export { handler as GET, handler as POST };
