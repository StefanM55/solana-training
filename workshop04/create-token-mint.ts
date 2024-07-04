import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createMint } from "@solana/spl-token";
import { Connection, clusterApiUrl } from "@solana/web3.js";
require("dotenv").config({ path: "../.env" });

const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`Public key of the user is: ${user.publicKey.toBase58()}`);

const createToken = await createMint(connection, user, user.publicKey, null, 9);

const link = getExplorerLink("address", createToken.toString(), "devnet");

console.log(`Token mint: ${link}`);
