import s from "./banner.module.css"

export const Banner = () => {
  return (
    <div className={s.container}>
      <div className={s.info}>
        <div className={s.title}>Доска объявлений</div>
        <div className={s.text}>
          Находи тысячи разнообразных товаров и услуг <br />
          от продавцов со всей страны. <br />
          Безопасные расчеты. Удобный сервис доставки
        </div>
      </div>
      <img src="https://i.ibb.co/KxVjpp5/pngwing-com-3.png" alt="Фото баннера" className={s.img} />
    </div>
  );
};
