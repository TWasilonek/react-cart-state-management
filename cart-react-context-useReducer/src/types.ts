export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  iamgeUrl: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
