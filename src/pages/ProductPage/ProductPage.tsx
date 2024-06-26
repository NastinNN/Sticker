import { Container } from 'features/page-wrapper/container';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import Loader from 'shared/components/loader';
import { ProductView } from '../../features/Products';
import { useGetProductQuery } from 'services/products';
import { ROUTES } from 'router/routes';

export const ProductPage = () => {

  const [params, setParams] = useSearchParams();
  const id = String(params.get('id') || '0');
  
  // const { id } = useParams();
  const { data, isLoading} = useGetProductQuery(id);

  if (id === '0') <Navigate to={ROUTES.PROFILE} />;

  return (
    <Container>
      {isLoading && <Loader />}

      {!!data && !isLoading && <ProductView product={data} />}
    </Container>
  );
};
