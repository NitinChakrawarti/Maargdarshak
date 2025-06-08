// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './features/authSlice';
import userReducer from './features/userSlice';
import mentorReducer from './features/mentorSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const userPersistConfig = {
  key: 'user',
  storage,
};

const mentorPersistConfig = {
  key: 'mentor',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedMentorReducer = persistReducer(mentorPersistConfig, mentorReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    user: persistedUserReducer,
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
