import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import reducerChatConfig from './slices/chatConfigSlice';
import reducerChatMessages from './slices/chatMessagesSlice';
import reducerPopup from './slices/popupSlice';

export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  chatMessages: reducerChatMessages,
  chatConfig: reducerChatConfig,
  popup: reducerPopup,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['chatConfig', 'chatMessages', 'popup'],
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
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
