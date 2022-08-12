import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";

const WalletStack = createStackNavigator();

 const WalletStackNavigator = () => {
  return (
    <WalletStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <WalletStack.Screen name="Home" component={Home} />
    </WalletStack.Navigator>
  );
};

export default () => {
    return (<WalletStackNavigator/>)
}
