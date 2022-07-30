import React, { useContext, useState } from 'react';
import { JSHash, CONSTANTS } from 'react-native-hash';
import * as SecureStore from 'expo-secure-store';

import { IAccount, IAuthContext } from '../constants/types';
// import { Platform } from 'react-native';

const APP_ID='IMPRINT4';

export const AuthContext = React.createContext({});
export const AuthProvider = ({ children } : { children : React.ReactNode }) => {
    const [account, setAccount] = useState<IAccount>();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const register = async (acct : IAccount) => {
        // TODO: Error handler?
        const password = await JSHash(acct.password, CONSTANTS.HashAlgorithms.sha256);
        acct.password = password;
        
        await SecureStore.setItemAsync(APP_ID, JSON.stringify(acct));
    };

    /***
     * 
     * Authenticate a user using the password stored in Secure Store and compare
     * the hash against the one given by the user.
     * 
     */
    const authenticate = async (password: string) : Promise<boolean> => {
        const hashedPassword = await JSHash(password, CONSTANTS.HashAlgorithms.sha256);
        const account: IAccount = JSON.parse(await SecureStore.getItemAsync(APP_ID) as string);

        if (!account) 
            throw new Error('Unable to Authenticate a non-existing account.');

        if (hashedPassword === account.password) {
            setIsAuthenticated(true);
            return Promise.resolve(true);
        }
        
        return Promise.resolve(false);
    };

    /***
     * 
     * Get the account from Secure Storage and set it's value.
     * 
     */
    const checkAccountExists = async (): Promise<boolean> => {
        const result = await SecureStore.getItemAsync(APP_ID);
        return Promise.resolve(result !== null);
    }

    const contextValue = {
        account,
        register,
        authenticate,
        checkAccountExists,
        isAuthenticated,
    };

    return (
        <AuthContext.Provider value = {contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext) as IAuthContext;