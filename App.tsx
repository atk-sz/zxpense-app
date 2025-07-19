import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  DevScreen,
  HomeScreen,
  InitLoadScreen,
  LoginScreen,
  PreScreen,
  ProfileScreen,
  CreateEventScreen,
} from './src/screens';
import { StatusBar } from 'react-native';
import { ToastProvider } from './src/contexts/ToastContext';
import { LoaderProvider } from './src/contexts/LoaderContext';
import { LoadingComponent } from './src/components';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';
  const Stack = createNativeStackNavigator();

  return (
    <LoaderProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content" // or 'light-content' for white text
      />
      <ToastProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={'InitLoad'}
          >
            <Stack.Screen name="InitLoad" component={InitLoadScreen} />
            <Stack.Screen name="PreScreen" component={PreScreen} />
            <Stack.Screen name="Dev" component={DevScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
      <LoadingComponent />
    </LoaderProvider>
  );
}

export default App;
