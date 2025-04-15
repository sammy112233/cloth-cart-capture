
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface StoreState {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: () => number;
  totalItems: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product, quantity, size, color) => {
        const cart = get().cart;
        const existingItemIndex = cart.findIndex(
          item => 
            item.product.id === product.id && 
            item.size === size && 
            item.color === color
        );

        if (existingItemIndex !== -1) {
          const updatedCart = [...cart];
          updatedCart[existingItemIndex].quantity += quantity;
          set({ cart: updatedCart });
        } else {
          set({
            cart: [...cart, { product, quantity, size, color }]
          });
        }
      },
      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter(item => item.product.id !== productId)
        });
      },
      updateQuantity: (productId, quantity) => {
        const updatedCart = get().cart.map(item => {
          if (item.product.id === productId) {
            return { ...item, quantity };
          }
          return item;
        });
        set({ cart: updatedCart });
      },
      clearCart: () => set({ cart: [] }),
      subtotal: () => {
        return get().cart.reduce(
          (sum, item) => sum + item.product.price * item.quantity, 
          0
        );
      },
      totalItems: () => {
        return get().cart.reduce(
          (sum, item) => sum + item.quantity, 
          0
        );
      }
    }),
    {
      name: "cart-storage"
    }
  )
);
