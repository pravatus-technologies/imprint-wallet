import {Block, Text} from "../../../components"
import {useTheme} from "../../../hooks";


export const Send = () => {
  const { sizes } = useTheme();
  
  return (
    <Block
      safe
      marginTop={sizes.s}>
      <Text>Send</Text>
     </Block>
  ); 
};
