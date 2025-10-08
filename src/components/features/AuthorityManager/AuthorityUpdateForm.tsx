import { useState } from "react";
import { useAuthorityManagement } from "../../../hooks/useAuthorityManagement";
import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Alert from "../../ui/Alert";

// Update the authorities on your mint
export function AuthorityChange() {
    const { loading, error, changeMintAuthority, changeFreezeAuthority } = useAuthorityManagement();
    const [mintAddress, setMintAddress] = useState<string | null>(null);
    const [newMintAuthority, setNewMintAuthority] = useState<string | null>(null);
    const [newFreezeAuthority, setNewFreezeAuthority] = useState<string | null>(null);

    return (
      <>
        <Card title="Change Token Mint Authority">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              changeMintAuthority(newMintAuthority, mintAddress);
            }}
          >
            <Input
              type="text"
              label="MintAddress"
              value={mintAddress ? mintAddress : ""}
              onChange={(e) => setMintAddress(e.target.value)}
            />
            <Input
              type="text"
              label="NewMintAuthority"
              value={newMintAuthority ? newMintAuthority : ""}
              onChange={(e) => setNewMintAuthority(e.target.value)}
            />
            <Button type="submit" loading={loading} className="w-full">
              Change Mint Authority
            </Button>
            {mintAddress && (
              <Alert type="success" message={`Mint created: ${mintAddress}`} />
            )}
            {error && <Alert type="error" message={error} />}
          </form>
        </Card>

        <Card title="Change Token Freeze Authority">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              changeFreezeAuthority(newFreezeAuthority, mintAddress);
            }}
          >
            <Input
              type="text"
              label="MintAddress"
              value={mintAddress ? mintAddress : ""}
              onChange={(e) => setMintAddress(e.target.value)}
            />
            <Input
              type="text"
              label="NewFreezeAuthority"
              value={newMintAuthority ? newMintAuthority : ""}
              onChange={(e) => setNewFreezeAuthority(e.target.value)}
            />
            <Button type="submit" loading={loading} className="w-full">
              Change Freeze Authority
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