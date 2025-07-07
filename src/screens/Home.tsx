import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IRootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ExpenseEventsList, ScreenView } from '../components';
import { DarkTheme } from '../utils/theme';
import { dummyExpenseEvents } from '../utils/data.util';
import { useSelector } from 'react-redux';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = (): React.JSX.Element => {
  const { firstName, lastName } = useSelector((state: any) => state.user);

  return (
    <ScreenView>
      <View style={styles.container}>
        <Text style={styles.greeting}>
          Hi {`${firstName} ${lastName}`}! 👋 Welcome back
        </Text>
        <ExpenseEventsList expenses={dummyExpenseEvents} />
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
