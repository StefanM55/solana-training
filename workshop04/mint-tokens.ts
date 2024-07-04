import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
require("dotenv").config({ path: "../.env" });

const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`Public key of the user is: ${user.publicKey.toBase58()}`);

const TOKEN_MINT_ACCOUNT = "FngkYJkRueaAp7VX4nbec6iRbt1V7awZ5kYSKEbEP56J";
const RECIPIENT_ADDRESS = "4NPB27Vj5spw2NyFfaCZ8E1ojh7TVxPq18tFZ6vP4QYo";
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 9);

const tokenMintAccount = new PublicKey(TOKEN_MINT_ACCOUNT);
const recipient = new PublicKey(RECIPIENT_ADDRESS);
const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, user, tokenMintAccount, recipient);

console.log(`create token account: ${tokenAccount.address.toBase58()}`);

const mintTxSig = await mintTo(connection, user, tokenMintAccount, tokenAccount.address, user, 100 * MINOR_UNITS_PER_MAJOR_UNITS);
const link = getExplorerLink("transaction", mintTxSig, "devnet");

console.log(`create token account link: ${link}`);
