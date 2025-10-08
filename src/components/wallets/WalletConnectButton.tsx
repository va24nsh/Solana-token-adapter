import { useWallet } from "@solana/wallet-adapter-react";
import Button from "../ui/Button";

export function WalletConnectButton() {
  const { publicKey, connected, connect, disconnect, connecting } = useWallet();
  if (publicKey)
    return (
      <>
        <Button
          onClick={disconnect}
          variant="danger"
        >
          Disconnect
        </Button>
      </>
    );

  return (
    <div>
      {!connected ? (
        <Button
          onClick={connect}
          disabled={connecting}
          variant="primary"
        >
          {connecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      ) : (
        <p>Connected</p>
      )}
    </div>
  );
}
