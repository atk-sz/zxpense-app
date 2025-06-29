import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DarkTheme } from '../utils/theme';
import { ScreenView, ToastMessage } from '../components';

type PreScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PreScreen'>;
};

const PreScreen: React.FC<PreScreenProps> = ({
  navigation,
}): React.JSX.Element => {
  const [name, setName] = useState({
    firstName: '',
    lastName: '',
  });
  const [toast, setToast] = useState(false);

  const goToHome = (): void => {
    if (name.firstName.length < 3) {
      setToast(true);
      return;
    }
    navigation.navigate('Home');
  };

  return (
    <ScreenView>
      {toast && (
        <ToastMessage
          message={'First name should be at least 3 characters long'}
          type={'error'}
          onHide={() => setToast(false)}
        />
      )}
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
        <TouchableOpacity style={styles.btn} onPress={goToHome}>
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
