import { Connection, clusterApiUrl } from "@solana/web3.js";

export const SOLANA_NETWORK = "testnet";
export const connection = new Connection(
  clusterApiUrl(SOLANA_NETWORK),
  "confirmed"
);
