"use client";
import classNames from "classnames";
import { Game } from "@/store/Game";
import { observer } from "mobx-react";
import styles from "./Controls.module.css";

export const Controls = observer(({ game }: { game: Game }) => {
  return (
    <section className="p-4 text-4xl flex flex-col align-middle justify-center h-1/4">
      {game.currentPlayer === undefined ? (
        <section className="text-4xl space-y-4 flex flex-col gap-4">
          <button
            className={classNames(styles.startBtn, "rotate-180")}
            onClick={() => game.start(1)}
          >
            Start
          </button>
          <button
            className={classNames(styles.startBtn)}
            onClick={() => game.start(2)}
          >
            Start
          </button>
        </section>
      ) : (
        <button
          className={classNames(
            "p-4 border bg-white text-black rounded-lg active:bg-gray-400",
            {
              ["rotate-180"]: game.currentPlayer === 1,
            }
          )}
          onClick={() => {
            game.advanceTurn();
          }}
        >
          End turn
        </button>
      )}
    </section>
  );
});
