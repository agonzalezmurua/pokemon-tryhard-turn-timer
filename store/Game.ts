import { makeAutoObservable } from "mobx";
import ms from "ms";

export class Game {
  public currentPlayer: 1 | 2 | undefined;
  public totalTime: number;
  readonly delay: number = ms("1s");

  constructor(totalTime: string) {
    makeAutoObservable(this);
    this.totalTime = ms(totalTime);
  }

  setTurn(turn: 1 | 2) {
    this.currentPlayer = turn;
  }

  nextTurn() {
    if (this.currentPlayer === 1) this.currentPlayer = 2;
    else this.currentPlayer = 1;
  }

  pause() {
    this.currentPlayer = undefined;
  }
}
