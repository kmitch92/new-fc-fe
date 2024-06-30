import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth/authOptions';

export async function useServerSessionUser() {
  const session = await getServerSession(authOptions);

  return session?.user;
}
