import { useState } from "react";
import { useTokenMint } from "../../../hooks/useTokenMint";
import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Alert from "../../ui/Alert";

export function TokenMintForm() {
  const { loading, error, mintAddress, createMintHandler } = useTokenMint();
  const [decimals, setDecimals] = useState(9);

  return (
    <>
      <Card title="Create Token Mint">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            createMintHandler(decimals);
          }}
        >
          <Input
            type="number"
            label="Decimals"
            value={decimals}
            min={0}
            max={18}
            onChange={(e) => setDecimals(Number(e.target.value))}
          />
          <Button type="submit" loading={loading} className="w-full">
            Create Mint
          </Button>
          {mintAddress && (
            <Alert type="success" message={`Mint created: ${mintAddress}`} />
          )}
          {error && <Alert type="error" message={error} />}
        </form>
      </Card>
    </>
  );
}
