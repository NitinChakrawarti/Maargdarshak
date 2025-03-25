import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    users: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        adduser: (state, action) => {
            const user = {
                id: action.payload._id,
                name: action.payload.name,
                // contact:action.payload.contact,
                category:action.payload.category,
                email: action.payload.email,
                domain: action.payload.domain
            }
            state.users.push(user);
        }
    }
});


export const {adduser} = userSlice.actions;
export default userSlice.reducer