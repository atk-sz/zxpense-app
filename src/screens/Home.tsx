import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenView } from '../components';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = (): React.JSX.Element => {
  return (
    <ScreenView>
      <Text style={styles.text}>Home Screen</Text>
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
