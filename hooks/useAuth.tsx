import React, { useCallback, useContext, useEffect, useState } from 'react';
import { JSHash, CONSTANTS } from 'react-native-hash';
import * as SecureStore from 'expo-secure-store';

import { IAccount, IAuthContext } from '../constants/types';
import {APP_ID} from '../constants';
// import { Platform } from 'react-native';

export const AuthContext = React.createContext({});
export const AuthProvider = ({ children } : { children : React.ReactNode }) => {
    const [account, setAccount] = useState<IAccount>();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAccountExists, setIsAccountExists] = useState(false);

    /**
     *
     * Retrieve the current value for Account in Secure Storage
     *
     */
    const getAccount = useCallback(async () => {
      try {
	const storedAccount = await SecureStore.getItemAsync(APP_ID);

        if (storedAccount !== null) {
      	  setIsAccountExists(true);
	  setAccount(JSON.parse(storedAccount));
        }
      } catch (e) {
      	throw e;
      }
      
    }, [setAccount]);

    /**
     *
     * Get initial data for Account
     *
     */
    useEffect(() => {
      getAccount();
    }, [getAccount]);

    const register = async (acct : IAccount) => {
        // TODO: Error handler?
        const password = await JSHash(acct.password, CONSTANTS.HashAlgorithms.sha256);

	let newAccount: IAccount = {
	  password: password,
	  wallets: []
	}
        console.log(`==> New Account ${JSON.stringify(newAccount)}`);
        await SecureStore.setItemAsync(APP_ID, JSON.stringify(newAccount));
    };

    /***
     * 
     * Authenticate a user using the password stored in Secure Store and compare
     * the hash against the one given by the user.
     * 
     */
    const authenticate = async (password: string) : Promise<IAccount> => {
        const hashedPassword = await JSHash(password, CONSTANTS.HashAlgorithms.sha256);
        const account: IAccount = JSON.parse(await SecureStore.getItemAsync(APP_ID) as string);

        if (!account) 
            throw new Error('Unable to Authenticate a non-existing account.');

        if (hashedPassword === account.password) {
            return Promise.resolve(account);
        }
        
        return Promise.resolve(account);
    };

    /***
     * 
     * Get the account from Secure Storage and set it's value.
     * 
     */
    const checkAccountExists = async (): Promise<IAccount> => {
        const result = await SecureStore.getItemAsync(APP_ID);
	if (result) {
	   Promise.resolve(JSON.parse(result) as IAccount);
	}
        return Promise.resolve({});
    }

    const contextValue = {
        account,
        register,
        authenticate,
        checkAccountExists,
        isAuthenticated,
        isAccountExists,
        setIsAccountExists,
        setIsAuthenticated,
        setAccount,
    };

    return (
        <AuthContext.Provider value = {contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext) as IAuthContext;
