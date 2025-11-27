"use client";

import { useEffect } from "react";
import { initPush } from "./components/push";

export default function AppInit() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      initPush();
    }
  }, []);

  return null; // no UI needed
}
