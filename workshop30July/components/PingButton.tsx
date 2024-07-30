import { FC, useEffect, useState } from "react";
import styles from "../styles/PingButton.module.css";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";
import * as web3 from "@solana/web3.js";

interface PingButtonProps {
  solAmount: number;
  recipientAddress: string;
}

export const PingButton: FC<PingButtonProps> = ({ solAmount, recipientAddress }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey && connection) {
        const balanceLamports = await connection.getBalance(publicKey);
        setBalance(balanceLamports / 1000000000);
      }
    };

    fetchBalance();
  }, [publicKey, connection]);
  const onClick = async (solAmount, recipientAddress) => {
    if (!connection || !publicKey) {
      console.log("Connect and retry.");
      return;
    }

    const recipientPublicKey = new PublicKey(recipientAddress);

    const lamports = solAmount * web3.LAMPORTS_PER_SOL;
    const tx = new Transaction();

    const programId = new PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");
    const programDataAccount = new PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod");
    tx.add(
      new TransactionInstruction({
        keys: [{ pubkey: programDataAccount, isSigner: false, isWritable: true }],
        programId,
      })
    );

    tx.add(
      web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientPublicKey,
        lamports: lamports,
      })
    );
    try {
      const sig = await sendTransaction(tx, connection);
      console.log("Signature: ", sig);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <>
      {publicKey && (
        <div>
          <p>Wallet Address: {publicKey.toBase58()}</p>
          <p>Balance: {balance !== null ? `${balance} SOL` : "Loading..."}</p>
        </div>
      )}
      <div className={styles.buttonContainer} onClick={() => onClick(solAmount, recipientAddress)}>
        <button className={styles.button}>Ping!</button>
      </div>
    </>
  );
};
