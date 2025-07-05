import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  HomeScreen,
  LoaderScreen,
  LoginScreen,
  PreScreen,
  ProfileScreen,
} from './src/screens';
import { StatusBar } from 'react-native';
import { ToastProvider } from './src/contexts/ToastContext';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';
  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content" // or 'light-content' for white text
      />
      <ToastProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={'Loader'}
          >
            <Stack.Screen name="Loader" component={LoaderScreen} />
            <Stack.Screen name="PreScreen" component={PreScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </>
  );
}

export default App;
