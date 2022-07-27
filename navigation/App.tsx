import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { useData } from '../hooks';


export default () => {
    const { isDark, theme, setTheme } = useData();

    useEffect(() => {
        Platform.OS === 'android' && StatusBar.setTranslucent(true);
        StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');

        return () => {
            StatusBar.setBarStyle('default');
        }
    }, [isDark]);

    // load custom fonts
    const [fontsLoaded] = useFonts({
        'Quicksand-Light': theme.assets.QuicksandLight,
        'Quicksand-Regular': theme.assets.QuicksandRegular,
        'Quicksand-Medium': theme.assets.QuicksandMedium,
        'Quicksand-ExtraBold': theme.assets.QuicksandSemiBold,
        'Quicksand-Bold': theme.assets.QuicksandBold,
    });

    const navigationTheme = {
        ...DefaultTheme,
        dark: isDark,
        colors: {
            ...DefaultTheme.colors,
            border: 'rgba(0,0,0,0)',
            text: String(theme.colors.text),
            card: String(theme.colors.card),
            primary: String(theme.colors.primary),
            notification: String(theme.colors.primary),
            background: String(theme.colors.background),
        },
    };
};