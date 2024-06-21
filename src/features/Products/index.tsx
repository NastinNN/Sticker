import type { Product } from '../../shared/types/product';
import s from './product.module.css';
import { useParsDate } from 'hooks/useParsDate';

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
        <span>{useParsDate(product.publication_date)}</span>
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