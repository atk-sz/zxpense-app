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
  TransactionDetailsScreen,
} from './src/screens';
import { ToastProvider } from './src/contexts/toast.context';
import { LoaderProvider } from './src/contexts/loader.context';
import { CustomDrawer, LoadingComponent } from './src/components';
import { IRootStackParamList } from './src/utils/interfaces';
import { DrawerProvider } from './src/contexts/drawer.context';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';
  const Stack = createNativeStackNavigator<IRootStackParamList>();

  return (
    <LoaderProvider>
      <ToastProvider>
        <DrawerProvider>
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
              <Stack.Screen
                name="EventDetails"
                component={EventDetailsScreen}
              />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen
                name="TransactionDetails"
                component={TransactionDetailsScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <CustomDrawer />
        </DrawerProvider>
      </ToastProvider>
      <LoadingComponent />
    </LoaderProvider>
  );
}

export default App;
