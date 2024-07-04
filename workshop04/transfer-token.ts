require("dotenv").config({ path: "../.env" });
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, mintTo, transfer } from "@solana/spl-token";
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";

const user = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"), {
  commitment: "confirmed",
});

const TOKEN_MINT_ACCOUNT = "FngkYJkRueaAp7VX4nbec6iRbt1V7awZ5kYSKEbEP56J";
const RECIPIENT_ADDRESS = "4NPB27Vj5spw2NyFfaCZ8E1ojh7TVxPq18tFZ6vP4QYo";

const tokenMintAccount = new PublicKey(TOKEN_MINT_ACCOUNT);
const recipient = new PublicKey(RECIPIENT_ADDRESS);

const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, user, tokenMintAccount, user.publicKey);

const link = getExplorerLink("address", tokenAccount.address.toString(), "devnet");

console.log({ tokenAccount: link });

const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(connection, user, tokenMintAccount, recipient);

const link2 = getExplorerLink("address", recipientTokenAccount.address.toString(), "devnet");

console.log({ recipientTokenAccount: link2 });

const transferTx = await transfer(connection, user, tokenAccount.address, recipientTokenAccount.address, user.publicKey, 50 * LAMPORTS_PER_SOL);

const transferLink = getExplorerLink("transaction", transferTx, "devnet");

console.log({ transferLink });
