import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type IRootStackParamList = {
  Dummy: undefined;
  InitLoad: undefined;
  PreScreen: undefined;
  Dev: undefined;
  Home: undefined;
  Profile: undefined;
  Login: undefined;
  CreateEvent: undefined;
};

export type IToastType = 'success' | 'error' | 'info';

export interface IToastContextType {
  showToast: (message: string, type?: IToastType) => void;
}

export type IExpenseEvent = {
  id: string;
  title: string;
  type: 'personal' | 'group';
  date: string;
  incomingAmount: number;
  outgoingAmount: number;
  startDate?: string;
  endDate?: string;
};

// below code is useless for now
export type RootStackScreenProps<T extends keyof IRootStackParamList> =
  NativeStackScreenProps<IRootStackParamList, T>;
