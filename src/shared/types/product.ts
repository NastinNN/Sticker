export type Product = {
  id: number;
  category: string;
  publication_date: string | number;
  title: string;
  image: string;
  views: number;
  description: string;
  price:number;
  phone: string;
  location: string;
  status: boolean;
  user: {
    name: string;
    surname: string;
    email: string;
    phone: string;
    id: number;
  };
};