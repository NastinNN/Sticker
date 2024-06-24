import { useFormik } from 'formik';
import s from './createArticleForm.module.css';

import { Navigate, useNavigate } from 'react-router-dom';
import { сreateProductFormValidationScheme } from '../model/schemes/createArticles';


import { Box, Button, FormControl, Grid, Input, InputLabel, MenuItem, TextField } from '@mui/material';
import { forwardRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { categoriesCreateSelect } from 'shared/features/FilterData/filter';
import { ROUTES } from '../../../router/routes';
import { useCreateProductMutation } from '../../../services/products';
import { getUserId } from '../../../store/userData';
import { styles } from './muiStyle';
import { nanoid } from '@reduxjs/toolkit';

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

  return (
    <Box
      width={870}
      sx={{
        margin: '40px auto',
        backgroundColor: '#ffffff',
        padding: '24px 28px',
      }}
    >
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <Box width="100%" className={s.input}>
            <label htmlFor="title" className={s.label}>
              Название товара
            </label>
            <TextField
              sx={styles.createForm}
              fullWidth
              hiddenLabel
              variant="filled"
              id="title"
              name="title"
              placeholder="Введите название (до 125 символов)"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box width="100%" className={s.input}>
                <label htmlFor="title" className={s.label}>
                  Категория
                </label>
                <TextField
                  id="filled-select-currency"
                  select
                  sx={styles.createForm}
                  fullWidth
                  hiddenLabel
                  defaultValue={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  variant="filled"
                  name="category"
                >
                  {categoriesCreateSelect.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box width="100%" className={s.input}>
                <label htmlFor="price" className={s.label}>
                  Стоимость
                </label>
                <TextField
                  sx={styles.createForm}
                  fullWidth
                  hiddenLabel
                  variant="filled"
                  id="price"
                  name="price"
                  type='number'
                  placeholder="Введите цену"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
          <Grid item xs={6}>
          <Box width="100%" className={s.input}>
            <label htmlFor="phone" className={s.label}>
              Телефон
            </label>
            <TextField
              sx={styles.createForm}
              fullWidth
              hiddenLabel
              variant="filled"
              id="phone"
              name="phone"
              placeholder="Введите номер телефона в формате +7 900 000 00 00"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Box>
          </Grid>
          </Grid>


          <Box width="100%" className={s.input}>
            <label htmlFor="description" className={s.label}>
              Описание
            </label>
            <TextField
              sx={styles.createForm}
              multiline
              rows={4}
              fullWidth
              hiddenLabel
              variant="filled"
              id="description"
              name="description"
              placeholder="Введите описание (до 3000 символов)"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Box>

          <Box width="100%" className={s.input}>
            <label htmlFor="image" className={s.label}>
              Фотография
            </label>
            <TextField
              sx={styles.createForm}
              fullWidth
              hiddenLabel
              variant="filled"
              id="image"
              name="image"
              placeholder="Вставьте ссылку на фтографию (загрузка файла в разработке)"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
            />
          </Box>

          <Box width="100%" className={s.input}>
            <label htmlFor="title" className={s.label}>
              Местоположение
            </label>
            <TextField
              sx={styles.createForm}
              fullWidth
              hiddenLabel
              variant="filled"
              id="location"
              name="location"
              placeholder="Введите адрес"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
          </Box>

          <Button variant="contained" fullWidth sx={styles.button} type="submit" disabled={isLoading}>
            {isLoading ? 'Опубликовать...' : 'Опубликовать'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
