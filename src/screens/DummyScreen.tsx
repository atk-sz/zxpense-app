import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IRootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DarkTheme } from '../utils/theme';
import { ScreenView } from '../components';

type IDummyScreenProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'Dummy'>;
};

const DummyScreen: React.FC<IDummyScreenProps> = (): React.JSX.Element => {
  return (
    <ScreenView>
      <View style={styles.container}>
        <Text style={styles.text}>Hi this is Dummy Screen</Text>
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkTheme.primary,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: DarkTheme.text,
  },
});

export default DummyScreen;
