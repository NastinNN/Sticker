import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../router/routes';
import { useAppDispatch } from '../../../store';
import { clearUserData, getToken, getUserName } from '../../../store/userData';
import { STORAGE_KEYS, clearStorageItem } from '../../../utils/storage';
import s from './header.module.css';
import { LoginIcon } from '../icons/loginIcon';

export const LoginButton = () => {
  const dispatch = useAppDispatch();
  const token = useSelector(getToken);
  const userName = useSelector(getUserName);
  // const avatar = useSelector(getUserAvatar);

  const logoutHandler = () => {
    dispatch(clearUserData());
    clearStorageItem(STORAGE_KEYS.USER_DATA);
  };

  if (token)
    return (
      <>
      <div className={s.loginButton}>
        <LoginIcon />
      <div>Профиль</div>
      </div>
      
        <ul>
          <li>{userName}</li>
          <li><Link to={`${ROUTES.PROFILE}`}>Мои объявления</Link></li>
          <li className={s.newPostButton} onClick={logoutHandler}>Выйти</li>
        </ul>
        {/* <button className={s.newPostButton} onClick={logoutHandler}>
          Выйти
        </button> */}
      </>
    );

  return (
    <Link to={ROUTES.AUTH} className={s.loginButton}>
      <LoginIcon />
      <div>Войти</div>
    </Link>
  );
};
