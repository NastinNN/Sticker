import { FilterPointerIcon } from 'assets/icons/filterPointer';
import { useRef } from 'react';
import { ButtonClean } from 'shared/components/Buttons/ButtonClean';
import Select from 'shared/components/Select';
import { Pagination } from 'shared/features/Pagination';
import { categoriesSelect } from '../../../shared/features/FilterData/filter';
import { ProfileProductList } from '../ProfileProductList';

import s from './profileTable.module.css';

type ProfileTableProps = {
  page: number;
  limit: number;
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
  isFetching,
  sortDate,
  setSortDate,
  seach,
  setSeach,
  filter,
  setFilter,
}: ProfileTableProps) => {

  const inputRef = useRef<HTMLInputElement>(null!);

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
              placeholder="Найти объявление"
              className={s.input}
            />
            <ButtonClean state={seach} setState={setSeach} />
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

          <Pagination limit={limit} data={data} page={page} isFetching={isFetching} />
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
