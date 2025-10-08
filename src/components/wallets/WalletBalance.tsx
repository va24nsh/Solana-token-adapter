import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const WalletBalance = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          const lamports = await connection.getBalance(
            new PublicKey(publicKey)
          );
          setBalance(lamports / LAMPORTS_PER_SOL);
        } catch (error) {
          console.error("Error fetching balance:", error);
          setBalance(null);
        }
      } else {
        setBalance(null);
      }
    };

    fetchBalance();

  }, [publicKey, connection]);

  return (
    <>
      {publicKey ? (
        <>
          <div
            title={`${publicKey.toBase58().slice(0, 9)}...`}
          >
            <h2 className="text-2xl font-semibold text-blue-600 mt-2">
              {balance !== null ? `${balance.toFixed(9)} SOL` : "Loading..."}
            </h2>
          </div>
        </>
      ) : (
        <div title="Error">
          <p className="text-2xl font-semibold text-blue-600 mt-2">
            Wallet Not Connected
          </p>
        </div>
      )}
    </>
  );
};

export default WalletBalance;
