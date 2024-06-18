import { Field, Form, Formik } from 'formik';
import s from './createArticleForm.module.css';

import { Navigate, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { FormikInput } from '../../../shared/components/FormikInput';
import { сreateProductFormValidationScheme } from '../model/schemes/createArticles';

import type { FieldProps } from 'formik';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../../router/routes';
import { useCreateProductMutation } from '../../../services/products';
import { getUserId } from '../../../store/userData';

const options = [
  { label: 'Одежда', value: 'clothes' },
];

export const CreateProductForm = () => {
  const navigate = useNavigate();
  const userId = useSelector(getUserId);
  const [createProduct, { isLoading, isSuccess }] = useCreateProductMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate(`${ROUTES.PROFILE}`);
    }
  }, [isSuccess, navigate]);

  if (!userId) return <Navigate to={ROUTES.AUTH} />;

  return (
    <div className={s.createPostFormContainer}>
      <Formik
        initialValues={сreateProductFormValidationScheme.getDefault()}
        onSubmit={val => {
          createProduct({ ...val, user_id: userId });

        }}
        validationSchema={сreateProductFormValidationScheme}
      >
        <Form>
          <div className={s.formField}>
            <FormikInput label="Заголовок" name="title" />
          </div>

          <div className={s.formField}>
            <FormikInput label="Описание" type="textarea" name="description" />
          </div>

          <div className={s.formField}>
            <FormikInput label="Обложка" name="image" />
          </div>

          <div className={s.formField}>
            <FormikInput label="Цена" name="price" />
          </div>


          <div className={s.formField}>
            <Field name="category">
              {({ field, form }: FieldProps) => (
                <Select
                  value={options.find(({ value }) => field.value === value)}
                  onChange={(val, meta) => {
                    form.setFieldValue(field.name, val?.value || '');
                  }}
                  onBlur={field.onBlur}
                  options={options}
                />
              )}
            </Field>
          </div>

          <button type="submit" className={s.submitButton} disabled={isLoading}>
            Отправить
          </button>
        </Form>
      </Formik>
    </div>
  );
};
