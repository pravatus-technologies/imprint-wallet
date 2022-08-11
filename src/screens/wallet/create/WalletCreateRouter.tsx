import { createStackNavigator } from "@react-navigation/stack";
import { WalletProvider } from "../../../hooks";
import { Start } from "./Start";
import { Create } from "./Create";

const WalletCreateStack = createStackNavigator();

const WalletCreateStackNavigator = () => {
  return (
    <WalletProvider>
      <WalletCreateStack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false}}>
        <WalletCreateStack.Screen name="Start" component={Start}/>
        <WalletCreateStack.Screen name="Create" component={Create}/>
      </WalletCreateStack.Navigator>
    </WalletProvider>
  );
};

export default () => {
    return (<WalletCreateStackNavigator/>);
};
