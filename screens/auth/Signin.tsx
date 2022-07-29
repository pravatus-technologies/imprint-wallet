import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";

import * as regex from '../../constants/regex';
import { Block, Button, Image, Input, Text } from "../../components";
import { AuthStackParamList } from "../../constants/types";
import { useAuth, useData, useTheme, useTranslation } from "../../hooks";

export type AuthNavigationProps = NativeStackScreenProps<AuthStackParamList, "Signin">;

const isAndroid = Platform.OS === "android";

interface IPasswordValidator {
  password: boolean,
};

interface IPasswordEntry {
  password: string,
};

export default ({ navigation }: AuthNavigationProps) => {
  // Data and Authentication
  const { account, authenticate, getAccount } = useAuth();

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

  const handleChange = useCallback((value) => {
    setPassword((state) => ({ ...state, ...value }))
  }, [setPassword]);

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

  /***
   * 
   * Checks the local storage for an existing account and if
   * no account is found, redirect to the Signup page.
   * 
   */
  useEffect(() => {
    // Wrap the call to async getAccount method
    // to avoid running through the rest of the code.
    (async () => {
      getAccount();
      if (!account) {
        navigation.replace("Signup");
      } 
    });
  // Monitor changes to the account object
  }, [account]);

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        {/* login form */}
        <Block
          keyboard
          marginTop={sizes.sm}
          behavior={!isAndroid ? "padding" : "height"}
        >
          <Block
            flex={0.3}
            align="center"
            paddingTop={sizes.s}
            marginTop={sizes.sm}
          >
            <MaterialCommunityIcons
              name="fingerprint"
              size={sizes.xxl * 2.5}
              style={{ color: colors.primary }}
            />
            <Text h4 black>
              {t("app.name")}
            </Text>
            <Text p size={sizes.sm} gray>
              {t("app.tagline")}
            </Text>
          </Block>
          <Block
            flex={0}
            overflow="hidden"
            justify="space-evenly"
            marginTop="35%"
            tint={colors.blurTint}
            paddingVertical={sizes.sm}
          >
            {/* form inputs */}
            <Block paddingHorizontal={sizes.sm} marginTop="5%">
              <Input
                secureTextEntry
                autoCapitalize="none"
                marginBottom={sizes.m}
                placeholder="Enter your password"
                onChangeText={(value) => handleChange({ password: value })}
                success={Boolean(isValid.password)}
   
              />
            </Block>
            <Button
              onPress={() => console.log(`Password entered: ${passwordEntry.password}`)}
              marginVertical={sizes.s}
              marginHorizontal={sizes.sm}
              gradient={gradients.primary}
              disabled={Boolean(!isValid.password)}
            >
              <Text bold white transform="uppercase">
                {t("common.signin")}
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};
