import { Connection, type Cluster } from "@solana/web3.js";
import { atom } from "recoil";

export const publicKeyState = atom<string | null>({
  key: "publicKeyState",
  default: null,
});

export const mintAddressesState = atom<string[]>({
  key: "mintAddressesState",
  default: [],
});

export const networkState = atom<Cluster>({
  key: "networkState",
  default: "testnet",
});

export const connectionState = atom<Connection | undefined>({
  key: "connectionState",
  default: undefined
})