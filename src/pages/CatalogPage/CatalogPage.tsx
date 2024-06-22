import { ProductList } from '../../shared/features/Product/ProductList/ProductsList';
import { Container } from 'features/page-wrapper/container';
import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetProductPaginationQuery } from 'services/products';
import Select from 'shared/components/Select';
import Loader from 'shared/components/loader';
import { categoriesSelect, filterSelect } from 'shared/features/FilterData/filter';
import { Pagination } from 'shared/features/Pagination';

export const CatalogPage = () => {
  const [params, setParams] = useSearchParams();

  const category = String(params.get('category') || 'all');
  const filter = String(params.get('sortBy') || 'publication_date');
  const seachParam = String(params.get('title') || '');

  const page = Number(params.get('page') || 1);

  const limit = 9;

  const inputRef = useRef<HTMLInputElement>(null!);
  const [seach, setSeach] = useState(seachParam);
  const [seachParams, setSeachParams] = useState(seachParam);

  const { data, isLoading, isFetching } = useGetProductPaginationQuery({ category, filter, seach, page, limit });

  return (
    <div>
      <Container>
        <input
          id="input"
          ref={inputRef}
          type="text"
          value={seachParams}
          onChange={e => setSeachParams(e.target.value)}
        />
        <button
          onClick={() => {
            setSeach(inputRef.current.value);
            setSeachParams(inputRef.current.value);
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
          options={categoriesSelect}
        />

        <Select
          value={filter}
          onChange={e => {
            params.set('sortBy', e.target.value);
            setParams(params);
          }}
          options={filterSelect}
        />

        <Pagination limit={limit} data={data} page={page} isFetching={isFetching} />

        {isLoading && <Loader />}
        {!data?.items.length && <div>Объявление не найдено</div>}

        {!!data?.items && !isLoading && <ProductList product={data.items} />}
      </Container>
    </div>
  );
};
