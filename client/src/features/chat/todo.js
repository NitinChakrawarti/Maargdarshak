import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    todos: []
}
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addtodo: (state, action) => {
            const todo = {
                id: nanoid(),
                title: action.payload.name,
                desciption: action.payload.description,
                date: action.payload.date,
                label: action.payload.label
            }
            state.todos.push(todo);
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        editTodo: (state, action) => {

            const todo = state.todos.find(todo => todo.id === action.payload.id);
            todo.title = action.payload.name;
            todo.desciption = action.payload.description;
            todo.date = action.payload.date;
        },
        markTodo: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.completed = true; 
                todo.label = 'done'; 
            }
        },

    },
});

export const { addtodo, deleteTodo, editTodo, markTodo } = todoSlice.actions;
export default todoSlice.reducer; 