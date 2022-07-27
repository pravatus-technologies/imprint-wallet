import React from 'react';

import { Block } from '../components';
import { useData, useTheme } from '../hooks';
import { AuthProvider } from '../hooks/useAuth';

export default () => {

    const { isDark } = useData();
    const { gradients } = useTheme();

    return (
        <Block gradient={gradients[isDark ? 'dark' : 'light']}>
            <AuthProvider>
                
            </AuthProvider>
        </Block>
    )
};