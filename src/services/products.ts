import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateProductForm } from 'features/CreateProduct/model/schemes/createArticles';
import { Product } from '../shared/types/product';
import { RootState } from '../store';

type ResponseList<Data> = {
  meta: {
    total_items: number;
    total_pages: number;
    current_page: number;
    per_page: number;
    remaining_count: number;
  };
  items: Data[];
};

export const productsApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://afb2a846cb22a6be.mokky.dev',
    prepareHeaders: (headers, { getState }) => {
      const store = getState() as RootState;
      const token = store.userData.userData.token;
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  }),
  tagTypes: ['Product', 'RecProduct', 'User'],
  endpoints: builder => ({

    getProduct: builder.query<Product, string>({
      query: (id) => `products/${id}`,
      providesTags: ['Product'],
    }),

    getProductUserId: builder.query<Product, string>({
      query: (id) => `products?id=${id}_select=user_id`,
      providesTags: ['Product'],
    }),

    getProductList: builder.query<ResponseList<Product>, string>({
      query: (category) => `products?${category !== 'all' ? `category=${category}&` : ''}limit=9&status=true&sortBy=-publication_date`,
      providesTags: ['Product'],
    }),

    getProductPagination: builder.query<ResponseList<Product>, any>({
      query: ({category, filter, seach, page, limit}) => `products?${category !== 'all' ? `category=${category}&` : ''}${filter !== '' ? `sortBy=${filter}&` : ''}${seach !== '' ? `title=*${seach}*&` : ''}page=${page}&limit=${limit}&status=true`,
      providesTags: ['Product'],
    }),

    getProductProfile: builder.query<ResponseList<Product>, any>({
      query: ({userId, page, limit, sortDate, seach, filter}) => `products?user_id=${userId}&page=${page}&limit=${limit}&sortBy=${sortDate ? `-publication_date` : `publication_date`}${seach !== '' ? `&title=*${seach}*` : ''}${filter !== 'all' ? `&category=${filter}` : ''}`,
      providesTags: ['Product'],
    }),

    getRecProduct: builder.query<ResponseList<Product>, string>({
      query: (category) => `products?category=${category}&limit=3&status=true&sortBy=-publication_date`,
      providesTags: ['RecProduct'],
    }),

    createProduct: builder.mutation<unknown, CreateProductForm & { user_id: number, articul: string }>({
      query: args => ({
        url: '/products',
        method: 'POST',
        body: {
          publication_date: new Date().toISOString(),
          status: true,
          views: 0,
          ...args,
        },
      }),
      invalidatesTags: ['Product'],
    }),

    updateViews: builder.mutation<Product, { id: number, views: number }>({
      query: (args) => ({
        url: `/products/${args.id}`,
        method: 'PATCH',
        body: {
          ...args
        },
      }),
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation<Product, CreateProductForm & { id: number }>({
      query: (args) => ({
        url: `/products/${args.id}`,
        method: 'PATCH',
        body: {
          ...args
        },
      }),
      invalidatesTags: ['Product'],
    }),

    deleteProduct: builder.mutation<{id: number }, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const { useGetProductUserIdQuery, useGetProductQuery, useGetProductListQuery, useGetProductPaginationQuery, useGetProductProfileQuery, useGetRecProductQuery, useCreateProductMutation, useDeleteProductMutation, useUpdateProductMutation, useUpdateViewsMutation } = productsApi;
