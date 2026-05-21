# Architecture

Pieces composes capability primitives instead of a monolithic build.

## Frontend
- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion for transitions
- Freighter wallet adapter for Stellar
- Capability modules included: `marketplace`, `tokenization`

## Smart contracts (Stellar / Soroban)
- Network: Stellar testnet
- Modules composed in this build: `marketplace`, `token`, `royalty`, `payments`
- Each module is a self-contained Rust file under `contracts/src/modules/`
  and is re-exported from `lib.rs`.

## Data flow
1. The user signs in with Freighter.
2. The frontend reads contract IDs from `import.meta.env.VITE_CONTRACT_*_ID`.
3. Calls go through the Soroban RPC at `VITE_STELLAR_RPC_URL`.
4. Settlement happens on-ledger; the UI updates from chain reads.
