import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  navigation,
}): React.JSX.Element => {
  const goToHome = (): void => {
    navigation.navigate('Home');
  };

  const goToLogin = (): void => {
    navigation.navigate('Login');
  };

  // const showAlert = () => {
  //   Alert.alert('Title', 'This is the alert message.', [
  //     { text: 'Cancel', style: 'cancel' },
  //     { text: 'OK', onPress: onClick },
  //   ]);
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <TouchableOpacity style={styles.btn} onPress={goToHome}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={goToLogin}>
        <Text>Login</Text>
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

export default ProfileScreen;
