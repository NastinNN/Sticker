import { EyeIcon } from 'assets/icons/eyeIcon';
import classes from 'classnames';
import { useParsDate } from 'hooks/useParsDate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../shared/types/product';
import { RecProduct } from './RecProduct';

import s from './product.module.css';
import { BackNavigateIcon } from 'assets/icons/navigateIcon';

type ProductProps = {
  product: Product;
};

export const ProductView = ({ product }: ProductProps) => {
  const [showPhone, setShowPhone] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={s.wrapper}>
      <div className={s.buttonBack} onClick={() => navigate(-1)}><BackNavigateIcon /></div>
      <div className={s.content}>
        <div className={s.contentMain}>
          <div className={s.date}>{useParsDate(product.publication_date)}</div>
          <div className={s.title}>{product.title}</div>
          <div className={s.id}>{product.id}</div>
          <div className={s.views}>
            <EyeIcon />
            {product.views}
          </div>
          <div className={s.image}>
            <img src={product.image} alt="Product image" />
          </div>
          <div className={s.textTitle}>Описание:</div>
          <div className={s.text}>{product.description}</div>
          <div className={s.textTitle}>
            Местоположение: <span className={s.text}>Добавить в бд локацию</span>
          </div>
          {/* <div className={s.map}></div> */}
        </div>

        <div className={s.sidebar}>
          <div className={s.price}>{product.price} Р</div>
          {/* Тут кнопка показать номер */}
          <div className={s.phone}>
            <a
              href={`tel: ${product.phone}`}
              className={showPhone ? classes(s.phoneNumber, s.phoneNumberActive) : s.phoneNumber}
            >
              {product.phone}
            </a>
            <div
              className={!showPhone ? s.hiddenPhone : classes(s.hiddenPhone, s.hiddenPhoneNotActive)}
              onClick={() => {
                setShowPhone(!showPhone);
              }}
            >
              Показать номер
            </div>
          </div>

          <div className={s.recommendations}>
            <RecProduct category={product.category} id={product.id}/>
          </div>
        </div>
      </div>
    </div>
  );
};