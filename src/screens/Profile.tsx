import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IRootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { ScreenView } from '../components';

type IProfileScreenProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'Profile'>;
};

const ProfileScreen: React.FC<IProfileScreenProps> = ({
  navigation,
}): React.JSX.Element => {
  const { firstName, lastName } = useSelector((state: any) => state.user);

  const goToHome = (): void => {
    navigation.navigate('Home');
  };

  const goToLogin = (): void => {
    navigation.navigate('Login');
  };

  const goToDev = (): void => {
    navigation.navigate('Dev');
  };

  return (
    <ScreenView>
      <Text style={styles.text}>Profile Screen</Text>
      <Text>This is the text: {`${firstName} ${lastName}`}</Text>
      <TouchableOpacity style={styles.btn} onPress={goToHome}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={goToLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={goToDev}>
        <Text>Dev</Text>
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
  },
  btn: {
    backgroundColor: '#00ff00',
    padding: 20,
  },
});

export default ProfileScreen;
