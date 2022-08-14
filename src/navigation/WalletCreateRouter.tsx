import { createStackNavigator } from "@react-navigation/stack";
import { useAuth, WalletProvider } from "../hooks";
import { Start } from "../screens/wallet/create/Start";
import { Create } from "../screens/wallet/create/Create";
import { Confirm } from "../screens/wallet/create/Confirm";
import { Save } from "../screens/wallet/create/Save";

const WalletCreateStack = createStackNavigator();

/**
 * Returns a Stack Navigator for creating a new Wallet. It is composed
 * of four screens corresponding to each step from Start to Save.
 *  
 * @returns Stack Navigator
 */
const WalletCreateStackNavigator = () => {
  return (
    <WalletProvider>
      <WalletCreateStack.Navigator
        initialRouteName="Start"
        screenOptions={{ headerShown: false }}
      >
        <WalletCreateStack.Screen name="Start" component={Start} />
        <WalletCreateStack.Screen name="Create" component={Create} />
        <WalletCreateStack.Screen name="Confirm" component={Confirm} />
        <WalletCreateStack.Screen name="Save" component={Save} />
      </WalletCreateStack.Navigator>
    </WalletProvider>
  );
};

export default WalletCreateStackNavigator;

