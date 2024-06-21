import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useOnClickOutside } from 'usehooks-ts';
import { LoginIcon } from '../../../assets/icons/loginIcon';
import { ROUTES } from '../../../router/routes';
import { Menu } from '../../../shared/features/Menu';
import { getToken, getUserName, getUserSurname } from '../../../store/userData';
import s from './header.module.css';

export const LoginButton = () => {
  const token = useSelector(getToken);
  const userName = useSelector(getUserName);
  const userSurname = useSelector(getUserSurname);
  const [showMenu, setShowMenu] = useState(false);

  const ref = useRef(null);
  const handleClickOutside = () => {
    setShowMenu(false);
  };
  const handleClickInside = () => {
    setShowMenu(!showMenu);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <>
      {token ? (
        <div className={s.dropdownMenu}>
          <div className={s.loginButton} onClick={window.location.pathname !== ROUTES.PROFILE ?
            handleClickInside : undefined} ref={ref}>
            <LoginIcon />
            <div>Профиль</div>
          </div>
          {window.location.pathname !== ROUTES.PROFILE && <Menu showMenu={showMenu} userName={userName!} userSurname={userSurname!} />}
        </div>
      ) : (
        <Link to={ROUTES.AUTH} className={s.loginButton}>
          <LoginIcon />
          <div>Войти</div>
        </Link>
      )}
    </>
  );
};
