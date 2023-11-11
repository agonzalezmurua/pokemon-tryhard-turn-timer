"use client";
import { useMemo, useState } from "react";
import { useInterval, usePrevious } from "react-use";
import { Game, Player } from "@/store/Game";
import { observer } from "mobx-react";
import ms from "ms";

export const TimeCounter = observer(
  ({ player, game }: { player: Player; game: Game }) => {
    const isRunning = player === game.currentPlayer;
    const [remaining, setRemaining] = useState(game.totalTime / 2);
    const lastTurn = game.getLastEndedTurnOf(player);

    useInterval(
      () => {
        setRemaining(remaining - game.tickDuration);
      },
      isRunning ? game.tickDuration : null
    );

    return (
      <section className="font-mono text-center flex flex-col">
        <span className="text-2xl h-8">{toMMSS(remaining)}</span>
        <span className="h-8 text-white/75">
          {lastTurn?.duration && (
            <>
              Last turn lasted{" "}
              {ms(Math.trunc(lastTurn?.duration / 1000) * 1000, { long: true })}
            </>
          )}
        </span>
      </section>
    );
  }
);
function toMMSS(milliseconds: number) {
  let minutes = Math.floor(milliseconds / 1000 / 60);
  let seconds = (milliseconds - minutes * 60 * 1000) / 1000;

  return (
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
  );
}
