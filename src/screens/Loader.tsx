import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IRootStackParamList } from '../utils/interfaces';
import { LoaderComponent, ScreenView } from '../components';

type LoaderScreenProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'Loader'>;
};

const LoaderScreen: React.FC<LoaderScreenProps> = ({ navigation }) => {
  return (
    <ScreenView>
      <LoaderComponent navigation={navigation} />
    </ScreenView>
  );
};

export default LoaderScreen;
