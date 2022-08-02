import { DataProvider } from './hooks';
import AppNavigation from './navigation/App';

export default function App() {
  return (
    <DataProvider>
      <AppNavigation/>
    </DataProvider>
  );
};
