import { useState } from 'react';
import { useStore } from '~/stores/StoreProvider';

const AddWord = () => {
  const { addWord } = useStore();
  const [word, setWord] = useState('');

  const handleSubmit = () => {
    addWord(word);
    setWord('');
  };

  return (
    <>
      <label htmlFor="word-input" className="label label-text">
        Add word
      </label>
      <div className="flex">
        <input
          type="text"
          value={word}
          onChange={e => setWord(e.target.value)}
          id="word-list"
          className="input input-bordered"
          onKeyUp={e => {
            if (e.code === 'Enter' && !!word) {
              handleSubmit();
            }
          }}
        />

        <button className="btn btn-primary ml-2" onClick={handleSubmit} disabled={!word}>
          Add
        </button>
      </div>
    </>
  );
};

export default AddWord;
