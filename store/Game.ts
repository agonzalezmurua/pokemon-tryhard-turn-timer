import { makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react";
import ms from "ms";

enableStaticRendering(typeof window === "undefined");

export type Player = 1 | 2;

export class Game {
  readonly tickDuration: number = ms("1s");
  public currentPlayer: Player | undefined = undefined;
  public totalTime: number = ms("50min");
  private turnHistory: [player: Player, Turn][] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get hasStarted() {
    return this.turnHistory.length !== 0;
  }

  get isPaused() {
    return this.turnHistory.length !== 0 && this.currentPlayer === undefined;
  }

  get isFirstGameTurn() {
    return this.turnHistory.length === 0;
  }

  advanceTurn = (nextPlayer: Player = this.currentPlayer === 1 ? 2 : 1) => {
    const latestTurn = this.getLatestTurn();

    if (latestTurn) {
      latestTurn.end();
    }

    this.turnHistory.push([nextPlayer, new Turn()]);
    this.currentPlayer = nextPlayer;
  };

  getLatestTurn = (): Turn | null => {
    const lastEntry = this.turnHistory[this.turnHistory.length - 1];
    if (!lastEntry) return null;

    return lastEntry[1];
  };

  getLastEndedTurnOf = (player: Player): Turn | null => {
    const lastEntry = this.turnHistory.findLast(
      ([p, t]) => p === player && t.endedAt !== undefined
    );

    if (!lastEntry) return null;

    const [, turn] = lastEntry;

    return turn;
  };

  start = (player: Player) => {
    if (this.currentPlayer) throw new Error("Game already started");

    this.advanceTurn(player);
  };

  pause = () => {
    this.currentPlayer = undefined;
  };
}

class Turn {
  startedAt: number;
  endedAt?: number;

  get duration() {
    if (!this.endedAt) return null;

    return this.endedAt - this.startedAt;
  }

  constructor() {
    this.startedAt = Date.now();
  }

  end = () => {
    this.endedAt = Date.now();
  };
}
