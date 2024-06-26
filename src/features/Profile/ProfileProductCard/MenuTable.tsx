import { DeleteIcon } from 'assets/icons/deleteIcon';
import { EyeIcon } from 'assets/icons/eyeIcon';
import { PencilIcon } from 'assets/icons/pencilIcon';
import classes from 'classnames';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
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

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setOpen(false);
    deleteProduct(id);
  }

  return (
    <>
      <div className={isOpen ? classes(s.dropMenu, s.dropMenuActive) : s.dropMenu}>
        <NavLink to={`${ROUTES.PRODUCT}?id=${id}`} className={s.dropMenuItem}>
          <>
            <EyeIcon /> Просмотреть
          </>
        </NavLink>
        <NavLink to={`${ROUTES.EDIT}?id=${id}`} className={s.dropMenuItem}>
          <PencilIcon /> Редактировать
        </NavLink>
        <div
          className={s.dropMenuItem}
          onClick={handleClickOpen}
        >
          <DeleteIcon /> Удалить
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose || handleDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">Вы действительно хотите удалить данное объявление?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete} >Да</Button>
          <Button onClick={handleClose}>Нет</Button>
          
        </DialogActions>
      </Dialog>
    </>
  );
};
