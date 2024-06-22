import { ArrowBackIcon, ArrowNextIcon } from "assets/icons/arrowIcon";
import { useCallback, useEffect, useState } from "react";
import s from "./pagination.module.css"
import { useSearchParams } from "react-router-dom";

type PaginationProps = {
  limit:number,
  data: any,
  page: number,
  isFetching: boolean
}

export const Pagination = ({limit, data, page, isFetching}: PaginationProps) => {

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

  const totalItems = data?.meta.total_items;

  useEffect(() => {
    if (totalItems < limit) {
      setMaxItem(totalItems);
      setPage(1);
    }
    if (totalItems > limit && page === 1) setMaxItem(limit);

    if (totalItems === 0) setMinItem(0);
    if (totalItems > 0 && page === 1) setMinItem(1);
  }, [limit, page, setPage, totalItems]);
  
  return (
    <div className={s.pagination}>
            <div className={s.paginationItem}>
              {minItem}—{maxItem} из {totalItems}
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
  )
}