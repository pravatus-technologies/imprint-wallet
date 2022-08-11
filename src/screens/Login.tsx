import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { Platform, Linking } from "react-native";

import * as regex from '../constants/regex';
import { Block, Button, Input, Text, Image, Checkbox } from "../components";
import { useAuth, useData, useTheme, useTranslation } from "../hooks";

const isAndroid = Platform.OS === "android";

interface IPasswordValidator {
  password: boolean,
};

interface IPasswordEntry {
  password: string,
};

export default () => {
  // Data and Authentication
  const { authenticate, setIsAuthenticated, setAccount } = useAuth();

  // Translation Provider
  const { t } = useTranslation();
  // Theme Provider and Values
  const { isDark } = useData();
  const { assets, colors, gradients, sizes } = useTheme();

  const [isValid, setIsValid] = useState<IPasswordValidator>({
    password: false,
  });

  const [passwordEntry, setPassword] = useState<IPasswordEntry>({
    password: '',
  });

  const handleChange = useCallback((value: any) => {
    setPassword((state) => ({ ...state, ...value }))
  }, [setPassword]);

  const handleAuthentication = async () => {
    // This must somehow return a result to display a message
    // if the login attempt failed.
    let account = await authenticate(passwordEntry.password);
    setIsAuthenticated(account !== null);
    setAccount(account);
  };

  /***
   * 
   * Track changes and state of Password entry
   * 
   */
  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      password: regex.password.test(passwordEntry.password)
    }));
  }, [passwordEntry, setIsValid]);

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{zIndex: 0}}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            radius={sizes.cardRadius}
            source={assets.loginBackground}
            height={sizes.height * 0.3}>
          </Image>
        </Block>
        {/* login form */}
        <Block
          keyboard
          marginTop={-(sizes.height * 0.2 - sizes.l)}
          behavior={!isAndroid ? 'padding' : 'height'}>
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="1%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
            <Block
              blur
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}>
              {/* social buttons */}
              <Block row center justify="space-evenly" marginVertical={sizes.m}>
                <MaterialCommunityIcons name="fingerprint" color={colors.primary} size={100}/> 
              </Block>
              <Block
                flex={0}
                align="center"
                justify="center"
                marginBottom={sizes.sm}
                paddingHorizontal={sizes.xxl}>
                <Text h4>Imprint</Text> 
                <Text p gray marginVertical={sizes.m}>Secure Digital Identity</Text>
              </Block>
              {/* form inputs */}
              <Block paddingHorizontal={sizes.sm}>
                <Input
                  marginTop={sizes.s}
                  secureTextEntry
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  placeholder={t('common.passwordPlaceholder')}
                  onChangeText={(value) => handleChange({ password: value })}
                />
              </Block>
              <Button
                onPress={handleAuthentication}
                marginTop={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}>
                <Text bold white transform="uppercase">
                  {t('common.signin')}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};