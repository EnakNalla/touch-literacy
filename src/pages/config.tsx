import SavedWordLists from '~/components/SavedWordLists';
import WordList from '~/components/WordList';

const Config = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div>
        <WordList />
      </div>

      <div>
        <SavedWordLists />
      </div>
    </div>
  );
};

export default Config;
