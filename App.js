import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './src/stack/home'
import { SafeAreaView } from 'react-native';
import color from './src/constants/color';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/toast';
function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.bgBlue }}>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}

export default App;