import { object, string } from 'yup';

export type SignInForm = {
  email: string;
  password: string;
};


export const signInFormValidationScheme = object().shape({
  email: string()
    .email("Некорректный email")
    .required('Обязательное поле')
    .default(""),
  password: string()
    .required('Обязательное поле')
    .default(""),
});
