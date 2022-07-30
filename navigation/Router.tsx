import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import { Text } from 'react-native';
import { JSHash, CONSTANTS } from 'react-native-hash';
import { useAuth } from '../hooks';
import Signup from '../screens/auth/Signup';
import Signin from '../screens/auth/Signin';


const WalletScreen = () => {
    return (
        <Text>Wallet</Text>
    )
};
/***
 * Main Application Screen
 * 
 * The main screen for the application is an Application Tab that navigates between
 * different screens of functionality.
 * 
 */
const AppTab = createBottomTabNavigator();
const AppTabNavigator = () => {
    return (
        <AppTab.Navigator 
            screenOptions={{ headerShown: false}}>
            <AppTab.Screen 
                name="Home" 
                component={WalletScreen}
                options={{
                tabBarIcon: ({size, color}) => <MaterialCommunityIcons name="wallet-outline" size={size} color={color}/>
                }}/>
        </AppTab.Navigator>
    );
};

/***
 * Authentication Screen Stack
 * 
 * Composed of the following screens
 * - Signup that takes care of creating a new account (not to be confused with a new Hedera Wallet)
 * - Signin allows the user to select from the list of wallets currently on the device
 * 
 */
const AuthStack = createStackNavigator();
const AuthStackNavigator = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false}} initialRouteName="Signin">
            <AuthStack.Screen name="Signup" component={Signup}/>
            <AuthStack.Screen name="Signin" component={Signin}/>
        </AuthStack.Navigator>
    )
}

export default () => {
    const { account, checkAccountExists, isAuthenticated } = useAuth();
    /***
     * 
     * Checks the local storage for an existing account and if
     * no account is found, redirect to the Signup page.
     * 
     */
    // useEffect(() => {
    //     // Wrap the call to async getAccount method
    //     // to avoid running through the rest of the code.
    //     (async () => {
    //         await checkAccountExists();
    //     });
    // // Monitor changes to the account object
    // }, [account]);

    return (
        isAuthenticated ? <AppTabNavigator/> : <AuthStackNavigator/>
    );
};