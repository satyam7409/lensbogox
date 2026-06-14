import { useEffect, useState } from "react";
import { onSocketStatus } from "@/socket/socket";

export function useSocketStatus() {
  const [connected, setConnected] = useState(false);

  useEffect(() => onSocketStatus(setConnected), []);

  return connected;
}
