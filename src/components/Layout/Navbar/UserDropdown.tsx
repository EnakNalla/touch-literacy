import { signIn, signOut, useSession } from 'next-auth/react';
import { FaUser } from 'react-icons/fa';

const UserDropdown = () => {
  const { data: session, status } = useSession();

  return (
    <>
      {status === 'unauthenticated' ? (
        <button className="btn btn-primary" onClick={() => signIn()}>
          Login
        </button>
      ) : (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {session?.user?.image ? (
                <img src={session?.user?.image} alt="user image" />
              ) : (
                <FaUser />
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <button className="btn btn-ghost" onClick={() => signOut()}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default UserDropdown;
