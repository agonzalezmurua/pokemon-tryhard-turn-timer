"use client";
import { useNumber as useCounter } from "react-use";
import classNames from "classnames";

export function PrizeCounter({ player }: { player: 1 | 2 }) {
  const [counter, { inc, dec }] = useCounter(6, 6, 0);
  return (
    <section className={classNames("flex items-center justify-between h-2/4")}>
      <button className="p-8 text-2xl" onClick={() => dec()}>
        -
      </button>
      <span className="text-6xl">{counter}</span>
      <button className="p-8 text-2xl" onClick={() => inc()}>
        +
      </button>
    </section>
  );
}
