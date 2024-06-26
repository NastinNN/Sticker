import { BackNavigateIcon } from 'assets/icons/navigateIcon';
import { CreateProductForm } from 'features/CreateProduct/ui';
import { Container } from 'features/page-wrapper/container';
import { Navigate, useNavigate } from 'react-router-dom';
import { Menu } from 'shared/features/Menu';

import s from './editProduct.module.css';
import { getUserId } from 'store/userData';
import { useSelector } from 'react-redux';
import { ROUTES } from 'router/routes';

export const CreatePage = () => {
  const navigate = useNavigate();
  const userId = useSelector(getUserId);

  if (!userId) return <Navigate to={ROUTES.AUTH} />;
  return (
    <Container>
      <div className={s.wrapper}>
        <div className={s.menu}>
          <Menu showMenu={true} />
        </div>
        <div className={s.content}>
          <div className={s.buttonBack} onClick={() => navigate(-1)}>
            <BackNavigateIcon /> Вернуться назад
          </div>
          <CreateProductForm />
        </div>
      </div>
    </Container>
  );
};
