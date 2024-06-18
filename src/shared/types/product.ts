export type Product = {
  id: number;
  category: string;
  publication_date: string | number;
  title: string;
  image: string;
  views: number;
  description: string;
  price:number;
  user: {
    fullName: string;
    email: string;
    phone: string;
    id: number;
  };
};