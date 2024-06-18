import { ProductCard } from 'shared/features/Product/ProductCard';
import { Product } from 'shared/types/product';
import s from './productList.module.css'

type ProductListProps = {
  product: Product[];
};

export const ProductList = ({ product }: ProductListProps) => {

  return (
    <div className={s.productLiust}>
      {product.map((product, index) => (
        <ProductCard productCard={product} key={index} />
      ))}
    </div>
  );
};