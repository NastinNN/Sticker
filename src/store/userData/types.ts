export type AuthFormData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  data: {
    id: number;
    userName: null,
    userSurname: null,
    email: string;
  };
  token: string;
};

export type RegFormData = {
  userName: string;
  userSurname: string;
  email: string;
  password: string;
};
