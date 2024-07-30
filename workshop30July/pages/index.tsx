import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { AppBar } from "../components/AppBar";
import Head from "next/head";
import { PingButton } from "../components/PingButton";
import { WalletContextProvider } from "../components/WalletContextProvider";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const Home: NextPage = (props) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const [solAmount, setSolAmount] = useState(0);
  const [recipientAddress, setRecipientAddress] = useState("");
  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta name="description" content="Wallet-Adapter Example" />
      </Head>

      <WalletContextProvider>
        <AppBar />
        <p>AMOUNT</p>
        <input type="number" value={solAmount} onChange={(e) => setSolAmount(parseFloat(e.target.value))} placeholder="Amount in SOL" />

        <p>RECIPIENT ADDRESS</p>
        <input type="text" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} placeholder="Recipient Address" />
        <div className={styles.AppBody}>
          <PingButton recipientAddress={recipientAddress} solAmount={solAmount} />
        </div>
      </WalletContextProvider>
    </div>
  );
};

export default Home;
