import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
require("dotenv").config({ path: "../.env" });

const connection = new Connection(clusterApiUrl("devnet"), {
  commitment: "confirmed",
});
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`user: ${user.publicKey.toBase58()}`);

const TOKEN_MINT_ACCOUNT = "FngkYJkRueaAp7VX4nbec6iRbt1V7awZ5kYSKEbEP56J";
const RECIPIENT_ADDRESS = "4NPB27Vj5spw2NyFfaCZ8E1ojh7TVxPq18tFZ6vP4QYo";

const tokenMintAccount = new PublicKey(TOKEN_MINT_ACCOUNT);
const recipient = new PublicKey(RECIPIENT_ADDRESS);

const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, user, tokenMintAccount, recipient);
const link = getExplorerLink("address", tokenAccount.address.toBase58(), "devnet");

console.log(`create token account link: ${link}`);
