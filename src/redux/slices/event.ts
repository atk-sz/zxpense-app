import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEventTransaction, IExpenseEvent } from '../../utils/interfaces';

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
    // add new transaction to current event, check for the date-time of the new transaction & then place it in sorted order based on date-time
    addTransactionToCurEvent: (
      state,
      action: PayloadAction<IEventTransaction>,
    ) => {
      const newTransaction = { ...action.payload };
      const newTransactionDate = new Date(newTransaction.date);

      // If no transactions exist, this is the first one
      if (state.transactions.length === 0) {
        state.transactions.push(newTransaction);
        return;
      }

      // Find the correct position to insert the new transaction
      let insertIndex = 0;
      for (let i = 0; i < state.transactions.length; i++) {
        const currentTransactionDate = new Date(state.transactions[i].date);

        if (newTransactionDate >= currentTransactionDate) {
          insertIndex = i + 1;
        } else {
          break;
        }
      }

      // Insert the new transaction at the correct position
      state.transactions.splice(insertIndex, 0, newTransaction);
    },
    deleteTransactionFromCurEvent: (
      state,
      action: PayloadAction<string>, // transaction id to delete
    ) => {
      const transactionIdToDelete = action.payload;

      // Find the index of the transaction to delete
      const deleteIndex = state.transactions.findIndex(
        transaction => transaction.id === transactionIdToDelete,
      );

      // If transaction not found, return early
      if (deleteIndex === -1) {
        return;
      }

      state.transactions.splice(deleteIndex, 1);
    },
  },
});

export const {
  saveCurEvent,
  clearCurEvent,
  addTransactionToCurEvent,
  deleteTransactionFromCurEvent,
} = curEventSlice.actions;
export default curEventSlice.reducer;
