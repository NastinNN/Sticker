import { useFormik } from 'formik';

import { Navigate, useNavigate } from 'react-router-dom';
import { сreateProductFormValidationScheme } from '../model/schemes/createArticles';

import { nanoid } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FormProduct } from 'shared/features/FormOroduct';
import { ROUTES } from '../../../router/routes';
import { useCreateProductMutation } from '../../../services/products';
import { getUserId } from '../../../store/userData';

export const CreateProductForm = () => {
  const navigate = useNavigate();
  const userId = useSelector(getUserId);
  const [createProduct, { isLoading, isSuccess }] = useCreateProductMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate(`${ROUTES.PROFILE}`);
    }
  }, [isSuccess, navigate]);

  const articul = nanoid(12);

  const formik = useFormik({
    initialValues: сreateProductFormValidationScheme.getDefault(),
    validationSchema: сreateProductFormValidationScheme,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: val => {
      createProduct({ ...val, user_id: userId!, articul: articul });
    },
  });

  if (!userId) return <Navigate to={ROUTES.AUTH} />;

  return <FormProduct formik={formik} buttonText="Опубликовать" isLoading={isLoading} />;
};
