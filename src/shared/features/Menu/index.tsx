import classes from 'classnames';
import { NavLink } from 'react-router-dom';
import { ROUTES } from 'router/routes';
import { useAppDispatch } from 'store';
import { clearUserData } from 'store/userData';
import { STORAGE_KEYS, clearStorageItem } from 'utils/storage';
import { LogoutIcon } from '../../../assets/icons/logoutIcon';
import { MyProductIcon } from '../../../assets/icons/myProductIcon';
import s from './menu.module.css';

type DropdownMenuProps = {
  showMenu: boolean;
  userName: string;
  userSurname: string;
};

export const Menu = ({ showMenu, userName, userSurname }: DropdownMenuProps) => {
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(clearUserData());
    clearStorageItem(STORAGE_KEYS.USER_DATA);
  };


  return (
    <div className={window.location.pathname !== ROUTES.PROFILE ? (showMenu ? classes(s.menu, s.dropMenu, s.dropMenuActive) : classes(s.menu, s.dropMenu)) : (s.menu)}>
      <div className={s.menuTitle}>
        <div className={s.menuProfileIcon}>
          {userName[0]}{userSurname[0]}
        </div>
        {userName} {userSurname[0]}.
      </div>
      <NavLink to={`${ROUTES.PROFILE}`} className={({ isActive }) => isActive ? classes(s.menuItem, s.menuItemActive) : s.menuItem}>
          <MyProductIcon />
          Мои объявления
      </NavLink>

      <div className={s.menuItem} onClick={logoutHandler}>
        <LogoutIcon />
        Выход
      </div>
    </div>
  );
};
