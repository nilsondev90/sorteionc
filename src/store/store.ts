import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartReducer']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, logger)
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
