import { Container } from 'features/page-wrapper/container';
import ErrorImage from '../../assets/images/error-cat.png';
import s from './error.module.css';

export const ErrorPage = () => {
  return (
    <Container>
      <div className={s.wrapper}>
        <div className={s.descriprion}>
          <h2>Упс! Кажется, на эту страницу прилег котик</h2>
          <p>Ошибка 404</p>
          <p>Мы уже разбираемся, почему так получилось, скоро все починим.</p>
        </div>
        <div className={s.image}>
          <img src={ErrorImage} alt="error image" />
        </div>
      </div>
    </Container>
  );
};
