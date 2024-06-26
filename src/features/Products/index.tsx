import { Map, Placemark } from '@pbe/react-yandex-maps';
import { EyeIcon } from 'assets/icons/eyeIcon';
import { BackNavigateIcon } from 'assets/icons/navigateIcon';
import classes from 'classnames';
import { useParsDate } from 'hooks/useParsDate';
import { useParsPhone } from 'hooks/useParsPhone';
import { useEffect, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../shared/types/product';
import { RecProduct } from './RecProduct';

import { useUpdateViewsMutation } from 'services/products';
import s from './product.module.css';

type ProductProps = {
  product: Product;
};

export const ProductView = ({ product }: ProductProps) => {
  const [showPhone, setShowPhone] = useState(false);
  const navigate = useNavigate();

  const id = product.id;
  const views = product.views + 1;

  const [updateProduct, { isLoading, isSuccess }] = useUpdateViewsMutation();

  useEffect(() => {
    updateProduct({ id, views });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [location, setLocation] = useState<any>(null);
  const [center, setCenter] = useState<any>([51.660781, 39.200296]);

  return (
    <div className={s.wrapper}>
      <div className={s.buttonBack} onClick={() => navigate(-1)}>
        <BackNavigateIcon />
      </div>
      <div className={s.content}>
          <div className={classes(s.infoSection, s.gap24)}>
            <p className={s.date}>{useParsDate(product.publication_date)}</p>
            <h2 className={s.title}>{product.title}</h2>
            <p className={s.id}>{product.articul}</p>
          </div>

          <div className={classes(s.gap24, s.priceSection)}>
            <p className={s.price}>{product.price.toLocaleString('ru-RU')} Р</p>
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
          </div>


          <div className={classes(s.imageSetion, s.gap24)}>
            <div className={s.views}>
              <EyeIcon />
              {product.views}
            </div>
            <PhotoProvider maskOpacity={0.7}>
              <PhotoView src={product.image}>
                <div className={s.image}>
                  <img src={product.image} alt="Product image" />
                </div>
              </PhotoView>
            </PhotoProvider>
            </div>
            
            <div className={classes(s.descSetion, s.gap24)}>
            <p className={s.textTitle}>Описание:</p>
            <p className={s.text}>{product.description}</p>
            <p className={s.textTitle}>
              Местоположение: <span className={s.text}>{product.location}</span>
            </p>
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
                style={{ width: '100%', height: '325px' }}
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

          <div className={classes(s.rec, s.gap24)}>
            <RecProduct category={product.category} id={product.id} />
          </div>
        </div>
      </div>
  );
};
