import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IRootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { ScreenView } from '../components';

type ILoginScreenProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'Login'>;
};

const LoginScreen: React.FC<ILoginScreenProps> = ({
  navigation,
}): React.JSX.Element => {
  const { firstName, lastName } = useSelector((state: any) => state.user);

  const goToProfile = (): void => {
    navigation.navigate('Profile');
  };

  const goToHome = (): void => {
    navigation.navigate('Home');
  };

  const goToDev = (): void => {
    navigation.navigate('Dev');
  };

  return (
    <ScreenView>
      <Text style={styles.text}>Login Screen</Text>
      <Text style={styles.text1}>
        This is the text: {`${firstName} ${lastName}`}
      </Text>
      <TouchableOpacity style={styles.btn} onPress={goToProfile}>
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={goToHome}>
        <Text>Home</Text>
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
  text1: {
    fontSize: 20,
  },
  btn: {
    backgroundColor: '#00ff00',
    padding: 20,
  },
});

export default LoginScreen;
