import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IRootStackParamList } from '../utils/interfaces';
import { LoaderComponent, ScreenView } from '../components';

type IInitLoadScreenProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'InitLoad'>;
};

const InitLoadScreen: React.FC<IInitLoadScreenProps> = () => {
  return (
    <ScreenView>
      <LoaderComponent />
    </ScreenView>
  );
};

export default InitLoadScreen;
