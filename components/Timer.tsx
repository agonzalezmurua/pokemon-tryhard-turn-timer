"use client";

import { useRef } from "react";
import { useMountedState } from "react-use";
import { Game } from "@/store/Game";
import { VStarButton } from "./VStarButton";
import { PrizeCounter } from "./PrizeCounter";
import { TimeCounter } from "./TimeCounter";
import { Controls } from "./Controls";

export function Timer() {
  const isMounted = useMountedState();
  const game = useRef(new Game());

  if (!isMounted) return undefined;

  return (
    <section className="flex flex-col flex-grow">
      <section className="h-1/2 flex flex-col rotate-180 gap-4 bg-gradient-to-b from-red-600 to-black border-t border-white">
        <PrizeCounter player={1} />
        <TimeCounter player={1} game={game.current} />
        <VStarButton />
      </section>
      <Controls game={game.current} />
      <section className="h-1/2 flex flex-col gap-4 bg-gradient-to-b from-blue-600 to-black border-t border-white">
        <PrizeCounter player={2} />
        <TimeCounter player={2} game={game.current} />
        <VStarButton />
      </section>
    </section>
  );
}
