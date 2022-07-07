import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useStore } from '~/stores/StoreProvider';
import Navbar from './Navbar';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { status, data: session } = useSession();
  const { setWordListsFromSession } = useStore();
  useEffect(() => {
    if (status === 'authenticated') {
      setWordListsFromSession(session.user.wordLists ?? []);
    }
  }, [status]);

  return (
    <>
      <Navbar />

      <main className="container mx-auto max-w-screen-xl">{children}</main>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Layout;
