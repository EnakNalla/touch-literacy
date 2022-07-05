import { useState } from 'react';
import { toast } from 'react-toastify';
import { useStore } from '~/stores/StoreProvider';

const SaveWordList = () => {
  const { saveWordList } = useStore();
  const [wordListName, setWordListName] = useState('');

  const handleSubmit = async () => {
    try {
      await saveWordList(wordListName);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <label htmlFor="word-input" className="label label-text">
        Save word list
      </label>
      <div className="flex">
        <input
          type="text"
          value={wordListName}
          onChange={e => setWordListName(e.target.value)}
          id="word-list"
          className="input input-bordered"
          onKeyUp={e => {
            if (e.code === 'Enter' && !!wordListName) {
              handleSubmit();
            }
          }}
        />

        <button className="btn btn-primary ml-2" onClick={handleSubmit} disabled={!wordListName}>
          Save
        </button>
      </div>
    </>
  );
};

export default SaveWordList;
