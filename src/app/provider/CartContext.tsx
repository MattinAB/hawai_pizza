import React, {
  useState,
  PropsWithChildren,
  createContext,
  useContext,
} from "react";
import { CartItem, Tables } from "@/assets/types"; // Import the CartItem type from the types folder
import { randomUUID } from "expo-crypto";
import { useInsertOrders } from "@/src/api/orders";
import { useRouter } from "expo-router";
import { useInsertOrdersItems } from "@/src/api/orderItems";

type Product = Tables<"products">;

type CartType = {
  items: CartItem[];
  AddItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  onChekout: () => void; // Add a checkout function to the CartType
};

const CartContext = createContext<CartType>({
  items: [],
  AddItem: () => {},
  updateQuantity: () => {},
  total: 0,
  onChekout: () => {}, // Add a checkout function to the default value
});

export default function CartProvider({ children }: PropsWithChildren<{}>) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { mutate: insertOrder } = useInsertOrders();
  const { mutate: insertOrderItems } = useInsertOrdersItems();

  const router = useRouter();

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

  const clearItems = () => {
    setItems([]);
  };

  const onChekout = () => {
    // Add the checkout function
    insertOrder(
      { total },
      {
        onSuccess: saveOrderItems,
      }
    );
  };
  const saveOrderItems = (order: Tables<"orders">) => {
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      size: item.size,
    }));
    insertOrderItems(orderItems, {
      onSuccess: () => {
        clearItems();
        router.push(`/(user)/orders/${order.id}`);
      },
    });
  };

  return (
    <CartContext.Provider
      value={{ items, AddItem, updateQuantity, total, onChekout }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
