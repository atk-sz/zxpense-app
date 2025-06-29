import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenView from '../utils/ScreenView';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DarkTheme } from '../utils/theme';

type PreScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PreScreen'>;
};

const PreScreen: React.FC<PreScreenProps> = ({
  navigation,
}): React.JSX.Element => {
  const goToHome = (): void => {
    navigation.navigate('Home');
  };

  return (
    <ScreenView>
      <View style={styles.screenContainer}>
        <View style={styles.titleContainer}>
          <Icon name="diversity-2" size={30} color="#fff" />
          <Text style={{ color: 'white', fontSize: 30, paddingLeft: 30 }}>
            ZTrip Expenses
          </Text>
        </View>
        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.btn} onPress={goToHome}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  formContainer: {},
  btn: {
    backgroundColor: DarkTheme.secondary,
    padding: 20,
  },
});

export default PreScreen;
