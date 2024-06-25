import s from "./banner.module.css"

export const Banner = () => {
  return (
    <div className={s.container}>
      <div className={s.info}>
        <h1 className={s.title}>Доска объявлений</h1>
        <p className={s.text}>
          Находи тысячи разнообразных товаров и услуг <br />
          от продавцов со всей страны. <br />
          Безопасные расчеты. Удобный сервис доставки
        </p>
      </div>
      <img src="https://i.ibb.co/KxVjpp5/pngwing-com-3.png" alt="Фото баннера" className={s.img} />
    </div>
  );
};
