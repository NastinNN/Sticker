import { LoadIcon } from 'assets/icons/loadIcon';
import { ProductList } from '../../shared/features/Product/ProductList/ProductsList';
import { Container } from 'features/page-wrapper/container';
import { useParsCategory } from 'hooks/useParsCategory';
import { CategoryButton } from 'pages/MainPage/Category/categoryButton';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'router/routes';
import { useGetProductListQuery } from 'services/products';
import Loader from 'shared/components/loader';
import { categoryArr } from 'shared/features/FilterData/filter';
import { Banner } from './Banner/banner';

import s from './main.module.css';

export const MainPage = () => {
  const [category, setCategory] = useState('all');

  const { data, isLoading } = useGetProductListQuery(category);
  return (
    <>
      <div className={s.banner}>
        <Container>
          <Banner />
        </Container>
      </div>

      <div className={s.content}>
        <Container>
          <div className={s.contentWrapper}>
            <div className={s.category}>
              <CategoryButton
                categories={categoryArr}
                stateCategory={category}
                setStateCategory={setCategory}
                pars={useParsCategory}
              />
            </div>

            <h2>Вся лента</h2>

            {isLoading && <Loader />}
            {!!data?.items && !isLoading && <ProductList product={data.items} />}

            <div className={s.buttonWrapper}>
              <Link to={`${ROUTES.CATALOG}?category=${category}`} className={s.moreButton}>
                Перейти в каталог
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
