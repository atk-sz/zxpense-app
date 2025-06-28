import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'initial Value',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
    resetValue: state => {
      state.value = '';
    },
  },
});

export const { setValue, resetValue } = authSlice.actions;
export default authSlice.reducer;
