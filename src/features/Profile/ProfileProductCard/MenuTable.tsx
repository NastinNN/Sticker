import { DeleteIcon } from 'assets/icons/deleteIcon';
import { EyeIcon } from 'assets/icons/eyeIcon';
import { PencilIcon } from 'assets/icons/pencilIcon';
import classes from 'classnames';

import { NavLink } from 'react-router-dom';
import { ROUTES } from 'router/routes';
import { useDeleteProductMutation } from 'services/products';
import s from './profileProductCard.module.css';

type MenuTableProps = {
  id: number;
  isOpen: boolean;
};

export const MenuTable = ({ id, isOpen }: MenuTableProps) => {
  const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
  
  return (
    <>
      <div className={isOpen ? classes(s.dropMenu, s.dropMenuActive) : s.dropMenu}>
        <NavLink to={`${ROUTES.PRODUCT}/${id}`} className={s.dropMenuItem}>
          <><EyeIcon /> Просмотреть</>
        </NavLink>
        <NavLink to={`${ROUTES.EDIT}/${id}`} className={s.dropMenuItem}>
          <PencilIcon /> Редактировать
        </NavLink>
        <div className={s.dropMenuItem}
          onClick={() => {
            deleteProduct(id);
          }}
        >
          <DeleteIcon /> Удалить
        </div>
      </div>
    </>
  );
};
