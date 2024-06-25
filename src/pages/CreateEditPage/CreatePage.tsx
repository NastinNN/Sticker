import { CreateProductForm } from 'features/CreateProduct/ui';
import { Container } from 'features/page-wrapper/container';
import { Menu } from 'shared/features/Menu';
import { BackNavigateIcon } from 'assets/icons/navigateIcon';
import { useNavigate } from 'react-router-dom';

import s from './editProduct.module.css';

export const CreatePage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className={s.wrapper}>
        <Menu showMenu={true} />
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
