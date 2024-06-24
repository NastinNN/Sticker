import * as yup from 'yup';

export const signUpFormValidationScheme = yup.object().shape({
  userName: yup
    .string()
    .min(1, "Обязательное поле")
    .max(25, "Превышено допустимое количество символов")
    .default("")
  ,
  userSurname: yup
    .string()
    .min(1, "Обязательное поле")
    .max(25, "Превышено допустимое количество символов")
    .default("")
  ,
  email: yup
    .string()
    .email("Некорректный email")
    .required('Обязательное поле')
    .default(""),
  password: yup
    .string()
    .min(8, "Пароль слишком короткий")
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, "Пароль должен содержать цифры и символы латинского алфавита верхнего и нижнего регистров")
    .required('Обязательное поле')
    .default(""),
  checkPassword: yup
    .string()
    .required('Обязательное поле')
    .oneOf([yup.ref('password')], "Пароли не совпадают")
    .default(""),
  checkbox: yup
    .bool()
    .oneOf([(true)], "Вы должны принять пользовательское соглашение")
    .default(false),
});