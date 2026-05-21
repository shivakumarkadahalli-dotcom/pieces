type Env = ImportMetaEnv & Record<string, string>;
const env = import.meta.env as Env;

export const contractIds: Record<string, string> = Object.fromEntries(
  Object.entries(env)
    .filter(([k]) => k.startsWith("VITE_CONTRACT_") && k.endsWith("_ID"))
    .map(([k, v]) => [k.replace("VITE_CONTRACT_", "").replace("_ID", "").toLowerCase(), String(v)]),
);

export const stellar = {
  network: env.VITE_STELLAR_NETWORK || "testnet",
  rpcUrl: env.VITE_STELLAR_RPC_URL || "https://soroban-testnet.stellar.org",
  passphrase:
    env.VITE_STELLAR_NETWORK_PASSPHRASE || "Test SDF Network ; September 2015",
  explorerBase: env.VITE_EXPLORER_BASE || "https://stellar.expert/explorer/testnet",
};

export function explorerForContract(id: string) {
  return `${stellar.explorerBase}/contract/${id}`;
}
