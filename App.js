import { useEffect } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './src/stack/home'
import { SafeAreaView } from 'react-native';
import color from './src/constants/color';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/toast';
import { requestTrackingPermission } from 'react-native-tracking-transparency';
const iosTrack = async () => {
  const trackingStatus = await requestTrackingPermission();
  if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
    //todo: enable tracking
  }
};
function App() {
  useEffect(() => {
    Platform.OS === 'ios' && iosTrack();
  }, []);
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