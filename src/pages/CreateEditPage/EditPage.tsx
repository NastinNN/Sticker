import { BackNavigateIcon } from 'assets/icons/navigateIcon';
import { EditProductForm } from 'features/CreateProduct/EditProduct';
import { Container } from 'features/page-wrapper/container';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { Menu } from 'shared/features/Menu';

import s from './editProduct.module.css';
import { ROUTES } from 'router/routes';
import { useSelector } from 'react-redux';
import { getUserId } from 'store/userData';
import { useGetProductQuery } from 'services/products';

export const EditPage = () => {
  const navigate = useNavigate();
  const userId = useSelector(getUserId);
  const [params] = useSearchParams();
  const id = String(params.get('id') || '0');
  const {data, isLoading, isError} = useGetProductQuery(id)


  if (!userId) return <Navigate to={ROUTES.AUTH} />;

  if (id === "0" || isError) return <Navigate to={ROUTES.ERROR} />;

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
          {!isLoading &&
          <EditProductForm data={data!} id={id}/>}
        </div>
      </div>
    </Container>
  );
};
