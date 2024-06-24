import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Checkbox,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material';
import { signUpFormValidationScheme } from 'features/auth/model/schemes/signUp';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { getIsLoading } from 'store/userData';
import { postRegData } from 'store/userData/effects';

import { Link } from 'react-router-dom';
import { ROUTES } from 'router/routes';
import { styles } from '../muiStyle';

import s from '../auth.module.css';

export const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getIsLoading);

  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleClickShowCheckPassword = () => setShowCheckPassword(show => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: signUpFormValidationScheme.getDefault(),
    validationSchema: signUpFormValidationScheme,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: ({ userName, userSurname, email, password }) => {
      dispatch(postRegData({ userName, userSurname, email, password }));
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <TextField
          sx={styles.input}
          fullWidth
          variant="filled"
          id="userName"
          name="userName"
          label="Имя"
          value={formik.values.userName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
        />
        <TextField
          sx={styles.input}
          fullWidth
          variant="filled"
          id="userSurname"
          name="userSurname"
          label="Фамилия"
          value={formik.values.userSurname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.userSurname && Boolean(formik.errors.userSurname)}
          helperText={formik.touched.userSurname && formik.errors.userSurname}
        />
        <TextField
          sx={styles.input}
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
        <FormControl
          fullWidth
          variant="filled"
          error={formik.touched.password && Boolean(formik.errors.password)}
          sx={styles.input}
        >
          <InputLabel htmlFor="filled-adornment-password">Пароль</InputLabel>
          <FilledInput
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            sx={styles.input}
          >
            {formik.touched.password && formik.errors.password}
          </FormHelperText>
        </FormControl>

        <FormControl
          fullWidth
          variant="filled"
          error={formik.touched.checkPassword && Boolean(formik.errors.checkPassword)}
          sx={styles.input}
        >
          <InputLabel htmlFor="filled-adornment-password-2">Повторите пароль</InputLabel>
          <FilledInput
            value={formik.values.checkPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="checkPassword"
            id="filled-adornment-password-2"
            type={showCheckPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowCheckPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showCheckPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText
            sx={styles.input}
          >
            {formik.touched.checkPassword && formik.errors.checkPassword}
          </FormHelperText>
        </FormControl>

        <FormControl sx={{alignSelf: 'flex-start'}} error={formik.touched.checkbox && Boolean(formik.errors.checkbox)}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox sx={{ ":hover": {backgroundColor: "transparent"}}} id="checkbox" name="checkbox" value={formik.values.checkbox} onChange={formik.handleChange} />
            <div className={s.checkboxDesc}>
              <div>Принимаю условия</div>
              <Link to={`${ROUTES.AGREEMENT}`} className={s.checkboxLink}>
                Пользовательского соглашения
              </Link>
            </div>
          </Box>

          <FormHelperText>
            {formik.touched.checkbox && formik.errors.checkbox}
          </FormHelperText>
        </FormControl>

        <Button variant="contained" fullWidth sx={styles.button} type="submit" disabled={isLoading}>
          Создать аккаунт
        </Button>
      </Box>
    </Box>
  );
};
