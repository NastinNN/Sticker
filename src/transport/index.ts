import axios from 'axios';
import { STORAGE_KEYS, getStorageItem } from '../utils/storage';

const baseInstance = axios.create({
  baseURL: 'https://afb2a846cb22a6be.mokky.dev',
  timeout: 3000,
});

baseInstance.interceptors.request.use(config => {
  const userData = getStorageItem(STORAGE_KEYS.USER_DATA);
  const token = userData?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const get = baseInstance.get;

export const post = baseInstance.post;
