import { useEffect } from "react";
import QRCode from 'react-native-qrcode-svg';
import { Block, Image, Text } from "../../../components";
import { useAuth, useTheme } from "../../../hooks";

export default () => {
  const { sizes, assets, colors, gradients } = useTheme();
  const { account } = useAuth();

  useEffect(() => {
    console.log(`==> Wallet Info ${JSON.stringify(account)}`);
  })

  return (
    <Block
      safe
      paddingVertical={sizes.padding}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: sizes.padding * 1.5 }}
    >
      {/* Credit Card Container */}
      <Block marginTop="5%">
        {/* Credit Card */}
        <Block
          flex={0.3}
          radius={sizes.cardRadius}
          marginHorizontal={sizes.width * 0.05}
          height={sizes.height * 0.2}
          gradient={gradients.dark}
          shadow={true}
        >
          <Image source={assets.loginBackground} resizeMode="stretch"/>
          { /* Card Issuer with Logo */}
          <Block
            row
            align="center"
            position="absolute"
            width="100%"
            padding={sizes.s}
          >
            <Image
              source={assets.hbar}
              height={sizes.width * 0.1}
              width={sizes.width * 0.1}
            />
            <Text p white transform="uppercase" marginLeft={sizes.s}>
              Hedera Hashgraph
            </Text>
          </Block>
          <Block
            align="center"
            position="absolute"
            top={65}
            bottom={0}
            right={0}
            left={0}
            margin="auto"
          >
            <QRCode value={account?.wallets[0].alias?.toString()} size={75}/>
          </Block>
          {/* Card Name with Account Number */}
          <Block
            row
            align="center"
            justify="space-between"
            position="absolute"
            bottom={0}
            width="100%"
            padding={sizes.s}
          >
            <Text p white transform="uppercase" marginLeft={sizes.s}>{ account?.wallets[0]?.name }</Text>
            <Text p white transform="uppercase" marginRight={sizes.s}>{ account?.wallets[0]?.alias?.substring(0, 25) }</Text>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};
