import {
  isConnected,
  requestAccess,
  getAddress,
  signTransaction,
} from "@stellar/freighter-api";

export type WalletState = {
  address: string | null;
  connected: boolean;
};

export async function connectFreighter(): Promise<WalletState> {
  const { isConnected: ok } = await isConnected();
  if (!ok) {
    return { address: null, connected: false };
  }
  await requestAccess();
  const { address } = await getAddress();
  return { address, connected: true };
}

export async function readAddress(): Promise<string | null> {
  try {
    const { isConnected: ok } = await isConnected();
    if (!ok) return null;
    const { address } = await getAddress();
    return address || null;
  } catch {
    return null;
  }
}

export async function sign(xdr: string, networkPassphrase: string): Promise<string> {
  const { signedTxXdr } = await signTransaction(xdr, { networkPassphrase });
  return signedTxXdr;
}
