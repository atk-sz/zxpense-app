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
  EventDetailsScreen,
} from './src/screens';
import { ToastProvider } from './src/contexts/ToastContext';
import { LoaderProvider } from './src/contexts/LoaderContext';
import { LoadingComponent } from './src/components';
import { IRootStackParamList } from './src/utils/interfaces';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';
  const Stack = createNativeStackNavigator<IRootStackParamList>();

  return (
    <LoaderProvider>
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
            <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
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
