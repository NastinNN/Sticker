import { Container } from 'features/page-wrapper/container';
import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetProductPaginationQuery } from 'services/products';
import { ButtonClean } from 'shared/components/Buttons/ButtonClean';
import Select from 'shared/components/Select';
import Loader from 'shared/components/loader';
import { categoriesSelect, filterSelect } from 'shared/features/FilterData/filter';
import { Pagination } from 'shared/features/Pagination';
import { ProductList } from '../../shared/features/Product/ProductList/ProductsList';

import s from './catalog.module.css';

export const CatalogPage = () => {
  const [params, setParams] = useSearchParams();

  const category = String(params.get('category') || 'all');
  const filter = String(params.get('sortBy') || '-publication_date');
  const seachParam = String(params.get('title') || '');

  const page = Number(params.get('page') || 1);

  const limit = 9;

  const inputRef = useRef<HTMLInputElement>(null!);
  const [seach, setSeach] = useState(seachParam);
  const [seachParams, setSeachParams] = useState(seachParam);

  const { data, isLoading, isFetching } = useGetProductPaginationQuery({ category, filter, seach, page, limit });

  return (
    <div className={s.content}>
      <Container>
        <div className={s.wrapper}>
          <div className={s.seach}>
            <input
              id="input"
              ref={inputRef}
              type="text"
              value={seachParams}
              onChange={e => setSeachParams(e.target.value)}
              placeholder='Найти объявление'
              className={s.seachInput}
            />
            <ButtonClean state={seachParams} setState={setSeachParams} />
            <button
              className={s.seachButton}
              onClick={() => {
                setSeach(inputRef.current.value);
                setSeachParams(inputRef.current.value);
                {
                  !inputRef.current.value ? params.delete('title') : params.set('title', inputRef.current.value);
                }
                setParams(params);
                params.set('page', '1');
                setParams(params);
              }}
            >
              Искать
            </button>
          </div>

          <div className={s.filteRow}>
            <div className={s.filter}>
              Категория:
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
            </div>

            <div className={s.filter}>
              Сортировать:
              <Select
                value={filter}
                onChange={e => {
                  params.set('sortBy', e.target.value);
                  setParams(params);
                }}
                options={filterSelect}
              />
            </div>
          </div>

          {isLoading && <Loader />}
          <p className={s.title}>Найдено всего: {data?.meta.total_items}</p>

          {data?.items && !isLoading && <ProductList product={data.items} />}

          {data?.meta.total_items !== 0 &&
          <div className={s.pagination}>
            <Pagination limit={limit} data={data} page={page} isFetching={isFetching} />
          </div>}
          
        </div>
      </Container>
    </div>
  );
};
