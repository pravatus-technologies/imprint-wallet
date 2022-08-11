import {useAuth, useTheme} from '../../../hooks';
import {Button, Block, Text} from '../../../components';
import QRCode from 'react-native-qrcode-svg';
import {IAccount, IWallet} from '../../../constants/types';
import {useState} from 'react';

export const Home = () => {
  const {sizes, gradients} = useTheme();
  const {account} = useAuth();

  const [wallet, setWallet] = useState<IWallet>((account as IAccount).wallets[0]);

  // There must be a block within the interface to display if the account is only an alias, this
  // would display the QR code of the alias so that an existing wallet can send HBAR to the account
  // alias.
  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block
	  flex={.1}
	  align="center"
	  paddingTop={sizes.s}
	  marginTop={sizes.sm}>
          <Text 
	    h4>{wallet.name}</Text>         
   	</Block>
        <Block
	  marginTop={25}
	  flex={.1}
	  align="center"
	  paddingTop={sizes.s}>
          <Text 
	    h3>$0.00</Text>         
	  <Text 
	    h5>0 HBAR</Text>
   	</Block>

	<Block
	  marginTop={25}
	  flex={.25}
	  padding={50}
          align="center"
	  justify="center">
	  <QRCode value={(account as IAccount).wallets[0].alias?.toString()} size={150}/>
	</Block>
	<Block
	  align="center"
	  marginVertical={sizes.s}>
	  <Button 
	    width="75%"
	    gradient={gradients.primary}
	    >
	    <Text
	      bold
	      white
	      transform="uppercase">Send</Text>
	  </Button>
	</Block>
      </Block>
    </Block>
  )
}
