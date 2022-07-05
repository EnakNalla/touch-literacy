import { useStore } from '~/stores/StoreProvider';

const GameFinished = () => {
  const { results } = useStore();

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>index</th>
            <th>word</th>
            <th>tries</th>
          </tr>
        </thead>
        <tbody>
          {results.map(item => (
            <tr key={item.index}>
              <td>{item.index}</td>
              <td>{item.word}</td>
              <td>{item.tries}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameFinished;
