export type IRootStackParamList = {
  Dummy: undefined;
  InitLoad: undefined;
  PreScreen: undefined;
  Dev: undefined;
  Home: undefined;
  Profile: undefined;
  Login: undefined;
  CreateEvent: undefined;
  EventDetails: { id: string };
};

export type IToastType = 'success' | 'error' | 'info';

export interface IToastContextType {
  showToast: (message: string, type?: IToastType) => void;
}

export interface IExpenseEvent {
  id: string;
  title: string;
  startDate: string;
  isMultiDay: boolean;
  type: 'personal' | 'group';
  balanceAmount: number;
  incomingAmount: number;
  outgoingAmount: number;
  endDate?: string;
  transactions: IEventTransaction[];
  open: boolean;
}

export interface IEventTransaction {
  id: string;
  amount: number;
  type: 'incoming' | 'outgoing' | 'open';
  description: string;
  date: string;
  eventId: string;
}
