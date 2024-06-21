import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../../router/routes';
import { useAppDispatch } from '../../../store';
import { getIsLoading, getToken, getUserId } from '../../../store/userData';
import { postAuthData, postRegData } from '../../../store/userData/effects';
import { AuthFormData, RegFormData } from '../../../store/userData/types';
import styles from './loginForm.module.css';
import { STORAGE_KEYS } from 'utils/storage';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getIsLoading);
  const token = useSelector(getToken);
  const [login, setLogin] = useState('signUp');
  // const userId = useSelector(getUserId);

  const [formState, setFormState] = useState<AuthFormData>({ email: '', password: '' });
  const [formState1, setFormState1] = useState<RegFormData>({userName: '', email: '', password: '' });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const onChange1 = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState1(prev => ({ ...prev, [name]: value }));
  };


  const handeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(postAuthData(formState));
  };

  const handeSubmit1 = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(postRegData(formState1));
  };

  if (token) return <Navigate to={ROUTES.ROOT} />;

  if (login === 'signUp')
  return (
    <div className={styles.loginContainer}>
      <h2 onClick={() => {setLogin('signUp')}} className={styles.loginTitle}>Авторизация</h2>
      <h2 onClick={() => {setLogin('registration')}} className={styles.loginTitle}>Регистрация</h2>
      <form className={styles.loginForm} onSubmit={handeSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Имя пользователя:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formState.email}
            onChange={onChange}
            required
            autoComplete="off"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formState.password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Обработка данных...' : 'Войти'}
        </button>
      </form>
    </div>
  );

  if (login === 'registration')
    return (
      <div className={styles.loginContainer}>
      <h2 onClick={() => {setLogin('signUp')}} className={styles.loginTitle}>Авторизация</h2>
      <h2 onClick={() => {setLogin('registration')}} className={styles.loginTitle}>Регистрация</h2>
      <form className={styles.loginForm} onSubmit={handeSubmit1}>
        <div className={styles.formGroup}>
        <label htmlFor="name">Имя пользователя:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formState1.userName}
            onChange={onChange1}
            required
            autoComplete="off"
          />
          <label htmlFor="email">Почта:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formState1.email}
            onChange={onChange1}
            required
            autoComplete="off"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formState1.password}
            onChange={onChange1}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Обработка данных...' : 'Регистрация'}
        </button>
      </form>
      </div>
  )
};
