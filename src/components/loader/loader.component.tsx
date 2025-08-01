/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IRootStackParamList } from '../../utils/interfaces';
import { DarkTheme } from '../../utils/theme';
import { useDispatch } from 'react-redux';
import { setValue } from '../../redux/slices/user';

type LoaderComponentProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'InitLoad'>;
};

const LoaderComponent: React.FC<LoaderComponentProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserName = async () => {
      try {
        const firstName = await AsyncStorage.getItem('firstName');
        const lastName = await AsyncStorage.getItem('lastName');
        if (firstName && firstName.length > 0) {
          dispatch(
            setValue({
              firstName: firstName,
              lastName: lastName || '',
            }),
          );
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

    const removeData = async () => {
      try {
        await AsyncStorage.removeItem('firstName');
        await AsyncStorage.removeItem('lastName');
        navigation.replace('PreScreen');
      } catch (error) {
        console.error('Error removing data:', error);
      }
    };

    // removeData();
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
