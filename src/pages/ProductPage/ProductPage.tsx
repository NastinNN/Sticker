import { Container } from 'features/page-wrapper/container';
import { useParams } from 'react-router-dom';
import Loader from 'shared/components/loader';
import { ProductView } from '../../features/Products';
import { useGetProductQuery } from 'services/products';

export const ProductPage = () => {

  const { id } = useParams();
  const { data, isLoading} = useGetProductQuery(id!);

  return (
    <Container>
      {isLoading && <Loader />}

      {!!data && !isLoading && <ProductView product={data} />}
    </Container>
  );
};
