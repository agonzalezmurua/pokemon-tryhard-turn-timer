"use client";

import { useCallback, useState } from "react";

export function useWakeLock() {
  const isSupported =
    typeof navigator !== "undefined" && "wakeLock" in navigator;
  const [isAllowed, setAllowed] = useState(false);

  const requestWakeLock = useCallback(() => {
    return navigator.wakeLock.request("screen").then(() => {
      setAllowed(true);
    });
  }, [isSupported]);

  return {
    isSupported: isSupported,
    requestWakeLock: requestWakeLock,
    isAllowed: isAllowed,
  };
}
