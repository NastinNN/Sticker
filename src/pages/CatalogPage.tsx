import { ProductList } from 'features/Products/ProductsList';
import { Container } from 'features/page-wrapper/container';
import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetProductPaginationQuery } from 'services/products';
import Select from 'shared/components/Select';
import Loader from 'shared/components/loader';

export const CatalogPage = () => {
  const [params, setParams] = useSearchParams();

  const category = String(params.get('category'));
  const filtr = String(params.get('sortBy') || 'publication_date');

  const page = Number(params.get('page') || 1);
  const setPage = (page: number) => {
    params.set('page', String(page));
    setParams(params);
    ``;
  };

  const inputRef = useRef<HTMLInputElement>(null!);
  const [seach, setSeach] = useState('');

  const { data, isLoading, isFetching } = useGetProductPaginationQuery({ category, filtr, seach, page });

  return (
    <div>
      <Container>
        <input id="input" ref={inputRef} type="text" />
        <button
          onClick={() => {
            setSeach(inputRef.current.value);
            params.set('title', inputRef.current.value);
            setParams(params);
            params.set('page', '1');
            setParams(params);
          }}
        >
          Поиск
        </button>

        <Select
          value={category!}
          onChange={e => {
            params.set('category', e.target.value);
            setParams(params);
            params.set('page', '1');
            setParams(params);
          }}
          options={[
            { label: 'Все', value: 'all' },
            { label: 'Одежда', value: 'clothes' },
            { label: 'Аксессуары', value: 'accessories' },
            { label: 'Товары для дома', value: 'household-products' },
            { label: 'Бытовая техника', value: 'appliances' },
          ]}
        />

        <Select
          value={filtr}
          onChange={e => {
            params.set('sortBy', e.target.value);
            setParams(params);
          }}
          options={[
            { label: 'Цена (по возрастанию)', value: 'price' },
            { label: 'Цена (по убыванию)', value: '-price' },
            { label: 'Дата публикации (свежее наверху)', value: 'publication_date' },
            { label: 'Дата публикации (старое наверху)', value: '-publication_date' },
          ]}
        />

        {isLoading && <Loader />}
        {!data?.items.length && <div>Объявление не найдено</div>}

        {!!data?.items && !isLoading && <ProductList product={data.items} />}

        {!!data?.meta.total_pages && data.meta.total_pages > 1 && <div>
          <button
            onClick={() => {
              setPage(page - 1);
            }}
            disabled={isFetching || page === 1}
          >
            Назад
          </button>

          <button onClick={() => setPage(page + 1)} disabled={isFetching || data?.meta.total_pages === page}>
            Далее
          </button>
        </div>}
        
      </Container>
    </div>
  );
};
