import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Button from "../ui/Button";

export const WalletMultiCustom = () => {
  const { setVisible } = useWalletModal();
  return (
    <Button
      onClick={() => setVisible(true)}
      variant="primary"
    >
      Select Wallet
    </Button>
  );
};
