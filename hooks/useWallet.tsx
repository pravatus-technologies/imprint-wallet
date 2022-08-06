import React, { useContext, useState } from "react";
import { Mnemonic, PrivateKey, PublicKey } from "@hashgraph/sdk";
import { IWalletContext, IMnemonic } from "../constants/types";

export const WalletContext = React.createContext({});
export const WalletProvider = ({ children }: { children: React.ReactNode }) => {

  const [recoveryPhrase, setRecoveryPhrase] = useState<IMnemonic[]>([]);
  const [isCreateMode, setIsCreateMode] = useState(false);

 /**
  * This function generates a 24-word Mnemonic for Private Key recovery.
  * 
  * @returns {Promise<IMnemonic[]>} Returns an Array of IMnemonic objects
  */
  const generateRecoveryPhrase = async (): Promise<IMnemonic[]> => {
    
    // In use case where the user triggers another call to this function
    // accidentally or not, we do not want to generate a new one. Just
    // return the previous generated recovery phrase.
    if (recoveryPhrase.length > 0)
    	return Promise.resolve(recoveryPhrase);

    try {
      let mnemonic = await Mnemonic.generate();
      let phraseArray: IMnemonic[] = mnemonic.toString()
      	.split(" ")
	.map((phrase, index) => {
	    return { 
	    	order: index + 1, 
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

 /**
  * Randomly selects six (6) phrases + the last word to verify.
  *
  * @returns {IMnemonic[]} Array of Mnemonic objects
  */ 
  const generatePhraseConfirmation = (phrase: IMnemonic[]): IMnemonic[] => {
    // Generate an array of 6 words, and always include index 23 
    // so we can check the phrase checksum
    let indeces: number[] = [23];
    for (let i = 0; i < 6; i++) {
      while (true) {
        let index = Math.floor(Math.random()* 24); // TODO: Magic number
	if (indeces.includes(index))
	  continue;
	
	indeces.push(index);
	break;
      }
    }

    indeces.forEach((index) => {
      console.log(`Index ${index} Element ${JSON.stringify(phrase[index])} Phrase length: ${phrase.length}`)
      phrase[index].verify = true;
    });

    return phrase;
  }

  const contextValues = {
    recoveryPhrase,
    isCreateMode,
    setRecoveryPhrase,
    generateRecoveryPhrase,
    setIsCreateMode,
    generatePhraseConfirmation,
  };

  return (
    <WalletContext.Provider value={contextValues}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext) as IWalletContext;
