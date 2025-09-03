import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IRootStackParamList } from '../../utils/interfaces';
import { DarkTheme } from '../../utils/theme';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

type LoaderComponentProps = {};

const LoaderComponent: React.FC<LoaderComponentProps> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<IRootStackParamList>>();
  // get values directly from Redux (rehydrated by redux-persist)
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (user?.firstName && user.firstName.length > 0) {
      // user exists → navigate to Dev
      navigation.replace('Dev');
      // navigation.replace('Home');
    } else {
      // no user → go to PreScreen
      navigation.replace('PreScreen');
    }
  }, [user, navigation]);

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
