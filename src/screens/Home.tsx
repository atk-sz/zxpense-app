import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { setValue, resetValue } from '../redux/slices/auth';
import ScreenView from '../utils/ScreenView';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({
  navigation,
}): React.JSX.Element => {
  const dispatch = useDispatch();
  const [localVal, setLocalVal] = React.useState('');
  const goToLogin = (): void => {
    navigation.navigate('Login');
  };

  const goToProfile = (): void => {
    navigation.navigate('Profile');
  };

  const updateValue = (): void => {
    dispatch(setValue(localVal));
    setLocalVal('');
  };

  const clearValue = (): void => {
    dispatch(resetValue());
    setLocalVal('');
  };

  return (
    <ScreenView>
      <Text style={styles.text}>Home Screen</Text>
      <View style={styles.container1}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Value"
          value={localVal}
          onChangeText={setLocalVal}
        />
        <TouchableOpacity style={styles.btn} onPress={updateValue}>
          <Text>Update Value</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={clearValue}>
          <Text>Clear Value</Text>
        </TouchableOpacity>
      </View>
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
  },
  container1: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textInput: {
    flex: 3,
    color: '#ffffff',
    backgroundColor: '#000000',
  },
  btn: {
    backgroundColor: '#00ff00',
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default HomeScreen;
