import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { Text } from 'react-native';
import { JSHash, CONSTANTS } from 'react-native-hash';
import Signup from '../screens/auth/Signup';
import Signin from '../screens/auth/Signin';




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
    

    return (
        <AuthStackNavigator/>
    );
};