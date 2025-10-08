import { Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import {
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  TokenInvalidAccountOwnerError,
  TokenAccountNotFoundError,
  createMintToInstruction,
  createSetAuthorityInstruction,
  AuthorityType,
} from "@solana/spl-token";
import { connection } from "./connections";

export async function createNewTokenMint(payer: { publicKey: PublicKey, signTransaction: (tx: Transaction) => Promise<Transaction> }, decimals: number) {
  const mint = Keypair.generate();
  const lamports = await getMinimumBalanceForRentExemptMint(connection);

  const txs = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: mint.publicKey,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(
      mint.publicKey,
      decimals,
      payer.publicKey,
      payer.publicKey,
      TOKEN_PROGRAM_ID
    )
  );

  txs.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  txs.feePayer = payer.publicKey;
  txs.partialSign(mint);

  const signed = await payer.signTransaction(txs);

  const txid = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(txid);

  return mint.publicKey.toBase58();
}

export async function mintToAddress(
  payer: { publicKey: PublicKey, signTransaction: (tx: Transaction) => Promise<Transaction> },
  mint: PublicKey,
  amount: number,
  destination: PublicKey | null,
): Promise<string> {
  if(!destination) return "";
  const associatedAccount = getAssociatedTokenAddressSync(
    mint, 
    destination,
    false,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );

  try {
    const account = await getAccount(connection, associatedAccount);
    // Mint Tokens here
    const mintTransaction = new Transaction().add(
      createMintToInstruction(
        mint,
        account.address,
        payer.publicKey,
        amount,
        [payer.publicKey],
        TOKEN_PROGRAM_ID
      )
    );

    mintTransaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    mintTransaction.feePayer = payer.publicKey;

    const signed = await payer.signTransaction(mintTransaction);

    const txid = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(txid);

    return account.address.toBase58();
  } catch(err: unknown) {
    if(err instanceof TokenAccountNotFoundError || err instanceof TokenInvalidAccountOwnerError) {
      try {
        const tx = new Transaction().add(
          createAssociatedTokenAccountInstruction(
            payer.publicKey,
            associatedAccount,
            destination,
            mint,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
          )
        );

        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        tx.feePayer = payer.publicKey;
        
        const signed = await payer.signTransaction(tx);

        const txid = await connection.sendRawTransaction(signed.serialize());
        await connection.confirmTransaction(txid);

        const account = await getAccount(connection, associatedAccount);

        const tx2 = new Transaction().add(
          createMintToInstruction(
            mint,
            account.address,
            payer.publicKey,
            amount,
            [payer.publicKey],
            TOKEN_PROGRAM_ID
          )
        );

        tx2.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        tx2.feePayer = payer.publicKey;

        const signed2 = await payer.signTransaction(tx2);

        const txid2 = await connection.sendRawTransaction(signed2.serialize());
        await connection.confirmTransaction(txid2);
        
        return account.address.toBase58();
      } catch {
        return "";
      }
    } else {
      throw err;
    }
  }
}

export async function setMintAuthority(
  payer: { publicKey: PublicKey, signTransaction: (tx: Transaction) => Promise<Transaction> },
  mint: PublicKey,
  newAuthority: PublicKey | null
) {
  const ixs = createSetAuthorityInstruction(
    mint,
    payer.publicKey,
    AuthorityType.MintTokens,
    newAuthority,
    [payer.publicKey],
    TOKEN_PROGRAM_ID
  );
  const txs = new Transaction().add(ixs);
  txs.feePayer = payer.publicKey;
  txs.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  
  const signed = await payer.signTransaction(txs);

  const txid = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(txid);

  return txid;
}

export async function setFreezeAuthority(
  payer: { publicKey: PublicKey, signTransaction: (tx: Transaction) => Promise<Transaction> },
  mint: PublicKey,
  newAuthority: PublicKey | null
) {
  const ixs = createSetAuthorityInstruction(
    mint,
    payer.publicKey,
    AuthorityType.FreezeAccount,
    newAuthority,
    [payer.publicKey],
    TOKEN_PROGRAM_ID
  );
  const txs = new Transaction().add(ixs);
  txs.feePayer = payer.publicKey;
  txs.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  
  const signed = await payer.signTransaction(txs);

  const txid = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(txid);

  return txid;
}