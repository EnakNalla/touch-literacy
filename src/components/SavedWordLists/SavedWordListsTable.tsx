import { observer } from 'mobx-react-lite';
import { useStore } from '~/stores/StoreProvider';

const SavedWordListsTable = () => {
  const { wordLists, updateWordList, removeWordList, loadWordList } = useStore();

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <tbody>
          {wordLists.map(wordList => (
            <tr key={wordList.name}>
              <td>{wordList.name}</td>
              <td>
                <button className="btn btn-success" onClick={() => loadWordList(wordList)}>
                  Load
                </button>
              </td>
              <td>
                <button className="btn btn-secondary" onClick={() => updateWordList(wordList.name)}>
                  Update
                </button>
              </td>
              <td>
                <button className="btn btn-error" onClick={() => removeWordList(wordList.name)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default observer(SavedWordListsTable);
