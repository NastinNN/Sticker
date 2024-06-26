import { useFormik } from 'formik';

import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { сreateProductFormValidationScheme } from '../model/schemes/createArticles';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from 'shared/components/loader';
import { FormProduct } from 'shared/features/FormOroduct';
import { ROUTES } from '../../../router/routes';
import { useUpdateProductMutation } from '../../../services/products';
import { getUserId } from '../../../store/userData';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, post } from 'transport';
import { Product } from 'shared/types/product';
import { useAppDispatch } from 'store';
import axios from 'axios';


// const getProductData = (id: string) => {

// createAsyncThunk('product', async() => {
  
//   const {data} = await get<Product>(`/products/${id}`);

//   const productData = { ...data };
  
//   return productData;
// });}

export const EditProductForm = () => {
  const [params] = useSearchParams();
  const id = String(params.get('id') || '0');

  // const { id } = useParams();
  const userId = useSelector(getUserId);


  const navigate = useNavigate();
  const [updateProduct, { isLoading: setLoading, isSuccess }] = useUpdateProductMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate(`${ROUTES.PROFILE}`);
    }
  }, [isSuccess, navigate]);

  const formik = useFormik({
    initialValues: сreateProductFormValidationScheme.getDefault(),
    validationSchema: сreateProductFormValidationScheme,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: val => {
      updateProduct({ ...val, id: Number(id) });
    },
  });

  if (!userId) return <Navigate to={ROUTES.AUTH} />;

  return <FormProduct formik={formik} buttonText="Изменить" isLoading={setLoading} /> 
};
