import { DotsMenuIcon } from 'assets/icons/dotsMenuIcon';
import { useParsCategory } from 'hooks/useParsCategory';
import { useParsDate } from 'hooks/useParsDate';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'router/routes';
import { Product } from 'shared/types/product';
import { useOnClickOutside } from 'usehooks-ts';
import { MenuTable } from './MenuTable';

import s from './profileProductCard.module.css';

type ProfileProductProps = {
  profileProductCard: Product;
};

export const ProfileProductCard = ({ profileProductCard }: ProfileProductProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const refTable = useRef(null);
  const handleClickOutside = () => {
    setIsOpen(false);
  };
  const handleClickInside = () => {
    setIsOpen(!isOpen);
  };

  useOnClickOutside(refTable, handleClickOutside);

  return (
    <tr>
      <td className={s.name}>
        <Link to={`${ROUTES.PRODUCT}/${profileProductCard.id}`}>{profileProductCard.title}</Link>
      </td>
      <td>{useParsCategory(profileProductCard.category)}</td>
      <td>{useParsDate(profileProductCard.publication_date)}</td>
      <td>{profileProductCard.status ? 'Опубликовано' : 'Скрыто'}</td>
      <td className={s.menu} >
        <div onClick={handleClickInside} ref={refTable}>
          <DotsMenuIcon />
        </div>
          <MenuTable id={profileProductCard.id} isOpen={isOpen} />
      </td>
    </tr>
  );
};
