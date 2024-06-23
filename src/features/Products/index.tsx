import { Map, Placemark } from '@pbe/react-yandex-maps';
import { EyeIcon } from 'assets/icons/eyeIcon';
import { BackNavigateIcon } from 'assets/icons/navigateIcon';
import classes from 'classnames';
import { useParsDate } from 'hooks/useParsDate';
import { useParsPhone } from 'hooks/useParsPhone';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../shared/types/product';
import { RecProduct } from './RecProduct';

import s from './product.module.css';

type ProductProps = {
  product: Product;
};

export const ProductView = ({ product }: ProductProps) => {
  const [showPhone, setShowPhone] = useState(false);
  const navigate = useNavigate();

  const [location, setLocation] = useState<any>(null);
  const [center, setCenter] = useState<any>([51.660781, 39.200296]);

  return (
    <div className={s.wrapper}>
      <div className={s.buttonBack} onClick={() => navigate(-1)}>
        <BackNavigateIcon />
      </div>
      <div className={s.content}>
        <div className={s.contentMain}>
          <div className={s.date}>{useParsDate(product.publication_date)}</div>
          <div className={s.title}>{product.title}</div>
          <div className={s.id}>{product.articul}</div>
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
            Местоположение: <span className={s.text}>{product.location}</span>
          </div>
          <div className={s.map}>
            <Map
              onLoad={ymaps => {
                ymaps.geocode(`${product.location}`).then(function (res) {
                  setLocation(res.geoObjects.get(0).geometry?.getBounds()?.slice(0, 1).flat());
                  setCenter(res.geoObjects.get(0).geometry?.getBounds()?.slice(0, 1).flat());
                });
              }}
              state={{ center: center, zoom: 15, controls: ['zoomControl', 'fullscreenControl'] }}
              modules={['control.ZoomControl', 'control.FullscreenControl', 'geocode']}
              style={{width: "100%", height: "325px"}}
            >
              <Placemark
                modules={['geoObject.addon.balloon']}
                geometry={location}
                properties={{
                  balloonContentBody: `${product.location}`,
                  hintContent: `${product.location}`,
                }}
              />
            </Map>
          </div>
        </div>

        <div className={s.sidebar}>
          <div className={s.price}>{product.price} Р</div>
          <div className={s.phone}>
            <a
              href={`tel: ${product.phone}`}
              className={showPhone ? classes(s.phoneNumber, s.phoneNumberActive) : s.phoneNumber}
            >
              {useParsPhone(product.phone)}
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
            <RecProduct category={product.category} id={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
