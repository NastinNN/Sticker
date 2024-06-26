import { BackNavigateIcon } from 'assets/icons/navigateIcon';
import { EditProductForm } from 'features/CreateProduct/EditProduct';
import { Container } from 'features/page-wrapper/container';
import { Navigate, useNavigate } from 'react-router-dom';
import { Menu } from 'shared/features/Menu';

import s from './editProduct.module.css';
import { ROUTES } from 'router/routes';
import { useSelector } from 'react-redux';
import { getUserId } from 'store/userData';

export const EditPage = () => {
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
          <EditProductForm />
        </div>
      </div>
    </Container>
  );
};
