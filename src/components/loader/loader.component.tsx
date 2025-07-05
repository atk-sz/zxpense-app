import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/interfaces';
import { DarkTheme } from '../../utils/theme';

type LoaderComponentProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Loader'>;
};

const LoaderComponent: React.FC<LoaderComponentProps> = ({ navigation }) => {
  useEffect(() => {
    const checkUserName = async () => {
      try {
        const name = await AsyncStorage.getItem('fullName');
        if (name && name.length > 0) {
          navigation.replace('Home');
        } else {
          navigation.replace('PreScreen');
        }
      } catch (error) {
        console.error('Error checking storage:', error);
        navigation.replace('PreScreen');
      }
    };

    checkUserName();
  }, [navigation]);

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
