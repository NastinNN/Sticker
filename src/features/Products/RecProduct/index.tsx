import { useGetRecProductQuery } from 'services/products';
import Loader from 'shared/components/loader';
import { RecCard } from './RecCard';
import s from './recProduct.module.css';

type RecProductProps = {
  category: string;
  id: number;
};

export const RecProduct = ({ category, id }: RecProductProps) => {
  const { data, isLoading } = useGetRecProductQuery(category);

  const recArr = data?.items.filter(e => e.id !== id).slice(0, 2);

  if (data)
    return (
      <>
        <div className={s.title}>Смотрите также</div>
        {isLoading && <Loader />}

        <div className={s.cardList}>{recArr?.map((rec, index) => <RecCard product={rec} key={index} />)}</div>
      </>
    );
};
