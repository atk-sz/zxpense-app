import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IExpenseEvent } from '../../utils/interfaces';

const initialState: IExpenseEvent = {
  id: '',
  title: '',
  startDate: '',
  isMultiDay: false,
  type: 'personal',
  balanceAmount: 0,
  incomingAmount: 0,
  outgoingAmount: 0,
  endDate: '',
  transactions: [],
  open: true,
};

const openEventSlice = createSlice({
  name: 'openEvent',
  initialState,
  reducers: {
    saveOpenEvent: (state, action: PayloadAction<IExpenseEvent>) =>
      action.payload,
    clearOpenEvent: () => initialState,
  },
});

export const { saveOpenEvent, clearOpenEvent } = openEventSlice.actions;
export default openEventSlice.reducer;
