import React, { useCallback, useContext, useState } from "react";
import { Mnemonic, PrivateKey } from "@hashgraph/sdk";
import {
  IWalletContext,
  IMnemonic,
  IAccount,
} from "../constants/types";
import { useAuth } from "./useAuth";
import * as SecureStore from "expo-secure-store";
import {
  APP_ID,
  LAST_PHRASE_INDEX,
  MNEMONIC_PHRASE_LENGTH,
  NUM_WORDS_TO_CONFIRM,
  REALM_NUM,
  SHARD_NUM,
} from "../constants";

export const WalletContext = React.createContext({});
export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [recoveryPhrase, setRecoveryPhrase] = useState<IMnemonic[]>([]);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const { account, setAccount } = useAuth();

  /**
   *
   * Creates a new Wallet object and appends it into the Account's wallet array.
   *
   * @param {string} nickname The name of this Wallet
   * @returns
   */
  const saveNewAccount = useCallback(
    async (account: IAccount, nickname: string) => {
      try {
        // Take only the phrase from the mnemonic data-structure
        // Compose a single string by appending spaces to each word phrase
        let phrase = recoveryPhrase.map((mnemonic) => mnemonic.phrase);
        let mnemonic = await Mnemonic.fromString(phrase.join(" "));

        // Generate a new Private Key from the seed phrase
        // and retrieve the Public Key as well
        let pvtKey = await PrivateKey.fromMnemonic(mnemonic);
        let pubKey = pvtKey.publicKey;

        // An account will be created locally with an alias. This
        // new account will not be registered on the Network until
        // an HBAR is transfered to the account.
        let alias = pubKey.toAccountId(SHARD_NUM, REALM_NUM);

        // Considering a factory for Wallet generation but for now,
        // only 1 Account can be associated with the wallet.
        let wallet = {
          name: nickname,
          operatorId: "",
          alias: alias.toString(),
          keys: {
            index: 0,
            privateKey: pvtKey.toStringDer(),
            publicKey: pubKey.toStringDer(),
          },
        };

        // Create new wallet object from old account state
        // to force change detection from Auth context
        let newAccount: IAccount = { ...account };
        newAccount.wallets.push(wallet);
        setAccount(newAccount);

        // Save to secure storage
        await SecureStore.setItemAsync(APP_ID, JSON.stringify(newAccount));
      } catch (e) {
        throw e;
      }
    },

    [recoveryPhrase]
  );

  /**
   * This function generates a 24-word Mnemonic for Private Key recovery.
   *
   * @returns {Promise<IMnemonic[]>} Returns an Array of IMnemonic objects
   */
  const generateRecoveryPhrase = useCallback(async (): Promise<IMnemonic[]> => {
    // In use case where the user triggers another call to this function
    // accidentally or not, we do not want to generate a new one. Just
    // return the previous generated recovery phrase.
    if (recoveryPhrase.length > 0) return Promise.resolve(recoveryPhrase);

    try {
      let mnemonic = await Mnemonic.generate();
      let phraseArray: IMnemonic[] = mnemonic
        .toString()
        .split(" ")
        .map((phrase, index) => {
          return {
            order: index + 1,
            phrase: phrase,
            verify: false,
            validated: false,
          };
        });

      return Promise.resolve(phraseArray);
    } catch (e) {
      throw e;
    }
  }, [recoveryPhrase]);

  /**
   * Randomly selects six (6) phrases + the last word to verify.
   *
   * @returns {IMnemonic[]} Array of Mnemonic objects
   */
  const generatePhraseConfirmation = useCallback(
    (phrase: IMnemonic[]): IMnemonic[] => {
      // Don't create a set of confirmation indeces if we've already
      // processed the recovery phrase array.
      if (phrase.filter((e) => e.verify).length > 0) return phrase;

      // Generate an array of words, and always include the last phrase
      // so we can check the phrase checksum
      let indeces: number[] = [LAST_PHRASE_INDEX];
      for (let i = 0; i < NUM_WORDS_TO_CONFIRM; i++) {
        while (true) {
          let index = Math.floor(Math.random() * MNEMONIC_PHRASE_LENGTH); // TODO: Magic number
          if (indeces.includes(index)) continue;

          indeces.push(index);
          break;
        }
      }

      indeces.forEach((index) => {
        phrase[index].verify = true;
      });

      return phrase;
    },
    []
  );

  const contextValues = {
    recoveryPhrase,
    isCreateMode,
    setRecoveryPhrase,
    generateRecoveryPhrase,
    setIsCreateMode,
    generatePhraseConfirmation,
    saveNewAccount,
  };

  return (
    <WalletContext.Provider value={contextValues}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext) as IWalletContext;
