import { useEffect } from "react";
import { useNavigation } from '@react-navigation/core';
import QRCode from "react-native-qrcode-svg";
import { Button, Block, Image, Text } from "../../../components";
import GradientHedera from "../../../components/GradientHedera";
import { useAuth, useTheme } from "../../../hooks";
import * as SecureStorage from 'expo-secure-store';
import { APP_ID } from "../../../constants";

export default () => {
  const { sizes, assets, gradients } = useTheme();
  const { account } = useAuth();
  const navigation = useNavigation();

  return (
    <Block
      safe
      paddingVertical={sizes.padding}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: sizes.padding * 1.5 }}
    >
      {/* Credit Card Container */}
      <Block flex={0.3} marginTop="5%">
        {/* Credit Card */}
        <Block
          radius={sizes.cardRadius}
          marginHorizontal={sizes.width * 0.05}
          gradient={gradients.dark}
          shadow={true}
        >
          <GradientHedera>
            {/* Card Issuer with Logo */}
            <Block
              row
              width="100%"
              padding={sizes.s}
            >
              <Image
                source={assets.hbar}
                height={sizes.width * 0.07}
                width={sizes.width * 0.07}
              />
              <Text
                size={sizes.sm}
                white
                transform="uppercase"
                marginLeft={sizes.s}
              >
                Hedera Hashgraph
              </Text>
            </Block>
            <Block
              align="center"
              justify="center"
            >
              <QRCode value={account?.wallets[0].alias?.toString()} size={80} />
            </Block>
            {/* Card Name with Account Number */}
            <Block
              row
              align="flex-end"
              justify="space-between"
              width="100%"
              padding={sizes.s}
            >
              <Text p white transform="uppercase" marginLeft={sizes.s}>
                {account?.wallets[0]?.name}
              </Text>
              <Text
                size={sizes.sm}
                white
                transform="uppercase"
                marginRight={sizes.s}
              >
                {account?.wallets[0]?.alias?.substring(0, 25)}
              </Text>
            </Block>
          </GradientHedera>

        </Block>
      </Block>
      {/* Divider Container */}
      <Block
        flex={0}
        height={1}
        marginRight={sizes.md}
        marginVertical={sizes.sm}
        gradient={gradients.menu}
      />
      {/* Content Container */}
      <Block flex={0.6}>
        {/* Balance Container */}
        <Block flex={0.1}>
          <Block row justify="center" align="center">
            <Text p paddingTop={5} size={sizes.m}>
              421,300
            </Text>
            <Text p paddingTop={0} paddingLeft={sizes.s}>
              HBAR
            </Text>
          </Block>
        </Block>
        {/* Recent Transaction Container */}
        <Block
          marginHorizontal={sizes.s}
          marginVertical={sizes.s}
          padding={sizes.s}
        >
          {/* Transactions Header */}
          <Block row flex={0} justify="space-between">
            <Text>Recent Transactions</Text>
            <Text>Filter</Text>
          </Block>
          {/* Recent Transactions Window */}
          <Block scroll>
          </Block>
        </Block>
      </Block>
      {/* Bottom Button Container */}
      <Block
        flex={0.1}
        marginHorizontal={sizes.sm}
        padding={sizes.s}
        justify="center"
      >
        <Button gradient={gradients.primary}
          onPress={() => navigation.navigate('Send')}
        >
          <Text p white transform="uppercase">
            Send hbars
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

// const styles = StyleSheet.create({
//   container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//   },
// });
