import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IRootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DarkTheme } from '../utils/theme';
import { ExpenseEventForm, ScreenView } from '../components';

type ICreateEventScreenProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'CreateEvent'>;
};

const CreateEventScreen: React.FC<ICreateEventScreenProps> = ({
  navigation,
}): React.JSX.Element => {
  return (
    <ScreenView>
      <View style={styles.container}>
        <ExpenseEventForm navigation={navigation} />
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

export default CreateEventScreen;
