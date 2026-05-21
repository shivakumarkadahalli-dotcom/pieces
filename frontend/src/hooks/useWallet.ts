import { useCallback, useEffect, useState } from "react";
import { connectFreighter, readAddress } from "@/lib/wallet";

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    readAddress().then(setAddress);
  }, []);

  const connect = useCallback(async () => {
    setConnecting(true);
    try {
      const s = await connectFreighter();
      setAddress(s.address);
    } finally {
      setConnecting(false);
    }
  }, []);

  return { address, connect, connecting, connected: !!address };
}
