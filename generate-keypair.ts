// 1st

// import { Keypair } from "@solana/web3.js";
// const keypair = Keypair.generate();
// console.log(`✅ Generated keypair!`)

// 2nd

// import { Keypair } from "@solana/web3.js";

// const { publicKey, secretKey} = Keypair.generate();

// console.log(`The public key is: `, publicKey.toBase58());
// console.log(`The secret key is: `, secretKey);
// console.log(`✅ Finished!`);

// 3rd
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`✅ Finished! We've loaded our keypair securely, using an env file! Our public key is: ${keypair.publicKey.toBase58()}`);
