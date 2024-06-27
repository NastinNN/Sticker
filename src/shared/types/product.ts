export type Product = {
  id: number;
  articul: string;
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
  user_id: number
  // user: {
  //   name: string;
  //   surname: string;
  //   email: string;
  //   id: number;
  // };
};