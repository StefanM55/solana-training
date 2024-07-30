import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { FC, ReactNode } from "react";

interface WalletContextProviderProps {
  children: ReactNode;
}

export const WalletContextProvider: FC<WalletContextProviderProps> = ({ children }) => {
  return (
    <ConnectionProvider endpoint="">
      <WalletProvider wallets={[]}>{children}</WalletProvider>
    </ConnectionProvider>
  );
};
