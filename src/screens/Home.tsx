import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IRootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EventExpenseList, ScreenView } from '../components';
import { DarkTheme } from '../utils/theme';
import { dummyEventExpenses } from '../utils/data.util';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = (): React.JSX.Element => {
  return (
    <ScreenView>
      <View style={styles.container}>
        <EventExpenseList expenses={dummyEventExpenses} />
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkTheme.primary,
  },
});

export default HomeScreen;
