import React, { useCallback, useEffect, useState } from "react";
import { Linking, Platform } from "react-native";

import { useAuth, useData, useTheme, useTranslation } from "../hooks/";
import * as regex from "../constants/regex";
import { Block, Button, Input, Image, Text, Checkbox } from "../components/";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const isAndroid = Platform.OS === "android";

interface IRegistrationValidation {
  password: boolean;
  confirm: boolean;
  agreed: boolean;
}

interface IRegistration {
  password: string;
  confirm: string;
  agreed: boolean;
}

const Register = () => {
  // Translations and Theme
  const { isDark } = useData();
  const { t } = useTranslation();
  const { colors, gradients, sizes, assets } = useTheme();

  // Auth services
  const { register, setIsAccountExists } = useAuth();

  // Tracks the state of the validation object. This makes sure
  // that whatever we enter into the form is valid.
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    password: false,
    confirm: false,
    agreed: false,
  });

  // Tracks the state of the registration form.
  const [registration, setRegistration] = useState<IRegistration>({
    password: "",
    confirm: "",
    agreed: false,
  });

  const handleChange = useCallback(
    (value: any) => {
      setRegistration((state) => ({ ...state, ...value }));
    },
    [setRegistration]
  );

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      password: regex.password.test(registration.password),
      confirm: registration.confirm === registration.password,
      agreed: registration.agreed,
    }));
  }, [registration, setIsValid]);

  const handleCreateAccount = useCallback(async () => {
    // TODO: error handler here perhaps?
    await register({ password: registration.password });
    setIsAccountExists(true);
  }, [isValid, registration]);

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{ zIndex: 0 }}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            radius={sizes.cardRadius}
            source={assets.loginBackground}
            height={sizes.height * 0.3}
          ></Image>
        </Block>
        {/* register form */}
        <Block
          keyboard
          behavior={!isAndroid ? "padding" : "height"}
          marginTop={-(sizes.height * 0.2)}
        >
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
              paddingVertical={sizes.sm}
            >
              <Block row center justify="space-evenly" marginVertical={sizes.m}>
                <MaterialCommunityIcons
                  name="fingerprint"
                  color={colors.primary}
                  size={100}
                />
              </Block>
              <Block
                flex={0}
                align="center"
                justify="center"
                marginBottom={sizes.sm}
                paddingHorizontal={sizes.s}
              >
                <Text h4>{t('app.name')}</Text>
                <Text p gray marginVertical={sizes.s} paddingBottom={sizes.s}>
                  {t('app.tagline')}
                </Text>
                <Text p>
                  {t('register.info')}
                </Text>
              </Block>
              {/* form inputs */}
              <Block paddingHorizontal={sizes.sm}>
                <Input
                  secureTextEntry
                  autoCapitalize="none"
                  placeholder={t("common.passwordPlaceholder")}
                  onChangeText={(value) => handleChange({ password: value })}
                  success={Boolean(registration.password && isValid.password)}
                  danger={Boolean(registration.password && !isValid.password)}
                />
                <Input
                  secureTextEntry
                  autoCapitalize="none"
                  placeholder={t("common.confirmPasswordPlaceholder")}
                  onChangeText={(value) => handleChange({ confirm: value })}
                  success={Boolean(registration.confirm && isValid.confirm)}
                  danger={Boolean(registration.confirm && !isValid.confirm)}
                  marginTop={sizes.sm}
                />
              </Block>
              {/* checkbox terms */}
              <Block row flex={0} align="center" paddingHorizontal={sizes.sm}>
                <Checkbox
                  marginRight={sizes.sm}
                  marginVertical={sizes.l}
                  checked={registration?.agreed}
                  onPress={(value) => handleChange({ agreed: value })}
                />
                <Text paddingRight={sizes.s}>
                  {t("common.agree")}
                  <Text
                    semibold
                    onPress={() => {
                      Linking.openURL("https://www.creative-tim.com/terms");
                    }}
                  >
                    {t("common.terms")}
                  </Text>
                </Text>
              </Block>
              <Button
                onPress={handleCreateAccount}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}
                disabled={Object.values(isValid).includes(false)}
              >
                <Text bold white transform="uppercase">
                  {t("common.signup")}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Register;
