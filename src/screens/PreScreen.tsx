import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { IRootStackParamList, IUserState } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DarkTheme } from '../utils/theme';
import { ScreenView } from '../components';
import { useToast } from '../contexts/ToastContext';
import { useDispatch } from 'react-redux';
import { setValue } from '../redux/slices/user';

type IPreScreenProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'PreScreen'>;
};

const PreScreen: React.FC<IPreScreenProps> = ({
  navigation,
}): React.JSX.Element => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof IUserState, string>>
  >({});
  const [formValues, setFormValues] = useState<IUserState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (key: keyof IUserState, value: any) => {
    setFormValues(prev => ({ ...prev, [key]: value }));

    // Clear the error for this field when user starts typing
    if (formErrors[key]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };
  const onSave = async (): Promise<void> => {
    const errors: Partial<Record<keyof IUserState, string>> = {};

    if (!formValues.firstName.trim()) {
      formErrors.firstName = 'First name is required';
      showToast('First name must be at least 3 characters long', 'error');
      return;
    }

    if (formValues.firstName.length < 3)
      errors.firstName = 'First name must be at least 3 characters long';
    if (formValues.firstName.length > 25)
      errors.firstName = 'First name can be at most 25 characters long';

    if (formValues.lastName) {
      if (formValues.lastName.length > 25)
        errors.lastName = 'Last name can be at most 25 characters long';
    }

    if (Object.keys(errors).length > 0) {
      showToast('Please fix the following errors', 'error');
      setFormErrors(errors);
      return;
    }

    dispatch(
      setValue({
        firstName: formValues.firstName,
        lastName: formValues.lastName || '',
      }),
    );
    navigation.replace('Dev');
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
            value={formValues.firstName}
            onChangeText={value => handleChange('firstName', value)}
            maxLength={25}
          />
          <Text style={styles.errorText}>{formErrors.firstName ?? ' '}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            value={formValues.lastName}
            onChangeText={value => handleChange('lastName', value)}
            maxLength={25}
          />
          <Text style={styles.errorText}>{formErrors.lastName ?? ' '}</Text>
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
  errorText: {
    color: DarkTheme.error,
    marginBottom: 8,
    fontSize: 12,
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
