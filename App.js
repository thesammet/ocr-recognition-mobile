import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './src/stack/home'
import { SafeAreaView } from 'react-native';
import color from './src/constants/color';

function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.bgBlue }}>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;