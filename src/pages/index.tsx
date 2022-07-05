import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStore } from '~/stores/StoreProvider';

const Home = () => {
  const { wordList, initGame } = useStore();
  const router = useRouter();

  return (
    <>
      <div className="alert shadow-lg text-center block">
        {wordList.list.length ? (
          <button
            className="btn btn-lg btn-primary"
            onClick={() => {
              initGame();
              router.push('/game');
            }}
          >
            Start
          </button>
        ) : (
          <>
            <h1 className="block text-xl font-bold mb-4">Add words to start</h1>
            <Link href="/config">
              <a role="button" className="btn btn-lg btn-secondary">
                Configure
              </a>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
