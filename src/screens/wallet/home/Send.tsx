import React, { useEffect } from "react";
import {Platform, TextInput, Linking} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import {Ionicons} from '@expo/vector-icons';
import {Block, Button, Image, Text, Input} from '../../../components';
import GradientHedera from "../../../components/GradientHedera";
import {useData, useTheme, useTranslation} from '../../../hooks';

const isAndroid = Platform.OS === 'android';

export default () => {
  const { sizes, assets, gradients, colors } = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation();

  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  return (
    <Block
      safe
      marginTop={sizes.md}
    >

      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}
      >

        {/* HBAR Info Container */}
        <Block 
          marginTop="5%" 
          radius={sizes.cardRadius} 
          marginVertical={sizes.m}
          // marginHorizontal={sizes.width * 0.01}
          gradient={gradients.tertiary}
          shadow={true}
        >
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            paddingBottom={sizes.l}
            radius={sizes.cardRadius}
            source={assets.hederagradient}
          >
            <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}>
              <Image
                radius={0}
                width={10}
                height={18}
                color={colors.white}
                source={assets.arrow}
                transform={[{rotate: '180deg'}]}
              />
              <Text p white marginLeft={sizes.s}>
                Wallet
              </Text>
            </Button>

            <Block flex={0} align="center">
              <Text p center white size={sizes.sm} marginTop={sizes.sm}>
                SEND HBARS
              </Text>
                <Image
                  width={85}
                  height={85}
                  marginTop={sizes.sm}
                  marginBottom={sizes.sm}
                  source={assets.hedera}
                />
              <Text h5 center white marginBottom={sizes.sm}>
                Enter Amount
              </Text>
              <Text h1 center white>
                150
              </Text>
              <Text p center white size={sizes.m} paddingTop={12}>
                $15.00
              </Text>

            </Block>

          </Image>

        </Block>

        {/* Alert Container */}
        <Block>
          <Text
            p
            size={sizes.sm}
            color={"#FFAA33"} 
            marginVertical={sizes.s}
            marginLeft={sizes.s}
          >
            Hedera Hashgraph
          </Text>
        </Block>

        {/* Input Container */}
        <Block flex={0} justify="space-between"
          marginVertical={sizes.m}
          padding={sizes.s}
        >
          {/* Address Container */}
          <Block flex={0.1}>
            <Block>
              <Input gray placeholder="Tap to paste address..." marginBottom={sizes.sm} padding={sizes.s}/>
            </Block>
          </Block>

          {/* Message Container */}
          <Block flex={0.1}>
            <Block marginTop="2%">
              <Input gray placeholder="Message / Memo ..." 
                padding={sizes.s}
                marginBottom={sizes.sm} 
                multiline
                numberOfLines={3}
              />
            </Block>
          </Block>
        </Block>

        {/* Bottom Button Container */}
        <Block
          flex={0.1}
          // marginHorizontal={sizes.sm}
          padding={sizes.s}
          justify="center"
        >
          <Button gradient={gradients.primary}
            onPress={() => navigation.navigate('Send')}
          >
            <Text p white transform="uppercase">
              Send
            </Text>
          </Button>
        </Block>

      </Block>
      
    </Block>
  );
};

