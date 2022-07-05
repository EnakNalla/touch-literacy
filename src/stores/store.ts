import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { WordList, WordListItem } from '@prisma/client';
import { makeAutoObservable, runInAction } from 'mobx';
import { toast } from 'react-toastify';

export default class Store {
  wordLists: WordList[] = [];
  wordList: WordList = {
    name: 'default',
    list: []
  };
  word = '';
  results: Result[] = [];
  tries = 0;
  index = 0;
  gameFinished = false;

  constructor() {
    makeAutoObservable(this);
  }

  setWordListsFromSession = (wordLists: WordList[]) => {
    if (!this.wordLists.length) this.wordLists = wordLists;
  };

  addWord = (word: string) => {
    const listLength = this.wordList.list.length;

    this.wordList.list.push({
      word,
      index: listLength,
      id: listLength + 1
    });
  };

  removeWord = (id: number) => {
    const newList = this.wordList.list.filter(item => item.id !== id);

    this.wordList.list = this.mapWordlistIndex(newList);
  };

  reorder = (dragEvt: DragEndEvent) => {
    const { active, over } = dragEvt;

    if (!over || active.id === over.id) return;

    const oldIndex = this.wordList.list.findIndex(item => item.id === active.id);
    const newIndex = this.wordList.list.findIndex(item => item.id === over.id);

    const newList = arrayMove(this.wordList.list, oldIndex, newIndex);

    this.wordList.list = this.mapWordlistIndex(newList);
  };

  mapWordlistIndex = (list: WordListItem[]) => {
    return list.map((item, index) => {
      item.index = index;
      return item;
    });
  };

  speak = (word: string) => {
    window.speechSynthesis.cancel();

    const utterance = new window.SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(utterance);
  };

  initGame = () => {
    this.gameFinished = false;
    this.index = 0;
    this.tries = 0;
    this.word = this.wordList.list.find(item => item.index === this.index)!.word;
  };

  handleCorrectGuess = () => {
    this.results.push({
      index: this.index,
      tries: this.tries,
      word: this.word
    });

    this.index++;
    this.tries = 0;

    if (this.index === this.wordList.list.length) {
      this.gameFinished = true;
    } else {
      this.word = this.wordList.list.find(item => item.index === this.index)!.word;
    }
  };

  handleIncorrectGuess = () => this.tries++;

  saveWordList = async (name: string) => {
    if (this.wordLists.some(list => list.name === name)) {
      throw new Error(`Word list ${name} already exists`);
    }

    const req = await fetch('/api/user/word-list', {
      method: 'POST',
      body: JSON.stringify({
        name,
        list: this.wordList.list
      }),
      credentials: 'same-origin'
    });
    const res = await req.json();
    console.log(res);
    runInAction(() => {
      this.wordLists = res;
    });
  };

  updateWordList = async (name: string) => {
    const req = await fetch('/api/user/word-list', {
      method: 'PUT',
      body: JSON.stringify({
        list: this.wordList.list,
        name
      })
    });
    const res = await req.json();

    runInAction(() => {
      this.wordLists = res;
    });

    toast.success(`Word list ${name} updated`);
  };

  removeWordList = async (name: string) => {
    const req = await fetch('/api/user/word-list', {
      method: 'DELETE',
      body: JSON.stringify({
        name
      })
    });
    const res = await req.json();

    runInAction(() => {
      this.wordLists = res;
    });
  };

  loadWordList = (wordList: WordList) => {
    this.wordList = wordList;
  };
}
