import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { DarkTheme } from '../../utils/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IUserState } from '../../utils/interfaces';

interface IUserFormProps {
  formValues: IUserState;
  formErrors: Partial<Record<keyof IUserState, string>>;
  handleChange: (key: keyof IUserState, value: any) => void;
  onSubmit: () => void;
}

const UserForm: React.FC<IUserFormProps> = ({
  formValues,
  formErrors,
  handleChange,
  onSubmit,
}) => {
  return (
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
      <TouchableOpacity style={styles.btn} onPress={onSubmit}>
        <Text style={{ color: DarkTheme.text }}>Submit</Text>
      </TouchableOpacity>
    </View>
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

export default UserForm;
