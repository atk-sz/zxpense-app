import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import ScreenView from '../utils/ScreenView';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  navigation,
}): React.JSX.Element => {
  const { value } = useSelector((state: any) => state.auth);
  const [localVal, setLocalVal] = React.useState('');
  const goToHome = (): void => {
    navigation.navigate('Home');
  };

  const goToLogin = (): void => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    setLocalVal(value);
  }, [value]);

  return (
    <ScreenView>
      <Text style={styles.text}>Profile Screen</Text>
      <Text>This is the text: {localVal}</Text>
      <TouchableOpacity style={styles.btn} onPress={goToHome}>
        <Text>Home</Text>
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
  },
  btn: {
    backgroundColor: '#00ff00',
    padding: 20,
  },
});

export default ProfileScreen;
