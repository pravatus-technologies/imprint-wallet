import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { Block, Text } from '../../components';
import { useData, useTheme, useTranslation } from '../../hooks';


const isAndroid = Platform.OS === 'android';

const Signup = () => {
    // Translations and Theme
    const {isDark} = useData();
    const {t} = useTranslation();
    const {colors, gradients, sizes} = useTheme();

    return (
        <Block safe marginTop={sizes.md}>
            <Block paddingHorizontal={sizes.s}>
                <Block flex={.3} align="center" paddingTop={sizes.s}>
                    <MaterialCommunityIcons name="wallet-outline" size={sizes.xxl * 1.75} style={{ color: colors.primary }}/>
                    <Text h2 gray>wallet</Text>
                </Block>
            </Block>
        </Block>
    );
};

export default Signup;