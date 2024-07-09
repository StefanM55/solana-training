require("dotenv").config({ path: "../.env" });
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers";
import bs58 from "bs58";

const connection = new Connection(clusterApiUrl("devnet"));

console.log("Connected to devnet");
console.log("devnet URL: ", connection.rpcEndpoint);

const keyFromEnv = getKeypairFromEnvironment("SECRET_KEY");
const newKey = bs58.encode(keyFromEnv.secretKey);

console.log(`newKeyToAddInPhantom: ${newKey}`);
const keyToCheck = keyFromEnv.publicKey.toBase58();
const publicKey = new PublicKey(keyToCheck);

//use faucet
// await airdropIfRequired(connection, publicKey, 2 * LAMPORTS_PER_SOL, 6 * LAMPORTS_PER_SOL);

const balanceInLamport = await connection.getBalance(publicKey);
const balanceInSol = balanceInLamport / LAMPORTS_PER_SOL;

console.log(`Wallet with public key: ${keyToCheck} has: ${balanceInSol} SOL.`);