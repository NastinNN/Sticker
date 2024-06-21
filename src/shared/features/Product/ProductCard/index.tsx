import { useParsDate } from 'hooks/useParsDate';
import { Link } from 'react-router-dom';
import { Product } from 'shared/types/product';
import { ROUTES } from '../../../../router/routes';
import s from './productCard.module.css';
import { useParsCategory } from 'hooks/useParsCategory';
import { EyeIcon } from 'assets/icons/eyeIcon';

type ProductCardProps = {
  productCard: Product;
};

export const ProductCard = ({ productCard }: ProductCardProps) => {
  return (
    <Link to={`${ROUTES.PRODUCT}/${productCard.id}`} className={s.productCard}>
      <div className={s.coverImage}>
            <img src={productCard.image} alt="cover" />
            <div className={s.mark}>{useParsCategory(productCard.category)}</div>
          </div>
      <div className={s.content}>
        <div className={s.Header}>
          <div className={s.textContent}>
            <div className={s.title}>{productCard.title}</div>
            <div className={s.text}>{productCard.description.length > 80 ? (productCard.description.substring(0, 80)+"...") : productCard.description}</div>
          </div>
        </div>

        <div className={s.textContent}>
          <div className={s.price}>{productCard.price} Р</div>
          <div className={s.footer}>
            <div>{useParsDate(productCard.publication_date)}</div>
            <div className={s.views}><EyeIcon /> {productCard.views}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
