import { useState } from "react";
import { useTokenMint } from "../../../hooks/useTokenMint";
import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Alert from "../../ui/Alert";

export function MintToForm() {
  const {
    loading,
    error,
    accountAddress,
    mintHandler,
  } = useTokenMint();
  const [amount, setAmount] = useState(0);
  const [mintAddress, setMintAddress] = useState<string | null>(null);

  return (
    <>
      <Card title="Mint Token">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!mintAddress) return;
            mintHandler(amount, mintAddress);
          }}
        >
          <Input
            type="text"
            label="mintAddress"
            value={mintAddress ? mintAddress : ""}
            onChange={(e) => setMintAddress(e.target.value)}
          />
          <Input
            type="number"
            label="Amount"
            value={amount}
            min={0}
            max={1000}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Button type="submit" loading={loading} className="w-full">
            Mint Tokens
          </Button>
          {accountAddress && (
            <Alert
              type="success"
              message={`Minted : ${accountAddress} with ${amount} tokens`}
            />
          )}
          {error && <Alert type="error" message={error} />}
        </form>
      </Card>
    </>
  );
}
