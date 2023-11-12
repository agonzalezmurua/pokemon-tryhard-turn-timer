import { Game, Player } from "@/store/Game";
import { PrizeCounter } from "./PrizeCounter";
import { TimeCounter } from "./TimeCounter";
import { VStarButton } from "./VStarButton";
import classNames from "classnames";
import React, { useState } from "react";
import { observer } from "mobx-react";

export const PlayerComplications = observer(
  ({ game, player }: { player: Player; game: Game }) => {
    const [color, setColor] = useState<string>(
      player === 1 ? "#FF0000" : "#0000FF"
    );

    return (
      <section
        style={{ "--color": color } as React.CSSProperties}
        className={classNames(
          "h-1/2 flex flex-col justify-center items-center gap-4 p-4 bg-gradient-to-b from-[--color] to-black border-t border-white",
          {
            ["rotate-180"]: player === 1,
          }
        )}
      >
        {game.hasStarted ? (
          <>
            <PrizeCounter player={player} />
            <TimeCounter player={player} game={game} />
            <VStarButton />
          </>
        ) : (
          <>
            <section>
              <input
                id={`color-player-${player}`}
                type="color"
                defaultValue={color}
                onChange={({ target: { value } }) => setColor(value)}
              />
            </section>
          </>
        )}
      </section>
    );
  }
);
