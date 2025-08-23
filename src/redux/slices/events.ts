// redux/slices/events.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IExpenseEvent } from '../../utils/interfaces';

const initialState: IExpenseEvent[] = [];

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<IExpenseEvent>) => {
      state.push(action.payload);
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      return state.filter(event => event.id !== action.payload);
    },
    clearAllEvents: () => [],
    updateEvent: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<IExpenseEvent> }>,
    ) => {
      const { id, updates } = action.payload;
      const index = state.findIndex(event => event.id === id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...updates,
        };
      }
    },
    initializeEvents: (state, action: PayloadAction<IExpenseEvent[]>) => {
      return action.payload;
    },
  },
});

export const {
  addEvent,
  removeEvent,
  clearAllEvents,
  updateEvent,
  initializeEvents,
} = eventsSlice.actions;
export default eventsSlice.reducer;
