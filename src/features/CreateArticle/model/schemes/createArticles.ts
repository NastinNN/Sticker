import { number, object, string } from 'yup';

export type CreateProductForm = {
  title: string;
  description: string;
  image: string;
  category: string;
  price: string;
};

export type CreateProductParams = CreateProductForm & {
  user_id: number;
  publication_date: string;
};

export const сreateProductFormValidationScheme = object().shape({
  title: string()
    .min(3, 'Слишком коротко')
    .max(10, 'Слишком многословно')
    .required('Заголовок обязательный')
    .default(''),
  description: string().required('Описание обязательно').default(''),
  image: string().required('Обложка обязательна').default(''),
  category: string().default('clothes'),
  price: string().required('Цена обязательна').default('')
});
