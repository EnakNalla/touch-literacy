import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { WordList, WordListItem } from '@prisma/client';
import { makeAutoObservable } from 'mobx';

export default class Store {
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
}
