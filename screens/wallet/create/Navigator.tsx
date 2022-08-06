import { createStackNavigator } from "@react-navigation/stack";
import { WalletProvider } from "../../../hooks";

import { Start } from "./Start";
import { Create } from "./Create";
import {Confirm} from "./Confirm";

const WalletCreateStack = createStackNavigator();

export const WalletCreateStackNavigator = () => {
  return (
    <WalletProvider>
      <WalletCreateStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Start"
      >
        <WalletCreateStack.Screen name="Start" component={Start} />
        <WalletCreateStack.Screen name="Create" component={Create} />
	<WalletCreateStack.Screen name="Confirm" component={Confirm}/>
      </WalletCreateStack.Navigator>
    </WalletProvider>
  );
};


