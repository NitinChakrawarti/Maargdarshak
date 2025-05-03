// features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null,         // 'user' or 'mentor'
  data: null,         // actual user/mentor data
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { role, data } = action.payload;
      state.role = role;
      state.data = data;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearAuth: (state) => {
      state.role = null;
      state.data = null;
      state.error = null;
    },
  },
});

export const { setAuth, setError, clearAuth } = authSlice.actions;
export default authSlice.reducer;
