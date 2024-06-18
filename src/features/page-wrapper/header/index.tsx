import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../router/routes';
import { Container } from '../container';
import { Logo } from '../icons/logo';
import { LoginButton } from './LoginButton';

import s from './header.module.css';

export const Header = ({ onSearchChange }: { onSearchChange?: (e: ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <header className={s.header}>
      <Container>
        <div className={s.headerContainer}>
          <div className={s.leftSection}>
            <Link to={ROUTES.ROOT} className={s.logo}>
              <Logo />
            </Link>
          </div>

          <div className={s.centerSection}>
            <div className={s.seach}>
              <input type="text" placeholder="Search" className={s.searchInput} onChange={onSearchChange} />
              <button type="submit" className={s.searchButton}>
                Искать
              </button>
            </div>
            <Link to={ROUTES.CREATE} className={s.buttonCreateAd}>
              Подать объявление
            </Link>
          </div>

          <div className={s.rightSection}>
            <LoginButton />
          </div>
        </div>
      </Container>
    </header>
  );
};
