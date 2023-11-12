"use client";

import { useRef } from "react";
import { useWakeLock } from "@/hooks/useWakeLock";
import { Game } from "@/store/Game";
import { Controls } from "./Controls";
import { PlayerComplications } from "./Player";

export default function Timer() {
  const wakeLock = useWakeLock();
  const game = useRef(new Game());

  return (
    <section className="flex flex-col flex-grow">
      {wakeLock.isSupported && !wakeLock.isAllowed ? (
        <>
          <PlayerComplications game={game.current} player={1} />
          <Controls game={game.current} />
          <PlayerComplications game={game.current} player={2} />
        </>
      ) : (
        <button onClick={() => wakeLock.requestWakeLock()}>
          Allow wakelock to prevent the screen from turning off
        </button>
      )}
    </section>
  );
}
