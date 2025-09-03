import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IExpenseEvent } from '../../utils/interfaces';

const initialState: IExpenseEvent = {
  id: '',
  title: '',
  startDate: '',
  isMultiDay: false,
  balanceAmount: '0',
  incomingAmount: '0',
  outgoingAmount: '0',
  endDate: '',
  transactions: [],
  open: true,
};

const curEventSlice = createSlice({
  name: 'curEvent',
  initialState,
  reducers: {
    saveCurEvent: (state, action: PayloadAction<IExpenseEvent>) =>
      action.payload,
    clearCurEvent: () => initialState,
  },
});

export const { saveCurEvent, clearCurEvent } = curEventSlice.actions;
export default curEventSlice.reducer;
