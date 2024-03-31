import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { reducerChat } from './slices/chatSlice.ts';
import { reducerPopup } from './slices/popupSlice.ts';

const rootReducer = combineReducers({
  chat: reducerChat,
  popup: reducerPopup,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['chat'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([]),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
