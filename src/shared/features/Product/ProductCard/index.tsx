import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Product } from 'shared/types/product';
import { ROUTES } from '../../../../router/routes';
import s from './productCard.module.css';

type ProductCardProps = {
  productCard: Product;
};

export const ProductCard = ({ productCard }: ProductCardProps) => {

  const datePublication = String(productCard.publication_date);

  return (
    <div className={s.productCard}>
      <div className={s.coverImage}>
        <img src={productCard.image} alt="cover" />
        <span>{productCard.category}</span>
      </div>
      <div className={s.description}>
        <Link to={`${ROUTES.PRODUCT}/${productCard.id}`}>
          <h2>{productCard.title}</h2>
        </Link>

        <div className={s.price}>{productCard.price}</div>

        <div className={s.footer}>
          <div>{productCard.views}</div>
          <span>{format(parseISO(String(productCard.publication_date)), "d MMMM yyyy", {locale: ru})}</span>
        </div>
      </div>
    </div>
  );
};
