import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import { useAuth } from "../hooks";
import Signup from "../screens/auth/Signup";
import Signin from "../screens/auth/Signin";
import { WalletCreateStackNavigator } from "../screens/wallet/create";
import { Text } from "../components";
import {IAccount} from "../constants/types";
import {Home} from "../screens/wallet/home/Home";
import {WalletHomeStackNavigator} from "../screens/wallet/home/HomeNavigator";

const WalletScreen = () => {
  const {account} = useAuth();
  
  useEffect(() => {
    console.log(`==> Wallet Home ${JSON.stringify(account as IAccount)}`);
  });
  
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
        component={WalletHomeStackNavigator}
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


export default () => {
  // Use the AuthContext
  const { account, isAccountExists, isAuthenticated } = useAuth();
  //const [accountExists, setAccountExists] = useState(false);

    /***
    * When the application starts and renders different screens
    * we need to check if the account exists or not to determine if
    * we need to ask the user to create a new account.
    * 
    */
  /*(async () => {
    let result = await checkAccountExists() as IAccount;
    console.log(`setIsAccountExists(${result !== null})`)
    setAccountExists(result);
    setAccount(result);
  })();*/

  /***
   * NOTE
   * 
   * If there no account exists on the device, show the signup screen.
   * From the documentation of Secure Storage, this might not apply to IOS
   * devices due to the KeyChain being shared across multiple devices
   * associated to each Apple Account? Not sure if that is the correct explanation
   * but if we store something on the local device, it will persist upon
   * installation on a new device.
   * 
   * For Android, I think this is a different story. Please make sure that 
   * the flow is reviewed and that it is compatible to all devices. Also perform
   * a precheck if Secure Storage is existing.
   * 
   */

  useEffect(() => {
    console.log(`==>Router Account is ${JSON.stringify(account)}`);
    console.log(`Wallet length ${account?.wallets?.length} authenticted ${isAuthenticated}`)
  });

  if (!isAccountExists) {
    // Return the Signup screen if no account exists on the device
    return (<Signup/>)
    
  } else if (isAuthenticated && account?.wallets?.length === 0) {
      // also consider wallet recover so maybe create a WalletCreateStack?
      return (
        <WalletCreateStackNavigator/>
      )
  }
  else {
    /***
     * If an Account or Wallet exists for this device show the appropriate
     * screen depending on the state of isAuthenticated variable.
     */
    return isAuthenticated ? (
        <AppTabNavigator/>
      ) : (
        <Signin/>
      );
  }
};
