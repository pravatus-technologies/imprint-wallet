import React, { useContext, useState } from "react";
import { Mnemonic, PrivateKey, PublicKey } from "@hashgraph/sdk";
import { IWalletContext } from "../constants/types";

export const WalletContext = React.createContext({});
export const WalletProvider = ({ children }: { children: React.ReactNode }) => {

  const [recoveryPhrase, setRecoveryPhrase] = useState<string[]>([]);
  const [isCreateMode, setIsCreateMode] = useState(false);

  const generateRecoveryPhrase = async (): Promise<string[]> => {
    try {
      let mnemonic = await Mnemonic.generate();
      return Promise.resolve(mnemonic.toString().split(" "));
    } catch (e) {
      throw e;
    }
  };

  const contextValues = {
    recoveryPhrase,
    isCreateMode,
    setRecoveryPhrase,
    generateRecoveryPhrase,
    setIsCreateMode,
  };

  return (
    <WalletContext.Provider value={contextValues}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext) as IWalletContext;
