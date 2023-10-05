import { CartItem } from "../types";

export const cartItems: CartItem[] = [
  {
    product: {
      id: "1",
      name: "Product 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 12,
      imageUrl: "https://source.unsplash.com/random/200x200?sig=1",
    },
    quantity: 1,
  },
  {
    product: {
      id: "2",
      name: "Product 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 22,
      imageUrl: "https://source.unsplash.com/random/200x200?sig=2",
    },
    quantity: 2,
  },
];
