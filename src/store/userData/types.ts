export type AuthFormData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  data: {
    id: number;
    fullName: string;
    email: string;
  };
  token: string;
};

export type RegFormData = {
  fullName: string;
  email: string;
  password: string;
};
