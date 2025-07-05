import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type IRootStackParamList = {
  Loader: undefined;
  PreScreen: undefined;
  Dev: undefined;
  Home: undefined;
  Profile: undefined;
  Login: undefined;
};

export type IToastType = 'success' | 'error' | 'info';

export interface IToastContextType {
  showToast: (message: string, type?: IToastType) => void;
}

export type IEventExpense = {
  id: string;
  eventTitle: string;
  eventDate: string;
};

// below code is useless for now
export type RootStackScreenProps<T extends keyof IRootStackParamList> =
  NativeStackScreenProps<IRootStackParamList, T>;
