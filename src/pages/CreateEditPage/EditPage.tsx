import { BackNavigateIcon } from 'assets/icons/navigateIcon';
import { EditProductForm } from 'features/CreateProduct/EditProduct';
import { Container } from 'features/page-wrapper/container';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'shared/features/Menu';

import s from './editProduct.module.css';

export const EditPage = () => {
  const navigate = useNavigate();

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
