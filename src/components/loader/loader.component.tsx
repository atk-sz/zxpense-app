import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IRootStackParamList } from '../../utils/interfaces';
import { DarkTheme } from '../../utils/theme';
import { useDispatch } from 'react-redux';
import { setValue } from '../../redux/slices/user';
import { saveOpenEvent } from '../../redux/slices/event';
import { initializeEvents } from '../../redux/slices/events';
import { useNavigation } from '@react-navigation/native';

type LoaderComponentProps = {};

const LoaderComponent: React.FC<LoaderComponentProps> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<IRootStackParamList>>();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserName = async () => {
      try {
        const firstName = await AsyncStorage.getItem('firstName');
        const lastName = await AsyncStorage.getItem('lastName');
        const openEvent = await AsyncStorage.getItem('openEvent');
        const eventsList = await AsyncStorage.getItem('eventsList');
        const events = eventsList ? JSON.parse(eventsList) : [];
        const openEventObj = openEvent ? JSON.parse(openEvent) : null;
        if (firstName && firstName.length > 0) {
          dispatch(
            setValue({
              firstName: firstName,
              lastName: lastName || '',
            }),
          );
          dispatch(initializeEvents(events));
          dispatch(saveOpenEvent(openEventObj));
          navigation.replace('Dev');
          // navigation.replace('Home');
        } else {
          navigation.replace('PreScreen');
        }
      } catch (error) {
        console.error('Error checking storage:', error);
        navigation.replace('PreScreen');
      }
    };

    checkUserName();
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

export default LoaderComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DarkTheme.primary,
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    color: DarkTheme.text,
  },
});
