import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { setFreezeAuthority, setMintAuthority } from "../lib/solana/token";
import { useState } from "react";

export function useAuthorityManagement() {
    const { publicKey, signTransaction, connected } = useWallet();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function changeMintAuthority(newAuthority: string | null, mintAddress: string | null) {
        if(!connected) return setError("Please connect your wallet first");
        if(!publicKey) return setError("No public key found");
        if(!signTransaction) return setError("No policy to sign transaction can be loaded");
        if(!mintAddress) return setError("No mint address was found");

        setLoading(true);

        try {
            const changeMintAuth = await setMintAuthority(
              { publicKey, signTransaction },
              new PublicKey(mintAddress),
              newAuthority ? new PublicKey(newAuthority) : null
            );
            localStorage.setItem("Change Mint Authority txid: ", changeMintAuth);
        } catch(err: unknown) {
            setError(err instanceof Error ? err.message : "Internal Error has occured");
        } finally {
            setLoading(false);
        }
    }

    async function changeFreezeAuthority(newAuthority: string | null, mintAddress: string | null) {
        if(!connected) return setError("Please connect your wallet first");
        if(!publicKey) return setError("No public key found");
        if(!signTransaction) return setError("No policy to sign transaction can be loaded");
        if(!mintAddress) return setError("No mint address was found");

        setLoading(true);

        try {
            const changeFreezeAuth = await setFreezeAuthority(
              { publicKey, signTransaction },
              new PublicKey(mintAddress),
              newAuthority ? new PublicKey(newAuthority) : null
            );
            localStorage.setItem("Change Freeze Authority txid: ", changeFreezeAuth);
        } catch(err: unknown) {
            setError(err instanceof Error ? err.message : "Internal Error has occured");
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, changeMintAuthority, changeFreezeAuthority };
}