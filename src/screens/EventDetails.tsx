import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { IRootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DarkTheme } from '../utils/theme';
import { ScreenView } from '../components';
import { RouteProp } from '@react-navigation/native';

type IEventDetailsScreenProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'EventDetails'>;
  route: RouteProp<IRootStackParamList, 'EventDetails'>;
};

const EventDetailsScreen: React.FC<IEventDetailsScreenProps> = ({
  route,
}): React.JSX.Element => {
  const { id } = route.params;
  return (
    <ScreenView>
      <View style={styles.container}>
        <Text style={styles.text}>Event Details</Text>
        <Text style={styles.text}>Event ID: {id}</Text>
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

export default EventDetailsScreen;
