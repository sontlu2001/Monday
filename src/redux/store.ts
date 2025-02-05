// store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slice/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import globalLoadingSlice from './slice/globalLoadingSlice';
import themeSlice from './slice/themeSlice';
import appStateSlice from './slice/appStateSlice';
import sidebarSlice from './slice/sidebarSlice';

const rootReducer = combineReducers({
  user: userSlice,
  globalLoading: globalLoadingSlice,
  theme: themeSlice,
  appState: appStateSlice,
  sidebar: sidebarSlice
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "globalLoading", "theme", "sidebar"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>;

export default store;
