import { useSession } from 'next-auth/react';
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
        <div className="alert alert-info shadow-lg">
          <h1 className="text-2xl text-center">Login to save word lists</h1>
        </div>
      )}
    </>
  );
};

export default SavedWordLists;
