import {
  Box,
  FilledInput,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Button
} from '@mui/material';
import { signInFormValidationScheme } from 'features/auth/model/schemes/signIn';
import { useFormik } from 'formik';


import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { getIsLoading } from 'store/userData';
import { postAuthData } from 'store/userData/effects';
import { styles } from '../muiStyle';
import { ROUTES } from 'router/routes';
import { Link } from 'react-router-dom';

import s from "../auth.module.css"

export const SignInForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getIsLoading);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: signInFormValidationScheme.getDefault(),
    validationSchema: signInFormValidationScheme,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: val => {
      dispatch(postAuthData({ ...val }));
    },
  });


  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
      <Box
        width={364}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <TextField sx={styles.input}
          fullWidth
          variant="filled"
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <FormControl fullWidth variant="filled" error={formik.touched.password && Boolean(formik.errors.password)} sx={styles.input}>
          <InputLabel htmlFor="filled-adornment-password">Пароль</InputLabel>
          <FilledInput
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            name="password"
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText
            id="filled-adornment-password"
            error={formik.touched.password && Boolean(formik.errors.password)} sx={styles.input}
          >
            {formik.touched.password && formik.errors.password}
          </FormHelperText>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to={`${ROUTES.RECOVERY}`} className={s.link}>
                Забыли пароль?
              </Link>
            </Grid>
          </Grid>
        </FormControl>

        <Button variant="contained" fullWidth sx={styles.button} type="submit" disabled={isLoading}>
          Войти
        </Button>
      </Box>
    </Box>
  );
};
