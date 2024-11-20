import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const initialState = {
    todos: [],
    status: 'idle',
    error: null
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const querySnapshot = await getDocs(collection(db, 'todos'));
    let todos = [];
    querySnapshot.forEach((doc) => {
        todos.push({ id: doc.id, ...doc.data() });
    });
    return todos;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (newTodo) => {
    const docRef = await addDoc(collection(db, 'todos'), newTodo);
    return { id: docRef.id, ...newTodo };
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedTodo) => {
    const todoRef = doc(db, 'todos', updatedTodo.id);
    await updateDoc(todoRef, updatedTodo);
    return updatedTodo;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
    await deleteDoc(doc(db, 'todos', id));
    return id;
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
                state.todos[index] = action.payload;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            });
    },
});

export default todoSlice.reducer;
