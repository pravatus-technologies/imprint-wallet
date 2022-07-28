import React, { useContext, useState } from 'react';
import { JSHash, CONSTANTS } from 'react-native-hash';

import { IAccount, IAuthContext } from '../constants/types';

export const AuthContext = React.createContext({});
export const AuthProvider = ({ children } : { children : React.ReactNode }) => {
    const [account, setAccount] = useState<IAccount>();
    
    const register = async (password: string) => {
        // TODO: Check if password entered follows standards
        const passwordHash = await JSHash(password, CONSTANTS.HashAlgorithms.sha256);
        console.log(passwordHash);   
    };

    const contextValue = {
        account,
        register
    };

    return (
        <AuthContext.Provider value = {contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext) as IAuthContext;