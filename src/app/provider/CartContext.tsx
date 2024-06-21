import React, {
  useState,
  PropsWithChildren,
  createContext,
  useContext,
} from "react";
import { CartItem, Product } from "@/assets/types"; // Import the CartItem type from the types folder
import { randomUUID } from "expo-crypto";

type CartType = {
  items: CartItem[];
  AddItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
};

const CartContext = createContext<CartType>({
  items: [],
  AddItem: () => {},
  updateQuantity: () => {},
  total: 0,
});

export default function CartProvider({ children }: PropsWithChildren<{}>) {
  const [items, setItems] = useState<CartItem[]>([]);

  const AddItem = (product: Product, size: CartItem["size"]) => {
    //if cart already has the item, increase the quantity
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );
    if (existingItem) {
      return updateQuantity(existingItem.id, 1);
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      size,
      quantity: 1,
      product_id: product.id,
    };
    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items
        .map((item) =>
          item.id !== itemId
            ? item
            : {
                ...item,
                quantity: item.quantity + amount,
              }
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  ); // Calculate the total price of the items in the cart

  return (
    <CartContext.Provider value={{ items, AddItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
