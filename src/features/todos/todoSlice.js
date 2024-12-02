import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/todo'; // Replace with your API URL

const initialState = {
    todos: []
};

// Fetch Todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

// Add Todo
export const addTodo = createAsyncThunk('todos/addTodo', async (newTodo) => {
    const response = await axios.post(API_URL, newTodo);
    return response.data; // Assuming the response contains the added todo
});

// Update Todo
export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedTodo) => {
    const response = await axios.put(`${API_URL}/${updatedTodo.id}`, updatedTodo);
    return response.data; // Assuming the response contains the updated todo
});

// Delete Todo
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id; // Returning the id to filter the deleted todo from the state
});

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            });
    },
});

export default todoSlice.reducer;
