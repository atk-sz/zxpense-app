import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { DarkTheme } from '../../utils/theme';
import { ReactNode } from 'react';

type ScreenViewProps = {
  children: ReactNode;
};

const ScreenView: React.FC<ScreenViewProps> = ({ children }) => {
  const topPadding =
    Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;
  const { width } = Dimensions.get('window');
  const horizontalPadding = width * 0.05;

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: topPadding, paddingHorizontal: horizontalPadding },
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkTheme.primary,
  },
});
export default ScreenView;
