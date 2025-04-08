import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mentor: null,
  error: null
};

const mentorSlice = createSlice({
  name: 'mentor',
  initialState,
  reducers: {
    setMentor: (state, action) => {
      state.mentor = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearMentor: (state) => {
      state.mentor = null;
      state.error = null;
    }
  }
});

export const { setMentor, setError, clearMentor } = mentorSlice.actions;
export default mentorSlice.reducer; 