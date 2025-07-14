import appSettings from './settings';
import { errorLogger } from './middlewares';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, type TypedUseSelectorHook, useSelector } from 'react-redux';

// redux persist
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'appSettings',
  version: 1,
  storage,
};

const persistedAppSettings = persistReducer(persistConfig, appSettings);

const store = configureStore({
  reducer: {
    appSettings: persistedAppSettings,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(errorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export const useNovaSelector: TypedUseSelectorHook<RootState> = useSelector;
export type NovaDispatch = typeof store.dispatch;

export const useNovaDispatch: () => NovaDispatch = useDispatch;

export default store;