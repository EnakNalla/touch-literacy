import Link from 'next/link';
import { MdTouchApp } from 'react-icons/md';
import ThemeToggle from './ThemeToggle';
import UserDropdown from './UserDropdown';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/">
          <a className="btn btn-ghost">
            <MdTouchApp className="text-primary" size="32" />
            <span className="normal-case text-xl">Touch Literacy</span>
          </a>
        </Link>

        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/config">
              <a>Config</a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-none gap-2">
        <UserDropdown />

        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
