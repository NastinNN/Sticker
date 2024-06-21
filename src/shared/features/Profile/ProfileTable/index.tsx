import { ArrowBackIcon, ArrowNextIcon } from 'assets/icons/arrowIcon';
import { FilterPointerIcon } from 'assets/icons/filterPointer';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Select from 'shared/components/Select';
import { ProfileProductList } from '../ProfileProductList';

import { categoriesSelect } from '../../FilterData/filter';
import s from './profileTable.module.css';
import { CloseIcon } from 'assets/icons/closeIcon';

type ProfileTableProps = {
  page: number;
  limit: number;
  totalItems: number;
  sortDate: boolean;
  setSortDate: any;
  data: any;
  isLoading: boolean;
  isFetching: boolean;
  seach: string;
  setSeach: any;
  filter: string;
  setFilter: any;
};

export const ProfileTable = ({
  data,
  page,
  limit,
  isLoading,
  isFetching,
  sortDate,
  setSortDate,
  seach,
  setSeach,
  totalItems,
  filter,
  setFilter,
}: ProfileTableProps) => {
  const inputRef = useRef<HTMLInputElement>(null!);

  const [minItem, setMinItem] = useState(1);
  const [maxItem, setMaxItem] = useState(limit);

  const [params, setParams] = useSearchParams();
  const setPage = useCallback(
    (page: number) => {
      params.set('page', String(page));
      setParams(params);
    },
    [params, setParams],
  );

  useEffect(() => {
    if (totalItems < limit) {
      setMaxItem(totalItems);
      setPage(1);
    }
    if (totalItems > limit && page === 1) setMaxItem(limit);

    if (totalItems === 0) setMinItem(0);
    if (totalItems > 0 && page === 1) setMinItem(1);
  }, [limit, page, setPage, totalItems]);

  if (data)
    return (
      <>
        <div className={s.filterRow}>
          <div className={s.seach}>
            <input
              id="input"
              ref={inputRef}
              type="text"
              value={seach}
              onChange={e => setSeach(e.target.value)}
              placeholder='Найти объявление'
              className={s.input}
            />
            <div className={s.buttonImputClean} onClick={() => {setSeach('')}}><CloseIcon /></div>
          </div>

          <div className={s.filterSelect}>
            Категория:
            <Select
              value={filter!}
              onChange={e => {
                setFilter(e.target.value);
              }}
              options={categoriesSelect}
            />
          </div>

          <div className={s.pagination}>
            <div>{}</div>
            <div className={s.paginationItem}>
              {minItem}—{maxItem} из {data?.meta.total_items}
            </div>
            <button
              className={s.paginationButtom}
              onClick={() => {
                setPage(page - 1);
                setMinItem(minItem - limit);
                setMaxItem(maxItem === data.meta.total_items ? maxItem - 1 - (maxItem - minItem) : maxItem - 8);
              }}
              disabled={isFetching || minItem === 1 || minItem === 0}
            >
              <ArrowBackIcon />
            </button>

            <button
              className={s.paginationButtom}
              onClick={() => {
                setPage(page + 1);
                setMinItem(minItem + limit);
                setMaxItem(maxItem + 8 > data.meta.total_items ? data.meta.total_items : maxItem + 8);
              }}
              disabled={isFetching || maxItem === totalItems || page === data?.meta.total_pages}
            >
              <ArrowNextIcon />
            </button>
          </div>
        </div>

        <table className={s.table}>
          <tbody>
            <tr>
              <th style={{ width: '275px' }}>Название объявления</th>
              <th style={{ width: '200px' }}>Категория</th>
              <th
                className={s.titleActive}
                style={{ width: '200px' }}
                onClick={() => {
                  setSortDate(!sortDate);
                }}
              >
                Дата публикации <FilterPointerIcon />
              </th>
              <th>Статус</th>
              <th style={{ width: '48px' }}>&nbsp;</th>
            </tr>

            {!!data.items && <ProfileProductList profileProductList={data.items} />}

            {data.items.length === 0 && (
              <tr>
                <td colSpan={5}>Объявление не найдено</td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
};
