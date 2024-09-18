import { createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '../../transport';
import { STORAGE_KEYS, setStorageItem } from '../../utils/storage';
import { AuthFormData, AuthResponse, RegFormData } from './types';

export const postAuthData = createAsyncThunk('userData/postAuth', async (payload: AuthFormData) => {
  const {data: { data, token }} = await post<AuthResponse>(`/auth`, payload);

  const userData = { ...data, token };

  setStorageItem(STORAGE_KEYS.USER_DATA, userData);

  return userData;
});

export const postRegData = createAsyncThunk('userData/postReg', async (payload: RegFormData) => {
  const {
    data: { data, token },
  } = await post<AuthResponse>(`/register`, payload);

  const userData = { ...data, token };

  setStorageItem(STORAGE_KEYS.USER_DATA, userData);

  return userData;
});
