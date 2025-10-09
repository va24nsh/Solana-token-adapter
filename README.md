# Solana Token Adapter

A modern, custom UI dashboard for managing Solana tokens, built with React and the Solana Wallet Adapter. This project features a custom wallet selector and connect buttons, and provides a seamless experience for minting tokens, creating associated token accounts (ATAs), minting to addresses, and managing token authorities (mint and freeze).

---

## Features

- **Custom Wallet Selector & Connect UI:**
  Enhanced user experience with custom-designed wallet selection and connection components.

- **Token Minting:**
  Easily create new SPL token mints with configurable decimals.

- **Mint to Address:**
  Mint tokens to any associated token account, with automatic ATA creation if needed.

- **Authority Management:**
  Update mint and freeze authorities for your tokens directly from the dashboard.

- **Network Support:**
  Easily switch between Solana mainnet, devnet, and testnet (with global state management via Recoil).

- **Dark Mode Dashboard:**
  Consistent, modern dark theme across all components.

---

## Tech Stack

- **React** (with hooks)
- **Recoil** for global state management
- **Solana Wallet Adapter** for wallet integration
- **@solana/web3.js** and **@solana/spl-token** for blockchain interactions
- **Tailwind CSS** and CSS variables for styling

---

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) to use the dashboard.

---

## Usage

- **Connect your wallet** using the custom selector and connect buttons.
- **Create a new token mint** by specifying decimals.
- **Mint tokens** to your wallet or any address.
- **Change mint or freeze authorities** for your tokens.
- **Switch networks** (mainnet, devnet, testnet) as needed.

---

## Project Structure

```
src/
  components/
    features/
      TokenMintCreator/
      TokenMinter/
      AuthorityManager/
    ui/
      Button.tsx
      Card.tsx
      Input.tsx
      Alert.tsx
    wallets/
      WalletProvider.tsx
      WalletConnectButton.tsx
      WalletMultiCustom.tsx
      WalletBalance.tsx
  hooks/
    useTokenMint.ts
    useAuthorityManagement.ts
    useTransactionHistory.ts
  lib/
    solana/
      token.ts
      connections.ts
  state/
    atoms.ts
    selectors.ts
  style.css
  App.tsx
```

---

## Notes

- All blockchain actions are signed by your connected wallet; your wallet will prompt you to approve transactions.
- The UI is fully responsive and optimized for a dashboard experience.
- Error handling and loading states are built-in for all blockchain actions.

---

**Enjoy managing your Solana tokens with a beautiful, custom dashboard!**
