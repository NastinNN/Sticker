import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { post } from 'transport';
import { Product } from '../../../../shared/types/product';
import { CreateProductForm } from '../schemes/createArticles';

export const createArticle = createAsyncThunk('product/createProduct', async (payload: CreateProductForm, thunkApi) => {
  const state = thunkApi.getState() as RootState;

  const user_id = state.userData.userData.id;

  if (!user_id) {
    throw new Error('User is not authorized');
  }

  const body = {
    user_id,
    publication_date: new Date().toISOString(),
    ...payload,
  };

  const { data } = await post<Product>('/products?_relations=users', body);

  return data;
});
