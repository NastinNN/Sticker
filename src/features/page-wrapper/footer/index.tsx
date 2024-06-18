import { Link } from 'react-router-dom';
import { ROUTES } from '../../../router/routes';
import { Container } from '../container';
import { Logo } from '../icons/logo';

import s from './footer.module.css';

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <Container>
        <div className={s.footerContainer}>
          <div className={s.leftSection}>
            <Link to={ROUTES.ROOT} className={s.logo}>
              <Logo />
              <div className={s.logoText}>
              Доска обявлений
              </div>
            </Link>
          </div>

          <div className={s.rightSection}>
          © ООО «Доска диджитал», 2022
          </div>
        </div>
      </Container>
    </footer>
  );
};
