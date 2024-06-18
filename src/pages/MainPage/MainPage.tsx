import { ProductList } from 'features/Products/ProductsList';
import { Container } from 'features/page-wrapper/container';
import { useFetch } from 'hooks/useFetch';
import Loader from 'shared/components/loader';
import { Product } from 'shared/types/product';
import s from './main.module.css';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ROUTES } from 'router/routes';
import { useGetProductListQuery } from 'services/products';


export const MainPage = () => {
  const [category, setCategory] = useState('all');

  const { data, isLoading} = useGetProductListQuery(category);

  return (
    <main>
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
            <button type='button' onClick={() => {setCategory('all')}} className={category === 'all' ? 'active' : ''}>Вся доска</button>
            <button type='button' onClick={() => {setCategory('clothes')}} className={category === 'clothes' ? 'active' : ''}>Одежда</button>
          </div>
        </Container>
      </div>

      <div>
        <Container>
            {isLoading && <Loader />}
            
            {!!data?.items && !isLoading && <ProductList product={data.items} />}

            <Link to={`${ROUTES.CATALOG}?category=${category}`}>
          Загрузить еще
        </Link>
        </Container>
      </div>
        

    </main>
  );
};
