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
              <div className={s.logoText}>Доска обявлений</div>
            </Link>
          </div>

          <div className={s.rightSection}>© ООО «Доска диджитал», 2022</div>
        </div>
      </Container>
    </footer>
  );
};
