import React, { useContext, useState } from "react";
import { Mnemonic, PrivateKey, PublicKey } from "@hashgraph/sdk";
import { IWalletContext, IMnemonic } from "../constants/types";

export const WalletContext = React.createContext({});
export const WalletProvider = ({ children }: { children: React.ReactNode }) => {

  const [recoveryPhrase, setRecoveryPhrase] = useState<IMnemonic[]>([]);
  const [isCreateMode, setIsCreateMode] = useState(false);

  const generateRecoveryPhrase = async (): Promise<IMnemonic[]> => {
    // return the current recoveryPhrase if it is already generated.
    if (recoveryPhrase.length > 0)
    	return Promise.resolve(recoveryPhrase);

    try {
      let mnemonic = await Mnemonic.generate();
      //return Promise.resolve(mnemonic.toString().split(" "));
      let phraseArray: IMnemonic[] = mnemonic.toString()
      	.split(" ")
	.map((phrase, index) => {
	    return { 
	    	order: index, 
		phrase: phrase, 
		verify: false, 
		validated: false 
	    };
        }); 

      return Promise.resolve(phraseArray);

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
