import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { FaAssistiveListeningSystems, FaEye } from 'react-icons/fa';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { useStore } from '~/stores/StoreProvider';

const Game = () => {
  const router = useRouter();
  const store = useStore();
  const [guess, setGuess] = useState('');
  const [showWord, setShowWord] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [correct, setCorrect] = useState(false);
  const keyboard = useRef<any>(null);

  useEffect(() => {
    setTimeout(() => setShowWord(false), 1000);
    store.speak(store.word);
  }, [store.word]);

  useEffect(() => {
    if (store.gameFinished) router.push('/game-finished');
  }, [store.gameFinished]);

  const resetInput = () => {
    keyboard.current.clearInput();
    setGuess('');
  };

  const handleCorrectGuess = () => {
    setCorrect(true);
    setOpenModal(true);

    setTimeout(() => {
      setOpenModal(false);
      store.handleCorrectGuess();
      resetInput();
    }, 2000);
  };

  const handleIncorrectGuess = () => {
    setCorrect(false);
    setOpenModal(true);

    setTimeout(() => {
      store.handleIncorrectGuess();
      setOpenModal(false);
      resetInput();
    }, 2000);
  };

  const checkGuess = () => {
    if (store.word === guess) handleCorrectGuess();
    else handleIncorrectGuess();
  };

  return (
    <div className="container mx-auto text-center">
      <h2 className="mb-2">
        {store.index} / {store.wordList.list.length}
      </h2>
      {showWord && <h1 className="text-xl">{store.word}</h1>}
      <div className="mb-4">
        <div
          className="btn btn-lg mr-8"
          role="button"
          onClick={() => {
            store.speak(store.word);
          }}
        >
          <FaAssistiveListeningSystems size="40" />
          <span className="text-lg ml-4">Listen</span>
        </div>
        <div
          className="btn btn-lg"
          role="button"
          onClick={() => {
            setShowWord(true);
            setTimeout(() => setShowWord(false), 1000);
          }}
        >
          <FaEye size="40" />
          <span className="text-lg ml-4">Peak</span>
        </div>
      </div>

      <div className="flex justify-center">
        <input value={guess} readOnly className="input input-lg" />
        <button className="btn btn-primary btn-lg" onClick={checkGuess}>
          Check
        </button>
      </div>

      <div className="mt-4">
        <Keyboard
          value={guess}
          onChange={input => setGuess(input)}
          keyboardRef={r => (keyboard.current = r)}
        />
      </div>

      <input
        checked={openModal}
        readOnly
        className="modal-toggle"
        id="result-modal"
        type="checkbox"
      />

      <div className="modal">
        {correct ? (
          <div className="alert alert-success shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Well done</span>
            </div>
          </div>
        ) : (
          <>
            <div className="alert alert-error shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Incorrect! try again</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default observer(Game);
