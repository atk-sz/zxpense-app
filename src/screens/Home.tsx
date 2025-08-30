import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IRootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ExpenseEventsList, ScreenView } from '../components';
import { DarkTheme } from '../utils/theme';
import { useSelector } from 'react-redux';

type IHomeScreenProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<IHomeScreenProps> = (): React.JSX.Element => {
  const events = useSelector((state: any) => state.events);
  const { firstName, lastName } = useSelector((state: any) => state.user);

  return (
    <ScreenView>
      <View style={styles.container}>
        <Text style={styles.greeting}>
          Hi {`${firstName} ${lastName}`}! 👋 Welcome back
        </Text>
        <ExpenseEventsList expenses={events} />
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
