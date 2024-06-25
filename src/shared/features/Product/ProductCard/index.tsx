import { useParsDate } from 'hooks/useParsDate';
import { Link } from 'react-router-dom';
import { Product } from 'shared/types/product';
import { ROUTES } from '../../../../router/routes';
import { useParsCategory } from 'hooks/useParsCategory';
import { EyeIcon } from 'assets/icons/eyeIcon';

import s from './productCard.module.css';

type ProductCardProps = {
  productCard: Product;
};

export const ProductCard = ({ productCard }: ProductCardProps) => {
  return (
    <Link to={`${ROUTES.PRODUCT}/${productCard.id}`} className={s.wrapper}>
      <div className={s.coverImage}>
            <img src={productCard.image} alt="cover" />
            <div className={s.mark}>{useParsCategory(productCard.category)}</div>
          </div>
      <div className={s.content}>
        <div className={s.Header}>
          <div className={s.textContent}>
            <p className={s.title}>{productCard.title}</p>
            <p className={s.text}>{productCard.description.length > 110 ? (productCard.description.substring(0, 110)+"...") : productCard.description}</p>
          </div>
        </div>

        <div className={s.textContent}>
          <p className={s.price}>{productCard.price.toLocaleString('ru-RU')} Р</p>
          <div className={s.footer}>
            <p>{useParsDate(productCard.publication_date)}</p>
            <div className={s.views}><EyeIcon /> {productCard.views}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
