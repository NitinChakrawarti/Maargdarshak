import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import mentorReducer from './features/mentorSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['mentor'] // only mentor will be persisted
};

const persistedMentorReducer = persistReducer(persistConfig, mentorReducer);

export const store = configureStore({
  reducer: {
    mentor: persistedMentorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});

export const persistor = persistStore(store); 