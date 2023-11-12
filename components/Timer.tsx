"use client";

import { Game } from "@/store/Game";
import { useRef } from "react";
import { useMountedState } from "react-use";
import { Controls } from "./Controls";
import { PlayerComplications } from "./Player";

export function Timer() {
  const isMounted = useMountedState();
  const game = useRef(new Game());

  if (!isMounted) return undefined;

  return (
    <section className="flex flex-col flex-grow">
      <PlayerComplications game={game.current} player={1} />
      <Controls game={game.current} />
      <PlayerComplications game={game.current} player={2} />
    </section>
  );
}
