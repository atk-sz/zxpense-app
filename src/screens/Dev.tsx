import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IRootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenView } from '../components';
import { useLoader } from '../contexts/LoaderContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme } from '../utils/theme';

type IDevScreenProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'Dev'>;
};

const DevScreen: React.FC<IDevScreenProps> = ({
  navigation,
}): React.JSX.Element => {
  const { showLoader, hideLoader } = useLoader();

  const showLoaderFn = (): void => {
    showLoader('Brrr...');
    setTimeout(() => {
      hideLoader();
    }, 3000);
  };

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('firstName');
      await AsyncStorage.removeItem('lastName');
      navigation.replace('PreScreen');
    } catch (error) {
      console.error('Error removing data:', error);
    }
  };

  const goToHome = (): void => {
    navigation.navigate('Home');
  };

  const goToLogin = (): void => {
    navigation.navigate('Login');
  };

  const goToProfile = (): void => {
    navigation.navigate('Profile');
  };

  return (
    <ScreenView>
      <Text style={styles.text}>Dev Screen</Text>
      <View style={styles.container1}>
        <TouchableOpacity style={styles.btn} onPress={showLoaderFn}>
          <Text>Show Loading</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={removeData}>
          <Text>Remove Name</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btn} onPress={goToHome}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={goToProfile}>
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={goToLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: DarkTheme.text,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#00ff00',
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default DevScreen;
