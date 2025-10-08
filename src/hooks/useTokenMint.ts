import { useState } from "react";
import { createNewTokenMint, mintToAddress } from "../lib/solana/token";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

export function useTokenMint() {
  const { publicKey, signTransaction, connected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [mintAddress, setMintAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [accountAddress, setAccountAddress] = useState<string | null>(null);

  async function createMintHandler(decimals: number) {
    if (!connected) return setError("Connect wallet first");
    if(!signTransaction) return setError("Sign Transaction nahi h");
    if(!publicKey) return setError("Public Key nhi h");
    setLoading(true);
    try {
      const mint = await createNewTokenMint(
        { publicKey, signTransaction },
        decimals
      );
      setMintAddress(mint);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown Error Occured");
    } finally {
      setLoading(false);
    }
  }

  async function mintHandler(amount: number, mint: string, destination: PublicKey | null = publicKey) {
    if (!connected) return setError("Connect wallet first");
    if (!signTransaction) return setError("Sign Transaction nahi h");
    if (!publicKey) return setError("Public Key nhi h");
    setLoading(true);
    try {
      const mintTo = await mintToAddress(
        { publicKey, signTransaction },
        new PublicKey(mint),
        amount,
        destination
      );
      setAccountAddress(mintTo);
      
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown Error Occured");
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, mintAddress, accountAddress, createMintHandler, mintHandler };
}
