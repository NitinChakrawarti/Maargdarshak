import {createSlice, nanoid} from '@reduxjs/toolkit';
const initialState = {
    mentors:[]
}

export const chatSlice = createSlice({
    name: 'mentor',
    initialState,
    reducers: {
        addMentor: (state, action) => {
            const mentor = {
                id: nanoid(),
                name: action.payload.name,
                image: action.payload.image,
                jobTitle: action.payload.jobTitle,
                expertise: action.payload.expertise,
            }
            state.mentors.push(mentor);
        },
    },
});

export const {addMentor} = chatSlice.actions;
export default chatSlice.reducer;