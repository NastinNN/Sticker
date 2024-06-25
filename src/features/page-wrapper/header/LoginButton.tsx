import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useOnClickOutside } from 'usehooks-ts';
import { LoginIcon } from '../../../assets/icons/loginIcon';
import { ROUTES } from '../../../router/routes';
import { Menu } from '../../../shared/features/Menu';
import { getToken } from '../../../store/userData';
import s from './header.module.css';

export const LoginButton = () => {
  const token = useSelector(getToken);
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
          <div className={s.loginButton} onClick={(window.location.pathname === ROUTES.PROFILE ||
          window.location.pathname === ROUTES.CREATE ||
            window.location.pathname.indexOf(`${ROUTES.EDIT}`) !== -1 ) ?
            undefined : handleClickInside } ref={ref}>
            <LoginIcon />
            <div className={s.loginButtonTitle}>Профиль</div>
          </div>
          {(window.location.pathname !== ROUTES.PROFILE &&
          window.location.pathname !== ROUTES.CREATE &&
        window.location.pathname.indexOf(`${ROUTES.EDIT}`) === -1) && <Menu showMenu={showMenu} />}
        </div>
      ) : (
        <Link to={ROUTES.AUTH} className={s.loginButton}>
          <LoginIcon />
          <div className={s.loginButtonTitle}>Войти</div>
        </Link>
      )}
    </>
  );
};
