import {createStackNavigator} from "@react-navigation/stack";
import {Save} from "../create/Save";
import {Home} from "./Home";

const WalletHomeStack = createStackNavigator();
export const WalletHomeStackNavigator = () => {
  return (
    <WalletHomeStack.Navigator
      screenOptions={{ headerShown: false}}
      initialRouteName="Home"
    >
      <WalletHomeStack.Screen name="Home" component={Home}/>
      <WalletHomeStack.Screen name="Save" component={Save}/>
    </WalletHomeStack.Navigator>
  );
};
