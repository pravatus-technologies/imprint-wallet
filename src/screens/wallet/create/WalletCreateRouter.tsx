import { createStackNavigator } from "@react-navigation/stack";
import { useAuth, WalletProvider } from "../../../hooks";
import { Start } from "./Start";
import { Create } from "./Create";
import { NO_ACTIVE_WALLET } from "../../../constants";
import { Confirm } from "./Confirm";
import { Save } from "./Save";
import { useEffect } from "react";
import WalletHomeRouter from '../home/WalletHomeRouter';

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

export default () => {
  const { account, isAccountExists, isAuthenticated } = useAuth();

  useEffect(() => {
    console.log(`==> WalletCreateRouter - Account ${JSON.stringify(account)}`);
  });

  if (isAuthenticated && account?.wallets?.length === NO_ACTIVE_WALLET) {
    return (<WalletCreateStackNavigator/>);
  } else {
    return (<WalletHomeRouter/>);
  }
};
