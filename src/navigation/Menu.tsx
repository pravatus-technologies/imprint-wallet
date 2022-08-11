import React from 'react';

import { Block } from '../components';
import { useData, useTheme } from '../hooks';
import { AuthProvider } from '../hooks/useAuth';
import Router from './Router';

export default () => {

    const { isDark } = useData();
    const { gradients } = useTheme();

    return (
        <Block gradient={gradients['dark']}>
            <AuthProvider>
                <Router/>
            </AuthProvider>
        </Block>
    )
};