import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import type { Product } from '../../shared/types/product';
import s from './product.module.css';

type ProductProps = {
  product: Product;
};

const Product = ({ product }: ProductProps) => {
  return (
    <div className={s.productCard}>
    <div className={s.coverImage}>
      <img src={product.image} alt="cover" />
      <span>{product.category}</span>
    </div>
    <div className={s.description}>
        <h2>{product.title}</h2>

      <div className={s.price}>{product.price}</div>

      <div className={s.footer}>
        <div>{product.views}</div>
        <span>{format(parseISO(String(product.publication_date)), "d MMMM yyyy", {locale: ru})}</span>
      </div>
    </div>
  </div>
  );
};


type ProductViewProps = {
  product: Product[];
};

export const ProductView=({ product }: ProductViewProps) =>{
  return (
    <div className={s.productCard}>
      {product.map((product, index) => (
        <Product product={product} key={index} />
      ))}
    </div>
)};