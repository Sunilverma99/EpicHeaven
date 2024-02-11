// Assuming you have installed the required packages
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import {persistReducer , persistStore} from 'redux-persist'
const rootReducer=combineReducers({user:userReducer});
import storage from 'redux-persist/lib/storage';
const persistConfig={
    key:'root',
    storage,
    version:1,
}
const persistedReducer=persistReducer(persistConfig,rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
export const persistor=persistStore(store);