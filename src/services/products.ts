import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../shared/types/product';
import { RootState } from '../store';
import { CreateProductForm } from 'features/CreateArticle/model/schemes/createArticles';

type ProductList = Product[];

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
  tagTypes: ['Product', 'Categories'],
  endpoints: builder => ({
    getProduct: builder.query<Product[], string>({
      query: (id) => `products?id=${id}`,
      providesTags: ['Product'],
    }),
    getProductList: builder.query<ResponseList<Product>, string>({
      query: (category) => `products?${category !== 'all' ? `category=${category}&` : ''}limit=9&status=true`,
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

    createProduct: builder.mutation<unknown, CreateProductForm & { user_id: number }>({
      query: args => ({
        url: '/products',
        method: 'POST',
        body: {
          publication_date: new Date().toISOString(),
          ...args,
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

export const { useGetProductQuery, useGetProductListQuery, useGetProductPaginationQuery, useGetProductProfileQuery, useCreateProductMutation, useDeleteProductMutation, useUpdateProductMutation } = productsApi;
