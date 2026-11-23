import { cookies } from 'next/headers';

/** True when the request carries a valid admin session cookie. */
export async function isAdmin(): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const session = (await cookies()).get('admin_session');
  return session?.value === secret;
}
