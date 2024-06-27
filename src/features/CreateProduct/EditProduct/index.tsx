import { useFormik } from 'formik';

import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { сreateProductFormValidationScheme } from '../model/schemes/createArticles';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormProduct } from 'shared/features/FormOroduct';
import { ROUTES } from '../../../router/routes';
import { useGetProductQuery, useUpdateProductMutation } from '../../../services/products';
import { getUserId } from '../../../store/userData';
import { Product } from 'shared/types/product';

type EditProps = {
  data: Product;
  id: string
}

export const EditProductForm = ({data, id}: EditProps) => {
  
  const navigate = useNavigate();
  const [updateProduct, { isLoading: setLoading, isSuccess }] = useUpdateProductMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate(`${ROUTES.PROFILE}`);
    }
  }, [isSuccess, navigate]);

  const formik = useFormik({
    initialValues: data,
    validationSchema: сreateProductFormValidationScheme,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: val => {
      updateProduct({ ...val, id: Number(id) });
    },
  });

  return (
      <FormProduct formik={formik} buttonText="Изменить" isLoading={setLoading} />
  )
};
