import { signIn, useSession } from 'next-auth/react';
import SavedWordListsTable from './SavedWordListsTable';
import SaveWordList from './SaveWordList';

const SavedWordLists = () => {
  const { status } = useSession();

  return (
    <>
      {status === 'authenticated' ? (
        <>
          <SaveWordList />

          <SavedWordListsTable />
        </>
      ) : (
        <button className="btn btn-info btn-block btn-lg" onClick={() => signIn()}>
          Login to save word lists
        </button>
      )}
    </>
  );
};

export default SavedWordLists;
