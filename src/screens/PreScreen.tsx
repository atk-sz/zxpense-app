import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { IRootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DarkTheme } from '../utils/theme';
import { ScreenView } from '../components';
import { useToast } from '../contexts/ToastContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setValue } from '../redux/slices/user';
import Config from 'react-native-config';
import { API_URL, APP_ENV } from '@env';

type IPreScreenProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'PreScreen'>;
};

const PreScreen: React.FC<IPreScreenProps> = ({
  navigation,
}): React.JSX.Element => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [name, setName] = useState({
    firstName: '',
    lastName: '',
  });

  console.log('Config: ', Config);
  console.log('API_URL: ', Config.API_URL);

  const onSave = async (): Promise<void> => {
    if (name.firstName.length < 3) {
      showToast('First name must be at least 3 characters long.', 'error');
      return;
    }
    console.log('APP_ENV', APP_ENV);
    console.log('API_URL', API_URL);
    console.log('Config: ', Config);
    console.log('API_URL: ', Config.API_URL);
    // await AsyncStorage.setItem('firstName', `${name.firstName}`);
    // await AsyncStorage.setItem('lastName', `${name.lastName}`);
    // dispatch(
    //   setValue({
    //     firstName: name.firstName,
    //     lastName: name.lastName || '',
    //   }),
    // );
    // navigation.replace('Dev');
  };

  return (
    <ScreenView>
      <View style={styles.screenContainer}>
        <View style={styles.titleContainer}>
          <Icon name="diversity-2" size={30} color="#fff" />
          <Text style={styles.titleText}>Zxpense</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            value={name.firstName}
            onChangeText={value => setName({ ...name, firstName: value })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            value={name.lastName}
            onChangeText={value => setName({ ...name, lastName: value })}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={onSave}>
          <Text style={{ color: DarkTheme.text }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    color: DarkTheme.text,
    fontSize: 30,
    paddingLeft: 30,
  },
  inputContainer: {
    width: '80%',
  },
  inputLabel: {
    color: DarkTheme.text,
  },
  input: {
    color: DarkTheme.text,
    backgroundColor: DarkTheme.dark,
    borderWidth: 2,
    borderColor: DarkTheme.grey,
    borderRadius: 20,
    height: 50,
    padding: 10,
    marginVertical: 10,
  },
  btn: {
    height: 50,
    backgroundColor: DarkTheme.secondary,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
});

export default PreScreen;
