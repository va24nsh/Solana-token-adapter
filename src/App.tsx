import { SolanaWalletProvider } from "./components/wallets/WalletProvider";
import { WalletConnectButton } from "./components/wallets/WalletConnectButton";
import { TokenMintForm } from "./components/features/TokenMintCreator/TokenMintForm";
import { WalletMultiCustom } from "./components/wallets/WalletMultiCustom";
import WalletBalance from "./components/wallets/WalletBalance";
import { MintToForm } from "./components/features/TokenMinter/MintToForm";

function App() {
  return (
      <SolanaWalletProvider>
        <div
          className="min-h-screen flex flex-col items-center px-4 py-8 gap-8"
          style={{
            background: "var(--color-bg)",
            color: "var(--color-text)",
          }}
        >
          <nav className="w-full max-w-5xl flex justify-between items-center py-4 mb-8">
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{ color: "var(--color-primary)" }}
            >
              Token Adapter
            </h1>
            <div className="flex gap-4">
              <WalletBalance />
              <WalletMultiCustom />
              <WalletConnectButton />
            </div>
          </nav>

          <div className="w-full max-w-5xl flex justify-between md:flex-row gap-8">
            <TokenMintForm />
            <MintToForm />
          </div>
        </div>
      </SolanaWalletProvider>
  );
}

export default App;
