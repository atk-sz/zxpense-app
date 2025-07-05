import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IRootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EventExpenseList, ScreenView } from '../components';
import { DarkTheme } from '../utils/theme';
import { dummyEventExpenses } from '../utils/data.util';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = (): React.JSX.Element => {
  const userName = 'John'; // Replace with dynamic value if needed

  return (
    <ScreenView>
      <View style={styles.container}>
        <Text style={styles.greeting}>Hi {userName}! 👋 Welcome back</Text>
        <EventExpenseList expenses={dummyEventExpenses} />
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkTheme.primary,
    padding: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DarkTheme.text,
    marginBottom: 16,
    lineHeight: 28,
    textAlign: 'center',
  },
});

export default HomeScreen;
