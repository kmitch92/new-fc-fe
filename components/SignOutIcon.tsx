'use client';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'next-auth/react';

export default function SignOutIcon() {
  return (
    <button className="btn btn-square btn-ghost" onClick={() => signOut()}>
      <LogoutIcon className="text-primary" />
    </button>
  );
}
