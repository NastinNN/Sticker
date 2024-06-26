import { ProfileTable } from 'features/Profile/ProfileTable';
import { Container } from 'features/page-wrapper/container';
import { useSelector } from 'react-redux';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from 'router/routes';
import { Menu } from 'shared/features/Menu';
import { getUserId, getUserName, getUserSurname } from 'store/userData';

import { PlusIcon } from 'assets/icons/plusIcon';
import { useState } from 'react';
import { useGetProductProfileQuery } from 'services/products';
import Loader from 'shared/components/loader';
import s from './profile.module.css';

export const ProfilePage = () => {
  const userId = Number(useSelector(getUserId));

  const [seach, setSeach] = useState('');
  const [filter, setFilter] = useState('all');

  const [params, setParams] = useSearchParams();
  const page = Number(params.get('page') || 1);

  const limit = 8;
  const [sortDate, setSortDate] = useState(true);


  const { data, isLoading, isFetching } = useGetProductProfileQuery({ userId, page, limit, sortDate, seach, filter });

  if (!userId) return <Navigate to={ROUTES.AUTH} />;
  return (
    <main>
      <Container>
        {isLoading && <Loader />}
        <div className={s.wrapper}>
          <div className={s.menu}>
            <Menu showMenu={true}/>
          </div>
          <div className={s.content}>
            <div className={s.contentHeader}>
              <div className={s.contentHeaderTitle}>
                <h2>Объявления</h2>
                <div>Всего: {data?.meta.total_items}</div>
              </div>
              <Link to={`${ROUTES.CREATE}`}>
                <div className={s.addButton}>
                  Добавить <PlusIcon />
                </div>
              </Link>
            </div>

            {data?.items && (
              <ProfileTable
                data={data}
                page={page}
                limit={limit}
                isLoading={isLoading}
                isFetching={isFetching}
                sortDate={sortDate}
                setSortDate={setSortDate}
                seach={seach}
                setSeach={setSeach}
                filter={filter}
                setFilter={setFilter}
              />
            )}
          </div>
        </div>
      </Container>
    </main>
  );
};
