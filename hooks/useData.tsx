import Storage from '@react-native-async-storage/async-storage';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { dark, light } from '../constants';
import { ITheme, IUseData } from '../constants/types';

// Initialize a Context
export const DataContext = React.createContext({});

/***
 * 
 * Data Context provider for the Application provides context that will
 * that will be available to all children elements inside the context.
 * 
 */
export const DataProvider = ({ children } : { children: React.ReactNode }) => {

    // State variable to track dark/light theme changes
    const [isDark, setIsDark] = useState(true);
    // State variable to check for theme changes
    const [theme, setTheme] = useState<ITheme>(dark);

    /***
     * 
     * Retrieve the current value for isDark from storage
     * 
     */
    const getIsDark = useCallback(async () => {
        const isDarkJSON = await Storage.getItem('isDark');

        if (isDarkJSON !== null) {
            setIsDark(JSON.parse(isDarkJSON));
        }
    }, [setIsDark]);

    /***
     * 
     * Callback method that sets the property isDark into storage
     * 
     */
    const handleIsDark = useCallback((payload : boolean) => {
        Storage.setItem('isDark', JSON.stringify(payload))
    }, [setIsDark]);

    /***
     * 
     * Get initial data for dark mode
     * 
     */
    useEffect(() => {
        getIsDark();
    }, [getIsDark]);

    
    /***
     * 
     * Get initial data for theme setting
     * 
     */
    useEffect(() => {
        setTheme(isDark ? dark : light);
    }, [isDark]);

    /***
     * 
     * Create a context value object for the data provider. These properties
     * and functions is available for the Children of the context.
     * 
     */
    const contextValue = {
        isDark,
        handleIsDark,
        theme,
        setTheme,
    };

    return (
        <DataContext.Provider value = {contextValue}>{ children }</DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext) as IUseData;
