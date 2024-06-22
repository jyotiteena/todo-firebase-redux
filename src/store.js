import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import todoReducer from './features/todos/todoSlice';
import authReducer from './features/auth/authSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    todos: todoReducer,
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
