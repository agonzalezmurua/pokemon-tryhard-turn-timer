"use client";

import { useRef, useState } from "react";
import { useBoolean, useInterval, useNumber as useCounter } from "react-use";
import classNames from "classnames";
import { Game } from "@/store/Game";
import { observer } from "mobx-react";

export function Timer({ totalTime = "50min" }: { totalTime?: string }) {
  const game = useRef(new Game(totalTime));

  return (
    <section className="flex flex-col flex-grow">
      <section className="h-1/2 flex flex-col rotate-180 gap-4">
        <PrizeCounter player={1} />
        <TimeCounter player={1} game={game.current} />
        <VStarButton />
      </section>
      <Controls game={game.current} />
      <section className="h-1/2 flex flex-col gap-4">
        <PrizeCounter player={2} />
        <TimeCounter player={2} game={game.current} />
        <VStarButton />
      </section>
    </section>
  );
}

const Controls = observer(({ game }: { game: Game }) => (
  <section className="p-4 text-4xl flex flex-col align-middle justify-center h-1/4">
    {game.currentPlayer === undefined ? (
      <section className="text-4xl space-y-4 flex flex-col">
        <button onClick={() => game.setTurn(1)} className="rotate-180">
          Start
        </button>
        <button onClick={() => game.setTurn(2)}>Start</button>
      </section>
    ) : (
      <button
        className={classNames("p-4", {
          ["rotate-180"]: game.currentPlayer === 1,
        })}
        onClick={() => {
          game.nextTurn();
        }}
      >
        End turn
      </button>
    )}
  </section>
));

const TimeCounter = observer(
  ({ player, game }: { player: number; game: Game }) => {
    const isRunning = player === game.currentPlayer;
    const [remaining, setRemaining] = useState(game.totalTime / 2);

    useInterval(
      () => {
        setRemaining(remaining - game.delay);
      },
      isRunning ? game.delay : null
    );

    return (
      <span className="font-mono text-center text-2xl">
        {toMMSS(remaining)}
      </span>
    );
  }
);

function VStarButton() {
  const [used, toggleUsed] = useBoolean(false);
  return (
    <button
      data-used={used}
      className="data-[used=true]:text-gray-500 text-white"
      onClick={() => {
        toggleUsed();
      }}
    >
      VStar
    </button>
  );
}

function PrizeCounter({ player }: { player: 1 | 2 }) {
  const [counter, { inc, dec }] = useCounter(6, 6, 0);
  return (
    <section
      className={classNames("flex items-center justify-between h-1/4", {
        ["bg-red-500"]: player === 1,
        ["bg-blue-500"]: player === 2,
      })}
    >
      <button className="p-8 text-2xl" onClick={() => dec()}>
        -
      </button>
      <span className="text-4xl">{counter}</span>
      <button className="p-8 text-2xl" onClick={() => inc()}>
        +
      </button>
    </section>
  );
}

function toMMSS(milliseconds: number) {
  let minutes = Math.floor(milliseconds / 1_000 / 60);
  let seconds = (milliseconds - minutes * 60 * 1_000) / 1_000;

  return String(minutes).padEnd(2, "0") + ":" + String(seconds).padEnd(2, "0");
}
