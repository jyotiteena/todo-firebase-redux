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
        const errorCodes = {
            "auth/email-already-in-use": "This email is already in use.",
            "auth/invalid-email": "Please enter a valid email address.",
            "auth/user-not-found": "No user found with this email.",
            "auth/wrong-password": "Incorrect password. Please try again.",
            "auth/weak-password": "Your password is too weak. It must be at least 6 characters.",
            "auth/operation-not-allowed": "Email/password accounts are not enabled.",
            "auth/invalid-credential": "The credentials provided are invalid. Please try again.",
        };

        // Debugging logs
        // console.log("Full error object:", error);
        // console.log("Error code:", error.code);
        // console.log("Custom error message:", errorCodes[error.code]);

        // Dispatch custom or default error message
        alert(errorCodes[error.code] || "An unexpected error occurred.")
        dispatch(setError(error.message));
        console.error(error);
    }
};

// export const loginUser = (email, password) => async (dispatch) => {
//     try {
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         dispatch(setUser(userCredential.user));
//     } catch (error) {
//         const errorCodes = {
//             "auth/email-already-in-use": "This email is already in use.",
//             "auth/invalid-email": "Please enter a valid email address.",
//             "auth/weak-password": "Your password is too weak. It must be at least 6 characters.",
//             "auth/operation-not-allowed": "Email/password accounts are not enabled.",
//         };
//         console.log(errorCodes["auth/invalid-email"]);
//         console.log(errorCodes[error.code])
//         console.log(typeof error.code)
//         dispatch(setError(errorCodes[error.code] || "An unexpected error occurred."));
//         // console.error(error);
//     }
// };
export const loginUser = (email, password) => async (dispatch) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        dispatch(setUser(userCredential.user));
    } catch (error) {
        const errorCodes = {
            "auth/email-already-in-use": "This email is already in use.",
            "auth/invalid-email": "Please enter a valid email address.",
            "auth/user-not-found": "No user found with this email.",
            "auth/wrong-password": "Incorrect password. Please try again.",
            "auth/weak-password": "Your password is too weak. It must be at least 6 characters.",
            "auth/operation-not-allowed": "Email/password accounts are not enabled.",
            "auth/invalid-credential": "The credentials provided are invalid. Please try again.",
        };

        // Debugging logs
        // console.log("Full error object:", error);
        // console.log("Error code:", error.code);
        // console.log("Custom error message:", errorCodes[error.code]);

        // Dispatch custom or default error message
        alert(errorCodes[error.code] || "An unexpected error occurred.")
        dispatch(setError(errorCodes[error.code] || "An unexpected error occurred."));

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
