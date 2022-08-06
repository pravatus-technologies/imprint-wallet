import {Text} from "react-native";
import {useEffect} from "react";
import {useWallet} from "../../../hooks"

export const Confirm = () => {
  const {recoveryPhrase} = useWallet();

  useEffect(() => {
    console.log(`Recovery ${recoveryPhrase}`);
  })

  return (<Text>Confirm</Text>)
}
