import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Login: undefined;
  PreScreen: undefined;
};

export type ToastType = 'success' | 'error' | 'info';

export interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

// below code is useless for now
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
