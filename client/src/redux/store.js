import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import mentorReducer from './features/mentorSlice';
import userReducer from './features/userSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['mentor', 'user'] // only mentor will be persisted
};

const persistedMentorReducer = persistReducer(persistConfig, mentorReducer);
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    mentor: persistedMentorReducer,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});

export const persistor = persistStore(store); 