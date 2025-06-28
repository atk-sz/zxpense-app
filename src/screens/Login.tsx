import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({
  navigation,
}): React.JSX.Element => {
  const goToProfile = (): void => {
    navigation.navigate('Profile');
  };

  const goToHome = (): void => {
    navigation.navigate('Home');
  };
  // const showAlert = () => {
  //   Alert.alert('Title', 'This is the alert message.', [
  //     { text: 'Cancel', style: 'cancel' },
  //     { text: 'OK', onPress: onClick },
  //   ]);
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Screen</Text>
      <TouchableOpacity style={styles.btn} onPress={goToProfile}>
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={goToHome}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
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
  },
  btn: {
    backgroundColor: '#00ff00',
    padding: 20,
  },
});

export default LoginScreen;
