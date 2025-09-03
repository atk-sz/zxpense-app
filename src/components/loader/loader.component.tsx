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
  //  const rehydrated = useSelector((state: any) => state._persist?.rehydrated);

  useEffect(() => {
    // Add a small delay to ensure Redux has rehydrated
    const timer = setTimeout(() => {
      if (user?.firstName && user.firstName.length > 0) {
        // User exists → navigate to Dev/Home
        navigation.replace('Dev');
        // navigation.replace('Home');
      } else {
        // No user → go to PreScreen
        navigation.replace('PreScreen');
      }
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, [user, navigation]);

  // alternate method - very efficient
  //   useEffect(() => {
  //   if (!rehydrated) return; // wait for redux-persist if you use it

  //   const task = InteractionManager.runAfterInteractions(() => {
  //     if (user?.firstName && user.firstName.length > 0) {
  //       navigation.replace('Dev');
  //     } else {
  //       navigation.replace('PreScreen');
  //     }
  //   });

  //   return () => task.cancel();
  // }, [rehydrated, user, navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.text}>Flash Screen will come Loading...</Text>
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
