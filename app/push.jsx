"use client";

import { useEffect, useState } from "react";
import { initPush, onToken } from "./components/push";
import TokenDisplay from "./components/TokenDisplay";

export default function AppInit() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    onToken((t) => setToken(t)); // store token in state
    initPush();
  }, []);

  return <>{token && <TokenDisplay token={token} />}</>;
}
