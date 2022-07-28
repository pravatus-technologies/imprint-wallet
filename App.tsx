import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { DataProvider } from './hooks';
import AppNavigation from './navigation/App';

export default function App() {
  return (
    <DataProvider>
      <AppNavigation/>
    </DataProvider>
  );
};
