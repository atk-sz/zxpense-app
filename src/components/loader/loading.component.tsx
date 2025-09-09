import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useLoader } from '../../contexts/loader.context';
import { DarkTheme } from '../../utils/theme';

const LoadingComponent: React.FC = () => {
  const { loading, message } = useLoader();

  if (!loading) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={DarkTheme.secondary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  text: {
    marginTop: 12,
    color: DarkTheme.text,
  },
});
