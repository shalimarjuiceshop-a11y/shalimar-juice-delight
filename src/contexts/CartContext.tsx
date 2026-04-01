import { createContext, useContext, useState, useMemo, type ReactNode } from "react";
import { type Drink } from "@/data/menuData";
import { toast } from "sonner";

type OrderMode = null | "shop" | "home";

interface CartItem {
  drink: Drink;
  qty: number;
}

interface CartContextType {
  mode: OrderMode;
  setMode: (m: OrderMode) => void;
  cart: CartItem[];
  totalQty: number;
  totalPrice: number;
  addToCart: (drink: Drink) => void;
  updateQty: (drinkId: string, delta: number) => void;
  removeItem: (drinkId: string) => void;
  clearCart: () => void;
  getPrice: (drink: Drink) => number;
}

const CartContext = createContext<CartContextType | null>(null);
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<OrderMode>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const totalQty = useMemo(() => cart.reduce((s, c) => s + c.qty, 0), [cart]);

  const getPrice = (drink: Drink) => {
    if (mode === "home") {
      return totalQty >= 20 ? 10 : 50;
    }
    return drink.price;
  };

  const totalPrice = useMemo(() => {
    return cart.reduce((s, c) => s + c.qty * (mode === "home" ? (totalQty >= 20 ? 10 : 50) : c.drink.price), 0);
  }, [cart, mode, totalQty]);

  const addToCart = (drink: Drink) => {
    if (!mode) return;
    setCart((prev) => {
      const existing = prev.find((c) => c.drink.id === drink.id);
      if (existing) return prev.map((c) => c.drink.id === drink.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { drink, qty: 1 }];
    });
    toast.success(`${drink.name} added!`);
  };

  const updateQty = (drinkId: string, delta: number) => {
    setCart((prev) => prev.map((c) => c.drink.id === drinkId ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter((c) => c.qty > 0));
  };

  const removeItem = (drinkId: string) => setCart((prev) => prev.filter((c) => c.drink.id !== drinkId));
  const clearCart = () => { setCart([]); setMode(null); };

  return (
    <CartContext.Provider value={{ mode, setMode, cart, totalQty, totalPrice, addToCart, updateQty, removeItem, clearCart, getPrice }}>
      {children}
    </CartContext.Provider>
  );
};
