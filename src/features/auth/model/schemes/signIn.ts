import { object, string } from 'yup';


export const signInFormValidationScheme = object().shape({
  email: string()
    .email("Некорректный email")
    .required('Обязательное поле')
    .default(""),
  password: string()
    .required('Обязательное поле')
    .default(""),
});
