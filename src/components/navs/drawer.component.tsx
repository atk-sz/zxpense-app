import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { useDrawer } from '../../contexts/drawer.context';

const { width } = Dimensions.get('window');

const CustomDrawer: React.FC = () => {
  const { isOpen, closeDrawer } = useDrawer();
  const translateX = React.useRef(new Animated.Value(-width)).current;
  const backdropOpacity = React.useRef(new Animated.Value(0)).current;
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Animate drawer sliding in and backdrop fading in
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          tension: 30,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(backdropOpacity, {
          toValue: 1,
          tension: 30,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate drawer sliding out and backdrop fading out
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: -width,
          tension: 30,
          friction: 9,
          useNativeDriver: true,
        }),
        Animated.spring(backdropOpacity, {
          toValue: 0,
          tension: 30,
          friction: 9,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Only stop rendering after animation completes
        setShouldRender(false);
      });
    }
  }, [isOpen, translateX, backdropOpacity]);

  if (!shouldRender && !isOpen) return null;

  return (
    <View
      style={StyleSheet.absoluteFillObject}
      pointerEvents={isOpen ? 'auto' : 'none'}
    >
      {/* Animated Backdrop */}
      <TouchableWithoutFeedback onPress={closeDrawer}>
        <Animated.View
          style={[styles.backdrop, { opacity: backdropOpacity }]}
        />
      </TouchableWithoutFeedback>

      {/* Animated Drawer */}
      <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
        <TouchableOpacity onPress={closeDrawer} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItemContainer}>
            <Text style={styles.menuItem}>🏠 Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItemContainer}>
            <Text style={styles.menuItem}>👤 Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItemContainer}>
            <Text style={styles.menuItem}>⚙️ Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItemContainer}>
            <Text style={styles.menuItem}>📞 Contact</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItemContainer}>
            <Text style={styles.menuItem}>ℹ️ About</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: width * 0.75,
    backgroundColor: '#2c3e50',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 10000,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    marginBottom: 30,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuContainer: {
    flex: 1,
  },
  menuItemContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  menuItem: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});
