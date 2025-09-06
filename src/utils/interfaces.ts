export type IRootStackParamList = {
  Dummy: undefined;
  InitLoad: undefined;
  PreScreen: undefined;
  Dev: undefined;
  Home: undefined;
  Profile: undefined;
  Login: undefined;
  CreateEvent:
    | undefined
    | {
        eventId: string;
        isEditMode: boolean;
      };
  EventDetails: { id: string };
  TransactionDetails: { transactionId: string; eventId: string };
};

export type IToastType = 'success' | 'error' | 'info';

export interface IToastContextType {
  showToast: (message: string, type?: IToastType) => void;
}

export type IUserState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface IExpenseEvent {
  id: string;
  title: string;
  startDate: string;
  isMultiDay: boolean;
  balanceAmount: string;
  incomingAmount: string;
  outgoingAmount: string;
  endDate?: string;
  transactions: IEventTransaction[];
  open: boolean;
}

export interface IEventTransaction {
  id: string;
  amount: string;
  balanceAmountNow: string;
  type: 'incoming' | 'outgoing' | 'item';
  description: string;
  date: string;
  eventId: string;
  worth?: string;
  itemName?: string;
}
