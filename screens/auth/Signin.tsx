import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";
import * as SecureStore from 'expo-secure-store';
import * as regex from '../../constants/regex';
import { Block, Button, Image, Input, Text } from "../../components";
import { AuthStackParamList } from "../../constants/types";
import { useAuth, useData, useTheme, useTranslation } from "../../hooks";

type AuthNavigationProps = NativeStackScreenProps<AuthStackParamList, "Signin">;

const isAndroid = Platform.OS === "android";

interface IPasswordValidator {
  password: boolean,
};

interface IPasswordEntry {
  password: string,
};

export default () => {
  // Data and Authentication
  const { account, authenticate, checkAccountExists } = useAuth();

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

  const handleAuthentication = async () => {
    // This must somehow return a result to display a message
    // if the login attempt failed.
    const result = await authenticate(passwordEntry.password);
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

  /***
   * 
   * Checks the local storage for an existing account and if
   * no account is found, redirect to the Signup page.
   * 
   */
  // useEffect(() => {
  //   (async () => {
  //     // TODO: expose the app constants into a constants export
  //     const result = await SecureStore.getItemAsync('IMPRINT5');
  //     if (result === null)
  //       navigation.replace("Signup");
  //   })();
  // }, []);

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
              onPress={handleAuthentication}
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
