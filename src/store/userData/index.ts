import { createSlice } from '@reduxjs/toolkit';

import { STORAGE_KEYS, getStorageItem } from '../../utils/storage';
import { postAuthData } from './effects';

type User = {
  fullName: string | null;
  email: string | null;
  id: number | null;
  token: string | null;
};

type UserDataState = {
  userData: User;
  isLoading: boolean;
  error: string | null;
};

const initialState: UserDataState = {
  userData: {
    fullName: null,
    email: null,
    id: null,
    token: null,
  },
  isLoading: false,
  error: null,
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    clearUserData: () => initialState,
  },
  selectors: {
    getToken: state => state.userData.token,
    getIsLoading: state => state.isLoading,
    getUserId: state => state.userData.id,
    getUserName: state => state.userData.fullName,
  },
  extraReducers: builder => {
    builder
      .addCase(postAuthData.pending, state => {
        state.isLoading = true;
      })
      .addCase(postAuthData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(postAuthData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Что-то пошло не так';
      });
  },
});

export const { clearUserData } = userDataSlice.actions;

export const { getIsLoading, getToken, getUserId, getUserName } = userDataSlice.selectors;

export const defineUserDataFromStorage = (): UserDataState => {
  const userData = getStorageItem(STORAGE_KEYS.USER_DATA);
  const initState = userDataSlice.getInitialState();

  if (userData) {
    return { ...initState, userData };
  }

  return initState;
};
