import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { productsApi } from '../services/products';
import { defineUserDataFromStorage, userDataSlice } from './userData';

export const rootStore = configureStore({
  reducer: {
    [userDataSlice.name]: userDataSlice.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  devTools: true,
  preloadedState: {
    userData: defineUserDataFromStorage(),
  },
  middleware: getDefaultMeddleware => 
    getDefaultMeddleware().concat(productsApi.middleware)
});

export type RootState = ReturnType<typeof rootStore.getState>;

export type AppDispatch = typeof rootStore.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
