import React from 'react';
import Themer from './Themer';
import MenuIcon from '@mui/icons-material/Menu';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SignOutIcon from './SignOutIcon';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="navbar bg-base-200">
      <div className="flex-none">
        <div className="drawer drawer-start">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-4"
              className="drawer-button btn btn-square btn-ghost"
            >
              <MenuIcon />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          Flashcards
        </Link>
      </div>

      <div className="flex-none">
        <Themer />
        <Link href={'/sign-out'}>
          <SignOutIcon />
        </Link>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <MoreHorizIcon />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
