import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { JSHash, CONSTANTS } from "react-native-hash";
import AppLoading from "expo-app-loading";
import { useAuth } from "../hooks";
import Signup from "../screens/auth/Signup";
import Signin from "../screens/auth/Signin";
import Loading from "../screens/Loading";

const WalletScreen = () => {
  return <Text>Wallet</Text>;
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
    <AppTab.Navigator screenOptions={{ headerShown: false }}>
      <AppTab.Screen
        name="Home"
        component={WalletScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="wallet-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
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
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Signin"
    >
      <AuthStack.Screen name="Signup" component={Signup} />
      <AuthStack.Screen name="Signin" component={Signin} />
    </AuthStack.Navigator>
  );
};

export default () => {
  // Use the AuthContext
  const { isAuthenticated } = useAuth();

  // Set the state of the app if it's ready or not
  // useful for pre-loading and initializing state
  // for the entire app.
  const [ isReady, setIsReady] = useState(false);

  return isAuthenticated ? (
    <AppTabNavigator />
  ) : (
    <AuthStackNavigator />
  );
};
