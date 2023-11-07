import { makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react";
import ms from "ms";

enableStaticRendering(typeof window === "undefined");

export class Game {
  public currentPlayer: 1 | 2 | undefined = undefined;
  public totalTime: number = ms("50min");
  readonly delay: number = ms("1s");

  constructor() {
    makeAutoObservable(this);
  }

  setTurn = (turn: 1 | 2) => {
    this.currentPlayer = turn;
  };

  nextTurn = () => {
    if (this.currentPlayer === 1) this.currentPlayer = 2;
    else this.currentPlayer = 1;
  };

  pause = () => {
    this.currentPlayer = undefined;
  };
}
