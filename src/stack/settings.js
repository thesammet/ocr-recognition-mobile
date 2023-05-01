import Settings from '../pages/settings'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Settings"
                component={Settings}
                options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}


export default HomeStack;