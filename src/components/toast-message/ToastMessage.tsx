import React, { useEffect } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import { DarkTheme } from '../../utils/theme';

type ToastMessageProps = {
  message: string;
  type?: 'success' | 'error';
  onHide?: () => void;
};

const ToastMessage: React.FC<ToastMessageProps> = ({
  message,
  type = 'success',
  onHide,
}) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(onHide);
    }, 3000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          backgroundColor: type === 'error' ? DarkTheme.secondary : '#4caf50',
          opacity: fadeAnim,
        },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    width: '80%',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    zIndex: 1000,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ToastMessage;
