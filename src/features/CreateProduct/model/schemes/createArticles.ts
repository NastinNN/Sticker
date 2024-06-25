import { number, object, string } from 'yup';

export type CreateProductForm = {
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  phone: string;
  location: string;
};

export type CreateProductParams = CreateProductForm & {
  user_id: number;
  publication_date: string;
};

export const сreateProductFormValidationScheme = object().shape({
  title: string()
  .min(3, 'Слишком короткое название объявления')
  .max(125, 'Превышено допустимое количество символов')
  .required('Укажите название')
  .default(''),

  description: string()
  .max(3000, 'Превышено допустимое количество символов')
  .min(3, 'Слишком короткое описание')
  .required('Добавьте описение')
  .default(''),

  image: string()
  .required('Загрузите изображение')
  .default(''),

  category: string()
  .default('cars'),

  price: number()
  .required('Укажите цену')
  .min(1, 'Минимальное значение цены 1')
  .typeError('Неверный формат')
  .default(0),

  phone: string()
  .matches(/(\+7)(\d{10})/, 'Неверный формат телефона')
  .required('Укажите номер телефона')
  .default(''),

  location: string()
  .required('Укажите приблизительное местоположение (город, улица, станция метро)')
  .default(''),
});
