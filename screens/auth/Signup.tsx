import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Block, Text, Input, Checkbox, Button } from '../../components';
import * as regex from '../../constants/regex';
import { useData, useTheme, useTranslation } from '../../hooks';
import { useAuth } from '../../hooks';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../constants/types";

const isAndroid = Platform.OS === 'android';

interface IRegistrationValidation {
    password: boolean,
    confirm: boolean,
    agreed: boolean
}

interface IRegistration {
    password: string,
    confirm: string,
    agreed: boolean
}

type AuthNavigationProps = NativeStackScreenProps<AuthStackParamList, "Signin">;
export default ({ navigation }: AuthNavigationProps) => {
    // Translations and Theme
    const {isDark} = useData();
    const {t} = useTranslation();
    const {colors, gradients, sizes} = useTheme();

    // Auth services
    const {register} = useAuth();

    // Tracks the state of the validation object. This makes sure
    // that whatever we enter into the form is valid.
    const [isValid, setIsValid] = useState<IRegistrationValidation>({
        password: false,
        confirm: false,
        agreed: false
    });

    // Tracks the state of the registration form.
    const [registration, setRegistration] = useState<IRegistration>({
        password: '',
        confirm: '',
        agreed: false
    });

    const handleChange = useCallback((value) => {
        setRegistration((state) => ({ ...state, ...value}));
    }, [setRegistration]);

    useEffect(() => {
        setIsValid((state) => ({
            ...state,
            password: regex.password.test(registration.password),
            confirm: registration.confirm === registration.password,
            agreed: registration.agreed
        }));
    }, [registration, setIsValid]);

    const handleCreateAccount = useCallback(async () => {
        // TODO: error handler here perhaps?
        register({ password: registration.password});

        // TODO: expose Signin screenname to constants
        navigation.replace("Signin");
    }, [isValid, registration])

    return (
        <Block safe marginTop={sizes.md}>
            <Block paddingHorizontal={sizes.s}>
                <Block 
                    flex={.3} 
                    align="center" 
                    paddingTop={sizes.s} 
                    marginTop={sizes.sm}>
                    <MaterialCommunityIcons 
                        name="fingerprint" 
                        size={sizes.xxl * 1.20} 
                        style={{ color: colors.primary }}/>
                    <Text 
                        h4 
                        black>{t('app.name')}</Text>
                    <Text 
                        p 
                        size={sizes.sm} 
                        gray>{t('app.tagline')}</Text>
                </Block>
                <Block 
                    keyboard 
                    behavior={!isAndroid ? 'padding' : 'height'}>
                    <Block 
                        flex={0} 
                        marginHorizontal="5%" 
                        radius={sizes.sm} 
                        shadow={!isAndroid}>
                        <Block 
                            flex={0} 
                            overflow="hidden" 
                            justify="space-evenly" 
                            tint={colors.blurTint} 
                            paddingVertical={sizes.sm}>
                            <Text 
                                p 
                                semibold 
                                center 
                                paddingBottom={sizes.sm}>
                                {t('signup.title')}
                            </Text>
                            <Text 
                                p 
                                paddingBottom={sizes.sm}>
                                {t('signup.info')}
                            </Text>
                            <Input 
                                secureTextEntry 
                                autoCapitalize="none" 
                                placeholder={t('common.passwordPlaceholder')}
                                onChangeText={(value) => handleChange({ password: value })}
                                success={Boolean(registration.password && isValid.password)}
                                danger={Boolean(registration.password && !isValid.password)} 
                            />
                            <Input 
                                secureTextEntry 
                                autoCapitalize="none" 
                                placeholder={t('common.confirmPasswordPlaceholder')}
                                onChangeText={(value) => handleChange({ confirm: value })}
                                success={Boolean(registration.confirm && isValid.confirm)}
                                danger={Boolean(registration.confirm && !isValid.confirm)}
                                marginTop={sizes.sm}
                            />
                            <Block 
                                row 
                                flex={0} 
                                align="center" 
                                justify="space-evenly" 
                                paddingHorizontal={sizes.sm} 
                                marginTop={sizes.sm}>
                                <Checkbox
                                    marginRight={sizes.sm}
                                    checked={registration?.agreed}
                                    onPress={(value) => handleChange({ agreed: value })}
                                />
                                <Text 
                                    paddingRight={sizes.s} 
                                    marginTop={sizes.xs} 
                                    size={sizes.sm}>
                                    I agree to the <Text 
                                        semibold 
                                        onPress={() => console.log('conditions agreed')}>Terms and Conditions and Privacy Policy</Text>     
                                </Text>
                            </Block>
                            <Button 
                                onPress={handleCreateAccount}
                                marginVertical={sizes.s}
                                gradient={gradients.primary}
                                disabled={false}>
                                    <Text 
                                        bold
                                        white
                                        transform="uppercase">
                                            Create
                                    </Text>
                            </Button>
                        </Block>
                    </Block>
                </Block>
            </Block>
        </Block>
    );
};