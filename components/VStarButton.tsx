"use client";
import styles from "./VStarPower.module.css";
import { useBoolean } from "react-use";

export function VStarButton() {
  const [used, toggleUsed] = useBoolean(false);
  return (
    <button
      className={
        "self-center rounded-lg transition-opacity font-extrabold font-sans italic data-[used=true]:opacity-25 data-[used=true]:line-through text-white bg-white p-4 border-t border-b border-white text-2xl"
      }
      data-used={used}
      onClick={() => {
        toggleUsed();
      }}
    >
      <span className={styles.v}>V</span>
      <span className={styles.star}>Star</span>
    </button>
  );
}
