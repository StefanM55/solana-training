require("dotenv").config({ path: "../.env" });
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";
import { createMemoInstruction } from "@solana/spl-memo";

const sender = getKeypairFromEnvironment("SECRET_KEY");

const connection = new Connection(clusterApiUrl("devnet"));
console.log(sender.publicKey.toBase58());

const receiver = new PublicKey("Hpxx4vFJyEDA7KGosZs1RdRRkqGYsunAoeV6sWEGJFHD");

const balance = await connection.getBalance(sender.publicKey);
const balanceInSol = balance / LAMPORTS_PER_SOL;

console.log(`balance = ${balanceInSol}`);

const transaction = new Transaction();
const transferInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: receiver,
  lamports: 0.01 * LAMPORTS_PER_SOL,
});

transaction.add(transferInstruction);

const memo = "Thank you";
const memoInstruction = createMemoInstruction(memo);

transaction.add(memoInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);

console.log(`Transaction confirmed: ${signature}`);
