import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/interfaces';
import { LoaderComponent, ScreenView } from '../components';

type LoaderScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Loader'>;
};

const LoaderScreen: React.FC<LoaderScreenProps> = ({ navigation }) => {
  return (
    <ScreenView>
      <LoaderComponent navigation={navigation} />
    </ScreenView>
  );
};

export default LoaderScreen;
