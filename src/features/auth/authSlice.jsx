import { createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const initialState = {
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = null;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        clearError(state) {
            state.error = null;
        },
    },
});

export const { setUser, clearUser, setError, clearError } = authSlice.actions;

export const registerUser = (email, password) => async (dispatch) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        dispatch(setUser(userCredential.user));
    } catch (error) {
        dispatch(setError(error.message));
        console.error(error);
    }
};

export const loginUser = (email, password) => async (dispatch) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        dispatch(setUser(userCredential.user));
    } catch (error) {
        dispatch(setError(error.message));
        console.error(error);
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        await signOut(auth);
        dispatch(clearUser());
    } catch (error) {
        console.error(error);
    }
};

export default authSlice.reducer;
