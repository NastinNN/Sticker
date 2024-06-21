import { ProductList } from 'features/Products/ProductsList';
import { Container } from 'features/page-wrapper/container';
import { useParsCategory } from 'hooks/useParsCategory';
import { CategoryButton } from 'pages/MainPage/categoryButton';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'router/routes';
import { useGetProductListQuery } from 'services/products';
import Loader from 'shared/components/loader';
import { categoryArr } from 'shared/features/FilterData/filter';
import s from './main.module.css';

export const MainPage = () => {
  const [category, setCategory] = useState('all');

  const { data, isLoading } = useGetProductListQuery(category);
  return (
    <>
      <div className={s.banner}>
        <Container>
          <div className={s.bannerContainer}>
            <div className={s.bannerInfo}>
              <div className={s.bannerTitle}>Доска объявлений</div>
              <div className={s.bannerText}>
                Находи тысячи разнообразных товаров и услуг <br />
                от продавцов со всей страны. <br />
                Безопасные расчеты. Удобный сервис доставки
              </div>
            </div>
            <img src="https://i.ibb.co/KxVjpp5/pngwing-com-3.png" alt="Фото баннера" className={s.bannerImg} />
          </div>
        </Container>
      </div>

      <div className={s.category}>
        <Container>
          <div className={s.categoryContainer}>
            <CategoryButton
              categories={categoryArr}
              stateCategory={category}
              setStateCategory={setCategory}
              pars={useParsCategory}
            />
          </div>
        </Container>
      </div>

      <div className={s.contentWrapper}>
        <Container>
          <div className={s.content}>
            {isLoading && <Loader />}

            <h2>Вся лента</h2>

            {!!data?.items && !isLoading && <ProductList product={data.items} />}


            <Link to={`${ROUTES.CATALOG}?category=${category}`}>Загрузить еще</Link>
          </div>
        </Container>
      </div>
    </>
  );
};
