import { Link } from 'react-router-dom';
import { Logo } from '../../../assets/icons/logoIcon';
import { ROUTES } from '../../../router/routes';
import { Container } from '../container';

import s from './footer.module.css';

export const Footer = () => {
  return (
    <footer className={s.wrapper}>
      <Container>
        <div className={s.container}>
          <div className={s.leftSection}>
            <Link to={ROUTES.ROOT} className={s.logo}>
              <Logo />
              <p className={s.logoText}>Доска обявлений</p>
            </Link>
          </div>

          <p className={s.rightSection}>© ООО «Доска диджитал», 2022</p>
        </div>
      </Container>
    </footer>
  );
};
