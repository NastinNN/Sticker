import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../../assets/icons/logoIcon';
import { ROUTES } from '../../../router/routes';
import { Container } from '../container';
import { LoginButton } from './LoginButton';

import { AddIcon } from 'assets/icons/addIcon';
import { SeachIcon } from 'assets/icons/seachIcons';
import s from './header.module.css';

export const Header = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null!);

  return (
    <header className={s.wrapper}>
      <Container>
        <div className={s.container}>
          <div className={s.leftSection}>
            <Link to={ROUTES.ROOT} className={s.logo}>
              <Logo />
            </Link>
          </div>

          <div className={s.centerSection}>
            {window.location.pathname !== ROUTES.CATALOG && window.location.pathname !== ROUTES.PROFILE && (
              <div className={s.seach}>
                <input id="input" placeholder="Поиск" className={s.searchInput} ref={inputRef} type="text" />
                <button
                  onClick={() => {
                    if (inputRef.current.value !== '') navigate(`${ROUTES.CATALOG}?title=${inputRef.current.value}`);
                  }}
                  className={s.searchButton}
                >
                  Искать
                </button>
              </div>
            )}
          </div>

          <div className={s.rightSection}>
            {window.location.pathname !== ROUTES.PROFILE && (
              <Link to={ROUTES.CREATE} className={s.buttonCreateAd}>
                Подать объявление
              </Link>
            )}
            <div className={s.mobileMenu}>         
              <Link to={`${ROUTES.CATALOG}`} className={s.mobileMenuHidden}>
                <SeachIcon />
              </Link>
              <Link to={`${ROUTES.CREATE}`} className={s.mobileMenuHidden}>
                <AddIcon />
              </Link>
              <LoginButton />
            </div>
            
          </div>
        </div>
      </Container>
    </header>
  );
};
